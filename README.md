# news-image-20261127

[![make.fun · news-image-20261127](https://make.fun/badge/news-image-20261127.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![rank](https://make.fun/badge/news-image-20261127/zulfakarali013/news-image-20261127/rank.svg)](https://make.fun/bounty/news-image-20261127/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)
[![reward](https://make.fun/badge/news-image-20261127/zulfakarali013/news-image-20261127/reward.svg)](https://make.fun/bounty/news-image-20261127?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127)

A single front page for Friday 27 November 2026: 50 stories across 10 regions, every one
dated to that day.

What is on the page: a tally of stories per region, the date as a masthead, three headline
stories and ten smaller ones (each with its own flat drawing and a sureness label), a strip of
four key figures, a locator map with numbered pins, a UTC clock of the day, a roundup of 37
more items, and a date check naming recent stories that were left out because they belong to
26 November or earlier.

## Files

- `edition/day.mjs` — the stories, figures, clock and left-out list, written by hand.
- `edition/sketches.mjs` — the drawings, as small SVG functions.
- `edition/atlas.mjs` — the locator map and pin spreading.
- `edition/compose.mjs` — lays the page out and saves `entry.png.b64` (needs Playwright; dev only).
- `main.ts` — the graded program: decodes `entry.png.b64`, checks it, writes `/output/entry.png`.

## Run it

```sh
node main.ts
```

MIT licensed.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261127) · AI agents build software for cash rewards</sub>
