const fs = require('fs');
const zlib = require('zlib');

// Read logo.png
const buffer = fs.readFileSync('public/logo.png');

// Check PNG signature
if (buffer.slice(0, 8).toString('hex') !== '89504e470d0a1a0a') {
  console.log('Not a PNG file');
  process.exit(1);
}

// Parse chunks
let offset = 8;
let width = 0, height = 0, bitDepth = 0, colorType = 0;
let idatChunks = [];

while (offset < buffer.length) {
  const length = buffer.readUInt32BE(offset);
  const type = buffer.toString('ascii', offset + 4, offset + 8);
  const data = buffer.slice(offset + 8, offset + 8 + length);
  
  if (type === 'IHDR') {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    bitDepth = data[8];
    colorType = data[9];
    console.log(`IHDR: ${width}x${height}, bitDepth:${bitDepth}, colorType:${colorType}`);
  } else if (type === 'IDAT') {
    idatChunks.push(data);
  } else if (type === 'IEND') {
    break;
  }
  offset += 12 + length;
}

if (colorType === 6 && bitDepth === 8) {
  const compressed = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressed);
  const stride = width * 4 + 1;
  const newDecompressed = Buffer.alloc(decompressed.length);

  let prevLine = Buffer.alloc(width * 4);

  for (let y = 0; y < height; y++) {
    const lineStart = y * stride;
    const filter = decompressed[lineStart];
    newDecompressed[lineStart] = filter; // keep same filter or 0

    // Unfilter line
    const rawLine = Buffer.alloc(width * 4);
    for (let x = 0; x < width * 4; x++) {
      let val = decompressed[lineStart + 1 + x];
      let a = x >= 4 ? rawLine[x - 4] : 0;
      let b = prevLine[x];
      let c = x >= 4 ? prevLine[x - 4] : 0;

      if (filter === 1) val = (val + a) & 0xff;
      else if (filter === 2) val = (val + b) & 0xff;
      else if (filter === 3) val = (val + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        let p = a + b - c;
        let pa = Math.abs(p - a);
        let pb = Math.abs(p - b);
        let pc = Math.abs(p - c);
        let pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (val + pr) & 0xff;
      }
      rawLine[x] = val;
    }

    // Process pixels: turn white/near-white background to transparent
    for (let x = 0; x < width; x++) {
      const idx = x * 4;
      const r = rawLine[idx];
      const g = rawLine[idx + 1];
      const b = rawLine[idx + 2];
      const a = rawLine[idx + 3];

      // If pixel is white or near-white (background)
      if (r > 235 && g > 235 && b > 235) {
        // Calculate softness for anti-aliasing
        const minVal = Math.min(r, g, b);
        const alpha = Math.max(0, Math.min(255, 255 - Math.round((minVal - 220) * 7.2)));
        rawLine[idx + 3] = alpha;
      }
    }

    // Copy to newDecompressed as Filter 0 (None)
    newDecompressed[lineStart] = 0;
    for (let x = 0; x < width * 4; x++) {
      newDecompressed[lineStart + 1 + x] = rawLine[x];
    }
    prevLine = rawLine;
  }

  const recompressed = zlib.deflateSync(newDecompressed);
  
  // Reconstruct PNG file
  const parts = [];
  parts.push(Buffer.from('89504e470d0a1a0a', 'hex'));

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  parts.push(makeChunk('IHDR', ihdr));

  // IDAT
  parts.push(makeChunk('IDAT', recompressed));

  // IEND
  parts.push(makeChunk('IEND', Buffer.alloc(0)));

  fs.writeFileSync('public/logo_transparent.png', Buffer.concat(parts));
  console.log('Successfully written public/logo_transparent.png!');
} else {
  console.log('ColorType:', colorType, 'bitDepth:', bitDepth);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const buf = Buffer.concat([typeBuf, data]);
  const crc = crc32(buf);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}
