/* Road sign SVG library — drawn to MUTCD proportions, simplified.
   Each sign: { name, meaning, cat, svg }  cat: reg | warn | rail | work */
(function(){
const F = "font-family:'Overpass',sans-serif;font-weight:800;";
const S = {};

S.stop = {
  name:"Stop", cat:"reg",
  meaning:"Come to a complete stop at the limit line or before the crosswalk, then go when safe.",
  svg:`<svg viewBox="0 0 120 120"><polygon points="35,4 85,4 116,35 116,85 85,116 35,116 4,85 4,35" fill="#B3282D" stroke="#fff" stroke-width="5"/><text x="60" y="72" text-anchor="middle" fill="#fff" style="${F}font-size:30px">STOP</text></svg>`
};
S.yield = {
  name:"Yield", cat:"reg",
  meaning:"Slow down and give the right-of-way to traffic and pedestrians; stop if needed.",
  svg:`<svg viewBox="0 0 120 120"><polygon points="6,8 114,8 60,112" fill="#B3282D"/><polygon points="20,16 100,16 60,96" fill="#fff"/><text x="60" y="46" text-anchor="middle" fill="#B3282D" style="${F}font-size:19px">YIELD</text></svg>`
};
S.doNotEnter = {
  name:"Do Not Enter", cat:"reg",
  meaning:"Do not drive in — the road ahead is closed to you (usually the wrong end of a one-way).",
  svg:`<svg viewBox="0 0 120 120"><rect x="4" y="4" width="112" height="112" rx="8" fill="#fff" stroke="#22262A" stroke-width="2"/><circle cx="60" cy="60" r="46" fill="#B3282D"/><rect x="24" y="52" width="72" height="16" rx="3" fill="#fff"/></svg>`
};
S.wrongWay = {
  name:"Wrong Way", cat:"reg",
  meaning:"You are driving against traffic. Pull to the side, stop, and turn around when safe.",
  svg:`<svg viewBox="0 0 120 120"><rect x="4" y="28" width="112" height="64" rx="8" fill="#B3282D"/><text x="60" y="55" text-anchor="middle" fill="#fff" style="${F}font-size:19px">WRONG</text><text x="60" y="80" text-anchor="middle" fill="#fff" style="${F}font-size:19px">WAY</text></svg>`
};
S.oneWay = {
  name:"One Way", cat:"reg",
  meaning:"Traffic flows only in the direction of the arrow.",
  svg:`<svg viewBox="0 0 120 120"><rect x="4" y="38" width="112" height="44" rx="6" fill="#22262A"/><path d="M14 60l26-14v8h38v12H40v8z" fill="#fff" transform="translate(78,120) rotate(180)"/><text x="74" y="66" text-anchor="middle" fill="#fff" style="${F}font-size:14px">ONE WAY</text></svg>`
};
S.speedLimit = {
  name:"Speed Limit 65", cat:"reg",
  meaning:"The maximum legal speed in ideal conditions — not a target in rain, fog, or traffic.",
  svg:`<svg viewBox="0 0 120 120"><rect x="18" y="2" width="84" height="116" rx="10" fill="#fff" stroke="#22262A" stroke-width="4"/><text x="60" y="34" text-anchor="middle" style="${F}font-size:16px" fill="#22262A">SPEED</text><text x="60" y="54" text-anchor="middle" style="${F}font-size:16px" fill="#22262A">LIMIT</text><text x="60" y="102" text-anchor="middle" style="${F}font-size:42px" fill="#22262A">65</text></svg>`
};
S.noUturn = {
  name:"No U-Turn", cat:"reg",
  meaning:"U-turns are prohibited here, even if the way looks clear.",
  svg:`<svg viewBox="0 0 120 120"><rect x="4" y="4" width="112" height="112" rx="10" fill="#fff" stroke="#22262A" stroke-width="3"/><path d="M42 88V56a18 18 0 0 1 36 0v14" fill="none" stroke="#22262A" stroke-width="10"/><path d="M78 62l-14 14h28z" fill="#22262A"/><circle cx="60" cy="60" r="47" fill="none" stroke="#B3282D" stroke-width="9"/><line x1="27" y1="27" x2="93" y2="93" stroke="#B3282D" stroke-width="9"/></svg>`
};
S.noLeftTurn = {
  name:"No Left Turn", cat:"reg",
  meaning:"Left turns are prohibited at this intersection.",
  svg:`<svg viewBox="0 0 120 120"><rect x="4" y="4" width="112" height="112" rx="10" fill="#fff" stroke="#22262A" stroke-width="3"/><path d="M78 88V60a12 12 0 0 0-12-12H48" fill="none" stroke="#22262A" stroke-width="10"/><path d="M52 34v28l-22-14z" fill="#22262A"/><circle cx="60" cy="60" r="47" fill="none" stroke="#B3282D" stroke-width="9"/><line x1="27" y1="27" x2="93" y2="93" stroke="#B3282D" stroke-width="9"/></svg>`
};
S.keepRight = {
  name:"Keep Right", cat:"reg",
  meaning:"Stay to the right of the divider or island ahead.",
  svg:`<svg viewBox="0 0 120 120"><rect x="4" y="4" width="112" height="112" rx="10" fill="#fff" stroke="#22262A" stroke-width="3"/><ellipse cx="44" cy="60" rx="10" ry="34" fill="#22262A"/><path d="M62 96V64c0-10 4-14 12-14" fill="none" stroke="#22262A" stroke-width="10"/><path d="M70 36l20 14-24 12z" fill="#22262A"/></svg>`
};
S.signalAhead = {
  name:"Signal Ahead", cat:"warn",
  meaning:"A traffic light is coming — be ready to stop, especially if it has been green a while.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><rect x="46" y="30" width="28" height="60" rx="8" fill="#22262A"/><circle cx="60" cy="44" r="7" fill="#B3282D"/><circle cx="60" cy="60" r="7" fill="#FFC72C"/><circle cx="60" cy="76" r="7" fill="#2EBF7B"/></svg>`
};
S.merge = {
  name:"Merging Traffic", cat:"warn",
  meaning:"Traffic enters your lane ahead — adjust speed and position to let them blend in.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><path d="M54 92V54c0-8 2-12 8-18" fill="none" stroke="#22262A" stroke-width="9"/><path d="M54 92V36" stroke="#22262A" stroke-width="9"/><path d="M54 24l-9 18h18z" fill="#22262A"/><path d="M78 40l-4 20-12-14z" fill="#22262A"/></svg>`
};
S.laneEnds = {
  name:"Lane Ends", cat:"warn",
  meaning:"Your lane is ending — merge early, and take turns (zipper) in heavy traffic.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><path d="M46 94V26" stroke="#22262A" stroke-width="8"/><path d="M76 94c0-28 0-40-14-54" fill="none" stroke="#22262A" stroke-width="8"/></svg>`
};
S.twoWay = {
  name:"Two-Way Traffic", cat:"warn",
  meaning:"You are leaving a one-way — oncoming traffic ahead. Keep right.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><path d="M46 88V44" stroke="#22262A" stroke-width="9"/><path d="M46 28l-10 18h20z" fill="#22262A"/><path d="M74 32v44" stroke="#22262A" stroke-width="9"/><path d="M74 92l-10-18h20z" fill="#22262A"/></svg>`
};
S.slippery = {
  name:"Slippery When Wet", cat:"warn",
  meaning:"The road is extra slick in rain — slow down and avoid sudden moves.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><rect x="44" y="30" width="30" height="16" rx="5" fill="#22262A" transform="rotate(-14 60 38)"/><circle cx="46" cy="50" r="5" fill="#22262A"/><circle cx="72" cy="44" r="5" fill="#22262A"/><path d="M40 66c8-6 14 6 22 0s12 6 20 0" fill="none" stroke="#22262A" stroke-width="6"/><path d="M38 84c8-6 14 6 22 0s12 6 20 0" fill="none" stroke="#22262A" stroke-width="6"/></svg>`
};
S.dividedHwy = {
  name:"Divided Highway", cat:"warn",
  meaning:"The road ahead splits around a median — keep to the right side.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><ellipse cx="60" cy="52" rx="9" ry="24" fill="#22262A"/><path d="M44 92c0-20 0-28 4-34" fill="none" stroke="#22262A" stroke-width="8"/><path d="M50 40l-6-14-10 12z" fill="#22262A"/><path d="M76 92c0-20 0-28-4-34" fill="none" stroke="#22262A" stroke-width="8"/><path d="M70 40l6-14 10 12z" fill="#22262A"/></svg>`
};
S.crossroad = {
  name:"Crossroad Ahead", cat:"warn",
  meaning:"A four-way intersection is ahead — watch for entering and crossing traffic.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><path d="M60 28v64M28 60h64" stroke="#22262A" stroke-width="11"/></svg>`
};
S.curve = {
  name:"Curve Ahead", cat:"warn",
  meaning:"The road bends ahead — slow down before you enter the curve.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><path d="M50 92c0-22 2-30 16-38" fill="none" stroke="#22262A" stroke-width="10"/><path d="M62 44l22-8-8 22z" fill="#22262A"/></svg>`
};
S.pedXing = {
  name:"Pedestrian Crossing", cat:"warn",
  meaning:"People may be crossing ahead — slow down and be ready to yield.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><circle cx="58" cy="36" r="7" fill="#22262A"/><path d="M58 44l-4 18-10 16M58 44l6 16 8 16M46 56l12-6 14 4" stroke="#22262A" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`
};
S.school = {
  name:"School Zone", cat:"warn",
  meaning:"School area — the fluorescent yellow-green pentagon means children may be crossing. 25 mph (or as posted) when children are present.",
  svg:`<svg viewBox="0 0 120 120"><polygon points="60,4 114,40 114,114 6,114 6,40" fill="#C7E540" stroke="#22262A" stroke-width="3"/><circle cx="46" cy="46" r="7" fill="#22262A"/><circle cx="74" cy="42" r="7" fill="#22262A"/><path d="M46 54l-2 20-8 24M46 54l8 18 2 26M74 50l-4 22-8 26M74 50l8 20 6 24" stroke="#22262A" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`
};
S.rrAdvance = {
  name:"Railroad Ahead", cat:"rail",
  meaning:"A railroad crossing is ahead — slow, look, listen, and never stop on the tracks.",
  svg:`<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><path d="M28 28l64 64M92 28l-64 64" stroke="#22262A" stroke-width="9"/><text x="34" y="52" style="${F}font-size:24px" fill="#22262A">R</text><text x="72" y="52" style="${F}font-size:24px" fill="#22262A">R</text></svg>`
};
S.crossbuck = {
  name:"Railroad Crossbuck", cat:"rail",
  meaning:"Marks the crossing itself — treat it like a yield sign to the train. Trains always win.",
  svg:`<svg viewBox="0 0 120 120"><g transform="rotate(-30 60 60)"><rect x="6" y="48" width="108" height="22" rx="4" fill="#fff" stroke="#22262A" stroke-width="2.5"/><text x="60" y="64" text-anchor="middle" style="${F}font-size:12px" fill="#22262A">RAILROAD</text></g><g transform="rotate(30 60 60)"><rect x="6" y="48" width="108" height="22" rx="4" fill="#fff" stroke="#22262A" stroke-width="2.5"/><text x="60" y="64" text-anchor="middle" style="${F}font-size:12px" fill="#22262A">CROSSING</text></g></svg>`
};
S.noPassing = {
  name:"No Passing Zone", cat:"warn",
  meaning:"The yellow pennant on the left side of the road — do not pass until the zone ends.",
  svg:`<svg viewBox="0 0 120 120"><polygon points="8,18 112,60 8,102" fill="#FFC72C" stroke="#22262A" stroke-width="3"/><text x="38" y="52" style="${F}font-size:11px" fill="#22262A">NO</text><text x="30" y="68" style="${F}font-size:11px" fill="#22262A">PASSING</text><text x="34" y="84" style="${F}font-size:11px" fill="#22262A">ZONE</text></svg>`
};
S.roadWork = {
  name:"Road Work", cat:"work",
  meaning:"Orange means construction — slow down, obey flaggers, and expect fines to double.",
  svg:`<svg viewBox="0 0 120 120"><rect x="14" y="14" width="92" height="92" rx="10" transform="rotate(45 60 60)" fill="#E8762C" stroke="#22262A" stroke-width="3"/><circle cx="54" cy="38" r="7" fill="#22262A"/><path d="M54 46l-4 20 0 22M54 46l10 8 16-4M50 66l16 6" stroke="#22262A" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M34 90h52" stroke="#22262A" stroke-width="7"/><path d="M70 52l12 34" stroke="#22262A" stroke-width="5"/></svg>`
};

window.SIGNS = S;
})();
