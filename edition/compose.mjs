// Turns edition/day.mjs into the 1024 x 1024 front page and screenshots it to entry.png.
// Layout, top to bottom: region tally, date masthead, 3 headliners, 10 panels, figures strip,
// then the locator map + UTC clock + date check beside a two-column roundup, then credits.
// Run: node edition/compose.mjs   (Playwright is a dev-only dependency; main.ts never needs it)

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { edition, headliners, panels, roundup, figures, clock, olderNews } from './day.mjs';
import { sketch } from './sketches.mjs';
import { locatorMap } from './atlas.mjs';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const safe = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const [year, month, dayNo] = edition.isoDate.split('-').map(Number);
const monthName = new Date(Date.UTC(year, month - 1, dayNo)).toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });

// Sureness label colours.
const SURE = { CONFIRMED: '#22683b', OFFICIAL: '#1e3b60', REPORTED: '#5b4b6d', TODAY: '#6c5a27' };
const SURE_TEXT = { CONFIRMED: 'CONFIRMED', OFFICIAL: 'OFFICIAL', REPORTED: 'REPORTED', TODAY: 'SCHEDULED TODAY' };
const badge = (k) => `<i class="sure" style="background:${SURE[k]}">${SURE_TEXT[k]}</i>`;

// Region tally across every item on the page, biggest first.
const pinned = [...headliners, ...panels];
const zones = [...pinned.map((s) => s.zone), ...roundup.map((r) => r[0])];
const tally = [...new Set(zones)].map((z) => [z, zones.filter((x) => x === z).length]).sort((a, b) => b[1] - a[1]);
const storyCount = zones.length;

const card = (s, n, big) => `
  <div class="card ${big ? 'big' : 'mini'}">
    <div class="art">${sketch(s.sketch)}<b class="pin">${n}</b></div>
    <div class="txt"><div class="tag">${safe(s.tag)}</div>
      <div class="hed fit">${safe(s.title)}</div>
      <div class="dek">${safe(s.line)}</div>
      <div class="foot">${badge(s.sure)}${big ? `<span class="cred">${safe(s.credit)}</span>` : ''}</div></div>
  </div>`;

const firstBrief = pinned.length + 1;
const splitAt = Math.ceil(roundup.length / 2);
const briefList = (rows, start) => rows.map(([, place, text], i) => `<li class="fit"><em>${start + i}</em><b>${safe(place)}</b> ${safe(text)}</li>`).join('');

