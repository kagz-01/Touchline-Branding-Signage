# Image drop folder

Drop the real project images here before converting them to optimized webp/webm outputs.

Structure:

- public/images/branding/
- public/images/signage/

Use clear filenames like:

- branding-shopfront-01.jpg
- branding-apparel-rollout-02.jpg
- signage-fascia-main.jpg
- signage-vehicle-wrap-01.jpg

Then later we can:

1. normalize the images
2. convert to webp
3. generate video/webm versions where needed
4. upload the final assets to Supabase storage and write the public URLs into the DB
