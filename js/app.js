/* Green Light — app logic: quiz engine, spaced repetition, timer, progress. */
(function(){
"use strict";
const $ = s => document.querySelector(s);
const esc = t => String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const QS = window.QUESTIONS, TOPICS = window.TOPICS, SIGNS = window.SIGNS, DIA = window.DIAGRAMS;
const MOCK_LEN = 36, MOCK_PASS = 30, SESSION_MS = 15*60*1000;

/* ---------- profiles + persistence ----------
   Several people can share one browser. Each keeps their own progress.
   Everything stays on this device: no server, no account, no email.       */
const KEY = "greenlight.v2", OLD_KEY = "greenlight.v1";
const todayStr = () => new Date().toISOString().slice(0,10);

const blankProfile = (name=null) => ({
  id: "p" + Date.now().toString(36) + Math.random().toString(36).slice(2,6),
  name, created: todayStr(),
  seen:{}, streak:0, lastDay:null, answered:0, correct:0, topics:{}
});

let DB = { v:2, activeId:null, profiles:{} };

function saveDB(){ try{ localStorage.setItem(KEY, JSON.stringify(DB)); }catch(e){} }
const save = saveDB;   // existing call sites

function loadDB(){
  try {
    const raw = localStorage.getItem(KEY);
    if (raw){
      const parsed = JSON.parse(raw);
      if (parsed && parsed.profiles && Object.keys(parsed.profiles).length){
        DB = parsed;
        if (!DB.profiles[DB.activeId]) DB.activeId = Object.keys(DB.profiles)[0];
        return;
      }
    }
    // First run under v2 — carry over any progress saved before profiles existed.
    const legacy = localStorage.getItem(OLD_KEY);
    if (legacy){
      const p = Object.assign(blankProfile(), JSON.parse(legacy));
      p.name = null;                 // unnamed until they choose to save it
      DB = { v:2, activeId:p.id, profiles:{ [p.id]: p } };
      saveDB();
      return;
    }
  } catch(e){ /* storage unavailable — fall through to a memory-only profile */ }
  const p = blankProfile();
  DB = { v:2, activeId:p.id, profiles:{ [p.id]: p } };
}

loadDB();
let S = DB.profiles[DB.activeId];

function useProfile(id){
  if (!DB.profiles[id]) return;
  DB.activeId = id; S = DB.profiles[id]; saveDB();
  renderWho(); renderHome();
}
function addProfile(name){
  const p = blankProfile(name || null);
  DB.profiles[p.id] = p; DB.activeId = p.id; S = p; saveDB();
  renderWho(); renderHome();
  return p;
}
function nameProfile(name){
  S.name = name.trim().slice(0,24) || null;
  saveDB(); renderWho(); renderHome();
}
function removeProfile(id){
  delete DB.profiles[id];
  if (!Object.keys(DB.profiles).length){ const p = blankProfile(); DB.profiles[p.id] = p; DB.activeId = p.id; }
  else if (DB.activeId === id) DB.activeId = Object.keys(DB.profiles)[0];
  S = DB.profiles[DB.activeId]; saveDB();
  renderWho(); renderPeople(); renderHome();
}

function touchStreak(){
  const t = todayStr();
  if (S.lastDay === t) return;
  const y = new Date(Date.now()-864e5).toISOString().slice(0,10);
  S.streak = (S.lastDay === y) ? S.streak+1 : 1;
  S.lastDay = t; save();
}

/* ---------- session timer ---------- */
let started = 0, nudged = false, tick = null;
function startTimer(){
  if (tick) return;
  started = Date.now();
  tick = setInterval(()=>{
    const ms = Date.now()-started;
    const s = Math.floor(ms/1000);
    $("#timer-text").textContent = Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
    $("#chip-timer").classList.toggle("warm", ms > SESSION_MS*0.8);
    if (!nudged && ms >= SESSION_MS){ nudged = true; showNudge(); }
  }, 1000);
}
function showNudge(){
  const acc = S.answered ? Math.round(S.correct/S.answered*100) : 0;
  $("#nudge-text").innerHTML = `You've put in 15 focused minutes — that's exactly the right dose. `+
    `You're at <b>${acc}% accuracy</b> across ${S.answered} questions, and your streak is <b>${S.streak} day${S.streak===1?"":"s"}</b>. `+
    `Short daily sessions beat long cramming every time.`;
  $("#nudge").hidden = false;
}
$("#btn-nudge-more").onclick = ()=>{ $("#nudge").hidden = true; started = Date.now(); nudged = false; };
$("#btn-nudge-done").onclick = ()=>{ $("#nudge").hidden = true; go("home"); };

/* ---------- views ---------- */
function go(v){
  ["home","quiz","results","signs"].forEach(n => $("#view-"+n).hidden = (n!==v));
  window.scrollTo({top:0,behavior:"instant"});
  if (v==="home") renderHome();
}

/* ---------- question selection (light spaced repetition) ---------- */
function weight(i){
  const r = S.seen[i];
  if (!r) return 6;                 // unseen — favour
  if (r.wrong > r.right) return 10; // missed more than got — favour hardest
  if (r.right >= 2) return 1;       // known — rare
  return 3;
}
function pick(pool, n){
  const bag = [];
  pool.forEach(i => { const w = weight(i); for (let k=0;k<w;k++) bag.push(i); });
  const out = [];
  while (out.length < n && bag.length){
    const i = bag[Math.floor(Math.random()*bag.length)];
    if (!out.includes(i)) out.push(i);
    for (let k=bag.length-1;k>=0;k--) if (bag[k]===i) bag.splice(k,1);
  }
  return out;
}
const shuffle = a => { for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]];} return a; };

