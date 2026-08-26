# Green Light — California DMV Written Test Prep

### 👉 **[Start studying — vishakadatta.github.io/ca-dmv-prep](https://vishakadatta.github.io/ca-dmv-prep/)**

A quiz-first study site for the **California DMV written knowledge test**. Answer a question,
and whether you get it right or wrong you get a clear explanation — often with an animated
top-down road diagram showing exactly what happens at the intersection.

Built for people who are confident drivers elsewhere but new to California road rules.

## What's in it

- **164 questions** across 11 topics, grounded in the official
  [California Driver's Handbook (DL 600)](https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/).
- **12 animated SVG road diagrams** — four-way stops, unprotected left turns, which lane to
  land in, roundabouts, hill parking, school buses, freeway merging, the three-second rule.
- **Mock test mode** — 46 questions, no hints, graded at the end. Pass mark is 38, same as the DMV.
  (The DMV publishes 80% as the passing score; it no longer publishes a question count itself,
  so 46/38 follows what current CA test-prep sources report.)
- **15-minute sessions.** A gentle prompt appears at 15 minutes so you stop before you burn out.
  You can always keep going.
- **Spaced repetition.** Questions you miss come back more often; ones you've mastered fade out.
- **Per-topic progress**, daily streak, and accuracy — all stored locally in your browser.
- **Local profiles.** Several people can share one laptop and each keeps their own streak
  and their own missed questions. It asks for a first name only after your first session —
  never before — and there are no accounts, no email, no password, and no server. Nothing
  ever leaves the device.

## Running it locally

The live site is at **<https://vishakadatta.github.io/ca-dmv-prep/>** — served straight from
the `main` branch via GitHub Pages, so anything pushed here goes live within a minute.

To run your own copy:

It's a static site with no build step and no dependencies:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Keyboard shortcuts

`1`–`4` pick an answer · `Enter` moves to the next question.

## Adding questions

Everything lives in [`js/questions.js`](js/questions.js):

```js
add("topic-key", "Question text?", ["correct answer", "wrong", "wrong", "wrong"], 0,
    "Explanation shown after answering.", { sign: "stop", dia: "fourWayStop" });
```

The correct answer is always written first (index `0`); the app shuffles the choices at
runtime. `sign` pulls a road sign from `js/signs.js`, `dia` pulls an animated diagram from
`js/diagrams.js` — both are optional.

## Where your progress lives

In `localStorage` on your own device, under the key `greenlight.v2`, and nowhere else.
There is no backend to sync to — this is a static site, so there is literally nowhere for
the data to go. Clearing your browser data clears your progress, and switching devices
starts you fresh.

Progress saved before profiles existed (`greenlight.v1`) is migrated automatically the
first time you load the newer version; nothing is lost.

## Disclaimer

Not affiliated with or endorsed by the California DMV. Study material only — always confirm
current rules against the official handbook.

## Typography

Set in **Overpass** (Red Hat, SIL Open Font License) — an open typeface drawn from
**FHWA Series / Highway Gothic**, the font actually used on California road signs.

It is *not* Clearview. Clearview is the Penn State–co-developed highway typeface, and it's
a commercial licence (~$500 single-computer, ~$800 for the family, web embedding extra).
It also only ever held *interim* FHWA approval — granted 2004, rescinded 2016, reinstated
2018 — and only for positive-contrast guide signs, never for STOP signs or white regulatory
signs. Overpass is the free, correctly-licensed way to get the real sign look.

## Credits

Designed and built by **Vishakadatta** and **Shrinidhi Hebbar**.

## License

MIT
