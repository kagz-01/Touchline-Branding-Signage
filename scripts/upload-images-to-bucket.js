/**
 * Upload all catalog images to Supabase Storage Bucket ('catalog')
 * Organized into clean folders:
 *   - branding/catalog/...
 *   - signage/catalog/...
 *   - awards/catalog/...
 * And then updates the `image` column in `catalog_items` table in Supabase
 * to the permanent public Supabase CDN URLs.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const BUCKET = 'catalog';

async function uploadDir(localDir, storagePrefix) {
  if (!fs.existsSync(localDir)) {
    console.warn(`Directory not found: ${localDir}`);
    return [];
  }

  const files = fs.readdirSync(localDir);
  const uploaded = [];

  for (const file of files) {
    const fullPath = path.join(localDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      continue;
    }

    const storagePath = `${storagePrefix}/${file}`;
    const fileBuffer = fs.readFileSync(fullPath);

    let mimeType = 'image/webp';
    if (file.endsWith('.png')) mimeType = 'image/png';
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) mimeType = 'image/jpeg';
    if (file.endsWith('.svg')) mimeType = 'image/svg+xml';

    // Upload with upsert: true
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      console.error(`  ❌ Failed uploading ${storagePath}:`, error.message);
    } else {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
      uploaded.push({
        localRelPath: `/images/${storagePrefix}/${file}`,
        publicUrl: data.publicUrl,
        storagePath,
      });
      process.stdout.write(`.`);
    }
  }

  console.log(`\n  ✅ Uploaded ${uploaded.length} files to ${storagePrefix}/`);
  return uploaded;
}

async function run() {
  console.log(`🚀 Starting Image Migration to Supabase Bucket: "${BUCKET}"\n`);

  const publicDir = path.resolve(__dirname, '../public/images');

  console.log('1. Uploading Branding Catalog images...');
  const branding = await uploadDir(path.join(publicDir, 'branding/catalog'), 'branding/catalog');

  console.log('2. Uploading Signage Catalog images...');
  const signage = await uploadDir(path.join(publicDir, 'signage/catalog'), 'signage/catalog');

  console.log('3. Uploading Awards Catalog images...');
  const awards = await uploadDir(path.join(publicDir, 'awards/catalog'), 'awards/catalog');

  const allUploaded = [...branding, ...signage, ...awards];
  console.log(`\n🎉 Total images uploaded to Supabase Storage: ${allUploaded.length}`);

  console.log('\n4. Updating DB `catalog_items` table with Supabase CDN URLs...');
  let updatedCount = 0;

  for (const item of allUploaded) {
    const { error } = await supabase
      .from('catalog_items')
      .update({ image: item.publicUrl })
      .eq('image', item.localRelPath);

    if (!error) {
      updatedCount++;
    }
  }

  console.log(`✅ Updated ${updatedCount} items in Supabase DB with CDN image URLs!`);
  console.log('\nSample CDN URL:');
  if (allUploaded.length > 0) {
    console.log(`   ${allUploaded[0].publicUrl}`);
  }
}

run().catch((err) => {
  console.error('Fatal error during bucket upload:', err);
  process.exit(1);
});
