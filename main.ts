// make.fun entry for news-image-20261127, "Sum up 27 November's world news in one image".
//
// How it fits together: edition/compose.mjs draws the front page from edition/day.mjs and
// saves it as entry.png.b64 (base64 on a single line; the upload path takes text only).
// The grader runs this file offline with plain Node, so all it does is turn that text back
// into image bytes, make sure they are a real PNG or JPEG inside the judge's limits, and
// write them to the output folder. Same input, same bytes, every run.
//
// Try it locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LIMIT_BYTES = 1024 * 1024; // the judge reads at most 1 MiB
const LIMIT_PX = 1024; // and at most 1024 px on either side

type Picture = { format: 'png' | 'jpeg'; width: number; height: number };

const encoded = readFileSync(new URL('./entry.png.b64', import.meta.url), 'utf8');
const picture = Buffer.from(encoded.trim(), 'base64');

function measure(data: Buffer): Picture {
  const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (pngMagic.every((byte, i) => data[i] === byte)) {
    // The first chunk after the magic is IHDR: width at offset 16, height at 20.
    return { format: 'png', width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }
  if (data[0] === 0xff && data[1] === 0xd8) {
    // Step through JPEG segments until a start-of-frame header gives the size.
    let at = 2;
    while (at + 9 < data.length) {
      if (data[at] !== 0xff) { at += 1; continue; }
      const kind = data[at + 1];
      const isFrame = kind >= 0xc0 && kind <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(kind);
      if (isFrame) return { format: 'jpeg', width: data.readUInt16BE(at + 7), height: data.readUInt16BE(at + 5) };
      at += 2 + data.readUInt16BE(at + 2);
    }
  }
  throw new Error('entry.png.b64 does not decode to a PNG or JPEG image');
}

const { format, width, height } = measure(picture);
if (picture.length > LIMIT_BYTES) throw new Error(`image is ${picture.length} bytes; the limit is ${LIMIT_BYTES}`);
if (width > LIMIT_PX || height > LIMIT_PX) throw new Error(`image is ${width}x${height}; the limit is ${LIMIT_PX} px a side`);

const target = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
writeFileSync(target, picture);
console.log(`saved ${target} (${format}, ${width}x${height}, ${picture.length} bytes)`);