/* ---------- quiz state ---------- */
let run = null; // {ids, i, mode, topic, answers:[]}

function startRun(mode, topic){
  touchStreak(); startTimer();
  const pool = QS.map((q,i)=>i).filter(i => !topic || QS[i].t === topic);
  const n = mode==="mock" ? Math.min(MOCK_LEN, pool.length) : Math.min(12, pool.length);
  run = { ids: pick(pool, n), i:0, mode, topic, answers:[] };
  $("#mock-bar").hidden = mode !== "mock";
  go("quiz"); renderQ();
}

function renderQ(){
  const q = QS[run.ids[run.i]];
  const tName = (TOPICS.find(t=>t.k===q.t)||{}).name || "";
  $("#quiz-topic-tag").textContent = tName;
  $("#q-counter").textContent = `${run.i+1} / ${run.ids.length}`;
  if (run.mode==="mock") $("#mock-bar-fill").style.width = (run.i/run.ids.length*100)+"%";

  const media = $("#qmedia");
  if (q.sign && SIGNS[q.sign]){ media.innerHTML = SIGNS[q.sign].svg; media.hidden = false; }
  else { media.innerHTML = ""; media.hidden = true; }

  $("#qtext").textContent = q.q;

  // shuffle choices, remember where the right one landed
  const order = shuffle(q.c.map((txt,idx)=>({txt,idx})));
  run.order = order;
  const box = $("#choices"); box.innerHTML = "";
  order.forEach((c,pos)=>{
    const b = document.createElement("button");
    b.className = "choice"; b.type = "button";
    b.innerHTML = `<span class="choice-letter">${"ABCD"[pos]}</span><span>${c.txt}</span>`;
    b.onclick = ()=>answer(pos);
    box.appendChild(b);
  });
  $("#explain").hidden = true;
  $("#explain").className = "explain";
}

function answer(pos){
  const q = QS[run.ids[run.i]];
  const chosen = run.order[pos].idx;
  const ok = chosen === q.a;
  const rightPos = run.order.findIndex(c => c.idx === q.a);

  // record
  const id = run.ids[run.i];
  const rec = S.seen[id] || (S.seen[id] = {right:0,wrong:0});
  ok ? rec.right++ : rec.wrong++;
  S.answered++; if (ok) S.correct++;
  const tp = S.topics[q.t] || (S.topics[q.t] = {n:0,c:0});
  tp.n++; if (ok) tp.c++;
  save();
  run.answers.push({id, ok, chosenText:q.c[chosen]});

  // lock buttons + color them
  const btns = [...$("#choices").children];
  btns.forEach((b,ix)=>{
    b.disabled = true;
    if (ix === rightPos) b.classList.add("is-correct");
    else if (ix === pos) b.classList.add("is-wrong");
    else b.classList.add("is-dim");
  });

  if (run.mode === "mock"){
    setTimeout(next, 220);          // no teaching during the test
    return;
  }

  const ex = $("#explain");
  ex.className = "explain " + (ok ? "good" : "bad");
  $("#explain-verdict").innerHTML = ok
    ? `<span aria-hidden="true">✓</span> Correct`
    : `<span aria-hidden="true">▲</span> Not quite — here's why`;
  $("#explain-diagram").innerHTML = (q.dia && DIA[q.dia]) ? DIA[q.dia]() : "";
  $("#explain-text").innerHTML = q.e;
  $("#btn-next").textContent = (run.i === run.ids.length-1) ? "See your results →" : "Next question →";
  ex.hidden = false;
  ex.scrollIntoView({behavior:"smooth", block:"nearest"});
}

