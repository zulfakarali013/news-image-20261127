// Drawn pictures for the news image: each story names an "art" kind, and each kind is a
// small flat illustration in SVG, drawn on a 300x130 canvas (the shapes scale to any box).
// Plain shapes only, no photographs and no people's faces, so nothing pretends to be a
// real photo of the event.

const ink = '#1d1b19';
const red = '#b3261e';
const navy = '#1f3a5f';
const sand = '#e9dcc3';
const sky = '#cfdff0';
const night = '#16233a';
const grass = '#3f7a3a';
const gold = '#d9a514';

const frame = (bg, body) =>
  `<svg viewBox="0 0 300 130" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="130" fill="${bg}"/>${body}</svg>`;

const star = (cx, cy, r, fill) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
};

const flames = (x, y, s) =>
  `<path d="M${x} ${y} q${-12 * s} ${-22 * s} ${2 * s} ${-44 * s} q${2 * s} ${16 * s} ${12 * s} ${18 * s} q${4 * s} ${-14 * s} ${14 * s} ${-24 * s} q${8 * s} ${30 * s} ${-4 * s} ${50 * s} z" fill="#f08a24"/>` +
  `<path d="M${x + 6 * s} ${y} q${-6 * s} ${-12 * s} ${2 * s} ${-24 * s} q${4 * s} ${10 * s} ${10 * s} ${10 * s} q${4 * s} ${8 * s} ${-2 * s} ${14 * s} z" fill="#ffd34d"/>`;

const smoke = (x, y) =>
  [0, 1, 2].map((i) => `<circle cx="${x + i * 18}" cy="${y - i * 14}" r="${14 + i * 5}" fill="#4a4743" opacity="${0.85 - i * 0.2}"/>`).join('');

