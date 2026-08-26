/* Content integrity check for the question bank, signs, and diagrams.
   Pure Node, no dependencies. Run: node scripts/validate-content.mjs   */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const load = f => readFileSync(join(root, "js", f), "utf8");

const errors = [];
const fail = m => errors.push(m);

// The browser bundles attach to `window`; give them one and evaluate.
const win = {};
globalThis.window = win;
for (const f of ["signs.js", "diagrams.js", "questions.js"]) {
  try { (0, eval)(load(f)); }
  catch (err) { fail(`js/${f} threw while loading: ${err.message}`); }
}

const { QUESTIONS: Q, TOPICS: T, SIGNS: S, DIAGRAMS: D } = win;
if (!Q || !T || !S || !D) {
  console.error("✗ one or more bundles failed to attach to window");
  process.exit(1);
}

const topicKeys = new Set(T.map(t => t.k));

/* ---- questions ---- */
Q.forEach((q, i) => {
  const at = `question[${i}] "${String(q.q).slice(0, 55)}…"`;
  if (!q.q || q.q.length < 8)                fail(`${at}: missing or too-short text`);
  if (!Array.isArray(q.c) || q.c.length !== 4) fail(`${at}: must have exactly 4 choices`);
  if (new Set(q.c).size !== q.c.length)      fail(`${at}: duplicate choice text`);
  if (q.c.some(c => !c || !c.trim()))        fail(`${at}: blank choice`);
  if (!Number.isInteger(q.a) || q.a < 0 || q.a > 3) fail(`${at}: answer index out of range`);
  if (!q.e || q.e.length < 25)               fail(`${at}: explanation missing or too thin`);
  if (!topicKeys.has(q.t))                   fail(`${at}: unknown topic "${q.t}"`);
  if (q.sign && !S[q.sign])                  fail(`${at}: references missing sign "${q.sign}"`);
  if (q.dia && !D[q.dia])                    fail(`${at}: references missing diagram "${q.dia}"`);
});

/* ---- every topic must be answerable ---- */
for (const t of T) {
  const n = Q.filter(q => q.t === t.k).length;
  if (n < 4) fail(`topic "${t.k}" has only ${n} question(s); need at least 4`);
  if (!t.ico || !t.ico.includes("<svg")) fail(`topic "${t.k}" has no icon`);
}

/* ---- a mock test must be fillable ---- */
if (Q.length < 36) fail(`only ${Q.length} questions; a 36-question mock test cannot be built`);

/* ---- signs ---- */
for (const [k, s] of Object.entries(S)) {
  if (!s.svg || !s.svg.includes("</svg>")) fail(`sign "${k}": invalid svg`);
  if (!s.name)    fail(`sign "${k}": missing name`);
  if (!s.meaning) fail(`sign "${k}": missing meaning (shown in the gallery)`);
  if (!["reg", "warn", "rail", "work"].includes(s.cat)) fail(`sign "${k}": bad category "${s.cat}"`);
}

/* ---- diagrams must render to well-formed svg ---- */
for (const [k, fn] of Object.entries(D)) {
  let svg;
  try { svg = fn(); }
  catch (err) { fail(`diagram "${k}" threw: ${err.message}`); continue; }
  if (!svg.startsWith("<svg") || !svg.endsWith("</svg>")) fail(`diagram "${k}": not a complete svg`);
  const open = (svg.match(/<g[\s>]/g) || []).length, close = (svg.match(/<\/g>/g) || []).length;
  if (open !== close) fail(`diagram "${k}": unbalanced <g> tags (${open} open, ${close} close)`);
  if (svg.includes("undefined") || svg.includes("NaN")) fail(`diagram "${k}": renders "undefined"/"NaN"`);
}

/* ---- report ---- */
if (errors.length) {
  console.error(`\n✗ ${errors.length} content problem(s):\n`);
  errors.forEach(e => console.error("  • " + e));
  process.exit(1);
}
console.log(
  `✓ content OK — ${Q.length} questions across ${T.length} topics, ` +
  `${Object.keys(S).length} signs, ${Object.keys(D).length} diagrams`
);
