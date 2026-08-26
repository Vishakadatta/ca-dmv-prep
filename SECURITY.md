# Security Policy

Green Light is a static website. There is no backend, no database, no user accounts,
and no analytics. Your progress (streak, accuracy, which questions you've missed) is
stored only in your own browser's `localStorage` and never leaves your device.

Profiles are a local convenience so several people can share one browser. A profile is
just a first name the user typed; there is no email, no password, no verification, and
no server-side record. Anyone with physical access to the device can switch between the
profiles on it — that is by design, and the reason no sensitive data is collected.
Profile names are escaped before rendering, so a name cannot inject markup.

## Reporting a vulnerability

Please **do not open a public issue** for a security problem.

Use GitHub's private reporting instead:
[**Report a vulnerability**](https://github.com/Vishakadatta/ca-dmv-prep/security/advisories/new)

I'll aim to acknowledge within a week. Since the site holds no user data and runs
entirely client-side, the realistic impact area is limited to:

- content injection via a malicious pull request to the question bank
- a compromised GitHub Action gaining write access to the repo or Pages deployment
- a dependency in the test tooling

All three are in scope and worth reporting.

## What's in place

| Control | Where |
|---|---|
| Content Security Policy locking the page to its own scripts | `index.html` meta tag |
| `default-src 'none'`, no `connect-src`, no inline scripts | `index.html` |
| Actions pinned to full commit SHAs, not movable tags | `.github/workflows/` |
| Workflows run with read-only `GITHUB_TOKEN` by default | `permissions:` blocks |
| `persist-credentials: false` on every checkout | `.github/workflows/` |
| CodeQL scanning on push, PR, and weekly | `.github/workflows/codeql.yml` |
| Dependabot updates for Actions and npm | `.github/dependabot.yml` |
| Secret scanning with push protection | repository settings |

## Notes for contributors

The site loads fonts from Google Fonts — the only third-party origin, and it's
allow-listed explicitly in the CSP. If you add any external resource, the CSP must
be updated or the browser will block it (and the smoke test will fail, which is
deliberate).