const page = `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1024px;height:1024px;overflow:hidden;background:#f5efe3;color:#1c1a18;font-family:'Noto Sans',sans-serif}
#sheet{height:1024px;padding:12px 18px 0;display:flex;flex-direction:column}
.band{display:flex;justify-content:space-between;align-items:center;border-top:5px solid #1e3b60;padding-top:6px;font-weight:800;font-size:11.5px;letter-spacing:.07em}
.zones{display:flex;gap:4px}.zones span{background:#1e3b60;color:#fff;border-radius:3px;padding:1px 4px;font-size:9.5px;letter-spacing:0;white-space:nowrap}
.total{color:#b1271f}
header{text-align:center;border-bottom:3px double #1c1a18;padding:2px 0 4px}
header h1{font:900 58px/1.02 'Noto Serif',serif;letter-spacing:-.01em}
header h1 span{color:#b1271f}
header p{font-size:11.5px;color:#3c3732;margin-top:1px}
header p.top{font:italic 700 14px/1.2 'Noto Serif',serif;color:#b1271f;white-space:nowrap}
.row3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:6px 0}
.row5{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;padding-bottom:6px}
.card{background:#fffcf6;border:1px solid #c9bda6;border-radius:5px;overflow:hidden}
.art{position:relative;line-height:0;border-bottom:1px solid #c9bda6}.art svg{display:block;width:100%}
.big .art svg{height:70px}.mini .art svg{height:48px}
.pin{position:absolute;left:6px;bottom:0;transform:translateY(50%);width:20px;height:20px;border-radius:50%;background:#b1271f;border:1.5px solid #fff;color:#fff;font:800 11px/17px 'Noto Sans';text-align:center}
.txt{padding:9px 8px 6px}.mini .txt{padding-top:8px}
.tag{padding-left:20px;font-size:10px;font-weight:800;letter-spacing:.07em;color:#1e3b60}.mini .tag{font-size:9.5px}
.hed{font-family:'Noto Serif',serif;font-weight:800;white-space:nowrap;overflow:hidden}
.big .hed{font-size:19.5px;line-height:1.15;margin-top:3px;white-space:normal}
.mini .hed{font-size:15px;line-height:1.15;margin-top:2px;white-space:normal}
.dek{color:#3c3732;margin-top:3px}.big .dek{font-size:12px;line-height:1.28}.mini .dek{font-size:11px;line-height:1.22;margin-top:2px}
.foot{display:flex;gap:6px;align-items:center;margin-top:4px}
.sure{font-style:normal;color:#fff;font-size:8.8px;font-weight:800;letter-spacing:.05em;padding:2px 5px;border-radius:2px}
.cred{font-size:9.5px;font-weight:700;color:#5b544b}
.figs{display:grid;grid-template-columns:110px repeat(4,1fr);gap:10px;align-items:center;background:#1e3b60;color:#fff;border-radius:4px;padding:4px 12px}
.figs h4{font-size:10.5px;letter-spacing:.08em;color:#f1c04d}
.figs strong{display:block;font:700 24px/1 'Noto Serif',serif}.figs small{display:block;font-size:10px;line-height:1.2;color:#d5dfeb}
.lower{flex:1;min-height:0;display:grid;grid-template-columns:400px 1fr;gap:14px;padding-top:8px}
h5{font-size:11px;font-weight:800;letter-spacing:.08em;color:#1e3b60;margin-bottom:4px}
.map svg{display:block;width:100%;border:1px solid #c9bda6;border-radius:4px}
.clock{display:grid;grid-template-columns:repeat(3,1fr);gap:1px 6px;margin-top:4px;font-size:9.6px;line-height:1.35;white-space:nowrap}
.clock b{color:#b1271f;margin-right:3px}
.check{margin-top:5px;border:1.5px solid #b1271f;border-radius:4px;background:#fbf2e8;padding:4px 8px;font-size:9.6px;line-height:1.35;color:#3c3732}
.check b{color:#b1271f;letter-spacing:.05em;margin-right:4px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}
.two ol{list-style:none;min-width:0;overflow:hidden}
.two li{position:relative;padding:1px 0 1px 25px;font-size:11.8px;line-height:1.16;white-space:nowrap;overflow:hidden}
.two li em{position:absolute;left:0;top:1px;width:20px;height:15px;border-radius:8px;background:#1e3b60;color:#fff;font:normal 800 9.5px/15px 'Noto Sans';text-align:center}
.credits{margin-top:6px;border-top:1px solid #1c1a18;padding:4px 0 7px;text-align:center;font-size:9.3px;color:#5b544b;white-space:nowrap}
</style></head><body><div id="sheet">
  <div class="band"><div class="zones">${tally.map(([z, n]) => `<span>${safe(z.toUpperCase())} ${n}</span>`).join('')}</div><div class="total">${storyCount} STORIES · ${tally.length} REGIONS</div></div>
  <header><h1>${safe(edition.dayName)} <span>${dayNo} ${monthName} ${year}</span></h1><p class="top">${safe(edition.topLine)}</p></header>
  <section class="row3">${headliners.map((s, i) => card(s, i + 1, true)).join('')}</section>
  <section class="row5">${panels.map((s, i) => card(s, headliners.length + i + 1, false)).join('')}</section>
  <section class="figs"><h4>BY THE<br>NUMBERS</h4>${figures.map(([big, small]) => `<div><strong>${safe(big)}</strong><small>${safe(small)}</small></div>`).join('')}</section>
  <section class="lower">
    <div class="map"><h5>WHERE IT HAPPENED · PINS 1–${pinned.length} · TIMES UTC</h5>${locatorMap(pinned)}
      <div class="clock">${clock.map(([t, what]) => `<div><b>${t}</b>${safe(what)}</div>`).join('')}</div>
      <div class="check"><b>DATE CHECK:</b>Every item broke on ${dayNo} Nov. Left out, from other days: ${olderNews.map(safe).join(' · ')}</div></div>
    <div><h5>ALSO ON ${safe(edition.dayName.toUpperCase())} ${dayNo} ${monthName.toUpperCase()} ${year} · STORIES ${firstBrief}–${storyCount}</h5>
      <div class="two"><ol>${briefList(roundup.slice(0, splitAt), firstBrief)}</ol><ol>${briefList(roundup.slice(splitAt), firstBrief + splitAt)}</ol></div></div>
  </section>
  <div class="credits">Sources: ${safe(edition.outlets)} · Pictures are original drawings, not photos · CONFIRMED = 2+ outlets · OFFICIAL = government or organiser · REPORTED = one outlet</div>
</div></body></html>`;

mkdirSync(join(repo, 'out'), { recursive: true });
const htmlPath = join(repo, 'out', 'front-page.html');
writeFileSync(htmlPath, page);

const { chromium } = await import('playwright');
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
await tab.goto('file://' + htmlPath);
await tab.waitForTimeout(250);

// Shrink any one-line roundup item that is wider than its column, 0.2 px at a time,
// and report what still does not fit plus where the credits line ends.
const report = await tab.evaluate(() => {
  const shrunk = [];
  for (const el of document.querySelectorAll('li.fit')) {
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > el.clientWidth && size > 10) { size -= 0.2; el.style.fontSize = size + 'px'; }
    if (size < 11.8) shrunk.push(size.toFixed(1));
  }
  const lower = document.querySelector('.lower').getBoundingClientRect();
  const lists = [...document.querySelectorAll('.two ol, .map')].map((e) => e.getBoundingClientRect().bottom);
  const overflow = Math.max(...lists) - lower.bottom;
  const tooTall = [...document.querySelectorAll('.card')].filter((c) => c.scrollHeight > c.clientHeight + 1).length;
  return { shrunk, tooTall, overflow, creditsEnd: document.querySelector('.credits').getBoundingClientRect().bottom };
});

let image = await tab.screenshot({ type: 'png' });
for (let q = 92; image.length > 1_000_000 && q >= 60; q -= 4) image = await tab.screenshot({ type: 'jpeg', quality: q });
await browser.close();

writeFileSync(join(repo, 'entry.png'), image);
writeFileSync(join(repo, 'entry.png.b64'), image.toString('base64'));
console.log(JSON.stringify({ bytes: image.length, ...report }));