function next(){
  run.i++;
  if (run.i >= run.ids.length) return results();
  renderQ();
}
$("#btn-next").onclick = next;

/* ---------- results ---------- */
function results(){
  const total = run.answers.length, got = run.answers.filter(a=>a.ok).length;
  const isMock = run.mode==="mock";
  const passed = got >= MOCK_PASS;
  const sign = $("#result-sign");
  sign.className = "result-sign " + (isMock ? (passed?"pass":"fail") : "neutral");
  sign.innerHTML = `<div class="result-sign-inner">
      <div class="big">${isMock ? (passed?"You passed":"Not yet") : "Session complete"}</div>
      <div class="score">${got} / ${total} correct · ${Math.round(got/total*100)}%</div>
    </div>`;

  $("#result-detail").innerHTML = isMock
    ? (passed
        ? `That's above the DMV's cut-off of <b>${MOCK_PASS} out of ${MOCK_LEN}</b>. Take it twice more and pass both times before you book the real thing.`
        : `The DMV needs <b>${MOCK_PASS} of ${MOCK_LEN}</b>. You missed ${total-got}. The questions below are the ones to review — they'll come back more often in practice mode.`)
    : `You answered ${total} questions. Anything you missed will resurface in future sessions until it sticks.`;

  $("#btn-again").textContent = isMock ? "Take another mock test" : "Another 12 questions";
  $("#btn-again").onclick = ()=>startRun(run.mode, run.topic);

  const missed = run.answers.filter(a=>!a.ok);
  const list = $("#review-list");
  list.innerHTML = missed.length ? `<h3 class="review-head">Review these ${missed.length}</h3>` : `<h3 class="review-head">Clean sweep — nothing missed.</h3>`;
  missed.forEach(a=>{
    const q = QS[a.id];
    const d = document.createElement("div");
    d.className = "review-item missed";
    const pic = (q.sign && SIGNS[q.sign]) ? `<span class="review-sign">${SIGNS[q.sign].svg}</span>` : "";
    d.innerHTML = `<div class="review-head-row">${pic}<h3>${q.q}</h3></div>
      <p class="your">Your answer: ${a.chosenText}</p>
      <p class="right">Correct: ${q.c[q.a]}</p>
      <p>${q.e}</p>`;
    list.appendChild(d);
  });
  renderSavePrompt();
  go("results");
}
$("#btn-result-home").onclick = ()=>go("home");
$("#btn-quit").onclick = ()=> run && run.answers.length ? results() : go("home");

/* ---------- home ---------- */
function renderHome(){
  renderGreeting();
  const acc = S.answered ? Math.round(S.correct/S.answered*100)+"%" : "–";
  $("#stat-streak").textContent = S.streak;
  $("#streak-num").textContent = S.streak;
  $("#stat-answered").textContent = S.answered;
  $("#stat-accuracy").textContent = acc;
  const strong = TOPICS.filter(t=>{ const r=S.topics[t.k]; return r && r.n>=5 && r.c/r.n>=0.8; }).length;
  $("#stat-mastered").innerHTML = `${strong}<i>/${TOPICS.length}</i>`;

  const grid = $("#topic-grid"); grid.innerHTML = "";
  TOPICS.forEach(t=>{
    const r = S.topics[t.k] || {n:0,c:0};
    const pct = r.n ? Math.round(r.c/r.n*100) : 0;
    const n = QS.filter(q=>q.t===t.k).length;
    const b = document.createElement("button");
    b.className = "topic-row";
    b.innerHTML = `<span class="topic-ico">${t.ico}</span>
      <span class="topic-meta">
        <span class="topic-name">${t.name}</span>
        <span class="topic-road"><i style="--p:${pct}%"></i></span>
      </span>
      <span class="topic-count">${r.n ? pct+"%" : n+" q"}</span>`;
    b.onclick = ()=>startRun("practice", t.k);
    grid.appendChild(b);
  });
}

/* ---------- signs gallery ---------- */
function renderSigns(){
  const g = $("#signs-grid"); g.innerHTML = "";
  const order = ["reg","warn","rail","work"];
  Object.values(SIGNS)
    .sort((a,b)=>order.indexOf(a.cat)-order.indexOf(b.cat))
    .forEach(s=>{
      const d = document.createElement("div");
      d.className = "sign-cell";
      d.innerHTML = `${s.svg}<b>${s.name}</b><span>${s.meaning}</span>`;
      g.appendChild(d);
    });
}

/* ---------- who's studying ---------- */
const initials = n => (n||"?").trim().charAt(0).toUpperCase() || "?";

