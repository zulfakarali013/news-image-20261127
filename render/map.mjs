// A small world map for the "where it happened" strip: coarse continent outlines in
// longitude/latitude (hand-placed points, accurate to a few degrees, which is enough at
// this size), drawn in an equirectangular projection, with a numbered pin per story.

const LAND = {
  northAmerica: [[-168, 66], [-140, 70], [-110, 72], [-85, 70], [-62, 60], [-56, 52], [-66, 45], [-76, 38], [-81, 31], [-80, 25], [-90, 29], [-97, 26], [-97, 20], [-87, 21], [-83, 10], [-78, 8], [-86, 13], [-105, 20], [-112, 29], [-118, 34], [-124, 41], [-124, 48], [-133, 56], [-150, 60], [-165, 60]],
  greenland: [[-55, 82], [-30, 83], [-20, 75], [-40, 64], [-50, 62], [-58, 74]],
  southAmerica: [[-80, 8], [-60, 10], [-50, 2], [-35, -6], [-39, -16], [-48, -26], [-58, -38], [-66, -46], [-72, -54], [-75, -45], [-72, -30], [-70, -18], [-81, -6]],
  europe: [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [2, 51], [6, 54], [8, 57], [5, 61], [12, 66], [22, 70], [30, 70], [40, 66], [40, 48], [30, 46], [28, 41], [23, 37], [19, 41], [12, 44], [15, 38], [9, 44], [3, 42], [-1, 37]],
  britain: [[-6, 50], [2, 51], [-1, 54], [-3, 59], [-6, 57]],
  africa: [[-17, 21], [-10, 31], [-1, 36], [11, 37], [20, 31], [32, 31], [35, 28], [43, 12], [51, 11], [40, -3], [40, -15], [35, -24], [27, -34], [19, -35], [12, -18], [13, -6], [9, 4], [-8, 4], [-17, 14]],
  asia: [[40, 66], [60, 70], [80, 73], [105, 78], [140, 72], [170, 70], [180, 66], [165, 60], [155, 58], [140, 54], [135, 44], [128, 38], [121, 31], [122, 25], [110, 21], [106, 10], [100, 14], [101, 3], [98, 8], [92, 22], [80, 15], [78, 8], [72, 20], [66, 25], [57, 26], [52, 17], [44, 12], [36, 28], [35, 36], [27, 40], [40, 42], [48, 40], [52, 46], [40, 48]],
  japan: [[130, 31], [140, 35], [142, 40], [145, 44], [141, 45], [139, 38], [131, 34]],
  indonesia: [[95, 5], [106, -6], [116, -8], [125, -9], [141, -9], [140, -3], [125, 1], [118, 5], [109, 2], [104, -2]],
  australia: [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -26], [150, -37], [141, -38], [131, -31], [116, -35], [114, -28]],
  newZealand: [[172, -34], [178, -38], [174, -42], [168, -46], [171, -42]],
};

export function worldMap(pins, { w = 600, h = 230, lonMin = -170, lonMax = 190, latMax = 78, latMin = -50 } = {}) {
  const x = (lon) => (((lon < lonMin ? lon + 360 : lon) - lonMin) / (lonMax - lonMin)) * w;
  const y = (lat) => ((latMax - lat) / (latMax - latMin)) * h;
  const land = Object.values(LAND)
    .map((pts) => `<polygon points="${pts.map(([lo, la]) => `${x(lo).toFixed(1)},${y(la).toFixed(1)}`).join(' ')}" fill="#cbbf9f" stroke="#a89a78" stroke-width="1"/>`)
    .join('');
  const grid = [-30, 0, 30, 60].map((la) => `<line x1="0" y1="${y(la).toFixed(1)}" x2="${w}" y2="${y(la).toFixed(1)}" stroke="#b9cbdb" stroke-width="${la === 0 ? 1.2 : 0.6}"/>`).join('');
  // Push apart pins that would overlap (several stories share a city or a region).
  const pos = pins.map((p) => [x(p.lon), y(p.lat)]);
  for (let it = 0; it < 60; it++) for (let i = 0; i < pos.length; i++) for (let j = 0; j < i; j++) {
    const dx = pos[i][0] - pos[j][0], dy = pos[i][1] - pos[j][1], d = Math.hypot(dx, dy) || 0.01;
    if (d < 19) { const k = (19 - d) / 2 / d; pos[i][0] += dx * k + (d < 0.1 ? 1 : 0); pos[i][1] += dy * k; pos[j][0] -= dx * k; pos[j][1] -= dy * k; }
  }
  const lines = pins.map((p, i) => `<line x1="${x(p.lon).toFixed(1)}" y1="${y(p.lat).toFixed(1)}" x2="${pos[i][0].toFixed(1)}" y2="${pos[i][1].toFixed(1)}" stroke="#7a1a14" stroke-width="1"/><circle cx="${x(p.lon).toFixed(1)}" cy="${y(p.lat).toFixed(1)}" r="1.8" fill="#7a1a14"/>`).join('');
  const marks = lines + pins
    .map((p, i) => {
      const [cx, cy] = pos[i];
      return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="9" fill="#b3261e" stroke="#fff" stroke-width="1.5"/><text x="${cx.toFixed(1)}" y="${(cy + 4).toFixed(1)}" font-family="Noto Sans" font-size="10.5" font-weight="800" fill="#fff" text-anchor="middle">${i + 1}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" fill="#dfe9f2"/>${grid}${land}${marks}</svg>`;
}
