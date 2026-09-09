const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const LOGOS_DIR = path.join(__dirname, "..", "public", "Logos");
const OUT_DIR = path.join(__dirname, "..", "public", "icons");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Brand configs: logo file, background color, foreground (for any text fallback)
const brands = [
  {
    name: "icon",
    logo: path.join(LOGOS_DIR, "T-logo-dark.png"),
    bg: "#0d0c0a",
  },
  {
    name: "branding",
    logo: path.join(LOGOS_DIR, "Tb-logo-dark.png"),
    bg: "#1a1510",
  },
  {
    name: "signage",
    logo: path.join(LOGOS_DIR, "Ts-logo-dark.png"),
    bg: "#141415",
  },
];

async function generateIcon(logoPath, bgColor, size, padding = 0.2) {
  const innerSize = Math.round(size * (1 - padding * 2));

  const resizedLogo = await sharp(logoPath)
    .resize(innerSize, innerSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const bgHex = bgColor.replace("#", "");
  const r = parseInt(bgHex.slice(0, 2), 16);
  const g = parseInt(bgHex.slice(2, 4), 16);
  const b = parseInt(bgHex.slice(4, 6), 16);

  const icon = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r, g, b, alpha: 255 },
    },
  })
    .composite([{
      input: resizedLogo,
      top: Math.round(size * padding),
      left: Math.round(size * padding),
    }])
    .png()
    .toBuffer();

  return icon;
}

async function pngToIco(pngBuffer) {
  const width = 32;
  const height = 32;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(width, 0);
  dirEntry.writeUInt8(height, 1);
  dirEntry.writeUInt8(0, 2);
  dirEntry.writeUInt8(0, 3);
  dirEntry.writeUInt16LE(1, 4);
  dirEntry.writeUInt16LE(32, 6);
  dirEntry.writeUInt32LE(pngBuffer.length, 8);
  dirEntry.writeUInt32LE(22, 12);

  return Buffer.concat([header, dirEntry, pngBuffer]);
}

async function main() {
  for (const brand of brands) {
    // PWA icons: 192x192, 512x512
    for (const size of [192, 512]) {
      const icon = await generateIcon(brand.logo, brand.bg, size);
      const file = path.join(OUT_DIR, `${brand.name}-${size}.png`);
      fs.writeFileSync(file, icon);
      console.log("wrote", file);
    }

    // Apple touch icon (180x180)
    const appleIcon = await generateIcon(brand.logo, brand.bg, 180);
    const appleFile = path.join(OUT_DIR, `${brand.name}-apple-touch.png`);
    fs.writeFileSync(appleFile, appleIcon);
    console.log("wrote", appleFile);

    // Favicons: 32x32 PNG + ICO
    const faviconPng = await generateIcon(brand.logo, brand.bg, 32, 0.15);
    const suffix = brand.name === "icon" ? "" : `${brand.name}-`;

    const pngFile = path.join(OUT_DIR, `${suffix}favicon-32.png`);
    fs.writeFileSync(pngFile, faviconPng);
    console.log("wrote", pngFile);

    const icoFile = path.join(OUT_DIR, `${suffix}favicon.ico`);
    fs.writeFileSync(icoFile, await pngToIco(faviconPng));
    console.log("wrote", icoFile);
  }

  // Hub apple-touch naming fix for layout.tsx
  const src = path.join(OUT_DIR, "icon-apple-touch.png");
  const dst = path.join(OUT_DIR, "apple-touch-icon.png");
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log("wrote", dst);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
