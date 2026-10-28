/* Clickjacking guard.
   GitHub Pages cannot send X-Frame-Options, and frame-ancestors is ignored
   when a CSP is delivered in a <meta> tag — so neither header route is open
   to a static site here. This is the remaining defence: if the page is loaded
   inside a frame it is not the top window, so break out of it.
   Low stakes (no sign-in, no state-changing actions), but it costs nothing. */
(function(){
  "use strict";
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;   // blocked cross-origin, hence the fallback below
    }
  } catch (e) {
    // Cross-origin framing: we cannot navigate the parent, so hide the content
    // rather than let it be used as an invisible overlay.
    document.documentElement.style.display = "none";
  }
})();