export const ART = {
  // A round table seen from above with EU stars and twelve chairs.
  summit: () => {
    let s = '';
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      s += star(150 + 44 * Math.cos(a), 65 + 44 * Math.sin(a), 6, gold);
    }
    let chairs = '';
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      chairs += `<rect x="${(150 + 118 * Math.cos(a) - 7).toFixed(1)}" y="${(65 + 52 * Math.sin(a) - 6).toFixed(1)}" width="14" height="12" rx="3" fill="#8a96a8"/>`;
    }
    return frame('#22406e', `${chairs}<ellipse cx="150" cy="65" rx="100" ry="42" fill="#d8c7a3" stroke="#a88f62" stroke-width="3"/><circle cx="150" cy="65" r="30" fill="#22406e"/>${s}<text x="150" y="70" font-family="Noto Sans" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">EU 27</text>`);
  },
  // Stacked shipping containers on a quay, one stamped with a percent sign.
  containers: () => {
    const cols = ['#b3261e', '#1f3a5f', '#3f7a3a', '#d9a514', '#6b4c9a', '#c45a1a'];
    let s = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
      const x = 30 + c * 50 + (r % 2) * 10, y = 92 - r * 26;
      s += `<rect x="${x}" y="${y}" width="46" height="24" fill="${cols[(r * 5 + c) % 6]}"/>`;
      for (let k = 1; k < 5; k++) s += `<line x1="${x + k * 9.2}" y1="${y + 3}" x2="${x + k * 9.2}" y2="${y + 21}" stroke="#000" stroke-opacity=".25"/>`;
    }
    return frame(sky, `<rect y="116" width="300" height="14" fill="#555"/>${s}<rect x="210" y="14" width="74" height="40" rx="6" fill="#fff" stroke="${red}" stroke-width="4"/><text x="247" y="44" font-family="Noto Sans" font-size="26" font-weight="800" fill="${red}" text-anchor="middle">%</text>`);
  },
  // A missile trail over a night skyline with a burning low building.
  missile: () => frame(night,
    `<circle cx="250" cy="28" r="12" fill="#e8e2c8"/>` +
    `<path d="M20 20 Q120 10 175 72" stroke="#f3c26b" stroke-width="3" fill="none" stroke-dasharray="6 5"/>` +
    `<rect x="10" y="80" width="40" height="50" fill="#2c3a52"/><rect x="58" y="62" width="34" height="68" fill="#33445f"/><rect x="230" y="70" width="60" height="60" fill="#2c3a52"/>` +
    `<rect x="120" y="92" width="100" height="38" fill="#3b4b66"/><text x="170" y="116" font-family="Noto Sans" font-size="11" font-weight="700" fill="#cfd6e3" text-anchor="middle">MALL</text>` +
    smoke(150, 70) + flames(178, 96, 0.8)),
  // A wing over clouds with a red cross: flights grounded.
  plane: () => frame(sky,
    `<circle cx="60" cy="96" r="22" fill="#fff"/><circle cx="90" cy="100" r="18" fill="#fff"/><circle cx="230" cy="40" r="16" fill="#fff"/>` +
    `<path d="M40 70 L250 60 L270 64 L250 70 L40 76 z" fill="#fafafa" stroke="#7a8796" stroke-width="2"/><path d="M130 66 L170 30 L184 30 L160 66 z" fill="#d1d7de"/><path d="M130 72 L172 108 L186 108 L160 72 z" fill="#d1d7de"/><path d="M40 70 L28 46 L40 46 L56 70 z" fill="${red}"/>` +
    `<line x1="200" y1="88" x2="236" y2="124" stroke="${red}" stroke-width="7"/><line x1="236" y1="88" x2="200" y2="124" stroke="${red}" stroke-width="7"/>`),
  // A lit candle with a ring of light.
  candle: () => frame('#2a1f2e',
    `<circle cx="150" cy="44" r="40" fill="#f6d27a" opacity=".16"/><circle cx="150" cy="44" r="24" fill="#f6d27a" opacity=".25"/>` +
    `<path d="M150 22 q-10 16 0 30 q10 -14 0 -30 z" fill="#ffcc4d"/><rect x="138" y="54" width="24" height="64" fill="#f4efe4"/><rect x="100" y="118" width="100" height="12" fill="#5a4636"/>`),
  // Placards over a crowd line.
  march: () => {
    let s = '';
    for (let i = 0; i < 16; i++) s += `<circle cx="${12 + i * 19}" cy="${104 - (i % 3) * 3}" r="9" fill="#5b4a3e"/>`;
    const signs = [[40, 'ÉTUDIANTS'], [140, 'FAC'], [228, 'BUDGET']];
    for (const [x, t] of signs) s += `<line x1="${x}" y1="60" x2="${x}" y2="98" stroke="#5b4a3e" stroke-width="3"/><rect x="${x - 34}" y="30" width="68" height="32" fill="#fff" stroke="${ink}" stroke-width="2"/><text x="${x}" y="51" font-family="Noto Sans" font-size="11" font-weight="800" fill="${red}" text-anchor="middle">${t}</text>`;
    return frame('#dfe7ef', `<rect y="108" width="300" height="22" fill="#9aa3ab"/>${s}`);
  },
  // A chessboard corner with a king and a pawn.
  chess: () => {
    let s = '';
    for (let r = 0; r < 5; r++) for (let c = 0; c < 10; c++) s += `<rect x="${c * 30}" y="${r * 26}" width="30" height="26" fill="${(r + c) % 2 ? '#7a5a3a' : '#e8d6b5'}"/>`;
    return frame('#e8d6b5', `${s}<path d="M130 112 h40 l-6 -12 h-28 z M138 100 q-4 -30 12 -40 q16 10 12 40 z" fill="#f7f3ea" stroke="${ink}" stroke-width="2"/><rect x="146" y="44" width="8" height="18" fill="#f7f3ea" stroke="${ink}" stroke-width="2"/><circle cx="216" cy="78" r="10" fill="${ink}"/><path d="M204 112 h24 l-4 -22 h-16 z" fill="${ink}"/>`);
  },
  // A roast turkey on a platter beside a closed shutter.
  turkey: () => frame('#f3e7d2',
    `<rect x="20" y="20" width="110" height="90" fill="#6d7780"/>${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="20" y1="${30 + i * 14}" x2="130" y2="${30 + i * 14}" stroke="#4a535b" stroke-width="3"/>`).join('')}<text x="75" y="70" font-family="Noto Sans" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">CLOSED</text>` +
    `<ellipse cx="215" cy="104" rx="70" ry="14" fill="#fff" stroke="#c9b48e" stroke-width="2"/><ellipse cx="215" cy="84" rx="48" ry="28" fill="#b8682e"/><ellipse cx="205" cy="76" rx="22" ry="10" fill="#d98a48"/><rect x="258" y="70" width="16" height="8" rx="4" fill="#b8682e"/>`),
  // A burnt-out tanker on a ring road with smoke.
  fire: () => frame('#2b2422',
    `<rect y="98" width="300" height="32" fill="#3a3a3a"/><line x1="0" y1="114" x2="300" y2="114" stroke="#d9c25a" stroke-width="2" stroke-dasharray="14 10"/>` +
    smoke(120, 50) + `<rect x="70" y="70" width="130" height="30" rx="14" fill="#1e1e1e"/><rect x="200" y="74" width="38" height="26" fill="#1e1e1e"/><circle cx="96" cy="102" r="9" fill="#111"/><circle cx="176" cy="102" r="9" fill="#111"/><circle cx="222" cy="102" r="9" fill="#111"/>` +
    flames(110, 74, 0.9) + flames(150, 76, 0.7)),
  // A refinery skyline with a smoke plume (used for Gulf energy stories).
  refinery: () => frame(sand,
    `<rect y="104" width="300" height="26" fill="#6d5a45"/>${[30, 70, 230].map((x) => `<rect x="${x}" y="40" width="16" height="66" fill="#4a4540"/>`).join('')}<rect x="110" y="70" width="90" height="36" fill="#5a544d"/><circle cx="140" cy="70" r="18" fill="#5a544d"/><circle cx="178" cy="70" r="18" fill="#5a544d"/>` + smoke(36, 30)),
  // A falling line chart.
  chartdown: () => frame('#fbfaf7',
    `${[0, 1, 2, 3].map((i) => `<line x1="20" y1="${20 + i * 28}" x2="290" y2="${20 + i * 28}" stroke="#ddd"/>`).join('')}<polyline points="20,30 70,40 110,34 150,62 200,70 240,96 280,112" fill="none" stroke="${red}" stroke-width="5"/><path d="M262 92 l26 22 l-30 4 z" fill="${red}"/>`),
  // A rising line chart.
  chartup: () => frame('#fbfaf7',
    `${[0, 1, 2, 3].map((i) => `<line x1="20" y1="${20 + i * 28}" x2="290" y2="${20 + i * 28}" stroke="#ddd"/>`).join('')}<polyline points="20,110 70,100 110,104 150,76 200,70 240,44 280,26" fill="none" stroke="${grass}" stroke-width="5"/><path d="M262 30 l26 -10 l-6 28 z" fill="${grass}"/>`),
  // A rocket climbing from a pad.
  rocket: () => frame(night,
    `${[[30, 20], [80, 50], [240, 30], [270, 80], [200, 15]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join('')}<rect y="116" width="300" height="14" fill="#2f3b4d"/><path d="M150 18 q12 16 12 48 v26 h-24 v-26 q0 -32 12 -48 z" fill="#eef1f5"/><path d="M138 92 l-10 14 h10 z M162 92 l10 14 h-10 z" fill="${red}"/>` + flames(144, 128, 0.5)),
  // A ballot box.
  ballot: () => frame('#e7eef5',
    `<rect x="100" y="60" width="100" height="60" fill="${navy}"/><rect x="130" y="56" width="40" height="6" fill="#0d1d33"/><rect x="134" y="20" width="32" height="42" fill="#fff" stroke="${ink}" stroke-width="2"/><path d="M142 40 l6 7 l12 -14" stroke="${grass}" stroke-width="4" fill="none"/>`),
  // A courtroom gavel.
  gavel: () => frame('#efe6d6',
    `<rect x="60" y="104" width="180" height="14" fill="#6b4a2b"/><rect x="104" y="40" width="70" height="26" rx="6" fill="#7a5230" transform="rotate(-24 139 53)"/><rect x="150" y="56" width="90" height="10" fill="#7a5230" transform="rotate(-24 150 61)"/><rect x="120" y="92" width="60" height="12" fill="#7a5230"/>`),
  // Waves with a drop gauge: floods or storms.
  flood: () => frame('#9fb7c9',
    `<rect x="40" y="50" width="70" height="50" fill="#d9cdb8"/><path d="M34 50 l41 -28 l41 28 z" fill="${red}"/>` +
    [0, 1, 2].map((i) => `<path d="M0 ${96 + i * 12} q25 -10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="#2f5d80" stroke-width="5"/>`).join('')),
  // A cracked seismograph line.
  quake: () => frame('#f2ece1',
    `<polyline points="0,70 60,70 75,40 90,100 105,24 120,110 135,50 150,80 165,66 300,66" fill="none" stroke="${red}" stroke-width="4"/><path d="M40 128 l30 -20 l16 10 l30 -24" stroke="#6b5a45" stroke-width="3" fill="none"/>`),
  // A football pitch from above with a ball.
  football: () => frame(grass,
    `<rect x="10" y="10" width="280" height="110" fill="none" stroke="#fff" stroke-width="3"/><line x1="150" y1="10" x2="150" y2="120" stroke="#fff" stroke-width="3"/><circle cx="150" cy="65" r="22" fill="none" stroke="#fff" stroke-width="3"/><circle cx="200" cy="80" r="9" fill="#fff" stroke="${ink}" stroke-width="2"/>`),
  // An oil barrel with a price tag.
  oil: () => frame('#efe9dc',
    `<rect x="90" y="30" width="70" height="90" rx="8" fill="#26303b"/><rect x="90" y="56" width="70" height="6" fill="#4a5665"/><rect x="90" y="88" width="70" height="6" fill="#4a5665"/><path d="M180 50 h70 l14 16 l-14 16 h-70 z" fill="${gold}"/><text x="220" y="72" font-family="Noto Sans" font-size="16" font-weight="800" fill="${ink}" text-anchor="middle">$/bbl</text>`),
  // Two hands shaking over a table: a deal or a treaty.
  deal: () => frame('#e8eef3',
    `<rect x="20" y="96" width="260" height="10" fill="#8a6a48"/><path d="M60 70 h70 l20 10 l-20 10 h-70 z" fill="#c9a27a"/><path d="M240 70 h-70 l-20 10 l20 10 h70 z" fill="#8f6a4a"/><rect x="40" y="66" width="24" height="28" fill="${navy}"/><rect x="236" y="66" width="24" height="28" fill="${red}"/>`),
  // A dove: peace, ceasefire, anniversary of a peace deal.
  dove: () => frame('#d8e8f3',
    `<path d="M80 80 q40 -50 110 -30 q-30 6 -40 20 q50 0 80 -20 q-20 50 -90 50 q-40 0 -60 -20 z" fill="#fff" stroke="#8aa0b4" stroke-width="2"/><path d="M228 50 l16 4 l-16 6 z" fill="${gold}"/><path d="M236 70 q20 10 34 4" stroke="${grass}" stroke-width="4" fill="none"/>`),
  // A tethered parade balloon straining in wind and rain over a city street.
  storm: () => frame('#3b4a5c',
    [20, 60, 100, 140, 180, 220, 260].map((x, i) => `<line x1="${x}" y1="${(i * 7) % 20}" x2="${x - 14}" y2="${30 + (i * 7) % 20}" stroke="#9fb3c8" stroke-width="2"/>`).join('') +
    [10, 50, 90, 130, 170, 210, 250, 290].map((x, i) => `<line x1="${x}" y1="${60 + (i * 11) % 30}" x2="${x - 10}" y2="${80 + (i * 11) % 30}" stroke="#9fb3c8" stroke-width="2"/>`).join('') +
    `<rect x="0" y="70" width="40" height="60" fill="#26313f"/><rect x="250" y="56" width="50" height="74" fill="#26313f"/><rect x="40" y="88" width="34" height="42" fill="#2e3a4a"/><rect x="216" y="84" width="34" height="46" fill="#2e3a4a"/>` +
    `<rect y="118" width="300" height="12" fill="#1c242e"/>` +
    `<path d="M120 112 L150 74 M180 112 L158 74 M150 116 L154 76" stroke="#d9d2c2" stroke-width="1.5"/>` +
    `<ellipse cx="172" cy="44" rx="40" ry="26" fill="${red}" transform="rotate(-22 172 44)"/><circle cx="160" cy="36" r="5" fill="#fff"/><circle cx="182" cy="30" r="5" fill="#fff"/>` +
    `<path d="M224 24 h46 M230 34 h40 M226 44 h30" stroke="#e6edf4" stroke-width="3" stroke-linecap="round"/>` +
    `<rect x="14" y="28" width="64" height="22" rx="3" fill="${gold}"/><text x="46" y="44" font-family="Noto Sans" font-size="12" font-weight="800" fill="${ink}" text-anchor="middle">100th</text>`),
  // A space station with solar wings against stars, a small flag patch on one module.
  station: () => frame(night,
    `${[[20, 20], [60, 100], [110, 30], [240, 110], [280, 20], [200, 14], [30, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#fff"/>`).join('')}` +
    `<rect x="40" y="52" width="70" height="26" fill="#2d5d9a" stroke="#8fb0d8"/><rect x="190" y="52" width="70" height="26" fill="#2d5d9a" stroke="#8fb0d8"/>` +
    `<line x1="110" y1="65" x2="190" y2="65" stroke="#cfd6e3" stroke-width="4"/><rect x="122" y="54" width="56" height="22" rx="10" fill="#eef1f5"/><rect x="146" y="40" width="10" height="50" rx="5" fill="#dfe4ea"/>` +
    `<rect x="160" y="78" width="24" height="16" fill="#0b6b3a"/><circle cx="174" cy="86" r="4" fill="#fff"/><rect x="160" y="78" width="6" height="16" fill="#fff"/>`),
  // A sewing machine over folded garments with a rising wage arrow.
  garment: () => frame('#efe6d6',
    `<rect x="30" y="94" width="56" height="12" fill="#3f7a3a"/><rect x="34" y="82" width="48" height="12" fill="#1f3a5f"/><rect x="38" y="70" width="40" height="12" fill="${red}"/>` +
    `<path d="M110 106 h110 v-10 h-20 v-30 q0 -14 -14 -14 h-56 q-12 0 -12 12 v10 h22 v22 h-30 z" fill="#3a3a3a"/><rect x="150" y="96" width="4" height="14" fill="#888"/>` +
    `<path d="M236 96 L266 50" stroke="${grass}" stroke-width="7"/><path d="M256 44 l18 -4 l-4 18 z" fill="${grass}"/><text x="160" y="48" font-family="Noto Sans" font-size="18" font-weight="800" fill="${grass}" text-anchor="middle">+36%</text>`),
  // A small embassy with a closed gate and a suitcase: an office ordered shut.
  embassy: () => frame('#e3e8ee',
    `<rect y="112" width="300" height="18" fill="#9aa3ab"/><rect x="70" y="50" width="120" height="62" fill="#f4f1ea" stroke="${ink}" stroke-width="2"/><path d="M62 52 l68 -30 l68 30 z" fill="#d8d2c4" stroke="${ink}" stroke-width="2"/>` +
    `<rect x="82" y="64" width="12" height="40" fill="#cfc8b8"/><rect x="106" y="64" width="12" height="40" fill="#cfc8b8"/><rect x="142" y="64" width="12" height="40" fill="#cfc8b8"/><rect x="166" y="64" width="12" height="40" fill="#cfc8b8"/>` +
    `<line x1="210" y1="36" x2="210" y2="112" stroke="${ink}" stroke-width="3"/><rect x="212" y="36" width="36" height="26" fill="${red}"/><rect x="226" y="41" width="8" height="16" fill="#fff"/><rect x="222" y="45" width="16" height="8" fill="#fff"/>` +
    `<rect x="240" y="88" width="34" height="24" rx="3" fill="#6b4a2b"/><rect x="250" y="82" width="14" height="6" fill="none" stroke="#6b4a2b" stroke-width="3"/><text x="14" y="76" font-family="Noto Sans" font-size="20" font-weight="800" fill="${red}">48h</text>`),
  // A fast ferry with a dented bow against a floating dock, with an ambulance sign on the dock.
  ferry: () => frame('#9fc0d8',
    `<rect y="92" width="300" height="38" fill="#4f7fa3"/><rect x="190" y="60" width="104" height="40" fill="#8a8f96" stroke="${ink}" stroke-width="2"/><rect x="196" y="48" width="10" height="14" fill="#6d7278"/><rect x="278" y="48" width="10" height="14" fill="#6d7278"/>` +
    `<path d="M20 78 h150 l22 12 l-10 14 h-154 z" fill="#fff" stroke="${ink}" stroke-width="2"/><rect x="44" y="62" width="100" height="16" rx="3" fill="#6b4c9a"/><g fill="#cfe0ef">${[54, 72, 90, 108, 126].map((x) => `<rect x="${x}" y="66" width="12" height="8"/>`).join('')}</g>` +
    `<path d="M184 84 l8 4 l-4 6 l6 3" stroke="${red}" stroke-width="3" fill="none"/><path d="M178 72 l4 -10 M192 70 l8 -8 M188 98 l10 4" stroke="${gold}" stroke-width="3"/>` +
    `<rect x="218" y="30" width="44" height="22" rx="3" fill="#fff" stroke="${ink}" stroke-width="2"/><rect x="236" y="34" width="8" height="14" fill="${red}"/><rect x="233" y="37" width="14" height="8" fill="${red}"/>`),
  // A shop window with a big percent tag and a full shopping trolley.
  cart: () => frame('#f3e7d2',
    `<rect x="20" y="16" width="160" height="96" fill="#fff" stroke="${ink}" stroke-width="2"/><rect x="20" y="16" width="160" height="18" fill="${ink}"/><text x="100" y="30" font-family="Noto Sans" font-size="12" font-weight="800" fill="#fff" text-anchor="middle">BLACK FRIDAY</text>` +
    `<path d="M60 50 h60 l14 18 l-14 18 h-60 z" fill="${red}"/><text x="92" y="74" font-family="Noto Sans" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">SALE</text>` +
    `<path d="M196 50 h14 l12 46 h52 l10 -34 h-66" fill="none" stroke="${ink}" stroke-width="4"/><rect x="214" y="52" width="58" height="30" fill="${gold}"/><rect x="226" y="44" width="20" height="16" fill="${navy}"/><circle cx="230" cy="106" r="7" fill="${ink}"/><circle cx="266" cy="106" r="7" fill="${ink}"/>`),
  // Cooling tower and reactor dome with both power lines cut, a diesel generator running.
  nuclear: () => frame('#e9e4da',
    `<rect y="110" width="300" height="20" fill="#b9b1a2"/><path d="M40 110 q10 -40 0 -80 h60 q-10 40 0 80 z" fill="#cfcac0" stroke="${ink}" stroke-width="2"/>` +
    `<path d="M120 110 v-40 a34 34 0 0 1 68 0 v40 z" fill="#e4e0d6" stroke="${ink}" stroke-width="2"/><line x1="200" y1="110" x2="200" y2="30" stroke="${ink}" stroke-width="3"/><line x1="186" y1="40" x2="214" y2="40" stroke="${ink}" stroke-width="3"/>` +
    `<path d="M214 40 l26 -6 M240 34 l30 -8" stroke="${red}" stroke-width="3"/><text x="252" y="58" font-family="Noto Sans" font-size="14" font-weight="900" fill="${red}" text-anchor="middle">0 of 2</text>` +
    `<rect x="226" y="84" width="54" height="26" rx="3" fill="${gold}" stroke="${ink}" stroke-width="2"/><text x="253" y="102" font-family="Noto Sans" font-size="11" font-weight="800" fill="${ink}" text-anchor="middle">DIESEL</text>`),
  // A news wire terminal with a padlock and a red alert banner.
  lock: () => frame('#1e2733',
    `<rect x="30" y="18" width="170" height="96" rx="6" fill="#2f3b4b" stroke="#8fa3b8" stroke-width="2"/><rect x="40" y="28" width="150" height="16" fill="${red}"/><text x="115" y="40" font-family="Noto Sans" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">SERVICE OFFLINE</text>` +
    `<g fill="#6f8399">${[52, 62, 72, 82, 92].map((y, i) => `<rect x="44" y="${y}" width="${140 - i * 18}" height="5"/>`).join('')}</g>` +
    `<rect x="214" y="58" width="56" height="48" rx="6" fill="${gold}"/><path d="M226 58 v-14 a16 16 0 0 1 32 0 v14" fill="none" stroke="${gold}" stroke-width="8"/><circle cx="242" cy="80" r="6" fill="${ink}"/><rect x="239" y="82" width="6" height="14" fill="${ink}"/>`),
  // Grey warships and a landing bridge of linked small boats off a coast.
  drill: () => frame('#bcd3e4',
    `<path d="M0 30 q60 -10 110 6 q40 14 90 0 l100 -10 v-26 h-300 z" fill="#8fae7d"/><rect y="100" width="300" height="30" fill="#6f95b3"/>` +
    `<g fill="#6d7681">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${60 + i * 26}" y="${44 + i * 7}" width="22" height="9" rx="2"/>`).join('')}</g>` +
    `<path d="M20 96 h70 l-8 10 h-58 z M40 88 h22 v8 h-22 z" fill="#5d6670"/><path d="M200 102 h80 l-8 10 h-66 z M222 92 h26 v10 h-26 z" fill="#5d6670"/>`),
  // A generic newspaper globe for anything else.
  globe: () => frame('#e4ecf2',
    `<circle cx="150" cy="65" r="50" fill="#8fb7d6" stroke="${navy}" stroke-width="3"/><path d="M118 40 q20 -6 26 10 q-6 16 -24 12 z M156 60 q24 -10 34 8 q-10 22 -30 18 z" fill="${grass}"/><ellipse cx="150" cy="65" rx="22" ry="50" fill="none" stroke="${navy}" stroke-width="2"/><line x1="100" y1="65" x2="200" y2="65" stroke="${navy}" stroke-width="2"/>`),
};

export function art(kind) {
  return (ART[kind] || ART.globe)();
}
