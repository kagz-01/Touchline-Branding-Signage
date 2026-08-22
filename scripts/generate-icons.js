// Generates placeholder PWA icons (pure Node, zlib only — no image libs needed,
// since this sandbox can't install native packages like sharp). Produces real,
// valid PNGs so "Add to Home Screen" has something to show today. Swap these
// for real exported logo art per public/icons/README.md whenever it's ready —
// re-run this script any time brand colors change in config/brands.ts.

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const CRC_TABLE = (() => {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = chunk("IHDR", ihdrData);

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter type: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = chunk("IDAT", zlib.deflateSync(raw));
  const iend = chunk("IEND", Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

function hexToRgb(hex) {
  const m = hex.replace("#", "");
  return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
}

function makeIcon(size, bgHex, fgHex, style) {
  const [br, bg, bb] = hexToRgb(bgHex);
  const [fr, fg, fb] = hexToRgb(fgHex);
  const buf = Buffer.alloc(size * size * 4);

  const setPx = (x, y, r, g, b, a = 255) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = a;
  };

  // Background fill with slightly rounded corners (simple corner-radius mask)
  const radius = Math.round(size * 0.18);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const inCorner =
        (x < radius && y < radius && dist(x, y, radius, radius) > radius) ||
        (x >= size - radius && y < radius && dist(x, y, size - radius, radius) > radius) ||
        (x < radius && y >= size - radius && dist(x, y, radius, size - radius) > radius) ||
        (x >= size - radius && y >= size - radius && dist(x, y, size - radius, size - radius) > radius);
      if (inCorner) setPx(x, y, br, bg, bb, 0);
      else setPx(x, y, br, bg, bb, 255);
    }
  }

  function dist(x, y, cx, cy) {
    return Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
  }

  // Monogram glyph, centered, built from simple rectangles.
  const m = size * 0.18; // margin
  const glyphW = size - m * 2;
  const glyphH = size - m * 2;

  if (style === "hub") {
    // Two overlapping circles (two doors: branding + signage) in accent colors.
    const r = glyphW * 0.32;
    drawCircle(size * 0.42, size * 0.5, r, fr, fg, fb, 255);
    drawCircle(size * 0.58, size * 0.5, r, 51, 225, 237, 200); // signage cyan, translucent overlap
  } else {
    // Bold "T" monogram
    const barH = glyphH * 0.2;
    const stemW = glyphW * 0.22;
    fillRect(m, m, glyphW, barH, fr, fg, fb);
    fillRect(size / 2 - stemW / 2, m, stemW, glyphH, fr, fg, fb);
  }

  function fillRect(x0, y0, w, h, r, g, b) {
    for (let y = Math.round(y0); y < Math.round(y0 + h); y++) {
      for (let x = Math.round(x0); x < Math.round(x0 + w); x++) setPx(x, y, r, g, b, 255);
    }
  }

  function drawCircle(cx, cy, r, r_, g_, b_, a) {
    for (let y = Math.round(cy - r); y <= Math.round(cy + r); y++) {
      for (let x = Math.round(cx - r); x <= Math.round(cx + r); x++) {
        if (dist(x, y, cx, cy) <= r) setPx(x, y, r_, g_, b_, a);
      }
    }
  }

  return encodePNG(size, size, buf);
}

const outDir = path.join(__dirname, "..", "public", "icons");
fs.mkdirSync(outDir, { recursive: true });

const jobs = [
  { name: "icon", bg: "#121014", fg: "#d9e85c", style: "hub" },
  { name: "branding", bg: "#17141f", fg: "#d9e85c", style: "letter" },
  { name: "signage", bg: "#0e1417", fg: "#33e1ed", style: "letter" },
];

for (const job of jobs) {
  for (const size of [192, 512]) {
    const png = makeIcon(size, job.bg, job.fg, job.style);
    const file = path.join(outDir, `${job.name}-${size}.png`);
    fs.writeFileSync(file, png);
    console.log("wrote", file);
  }
}

// Apple touch icon (opaque background required — iOS ignores alpha/rounds itself)
for (const job of jobs) {
  const png = makeIcon(180, job.bg, job.fg, job.style);
  const file = path.join(outDir, `${job.name}-apple-touch.png`);
  fs.writeFileSync(file, png);
  console.log("wrote", file);
}
