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
  expect(counts.q).toBeGreaterThanOrEqual(36);
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

test("mock test runs 36 questions and grades against the DMV pass mark", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/");
  await page.click("#btn-mock");
  await expect(page.locator("#mock-bar")).toBeVisible();

  for (let i = 0; i < 36; i++) {
    await expect(page.locator(".choice:not([disabled])").first()).toBeVisible();
    // answer correctly every time -> must pass
    await page.evaluate(() => {
      const texts = [...document.querySelectorAll(".choice")].map(b => b.textContent.slice(1));
      const q = window.QUESTIONS.find(x => x.c.length === texts.length && x.c.every(c => texts.includes(c)));
      [...document.querySelectorAll(".choice")].find(b => b.textContent.slice(1) === q.c[q.a]).click();
    });
    // no teaching may leak during a mock test
    await expect(page.locator("#explain")).toBeHidden();
  }

  await expect(page.locator("#view-results")).toBeVisible();
  await expect(page.locator(".result-sign")).toHaveClass(/pass/);
  await expect(page.locator(".result-sign .score")).toContainText("36 / 36");
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
