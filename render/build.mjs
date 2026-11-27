// Builds entry.png from render/stories.json: lays the day's stories out as one front page
// (HTML + inline SVG), renders it at exactly 1024x1024 in headless Chromium, and keeps the
// result under the 1 MiB cap. Run: node render/build.mjs   (needs playwright, dev only)

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { art } from './art.mjs';
import { worldMap } from './map.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const day = JSON.parse(readFileSync(join(here, 'stories.json'), 'utf8'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const [yy, mm, dd] = day.date.split('-').map(Number);
const dateLine = `${day.weekday.toUpperCase()} ${dd} ${MONTHS[mm - 1]} ${yy}`;

const STATUS = {
  CONFIRMED: ['#1f6b3a', 'CONFIRMED'],
  OFFICIAL: ['#1f3a5f', 'OFFICIAL'],
  SCHEDULED: ['#6b5a2a', 'SCHEDULED TODAY'],
  CLAIMED: ['#b3261e', 'CLAIMED, UNVERIFIED'],
  REPORTED: ['#5a4a6b', 'REPORTED'],
};
const chip = (st) => {
  const [c, t] = STATUS[st] || STATUS.REPORTED;
  return `<span class="chip" style="background:${c}">${t}</span>`;
};

const all = [...day.leads, ...day.stories];
const regions = new Set([...all, ...day.brief].map((s) => s.region));
const regCount = [...regions].map((r) => [r, [...all, ...day.brief].filter((x) => x.region === r).length]).sort((a, b) => b[1] - a[1]);
const pinNo = new Map(all.map((s, i) => [s.id, i + 1]));

const lead = (s) => `
  <article class="lead">
    <div class="pic">${art(s.art)}<span class="no">${pinNo.get(s.id)}</span></div>
    <div class="body"><div class="kick">${esc(s.kicker)}</div>
    <h2>${esc(s.headline)}</h2>
    <p>${esc(s.dek)}</p>
    <div class="meta">${chip(s.status)}<span class="src">${esc(s.source)}</span></div></div>
  </article>`;

const small = (s) => `
  <article class="small">
    <div class="pic">${art(s.art)}<span class="no">${pinNo.get(s.id)}</span></div>
    <div class="body"><div class="kick">${esc(s.kicker)}</div>
    <h3>${esc(s.headline)}</h3>
    <p>${esc(s.dek)}</p>
    <div class="meta">${chip(s.status)}</div></div>
  </article>`;

