// Flat SVG sketches for the illustrated stories, one per `sketch` name in day.mjs.
// Every sketch draws on a 300 x 130 board. Simple shapes and symbols only: no photos and
// no faces, so no drawing can be mistaken for a picture of the actual event.

const C = {
  ink: '#1c1a18', red: '#b1271f', navy: '#1e3b60', cream: '#f4ecdc', gold: '#d6a417',
  green: '#3d7738', steel: '#6e7782', sea: '#5d8db1', dusk: '#172438', paper: '#fffaf0',
};

const board = (bg, inner) =>
  `<svg viewBox="0 0 300 130" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="130" fill="${bg}"/>${inner}</svg>`;

const label = (x, y, size, colour, text, weight = 800) =>
  `<text x="${x}" y="${y}" font-family="Noto Sans" font-size="${size}" font-weight="${weight}" fill="${colour}" text-anchor="middle">${text}</text>`;

const ring = (n, cx, cy, rx, ry, draw) =>
  Array.from({ length: n }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    return draw(cx + rx * Math.cos(t), cy + ry * Math.sin(t), i);
  }).join('');

const puff = (x, y, k = 1) =>
  [0, 1, 2, 3].map((i) => `<circle cx="${x + i * 14 * k}" cy="${y - i * 12 * k}" r="${(12 + i * 4) * k}" fill="#55514c" opacity="${0.8 - i * 0.15}"/>`).join('');

