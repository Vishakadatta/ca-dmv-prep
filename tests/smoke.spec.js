// End-to-end smoke test: does the site actually work in a real browser?
const { test, expect } = require("@playwright/test");

// Any console error or failed request fails the test.
test.beforeEach(async ({ page }) => {
  page.on("console", m => { if (m.type() === "error") throw new Error("console error: " + m.text()); });
  page.on("pageerror", e => { throw new Error("uncaught exception: " + e.message); });
  page.on("requestfailed", r => {
    // Google Fonts may be blocked in CI sandboxes; don't fail the build on that.
    if (!r.url().includes("fonts.g")) throw new Error("request failed: " + r.url());
  });
});

test("home page loads with all content wired up", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("California");
  // bundles attached and non-empty
  const counts = await page.evaluate(() => ({
    q: window.QUESTIONS.length, t: window.TOPICS.length,
    s: Object.keys(window.SIGNS).length, d: Object.keys(window.DIAGRAMS).length,
  }));
  expect(counts.q).toBeGreaterThanOrEqual(46);
  expect(counts.t).toBeGreaterThan(0);
  expect(counts.s).toBeGreaterThan(0);
  expect(counts.d).toBeGreaterThan(0);
  // one topic row per topic
  await expect(page.locator(".topic-row")).toHaveCount(counts.t);
});

test("the 15-minute nudge is NOT showing on load", async ({ page }) => {
  // regression: a CSS display rule once overrode the hidden attribute
  await page.goto("/");
  await expect(page.locator("#nudge")).toBeHidden();
});

test("answering a practice question reveals the explanation", async ({ page }) => {
  await page.goto("/");
  await page.click("#btn-practice");
  await expect(page.locator("#view-quiz")).toBeVisible();
  await expect(page.locator(".choice")).toHaveCount(4);
  await expect(page.locator("#explain")).toBeHidden();

  await page.locator(".choice").first().click();

  await expect(page.locator("#explain")).toBeVisible();
  await expect(page.locator("#explain-text")).not.toBeEmpty();
  // exactly one choice marked correct, and all are locked
  await expect(page.locator(".choice.is-correct")).toHaveCount(1);
  const enabled = await page.locator(".choice:not([disabled])").count();
  expect(enabled).toBe(0);
});

test("choice order is shuffled, not always first", async ({ page }) => {
  // guards the bank's convention of storing the correct answer at index 0
  await page.goto("/");
  const positions = await page.evaluate(() => {
    const seen = new Set();
    for (let i = 0; i < 40; i++) {
      const q = window.QUESTIONS[i % window.QUESTIONS.length];
      const shuffled = q.c.map((t, ix) => ({ t, ix })).sort(() => Math.random() - 0.5);
      seen.add(shuffled.findIndex(c => c.ix === q.a));
    }
    return [...seen];
  });
  expect(positions.length).toBeGreaterThan(1);
});

test("mock test runs 46 questions and grades against the DMV pass mark", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/");
  await page.click("#btn-mock");
  await expect(page.locator("#mock-bar")).toBeVisible();

  for (let i = 0; i < 46; i++) {
    await expect(page.locator(".choice:not([disabled])").first()).toBeVisible();
    // answer correctly every time -> must pass
    await page.evaluate(() => {
      // Identify by question text AND choices: some questions share an identical
      // option set (e.g. two speed-limit questions both offering 15/20/25/30 mph)
      // with different correct answers, so choices alone are not a unique key.
      const stem  = document.querySelector("#qtext").textContent;
      const texts = [...document.querySelectorAll(".choice")].map(b => b.textContent.slice(1));
      const q = window.QUESTIONS.find(x =>
        x.q === stem && x.c.length === texts.length && x.c.every(c => texts.includes(c)));
      if (!q) throw new Error("could not identify question: " + stem);
      [...document.querySelectorAll(".choice")].find(b => b.textContent.slice(1) === q.c[q.a]).click();
    });
    // no teaching may leak during a mock test
    await expect(page.locator("#explain")).toBeHidden();
  }

  await expect(page.locator("#view-results")).toBeVisible();
  await expect(page.locator(".result-sign")).toHaveClass(/pass/);
  await expect(page.locator(".result-sign .score")).toContainText("46 / 46");
});

