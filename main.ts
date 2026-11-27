// Entry for make.fun news-image-20261127: "Sum up 27 November's world news in one image".
//
// The picture itself is drawn ahead of time by render/build.mjs from the stories in
// render/stories.json (every headline, label, drawing and map pin is generated there),
// and committed as entry.png.b64 beside this file (one line of base64, because the upload
// route only carries text files). At grading time there is no network and
// only the Node standard library, so this program only decodes it, verifies it and copies it
// to /output/entry.png. Both runs therefore write the same bytes.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1_048_576;
const MAX_SIDE = 1024;

const bytes = Buffer.from(readFileSync(new URL('./entry.png.b64', import.meta.url), 'utf8').trim(), 'base64');

function sizeOf(buf: Buffer): { kind: string; w: number; h: number } {
  // PNG: 8-byte signature, then the IHDR chunk holds width and height.
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { kind: 'png', w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  // JPEG: walk the segments to the first start-of-frame marker.
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { kind: 'jpeg', w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  throw new Error('entry.png is neither a PNG nor a JPEG');
}

const { kind, w, h } = sizeOf(bytes);
if (bytes.length > MAX_BYTES) throw new Error(`entry.png is ${bytes.length} bytes, over ${MAX_BYTES}`);
if (w > MAX_SIDE || h > MAX_SIDE) throw new Error(`entry.png is ${w}x${h}, over ${MAX_SIDE}px`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
writeFileSync(join(outDir, 'entry.png'), bytes);
console.log(`wrote ${join(outDir, 'entry.png')}: ${kind} ${w}x${h}, ${bytes.length} bytes`);