const sketches = {
  // EU summit: an oval table, ring of gold dots, empty chairs pushed back.
  council: () => board(C.navy,
    ring(16, 150, 66, 122, 50, (x, y) => `<rect x="${(x - 7).toFixed(1)}" y="${(y - 6).toFixed(1)}" width="14" height="12" rx="3" fill="#9aa5b6"/>`) +
    `<ellipse cx="150" cy="66" rx="98" ry="40" fill="#d9c69e" stroke="#9e8656" stroke-width="3"/>` +
    `<circle cx="150" cy="66" r="31" fill="${C.navy}"/>` +
    ring(12, 150, 66, 23, 23, (x, y) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="${C.gold}"/>`) +
    label(150, 71, 12, '#fff', 'NO DEAL')),

  // Oil: a barrel, a tanker on the horizon, a price flag.
  barrel: () => board('#efe6d3',
    `<rect y="96" width="300" height="34" fill="${C.sea}"/>` +
    `<path d="M170 92 h104 l-10 14 h-88 z" fill="#3a3f46"/><rect x="236" y="80" width="22" height="12" fill="#3a3f46"/>` +
    `<rect x="40" y="26" width="72" height="96" rx="9" fill="#2a323c"/>` +
    `<rect x="40" y="52" width="72" height="5" fill="#56626f"/><rect x="40" y="88" width="72" height="5" fill="#56626f"/>` +
    `<path d="M130 30 h82 l14 18 l-14 18 h-82 z" fill="${C.gold}"/>` + label(170, 55, 20, C.ink, '$96')),

  // Election: ballot box with a ticked slip and a seat bar 65 of 130.
  ballot: () => board('#e6edf4',
    `<rect x="40" y="58" width="96" height="58" fill="${C.navy}"/><rect x="70" y="54" width="36" height="6" fill="#0e1c30"/>` +
    `<rect x="74" y="16" width="28" height="40" fill="#fff" stroke="${C.ink}" stroke-width="2"/>` +
    `<path d="M81 36 l6 7 l10 -13" stroke="${C.green}" stroke-width="4" fill="none"/>` +
    Array.from({ length: 13 }, (_, i) => `<rect x="${158 + i * 10}" y="58" width="8" height="26" fill="${i < 6 ? C.navy : i === 6 ? C.gold : '#b9c3cf'}"/>`).join('') +
    label(222, 106, 14, C.ink, '65 / 130')),

  // Military drill: coastline, a chain of small boats making a bridge, two grey ships.
  bridge: () => board('#c3d7e6',
    `<path d="M0 0 h300 v22 q-50 12 -100 2 q-60 -12 -110 6 q-50 12 -90 0 z" fill="#8cad79"/>` +
    `<rect y="104" width="300" height="26" fill="#6d93b0"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${70 + i * 22}" y="${34 + i * 8}" width="20" height="8" rx="2" fill="#69727d"/>`).join('') +
    `<path d="M16 100 h74 l-9 11 h-58 z" fill="#58616b"/><rect x="38" y="90" width="22" height="10" fill="#58616b"/>` +
    `<path d="M206 106 h80 l-9 11 h-64 z" fill="#58616b"/><rect x="230" y="96" width="24" height="10" fill="#58616b"/>` +
    label(250, 60, 13, C.navy, '800 m')),

  // Ferry accident: hull against a pier, impact lines, first-aid sign.
  ferry: () => board('#a4c4da',
    `<rect y="94" width="300" height="36" fill="${C.sea}"/>` +
    `<rect x="196" y="62" width="98" height="38" fill="#8b9097" stroke="${C.ink}" stroke-width="2"/>` +
    `<path d="M18 80 h152 l20 11 l-10 13 h-156 z" fill="#fff" stroke="${C.ink}" stroke-width="2"/>` +
    `<rect x="40" y="64" width="104" height="16" rx="3" fill="#2f6a8f"/>` +
    [52, 70, 88, 106, 124].map((x) => `<rect x="${x}" y="68" width="12" height="8" fill="#d4e4f1"/>`).join('') +
    `<path d="M186 74 l8 -10 M194 84 l12 -4 M188 98 l12 6" stroke="${C.gold}" stroke-width="3"/>` +
    `<rect x="222" y="28" width="40" height="26" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="2"/>` +
    `<rect x="238" y="32" width="8" height="18" fill="${C.red}"/><rect x="233" y="37" width="18" height="8" fill="${C.red}"/>`),

  // Gaza: a low skyline under smoke at night, a hospital sign.
  gaza: () => board(C.dusk,
    `<circle cx="252" cy="26" r="11" fill="#e3dcc1"/>` +
    `<rect y="112" width="300" height="18" fill="#2b3446"/>` +
    [[8, 76, 44], [56, 88, 36], [96, 70, 40], [140, 92, 50], [196, 80, 38], [238, 90, 56]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${112 - y}" fill="#34425a"/>`).join('') +
    puff(110, 62) + puff(200, 70, 0.8) +
    `<rect x="18" y="86" width="24" height="18" fill="#fff"/><rect x="27" y="88" width="6" height="14" fill="${C.red}"/><rect x="22" y="92" width="16" height="6" fill="${C.red}"/>`),

  // Prices: rising columns with an arrow.
  bars: () => board('#fbf8f1',
    [0, 1, 2, 3].map((i) => `<line x1="20" y1="${24 + i * 26}" x2="290" y2="${24 + i * 26}" stroke="#ded8cc"/>`).join('') +
    [34, 40, 38, 52, 60, 74, 88].map((h, i) => `<rect x="${30 + i * 36}" y="${114 - h}" width="24" height="${h}" fill="${i === 6 ? C.red : '#8fa7c0'}"/>`).join('') +
    `<path d="M40 70 L250 18" stroke="${C.green}" stroke-width="4"/><path d="M242 10 l18 4 l-12 14 z" fill="${C.green}"/>`),

  // Cyberattack: screen with an offline banner and a padlock.
  hack: () => board('#1d2633',
    `<rect x="26" y="16" width="176" height="98" rx="6" fill="#2e3a4a" stroke="#8d9fb4" stroke-width="2"/>` +
    `<rect x="36" y="26" width="156" height="17" fill="${C.red}"/>` + label(114, 39, 11, '#fff', 'OFFLINE') +
    [52, 62, 72, 82, 92].map((y, i) => `<rect x="40" y="${y}" width="${146 - i * 20}" height="5" fill="#71859b"/>`).join('') +
    `<rect x="218" y="58" width="54" height="46" rx="6" fill="${C.gold}"/>` +
    `<path d="M229 58 v-13 a16 16 0 0 1 32 0 v13" fill="none" stroke="${C.gold}" stroke-width="8"/>` +
    `<circle cx="245" cy="78" r="6" fill="${C.ink}"/><rect x="242" y="80" width="6" height="14" fill="${C.ink}"/>`),

  // Nuclear plant: cooling tower, dome, a pylon with two cut lines, "0 of 2".
  plant: () => board('#ebe5d9',
    `<rect y="112" width="300" height="18" fill="#b6ad9c"/>` +
    `<path d="M30 112 q12 -42 0 -82 h62 q-12 40 0 82 z" fill="#cdc7bb" stroke="${C.ink}" stroke-width="2"/>` +
    `<path d="M112 112 v-38 a36 36 0 0 1 72 0 v38 z" fill="#e2ddd1" stroke="${C.ink}" stroke-width="2"/>` +
    `<path d="M214 112 l14 -84 l14 84 M218 50 h20 M216 70 h24" stroke="${C.ink}" stroke-width="3" fill="none"/>` +
    `<path d="M242 50 l20 -4 M268 44 l20 -4 M242 70 l20 -2 M268 66 l20 -2" stroke="${C.red}" stroke-width="3"/>` +
    label(268, 88, 15, C.red, '0 of 2', 900)),

  // Defence pact: a signed paper between three flag blocks.
  pact: () => board('#e7edf2',
    `<rect x="22" y="104" width="256" height="10" fill="#87674a"/>` +
    `<rect x="104" y="22" width="92" height="80" fill="#fff" stroke="${C.ink}" stroke-width="2"/>` +
    [36, 48, 60, 72].map((y) => `<line x1="116" y1="${y}" x2="184" y2="${y}" stroke="#a9a39a" stroke-width="3"/>`).join('') +
    `<path d="M120 90 q12 -12 22 0 t24 -2" stroke="${C.navy}" stroke-width="3" fill="none"/>` +
    `<rect x="28" y="40" width="54" height="36" fill="${C.red}"/><circle cx="50" cy="58" r="9" fill="#fff"/><circle cx="54" cy="58" r="7" fill="${C.red}"/>` +
    `<rect x="218" y="22" width="54" height="34" fill="#1d6b3a"/><rect x="218" y="62" width="54" height="34" fill="#0f5c35"/><rect x="218" y="62" width="14" height="34" fill="#fff"/>`),

  // Drone claims: night sky with falling drones and tracer lines.
  drones: () => board(C.dusk,
    `<rect y="110" width="300" height="20" fill="#26324a"/>` +
    [[40, 30], [100, 52], [170, 24], [230, 46], [270, 20]].map(([x, y]) => `<g transform="translate(${x} ${y}) rotate(25)"><rect x="-10" y="-2" width="20" height="4" fill="#c9ced8"/><rect x="-3" y="-8" width="6" height="16" fill="#c9ced8"/></g>`).join('') +
    `<path d="M20 110 L90 50 M150 110 L170 30 M260 110 L232 52" stroke="#f2c46e" stroke-width="2" stroke-dasharray="5 5"/>` +
    `<rect x="110" y="78" width="80" height="24" rx="3" fill="${C.red}"/>` + label(150, 95, 14, '#fff', '343?')),

  // Return flight: plane climbing over clouds with a calendar leaf "16 DEC".
  flight: () => board('#cfe0f0',
    `<circle cx="50" cy="104" r="20" fill="#fff"/><circle cx="80" cy="108" r="16" fill="#fff"/><circle cx="220" cy="100" r="18" fill="#fff"/>` +
    `<g transform="rotate(-14 150 60)"><path d="M60 62 L238 54 L258 58 L238 64 L60 70 z" fill="#fbfbfb" stroke="#7b8796" stroke-width="2"/>` +
    `<path d="M140 60 L172 28 L186 28 L164 60 z" fill="#d1d8df"/><path d="M60 64 L48 42 L60 42 L76 64 z" fill="#1d6b3a"/></g>` +
    `<rect x="226" y="16" width="56" height="44" fill="#fff" stroke="${C.ink}" stroke-width="2"/><rect x="226" y="16" width="56" height="12" fill="${C.red}"/>` +
    label(254, 52, 18, C.ink, '16') + label(254, 26, 9, '#fff', 'DEC')),

  // Black Friday: shop window and a near-empty trolley.
  trolley: () => board('#f2e6d0',
    `<rect x="18" y="14" width="164" height="98" fill="#fff" stroke="${C.ink}" stroke-width="2"/>` +
    `<rect x="18" y="14" width="164" height="18" fill="${C.ink}"/>` + label(100, 28, 11, '#fff', 'BLACK FRIDAY') +
    `<path d="M56 48 h62 l14 18 l-14 18 h-62 z" fill="${C.red}"/>` + label(90, 72, 20, '#fff', 'SALE', 900) +
    `<path d="M196 48 h14 l12 46 h52 l10 -32 h-66" fill="none" stroke="${C.ink}" stroke-width="4"/>` +
    `<rect x="236" y="72" width="22" height="16" fill="${C.navy}"/>` +
    `<circle cx="230" cy="106" r="7" fill="${C.ink}"/><circle cx="266" cy="106" r="7" fill="${C.ink}"/>`),
};

// Unknown names fall back to a plain globe so a typo never breaks the page.
const globe = () => board('#e3ebf2',
  `<circle cx="150" cy="65" r="48" fill="#8db5d4" stroke="${C.navy}" stroke-width="3"/>` +
  `<ellipse cx="150" cy="65" rx="20" ry="48" fill="none" stroke="${C.navy}" stroke-width="2"/>` +
  `<line x1="102" y1="65" x2="198" y2="65" stroke="${C.navy}" stroke-width="2"/>`);

export const sketch = (name) => (sketches[name] || globe)();
export const sketchNames = Object.keys(sketches);