function renderWho(){
  const chip = $("#chip-who");
  if (S.name){
    chip.innerHTML = `<span class="who-dot">${initials(S.name)}</span><b>${esc(S.name)}</b>`;
    chip.title = `Studying as ${S.name} — tap to switch`;
  } else {
    chip.innerHTML = `<span class="who-dot who-dot-empty">+</span><b>Save progress</b>`;
    chip.title = "Save your progress on this device";
  }
}

function renderGreeting(){
  const g = $("#greeting");
  if (S.name && S.answered > 0){
    const bits = [`Welcome back, <b>${esc(S.name)}</b>`];
    if (S.streak > 1) bits.push(`day ${S.streak} of your streak`);
    g.innerHTML = bits.join(" — ") + ".";
    g.hidden = false;
  } else g.hidden = true;
}

function renderPeople(){
  const list = $("#people-list"); list.innerHTML = "";
  Object.values(DB.profiles).forEach(p => {
    const row = document.createElement("div");
    row.className = "person" + (p.id === DB.activeId ? " is-active" : "");
    const label = p.name || "Unsaved progress";
    const acc = p.answered ? Math.round(p.correct/p.answered*100)+"% · " : "";
    row.innerHTML = `
      <button class="person-pick" type="button">
        <span class="who-dot">${initials(p.name)}</span>
        <span class="person-meta">
          <span class="person-name">${esc(label)}</span>
          <span class="person-sub">${acc}${p.answered} answered</span>
        </span>
        ${p.id === DB.activeId ? '<span class="person-tick" aria-hidden="true">✓</span>' : ""}
      </button>
      <button class="person-del" type="button" title="Remove ${esc(label)}" aria-label="Remove ${esc(label)}">×</button>`;
    row.querySelector(".person-pick").onclick = ()=>{ useProfile(p.id); closePeople(); };
    row.querySelector(".person-del").onclick = ()=>{
      if (confirm(`Remove ${label} and their progress from this device?`)) removeProfile(p.id);
    };
    list.appendChild(row);
  });
}

const openPeople  = ()=>{ renderPeople(); $("#people").hidden = false; $("#new-name").value = ""; };
const closePeople = ()=>{ $("#people").hidden = true; };

$("#chip-who").onclick   = openPeople;
$("#people-close").onclick = closePeople;
$("#people").onclick = e => { if (e.target.id === "people") closePeople(); };
$("#new-person").onsubmit = e => {
  e.preventDefault();
  const v = $("#new-name").value.trim();
  if (!v) return;
  addProfile(v); closePeople();
};

/* Offer to save progress once a session is done — never before. */
let askedThisSession = false;
function renderSavePrompt(){
  const slot = $("#save-slot");
  if (S.name || askedThisSession){ slot.innerHTML = ""; return; }
  slot.innerHTML = `
    <form class="save-card" id="save-form">
      <h3>Keep this progress?</h3>
      <p>Add a name so this device remembers your streak — and so someone else can study here without wiping it. Stays on this device; nothing is sent anywhere.</p>
      <div class="save-row">
        <label class="sr-only" for="save-name">Your name</label>
        <input id="save-name" type="text" placeholder="First name" maxlength="24" autocomplete="given-name">
        <button class="btn-primary" type="submit">Save</button>
      </div>
      <button class="linklike save-skip" type="button" id="save-skip">Not now</button>
    </form>`;
  $("#save-form").onsubmit = e => {
    e.preventDefault();
    const v = $("#save-name").value.trim();
    if (!v) { $("#save-name").focus(); return; }
    nameProfile(v);
    slot.innerHTML = `<p class="save-done">Saved. Welcome, <b>${esc(v)}</b> — your progress will be here next time.</p>`;
  };
  $("#save-skip").onclick = ()=>{ askedThisSession = true; slot.innerHTML = ""; };
}

/* ---------- wiring ---------- */
$("#btn-practice").onclick = ()=>startRun("practice", null);
$("#btn-mock").onclick     = ()=>startRun("mock", null);
$("#btn-home").onclick     = ()=>go("home");
$("#btn-signs-gallery").onclick = ()=>{ renderSigns(); go("signs"); };
$("#btn-signs-back").onclick    = ()=>go("home");

document.addEventListener("keydown", e=>{
  if ($("#view-quiz").hidden) return;
  if (!$("#explain").hidden && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); next(); return; }
  const k = "1234".indexOf(e.key);
  const btns = [...$("#choices").children];
  if (k>-1 && btns[k] && !btns[k].disabled) btns[k].click();
});

renderWho();
renderHome();
})();
