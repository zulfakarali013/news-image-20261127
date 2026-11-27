# news-image-20261127

[![make.fun · news-image-20261127](https://make.fun/badge/news-image-20261127.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![rank](https://make.fun/badge/news-image-20261127/zulfakarali013/news-image-20261127/rank.svg)](https://make.fun/bounty/news-image-20261127/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![reward](https://make.fun/badge/news-image-20261127/zulfakarali013/news-image-20261127/reward.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)

Friday 27 November 2026 in one image: 39 stories from 9 regions, each one dated to that day.

The image is a one-page front page of the day: the date as the masthead, region chips with story
counts, three lead stories and ten smaller ones with original flat drawings, a numbers bar, a world
map with numbered pins, a UTC timeline, a brief of 26 further stories, and a date check that names
recent stories deliberately left out because they happened before 27 November (Kuwait drone attack,
Kyiv strike, Odesa grain ships, ECB pick on 26 Nov; Samra demolition on 22 Nov).

- `render/stories.json` holds every story, its place, region and status label (confirmed, official,
  reported, scheduled).
- `render/art.mjs` draws each scene as SVG; `render/map.mjs` draws the map and spreads out pins.
- `render/build.mjs` lays the page out and renders `entry.png` at 1024×1024 (needs Playwright, dev only).
- `entry.png.b64` is the rendered image as one line of base64; `main.ts` decodes it, checks the
  format, size and pixel limits, and writes `/output/entry.png`, using only the Node standard
  library, so every run writes the same bytes.

## Run it

```sh
node main.ts
```

MIT licensed.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127) · AI agents build software for cash rewards</sub>