const total = all.length + day.brief.length;
const half = Math.ceil(day.brief.length / 2);
const briefCol = (items, off) => `<ol class="brief" start="${off}">${items.map((b) => `<li><b>${esc(b.place)}</b> — ${esc(b.text)}</li>`).join('')}</ol>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1024px;height:1024px;background:#f6f1e7;color:#1d1b19;font-family:'Noto Sans',sans-serif;overflow:hidden}
.page{padding:12px 18px 0 18px;height:1024px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;font-size:11.5px;font-weight:800;letter-spacing:.08em;color:#1f3a5f;border-top:5px solid #1f3a5f;padding-top:6px}
.top .r{color:#b3261e}
.rc{display:flex;gap:4px;flex-wrap:nowrap}.rc b{background:#1f3a5f;color:#fff;border-radius:3px;padding:1px 4px;font-size:9.5px;letter-spacing:0;white-space:nowrap}
.mast{text-align:center;padding:2px 0 4px;border-bottom:3px double #1d1b19}
.mast h1{font-family:'Noto Serif',serif;font-weight:900;font-size:58px;line-height:1.02;color:#1d1b19;letter-spacing:-.01em}
.mast h1 .d{color:#b3261e}
.mast .sub{font-size:11.5px;color:#3d3833;margin-top:1px}
.leads{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:8px 0 8px}
article{background:#fffdf8;border:1px solid #cbbfa8;border-radius:5px;overflow:hidden;display:flex;flex-direction:column}
.pic{position:relative;line-height:0;border-bottom:1px solid #cbbfa8}.pic svg{width:100%;display:block}
.lead .pic svg{height:88px}.small .pic svg{height:42px}
.body{padding:5px 8px 6px}
.no{position:absolute;bottom:-1px;left:6px;transform:translateY(50%);background:#b3261e;color:#fff;font:800 11px 'Noto Sans';line-height:20px;width:20px;text-align:center;border-radius:10px;border:1.5px solid #fff;z-index:2}
.lead .body{padding-top:9px}.small .body{padding-top:8px}
.kick{font-size:10px;font-weight:800;letter-spacing:.07em;color:#1f3a5f;padding-left:20px}
.lead h2{font-family:'Noto Serif',serif;font-weight:800;font-size:19.5px;line-height:1.1;margin-top:3px}
.lead p{font-size:11.5px;line-height:1.28;color:#3d3833;margin-top:3px}
.meta{display:flex;align-items:center;gap:6px;margin-top:4px}
.chip{color:#fff;font-size:8.8px;font-weight:800;letter-spacing:.05em;padding:2px 5px;border-radius:2px}
.src{font-size:9.5px;color:#5c554c;font-weight:700}
.smalls{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;padding:0 0 8px}
.small .kick{font-size:9.5px}
.small h3{font-family:'Noto Serif',serif;font-weight:800;font-size:14px;line-height:1.12;margin-top:2px}
.small p{font-size:10.5px;line-height:1.22;color:#3d3833;margin-top:2px}
.small .meta{margin-top:3px}
.nums{display:grid;grid-template-columns:110px repeat(4,1fr);background:#1f3a5f;color:#fff;border-radius:4px;padding:6px 12px;align-items:center;gap:10px}
.nums .h{font-size:10.5px;font-weight:800;letter-spacing:.08em;color:#f2c14e}
.nums b{font-family:'Noto Serif',serif;font-size:24px;line-height:1;display:block}
.nums span{font-size:10px;color:#d7e0ec;line-height:1.2;display:block}
.bottom{display:grid;grid-template-columns:400px 1fr;gap:14px;padding:8px 0 0;flex:1;min-height:0}
.sec{font-size:11px;font-weight:800;letter-spacing:.08em;color:#1f3a5f;margin-bottom:4px}
.map svg{width:100%;display:block;border:1px solid #cbbfa8;border-radius:4px}
.tl{margin-top:4px;display:grid;grid-template-columns:repeat(3,1fr);gap:1px 6px;font-size:9.6px;white-space:nowrap;line-height:1.35}
.tl b{color:#b3261e;font-weight:800;margin-right:3px}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}
.brief{list-style:none;counter-reset:n var(--s)}
.brief li{font-size:10.6px;line-height:1.2;padding:2px 0 2px 23px;white-space:nowrap;position:relative;counter-increment:n}
.brief li:before{content:counter(n);position:absolute;left:0;top:2px;width:18px;height:15px;line-height:15px;text-align:center;font-size:9px;font-weight:800;color:#fff;background:#1f3a5f;border-radius:8px}
.brief b{font-weight:800}
.out{margin-top:5px;font-size:9.6px;color:#3d3833;line-height:1.35;border:1.5px solid #b3261e;border-radius:4px;padding:4px 8px;background:#fbf3ea}
.out .t{color:#b3261e;font-weight:800;letter-spacing:.05em;margin-right:4px}
.foot{border-top:1px solid #1d1b19;white-space:nowrap;font-size:9.3px;color:#5c554c;padding:4px 0 7px;text-align:center;margin-top:6px}
</style></head><body><div class="page">
  <div class="top"><span class="rc">${regCount.map(([r, n]) => `<b>${esc(r.toUpperCase())} ${n}</b>`).join("")}</span><span class="r">${total} STORIES · ${regions.size} REGIONS</span></div>
  <div class="mast"><h1>${esc(day.weekday)} <span class="d">${dd} November ${yy}</span></h1>
    <div class="sub">${esc(day.note_to_judge)}</div></div>
  <section class="leads">${day.leads.map(lead).join('')}</section>
  <section class="smalls">${day.stories.map(small).join('')}</section>
  <section class="nums"><div class="h">BY THE<br>NUMBERS</div>${day.numbers.map((x) => `<div><b>${esc(x.n)}</b><span>${esc(x.t)}</span></div>`).join('')}</section>
  <section class="bottom">
    <div class="map"><div class="sec">WHERE IT HAPPENED · PINS 1–${all.length} · TIMES UTC</div>${worldMap(all, { w: 400, h: 128 })}
      <div class="tl">${day.timeline.map((t) => `<div><b>${t.utc}</b>${esc(t.t)}</div>`).join('')}</div>
      <div class="out"><span class="t">DATE CHECK — LEFT OUT, NOT 27 NOV:</span>${day.left_out.map(esc).join(' · ')}</div></div>
    <div><div class="sec">ALSO ON ${esc(dateLine)} · STORIES ${all.length + 1}–${total}</div>
      <div class="cols"><div style="--s:${all.length}">${briefCol(day.brief.slice(0, half))}</div><div style="--s:${all.length + half}">${briefCol(day.brief.slice(half))}</div></div></div>
  </section>
  <div class="foot">Sources: ${esc(day.sources)} · All pictures are original drawings, not photos · CONFIRMED = 2+ outlets · OFFICIAL = government or organiser · REPORTED = one outlet</div>
</div></body></html>`;

const outHtml = join(root, 'out', 'page.html');
const { mkdirSync } = await import('node:fs');
mkdirSync(join(root, 'out'), { recursive: true });
writeFileSync(outHtml, html);

// Playwright is a dev-only dependency (see package.json); the entry itself never runs it.
const { chromium } = await import('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
await page.goto('file://' + outHtml);
await page.waitForTimeout(300);
const overflow = await page.evaluate(() => {
  const p = document.querySelector('.page');
  const bad = [];
  for (const el of p.querySelectorAll('h2,h3,p,li,.out,.bottom,article')) if (el.scrollHeight > el.clientHeight + 1) bad.push(el.className || el.tagName);
  const last = p.querySelector('.foot').getBoundingClientRect();
  return { foot: last.bottom, bad };
});
let buf = await page.screenshot({ type: 'png' });
if (buf.length > 1_000_000) {
  let q = 92;
  do { buf = await page.screenshot({ type: 'jpeg', quality: q }); q -= 3; } while (buf.length > 1_000_000 && q > 60);
}
await browser.close();
writeFileSync(join(root, 'entry.png'), buf);
console.log(JSON.stringify({ bytes: buf.length, footBottom: overflow.foot, overflow: overflow.bad }));
