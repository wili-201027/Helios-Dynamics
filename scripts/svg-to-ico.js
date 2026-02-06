const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'logo.svg');
const outPath = path.join(__dirname, '..', 'public', 'favicon.ico');

const sizes = [16, 32, 48, 64, 128];

(async () => {
  try {
    const pngBuffers = await Promise.all(
      sizes.map((size) =>
        sharp(svgPath).resize(size, size, { fit: 'contain' }).png().toBuffer()
      )
    );

    const icoBuffer = await pngToIco(pngBuffers);
    fs.writeFileSync(outPath, icoBuffer);
    console.log('Generated', outPath);
  } catch (err) {
    console.error('Conversion failed:', err);
    process.exit(1);
  }
})();