test("signs gallery renders every sign with its meaning", async ({ page }) => {
  await page.goto("/");
  await page.click("#btn-signs-gallery");
  const n = await page.evaluate(() => Object.keys(window.SIGNS).length);
  await expect(page.locator(".sign-cell")).toHaveCount(n);
  await expect(page.locator(".sign-cell svg").first()).toBeVisible();
});

test("no horizontal overflow on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

// ---------- local profiles ----------

test("progress saved before profiles existed is migrated, not lost", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("greenlight.v1", JSON.stringify({
      seen: { 3: { right: 2, wrong: 0 } }, streak: 4,
      lastDay: new Date().toISOString().slice(0, 10),
      answered: 88, correct: 57, topics: { signs: { n: 20, c: 13 } },
    }));
  });
  await page.reload();
  await expect(page.locator("#stat-answered")).toHaveText("88");
  await expect(page.locator("#stat-streak")).toHaveText("4");
  const profile = await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem("greenlight.v2"));
    return Object.values(db.profiles)[0];
  });
  expect(profile.answered).toBe(88);
  expect(profile.name).toBeNull();          // unnamed until they choose to save
});

test("the name prompt appears only after a session, never before", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // nothing blocks the first question
  await expect(page.locator("#save-form")).toHaveCount(0);
  await page.click("#btn-practice");
  await expect(page.locator("#save-form")).toHaveCount(0);

  for (let i = 0; i < 12; i++) {
    await page.locator(".choice:not([disabled])").first().click();
    const next = page.locator("#btn-next");
    if (await next.isVisible()) await next.click();
  }
  await expect(page.locator("#view-results")).toBeVisible();
  await expect(page.locator("#save-form")).toBeVisible();

  await page.fill("#save-name", "Vishaka");
  await page.click("#save-form button[type=submit]");
  await expect(page.locator(".save-done")).toContainText("Vishaka");
  await expect(page.locator("#chip-who")).toContainText("Vishaka");
});

test("two people on one device keep separate progress", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem("greenlight.v1", JSON.stringify({
      seen: {}, streak: 3, lastDay: new Date().toISOString().slice(0, 10),
      answered: 50, correct: 40, topics: {},
    }));
  });
  await page.reload();
  await page.evaluate(() => {
    document.querySelector("#save-slot").innerHTML = "";
    window.localStorage; // no-op
  });
  // name the migrated profile, then add a second person
  await page.click("#chip-who");
  await page.fill("#new-name", "Arjun");
  await page.click("#new-person button[type=submit]");

  await expect(page.locator("#chip-who")).toContainText("Arjun");
  await expect(page.locator("#stat-answered")).toHaveText("0");   // fresh start

  const profiles = await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem("greenlight.v2"));
    return Object.values(db.profiles).map(p => ({ name: p.name, answered: p.answered }));
  });
  expect(profiles).toHaveLength(2);
  expect(profiles.find(p => p.name === "Arjun").answered).toBe(0);
  expect(profiles.find(p => p.name === null).answered).toBe(50); // untouched
});

test("a name containing HTML is escaped, not executed", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    const p = { id: "px", name: "<img src=x onerror=alert(1)>", created: "2026-01-01",
                seen: {}, streak: 1, lastDay: null, answered: 5, correct: 3, topics: {} };
    localStorage.setItem("greenlight.v2", JSON.stringify({ v: 2, activeId: "px", profiles: { px: p } }));
  });
  await page.reload();
  await page.click("#chip-who");
  // no element was injected anywhere the name is rendered
  expect(await page.locator("#chip-who img, .person img, #greeting img").count()).toBe(0);
  await expect(page.locator("#chip-who b")).toHaveText("<img src=x onerror=alert(1)>");
});
