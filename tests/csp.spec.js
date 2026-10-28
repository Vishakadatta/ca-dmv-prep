// CSP enforcement, in its own file: these tests deliberately provoke Content
// Security Policy violations, which log console errors. smoke.spec.js fails on
// any console error by design, so the two cannot share a file.
const { test, expect } = require("@playwright/test");

test("inline script injected into the page does not execute", async ({ page }) => {
  // The page is public and renders user-entered names. CSP is the backstop if
  // HTML escaping ever regresses, so a weakened policy must fail the build.
  await page.goto("/");
  await page.evaluate(() => {
    window.__inline = 0;
    const s = document.createElement("script");
    s.textContent = "window.__inline = 1;";
    document.body.appendChild(s);
  });
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.__inline), "inline script ran despite CSP").toBe(0);
});

test("script from a third-party origin is refused", async ({ page }) => {
  const blocked = [];
  page.on("console", m => { if (/Content Security Policy/i.test(m.text())) blocked.push(m.text()); });
  await page.goto("/");
  await page.evaluate(() => {
    const e = document.createElement("script");
    e.src = "https://example.com/evil.js";
    document.body.appendChild(e);
  });
  await page.waitForTimeout(400);
  expect(blocked.some(t => /example\.com|script-src/i.test(t)),
    "external script was not blocked by CSP").toBe(true);
});

test("the policy still names the directives we rely on", async ({ page }) => {
  await page.goto("/");
  const csp = await page.evaluate(() =>
    document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content || "");
  for (const directive of ["default-src 'none'", "script-src 'self'", "object-src 'none'", "base-uri 'none'"]) {
    expect(csp.replace(/\s+/g, " "), `CSP lost: ${directive}`).toContain(directive);
  }
});

test("the page refuses to be displayed inside a frame", async ({ page }) => {
  // No X-Frame-Options is possible on GitHub Pages and meta CSP ignores
  // frame-ancestors, so js/guard.js is what stops the page being framed.
  await page.goto("/");
  await page.setContent(
    `<!doctype html><title>attacker</title>
     <iframe id="f" src="http://127.0.0.1:8000/" width="500" height="400"></iframe>`);
  await page.waitForTimeout(1200);
  const visible = await page.evaluate(() => {
    const d = document.getElementById("f").contentDocument;
    if (!d) return false;                              // cross-origin: already denied
    const root = d.documentElement;
    return !!(root && root.style.display !== "none" && d.querySelector("h1"));
  });
  expect(visible, "page rendered inside a frame").toBe(false);
});
