// The locator map: rough land shapes (good to a few degrees, enough at 400 px) in a plain
// equirectangular projection, plus one numbered red pin per illustrated story. Pins that
// crowd together are nudged apart and keep a short leader line to their true spot.

const SHAPES = [
  // North and Central America
  [[-166, 68], [-120, 71], [-82, 69], [-64, 58], [-55, 50], [-70, 43], [-80, 32], [-81, 26], [-95, 28], [-97, 19], [-88, 16], [-79, 8], [-92, 15], [-106, 22], [-117, 32], [-124, 42], [-128, 52], [-148, 60], [-164, 61]],
  // Greenland
  [[-52, 81], [-26, 82], [-21, 72], [-43, 60], [-54, 66]],
  // South America
  [[-78, 9], [-62, 11], [-50, 0], [-35, -7], [-41, -22], [-53, -34], [-65, -42], [-70, -53], [-74, -42], [-71, -20], [-80, -4]],
  // Europe
  [[-9, 37], [-9, 43], [-1, 46], [-4, 48], [3, 51], [8, 55], [10, 59], [6, 62], [14, 67], [25, 71], [40, 67], [41, 47], [29, 45], [26, 40], [22, 37], [16, 40], [12, 44], [7, 44], [1, 41], [-2, 36]],
  // Britain and Ireland
  [[-5, 50], [1, 52], [-2, 56], [-5, 58], [-7, 55]],
  // Africa
  [[-16, 22], [-9, 32], [10, 37], [20, 32], [33, 31], [43, 11], [51, 12], [41, -2], [39, -17], [32, -27], [20, -35], [13, -20], [12, -5], [8, 5], [-8, 5], [-17, 13]],
  // Asia (mainland)
  [[41, 66], [70, 72], [110, 77], [150, 71], [178, 67], [160, 59], [141, 53], [133, 43], [126, 38], [121, 31], [118, 24], [108, 20], [106, 11], [101, 13], [102, 2], [97, 10], [91, 22], [80, 14], [77, 8], [71, 21], [61, 25], [52, 24], [55, 17], [44, 13], [38, 22], [35, 33], [28, 37], [27, 41], [41, 41], [50, 39], [53, 45], [42, 49]],
  // Japan
  [[131, 32], [139, 35], [142, 39], [144, 44], [140, 43], [138, 37], [132, 35]],
  // Taiwan
  [[120, 22], [122, 25], [121, 25], [120, 23]],
  // Indonesia and New Guinea
  [[96, 4], [105, -6], [115, -8], [127, -9], [141, -8], [139, -2], [126, 0], [117, 4], [109, 1], [103, -1]],
  // Australia
  [[115, -21], [123, -16], [131, -11], [137, -12], [142, -10], [146, -18], [153, -27], [149, -38], [140, -38], [132, -32], [117, -35], [113, -27]],
  // New Zealand
  [[173, -35], [178, -38], [175, -41], [170, -46], [167, -46], [172, -41]],
];

export function locatorMap(pins, { width = 400, height = 128, west = -170, east = 190, north = 78, south = -50 } = {}) {
  const px = (lon) => (((lon < west ? lon + 360 : lon) - west) / (east - west)) * width;
  const py = (lat) => ((north - lat) / (north - south)) * height;
  const f = (n) => n.toFixed(1);

  const land = SHAPES.map((pts) => `<polygon points="${pts.map(([lo, la]) => `${f(px(lo))},${f(py(la))}`).join(' ')}" fill="#cdbf9c" stroke="#a49572" stroke-width="0.9"/>`).join('');
  const lines = [60, 30, 0, -30].map((la) => `<line x1="0" x2="${width}" y1="${f(py(la))}" y2="${f(py(la))}" stroke="#b7cadb" stroke-width="${la === 0 ? 1.1 : 0.5}"/>`).join('');

  // Spread out pins that would overlap: a few passes of pairwise pushing.
  const home = pins.map((p) => [px(p.lon), py(p.lat)]);
  const at = home.map(([x, y]) => [x, y]);
  const gap = 19;
  for (let pass = 0; pass < 80; pass++) {
    for (let a = 0; a < at.length; a++) {
      for (let b = a + 1; b < at.length; b++) {
        let dx = at[b][0] - at[a][0];
        let dy = at[b][1] - at[a][1];
        let d = Math.hypot(dx, dy);
        if (d >= gap) continue;
        if (d < 0.01) { dx = 1; dy = 0; d = 1; }
        const push = (gap - d) / 2;
        at[a][0] -= (dx / d) * push; at[a][1] -= (dy / d) * push;
        at[b][0] += (dx / d) * push; at[b][1] += (dy / d) * push;
      }
    }
    // Keep every pin fully inside the frame.
    for (const p of at) { p[0] = Math.min(width - 10, Math.max(10, p[0])); p[1] = Math.min(height - 10, Math.max(10, p[1])); }
  }

  const leaders = home.map(([x, y], i) => `<line x1="${f(x)}" y1="${f(y)}" x2="${f(at[i][0])}" y2="${f(at[i][1])}" stroke="#7c1b14" stroke-width="1"/><circle cx="${f(x)}" cy="${f(y)}" r="1.8" fill="#7c1b14"/>`).join('');
  const badges = at.map(([x, y], i) => `<circle cx="${f(x)}" cy="${f(y)}" r="9" fill="#b1271f" stroke="#fff" stroke-width="1.5"/><text x="${f(x)}" y="${f(y + 3.8)}" font-family="Noto Sans" font-size="10.5" font-weight="800" fill="#fff" text-anchor="middle">${i + 1}</text>`).join('');

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="#dde8f1"/>${lines}${land}${leaders}${badges}</svg>`;
}
