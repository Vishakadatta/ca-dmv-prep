/* Animated top-down road diagrams — the visual explanations.
   Each diagram is a self-contained SVG string with its own scoped
   keyframes (unique prefixes so several can live in one page). */
(function(){

const ASPHALT="#363B41", GRASS="#E3E9DF", LANE="#F5F5F2", YELLOW="#F2C230",
      YOU="#2E7CC0", OTHER="#9AA3A8", GOOD="#2EBF7B", BAD="#C94F4F";

/* a car drawn centered at origin, nose pointing up */
function car(x,y,deg,color,cls){
  return `<g class="${cls||""}" transform="translate(${x},${y})">
    <g transform="rotate(${deg})">
      <rect x="-13" y="-24" width="26" height="48" rx="8" fill="${color}" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/>
      <rect x="-9" y="-14" width="18" height="9" rx="3" fill="rgba(255,255,255,.5)"/>
      <rect x="-9" y="9" width="18" height="7" rx="3" fill="rgba(255,255,255,.3)"/>
    </g></g>`;
}
function youBadge(x,y){
  return `<g transform="translate(${x},${y})"><rect x="-22" y="-11" width="44" height="22" rx="11" fill="#22262A"/><text x="0" y="5" text-anchor="middle" fill="#fff" style="font-family:'Overpass',sans-serif;font-weight:800;font-size:11px">YOU</text></g>`;
}
function chip(x,y,w,txt,fill,color){
  return `<g transform="translate(${x},${y})"><rect x="${-w/2}" y="-12" width="${w}" height="24" rx="12" fill="${fill||"#22262A"}"/><text x="0" y="4.5" text-anchor="middle" fill="${color||"#fff"}" style="font-family:'Overpass',sans-serif;font-weight:700;font-size:11px">${txt}</text></g>`;
}
function num(x,y,n){
  return `<g transform="translate(${x},${y})"><circle r="11" fill="#FFC72C" stroke="#22262A" stroke-width="2"/><text y="4.5" text-anchor="middle" style="font-family:'Overpass',sans-serif;font-weight:800;font-size:12px" fill="#22262A">${n}</text></g>`;
}
const wrap=(style,body)=>`<svg viewBox="0 0 440 300" role="img"><style>${style}</style><rect width="440" height="300" fill="${GRASS}"/>${body}</svg>`;

/* standard cross intersection: vertical road x160-280, horizontal road y90-210 */
function cross(){
  return `<rect x="160" y="0" width="120" height="300" fill="${ASPHALT}"/>
  <rect x="0" y="90" width="440" height="120" fill="${ASPHALT}"/>
  <line x1="220" y1="0" x2="220" y2="78" stroke="${YELLOW}" stroke-width="3"/>
  <line x1="220" y1="222" x2="220" y2="300" stroke="${YELLOW}" stroke-width="3"/>
  <line x1="0" y1="150" x2="148" y2="150" stroke="${YELLOW}" stroke-width="3"/>
  <line x1="292" y1="150" x2="440" y2="150" stroke="${YELLOW}" stroke-width="3"/>
  <g stroke="${LANE}" stroke-width="4">
    <line x1="164" y1="214" x2="216" y2="214"/><line x1="224" y1="86" x2="276" y2="86"/>
    <line x1="156" y1="94" x2="156" y2="146"/><line x1="284" y1="154" x2="284" y2="206"/>
  </g>`;
}

const D = {};

/* ---------- 1. FOUR-WAY STOP (tie -> car on the right goes) ---------- */
D.fourWayStop = () => wrap(`
  .fws-r{animation:fws-r 8s ease-in-out infinite}
  .fws-y{animation:fws-y 8s ease-in-out infinite}
  .fws-w1{animation:fws-w1 8s steps(1) infinite}
  .fws-w2{animation:fws-w2 8s steps(1) infinite}
  @keyframes fws-r{0%{transform:translate(0,-70)}14%,30%{transform:translate(0,0)}62%{transform:translate(-300,0)}63%,100%{transform:translate(-300,0);opacity:0}}
  @keyframes fws-y{0%{transform:translate(0,70)}14%,62%{transform:translate(0,0)}92%{transform:translate(0,-300)}93%,100%{transform:translate(0,-300);opacity:0}}
  @keyframes fws-w1{0%,14%{opacity:0}15%,60%{opacity:1}61%,100%{opacity:0}}
  @keyframes fws-w2{0%,60%{opacity:0}61%,100%{opacity:1}}`,
  cross()
  + `<g class="fws-r">`+car(335,120,-90,OTHER)+`</g>`
  + `<g class="fws-y">`+car(250,250,0,YOU)+`</g>`
  + youBadge(300,278)
  + `<g class="fws-w1">`+chip(120,250,150,"both arrive together","#22262A")+`</g>`
  + `<g class="fws-w2">`+chip(120,250,150,"now you go","#2EBF7B")+`</g>`
  + chip(220,22,300,"Tie at a 4-way stop \u2192 the car on your RIGHT goes")
);

/* ---------- 2. RIGHT TURN ON RED → NEAREST LANE ---------- */
D.rightOnRed = () => {
  const road = `<rect x="160" y="0" width="120" height="300" fill="${ASPHALT}"/>
  <rect x="0" y="70" width="440" height="160" fill="${ASPHALT}"/>
  <line x1="0" y1="150" x2="150" y2="150" stroke="${YELLOW}" stroke-width="3"/><line x1="290" y1="150" x2="440" y2="150" stroke="${YELLOW}" stroke-width="3"/>
  <g stroke="${LANE}" stroke-width="3" stroke-dasharray="10 10">
    <line x1="0" y1="110" x2="150" y2="110"/><line x1="290" y1="110" x2="440" y2="110"/>
    <line x1="0" y1="190" x2="150" y2="190"/><line x1="290" y1="190" x2="440" y2="190"/>
  </g>
  <rect x="290" y="152" width="150" height="38" fill="${GOOD}" opacity=".28"/>
  <rect x="290" y="192" width="150" height="38" fill="${GOOD}" opacity=".28"/>
  <line x1="164" y1="234" x2="276" y2="234" stroke="${LANE}" stroke-width="5"/>`;
  return wrap(`
  .ror-y{animation:ror-y 9s ease-in-out infinite}
  .ror-t{animation:ror-t 9s ease-in-out infinite;transform-origin:285px 245px}
  .ror-red{animation:ror-red 9s steps(1) infinite}
  .ror-ok{animation:ror-ok 9s steps(1) infinite}
  @keyframes ror-y{0%{transform:translate(0,25);opacity:1}14%,42%{transform:translate(0,0)}64%,65%{transform:translate(0,0)}66%{transform:translate(0,0)}88%{transform:translate(150,0)}89%,100%{transform:translate(150,0);opacity:0}}
  @keyframes ror-t{0%,42%{transform:rotate(0deg)}64%,100%{transform:rotate(90deg)}}
  @keyframes ror-red{0%,60%{opacity:1}61%,100%{opacity:.25}}
  @keyframes ror-ok{0%,60%{opacity:0}61%,100%{opacity:1}}`,
  road
  + `<g class="ror-y"><g class="ror-t">`+car(250,245,0,YOU)+`</g></g>`
  + `<g transform="translate(305,60)"><rect x="-14" y="-40" width="28" height="56" rx="8" fill="#22262A"/><circle class="ror-red" cy="-24" r="8" fill="#E5484D"/><circle cy="-6" r="8" fill="#5a5148"/><circle class="ror-ok" cy="12" r="8" fill="#2EBF7B" opacity="0"/></g>`
  + youBadge(210,278)
  + chip(220,22,300,"Red: STOP fully → then turn into the nearest lane")
  + chip(365,171,110,"nearest lane ✓",GOOD)
);};

/* ---------- 3. LEFT TURN → CORRECT LANE ---------- */
D.leftTurnTarget = () => {
  const road = `<rect x="160" y="0" width="120" height="300" fill="${ASPHALT}"/>
  <rect x="0" y="70" width="440" height="160" fill="${ASPHALT}"/>
  <line x1="0" y1="150" x2="150" y2="150" stroke="${YELLOW}" stroke-width="3"/><line x1="290" y1="150" x2="440" y2="150" stroke="${YELLOW}" stroke-width="3"/>
  <g stroke="${LANE}" stroke-width="3" stroke-dasharray="10 10">
    <line x1="0" y1="110" x2="150" y2="110"/><line x1="290" y1="110" x2="440" y2="110"/>
    <line x1="0" y1="190" x2="150" y2="190"/><line x1="290" y1="190" x2="440" y2="190"/>
  </g>
  <rect x="0" y="112" width="150" height="36" fill="${GOOD}" opacity=".28"/>
  <rect x="0" y="72" width="150" height="36" fill="${BAD}" opacity=".22"/>`;
  return wrap(`
  .ltt-y{animation:ltt-y 8s ease-in-out infinite}
  .ltt-t{animation:ltt-t 8s ease-in-out infinite;transform-origin:180px 200px}
  @keyframes ltt-y{0%{transform:translate(0,60);opacity:1}25%,35%{transform:translate(0,0)}70%{transform:translate(0,0)}71%{transform:translate(0,0)}95%{transform:translate(-160,0)}96%,100%{transform:translate(-160,0);opacity:0}}
  @keyframes ltt-t{0%,35%{transform:rotate(0deg)}68%,100%{transform:rotate(-90deg)}}`,
  road
  + `<g class="ltt-y"><g class="ltt-t">`+car(250,200,0,YOU)+`</g></g>`
  + youBadge(210,278)
  + chip(220,22,320,"Finish the left turn in the lane nearest the center line")
  + chip(75,130,44,"✓",GOOD) + chip(75,90,44,"✕",BAD)
);};

/* ---------- 4. ROUNDABOUT ---------- */
D.roundabout = () => wrap(`
  .rab-c{animation:rab-c 5s linear infinite;transform-origin:220px 150px}
  .rab-y{animation:rab-y 10s ease-in-out infinite}
  .rab-r{animation:rab-r 10s ease-in-out infinite;transform-origin:220px 150px}
  @keyframes rab-c{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
  @keyframes rab-y{0%{transform:translate(0,55);opacity:1}22%,48%{transform:translate(0,0)}100%{transform:translate(0,0);opacity:1}}
  @keyframes rab-r{0%,48%{transform:rotate(0)}78%{transform:rotate(-100deg)}79%,100%{transform:rotate(-100deg);opacity:0}}`,
  `<circle cx="220" cy="150" r="112" fill="${ASPHALT}"/>
   <rect x="196" y="238" width="52" height="62" fill="${ASPHALT}"/>
   <rect x="330" y="126" width="110" height="52" fill="${ASPHALT}"/>
   <rect x="0" y="126" width="112" height="52" fill="${ASPHALT}"/>
   <rect x="196" y="0" width="52" height="64" fill="${ASPHALT}"/>
   <circle cx="220" cy="150" r="52" fill="${GRASS}" stroke="${LANE}" stroke-width="3"/>
   <g fill="none" stroke="${LANE}" stroke-width="3" opacity=".85">
     <path d="M300 150a80 80 0 0 1-80 80" stroke-dasharray="8 9"/>
     <path d="M140 150a80 80 0 0 1 80-80" stroke-dasharray="8 9"/>
   </g>
   <g fill="${LANE}"><path d="M282 88l16 18-26 4z"/><path d="M158 212l-16-18 26-4z"/></g>
   <line x1="196" y1="240" x2="244" y2="240" stroke="${LANE}" stroke-width="5" stroke-dasharray="7 6"/>`
  + `<g class="rab-c">`+car(140,150,180,OTHER)+`</g>`
  + `<g class="rab-y"><g class="rab-r">`+car(220,225,90,YOU)+`</g></g>`
  + youBadge(280,272)
  + chip(220,22,330,"Yield to traffic already circling — then enter to the right")
);

/* ---------- 5. SCHOOL BUS ---------- */
D.schoolBus = () => wrap(`
  .sb-l1{animation:sb-b 1s steps(1) infinite}
  .sb-l2{animation:sb-b 1s steps(1) .5s infinite}
  .sb-y{animation:sb-y 7s ease-out infinite}
  .sb-o{animation:sb-o 7s ease-out infinite}
  @keyframes sb-b{0%{opacity:1}50%{opacity:.15}100%{opacity:1}}
  @keyframes sb-y{0%{transform:translate(-120,0)}30%,100%{transform:translate(0,0)}}
  @keyframes sb-o{0%{transform:translate(130,0)}30%,100%{transform:translate(0,0)}}`,
  `<rect x="0" y="80" width="440" height="140" fill="${ASPHALT}"/>
   <line x1="0" y1="150" x2="440" y2="150" stroke="${YELLOW}" stroke-width="3"/>
   <line x1="0" y1="149" x2="440" y2="149" stroke="${ASPHALT}" stroke-width="1"/>`
  + `<g transform="translate(330,185)"><rect x="-48" y="-20" width="96" height="40" rx="9" fill="#FFC72C" stroke="#22262A" stroke-width="2"/><text x="0" y="5" text-anchor="middle" style="font-family:'Overpass',sans-serif;font-weight:800;font-size:12px" fill="#22262A">SCHOOL BUS</text><circle class="sb-l1" cx="-40" cy="-26" r="6" fill="#E5484D"/><circle class="sb-l2" cx="40" cy="-26" r="6" fill="#E5484D"/><g transform="translate(-56,0)"><polygon points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7" fill="#B3282D" stroke="#fff" stroke-width="2"/><text y="4" text-anchor="middle" fill="#fff" style="font-family:'Overpass',sans-serif;font-weight:800;font-size:8px">STOP</text></g></g>`
  + `<g class="sb-y">`+car(150,185,90,YOU)+`</g>`
  + `<g class="sb-o">`+car(150,115,-90,OTHER)+`</g>`
  + youBadge(150,222)
  + chip(220,22,330,"Flashing red = BOTH directions stop (undivided road)")
  + chip(150,52,150,"oncoming stops too","#22262A")
);

/* ---------- 6. HILL PARKING ---------- */
D.hillParking = () => {
  const panel=(x,title)=>`<g transform="translate(${x},0)">
    <rect x="8" y="46" width="128" height="244" rx="10" fill="#fff" opacity=".55"/>
    <text x="72" y="34" text-anchor="middle" style="font-family:'Overpass',sans-serif;font-weight:800;font-size:14px" fill="#22262A">${title}</text></g>`;
  const wheels=(x,y,deg,carDeg)=>`<g transform="translate(${x},${y}) rotate(${carDeg})"><g transform="translate(-15,-16) rotate(${deg})"><rect x="-3" y="-8" width="6" height="16" rx="2" fill="#22262A"/></g><g transform="translate(15,-16) rotate(${deg})"><rect x="-3" y="-8" width="6" height="16" rx="2" fill="#22262A"/></g></g>`;
  return `<svg viewBox="0 0 440 300" role="img"><style>
    .hp-r{animation:hp-r 3s ease-in-out infinite}
    @keyframes hp-r{0%,20%{transform:translate(0,0)}55%{transform:translate(0,7)}100%{transform:translate(0,7)}}
  </style><rect width="440" height="300" fill="${GRASS}"/>
  <text x="220" y="20" text-anchor="middle" style="font-family:'Overpass',sans-serif;font-weight:700;font-size:12px" fill="#6B7470">UPHILL IS TOWARD THE TOP ↑</text>`
  + panel(4,"Downhill")+panel(150,"Uphill + curb")+panel(296,"Uphill, no curb")
  /* Downhill: car faces down, curb strip on screen-left of panel, wheels toward curb */
  + `<g transform="translate(4,0)"><rect x="18" y="56" width="10" height="224" fill="#9AA3A8"/>
     <g class="hp-r">`+car(60,160,180,YOU)+wheels(60,160,-32,180)+`</g>
     <path d="M60 205v34l-14 14" fill="none" stroke="#22262A" stroke-width="3" stroke-dasharray="5 5"/>
     <text x="72" y="272" text-anchor="middle" style="font-family:'Overpass',sans-serif;font-weight:700;font-size:11px" fill="#22262A">wheels TOWARD curb</text></g>`
  /* Uphill + curb: car faces up, curb on screen-right, wheels away from curb */
  + `<g transform="translate(150,0)"><rect x="116" y="56" width="10" height="224" fill="#9AA3A8"/>
     <g class="hp-r">`+car(78,160,0,YOU)+wheels(78,160,-32,0)+`</g>
     <path d="M78 205v34l14 14" fill="none" stroke="#22262A" stroke-width="3" stroke-dasharray="5 5"/>
     <text x="72" y="272" text-anchor="middle" style="font-family:'Overpass',sans-serif;font-weight:700;font-size:11px" fill="#22262A">wheels AWAY from curb</text></g>`
  /* Uphill no curb: wheels toward edge */
  + `<g transform="translate(296,0)">
     <g class="hp-r">`+car(72,160,0,YOU)+wheels(72,160,32,0)+`</g>
     <path d="M72 205v34l14 14" fill="none" stroke="#22262A" stroke-width="3" stroke-dasharray="5 5"/>
     <text x="72" y="272" text-anchor="middle" style="font-family:'Overpass',sans-serif;font-weight:700;font-size:11px" fill="#22262A">wheels toward the edge</text></g>`
  + `<text x="220" y="296" text-anchor="middle" style="font-family:'Lora',serif;font-style:italic;font-size:11px" fill="#6B7470">If it rolls, it rolls off the road — not into traffic. Always set the parking brake.</text></svg>`;
};

/* ---------- 7. EMERGENCY VEHICLE ---------- */
D.emergency = () => wrap(`
  .em-a{animation:em-a 7s ease-in-out infinite}
  .em-y{animation:em-y 7s ease-in-out infinite}
  .em-f1{animation:sb-b2 .6s steps(1) infinite}
  .em-f2{animation:sb-b2 .6s steps(1) .3s infinite}
  @keyframes sb-b2{0%{opacity:1}50%{opacity:.1}100%{opacity:1}}
  @keyframes em-a{0%{transform:translate(-150,0)}45%{transform:translate(60,0)}90%,100%{transform:translate(520,0)}}
  @keyframes em-y{0%{transform:translate(0,0)}30%{transform:translate(45,42)}40%,100%{transform:translate(60,42)}}`,
  `<rect x="0" y="70" width="440" height="160" fill="${ASPHALT}"/>
   <line x1="0" y1="150" x2="440" y2="150" stroke="${YELLOW}" stroke-width="3"/>
   <g stroke="${LANE}" stroke-width="3" stroke-dasharray="10 10"><line x1="0" y1="110" x2="440" y2="110"/></g>
   <line x1="0" y1="226" x2="440" y2="226" stroke="${LANE}" stroke-width="4"/>`
  + `<g class="em-y">`+car(180,188,90,YOU)+`</g>`
  + `<g class="em-a"><g transform="translate(60,188)"><g transform="rotate(90)"><rect x="-15" y="-30" width="30" height="60" rx="8" fill="#fff" stroke="#B3282D" stroke-width="3"/><rect x="-9" y="-8" width="18" height="16" fill="#B3282D"/><rect x="-3" y="-14" width="6" height="28" fill="#B3282D"/><circle class="em-f1" cy="-24" r="5" fill="#E5484D"/><circle class="em-f2" cy="24" r="5" fill="#2E7CC0"/></g></g></g>`
  + youBadge(150,258)
  + chip(220,22,320,"Siren behind you → pull to the RIGHT edge and stop")
);

/* ---------- 8. PASSING A CYCLIST ---------- */
D.bikePass = () => wrap(`
  .bp-b{animation:bp-b 8s linear infinite}
  .bp-y{animation:bp-y 8s ease-in-out infinite}
  @keyframes bp-b{0%{transform:translate(0,0)}100%{transform:translate(130,0)}}
  @keyframes bp-y{0%{transform:translate(-40,0)}30%{transform:translate(90,-42)}70%{transform:translate(300,-42)}100%{transform:translate(480,0)}}`,
  `<rect x="0" y="70" width="440" height="160" fill="${ASPHALT}"/>
   <line x1="0" y1="150" x2="440" y2="150" stroke="${YELLOW}" stroke-width="3" stroke-dasharray="16 12"/>
   <line x1="0" y1="226" x2="440" y2="226" stroke="${LANE}" stroke-width="4"/>`
  + `<g class="bp-b"><g transform="translate(150,208)"><circle r="6" fill="#22262A"/><rect x="-3" y="-16" width="6" height="14" rx="3" fill="#7A4E9E"/><circle cy="-19" r="5" fill="#E9B87A"/></g></g>`
  + `<g class="bp-y">`+car(110,188,90,YOU)+`</g>`
  + `<g transform="translate(255,186)"><line x1="0" y1="-38" x2="0" y2="16" stroke="#22262A" stroke-width="2" stroke-dasharray="4 4"/></g>`
  + chip(300,166,110,"3 ft minimum","#22262A")
  + chip(220,22,300,"Give at least 3 feet — or slow down and wait")
);

/* ---------- 9. UNPROTECTED LEFT ON GREEN ---------- */
D.unprotectedLeft = () => wrap(`
  .ul-o{animation:ul-o 8s ease-in-out infinite}
  .ul-y{animation:ul-y 8s ease-in-out infinite}
  .ul-t{animation:ul-t 8s ease-in-out infinite;transform-origin:150px 195px}
  @keyframes ul-o{0%{transform:translate(0,-60);opacity:1}45%{transform:translate(0,260)}46%,100%{transform:translate(0,260);opacity:0}}
  @keyframes ul-y{0%{transform:translate(0,40);opacity:1}20%,50%{transform:translate(0,0)}82%{transform:translate(0,0)}96%{transform:translate(-140,0)}97%,100%{transform:translate(-140,0);opacity:0}}
  @keyframes ul-t{0%,50%{transform:rotate(0)}80%,100%{transform:rotate(-90deg)}}`,
  cross()
  + `<g transform="translate(310,60)"><rect x="-13" y="-38" width="26" height="52" rx="7" fill="#22262A"/><circle cy="-24" r="7" fill="#4a4239"/><circle cy="-8" r="7" fill="#4a4239"/><circle cy="8" r="7" fill="#2EBF7B"/></g>`
  + `<g class="ul-o">`+car(190,30,180,OTHER)+`</g>`
  + `<g class="ul-y"><g class="ul-t">`+car(220,195,0,YOU)+`</g></g>`
  + youBadge(280,260)
  + chip(220,22,340,"Green light ≠ your turn: yield to oncoming, then turn")
);

/* ---------- 10. FREEWAY MERGE ---------- */
D.mergeFreeway = () => wrap(`
  .mf-1{animation:mf-1 6s linear infinite}
  .mf-2{animation:mf-2 6s linear infinite}
  .mf-y{animation:mf-y 6s ease-in infinite}
  @keyframes mf-1{0%{transform:translate(0,0)}100%{transform:translate(460,0)}}
  @keyframes mf-2{0%{transform:translate(0,0)}100%{transform:translate(460,0)}}
  @keyframes mf-y{0%{transform:translate(0,0) rotate(0)}55%{transform:translate(205,-52) rotate(-28deg)}75%{transform:translate(300,-64) rotate(0)}100%{transform:translate(470,-64) rotate(0)}}`,
  `<rect x="0" y="60" width="440" height="120" fill="${ASPHALT}"/>
   <g stroke="${LANE}" stroke-width="3" stroke-dasharray="12 10"><line x1="0" y1="120" x2="440" y2="120"/></g>
   <path d="M0 300 L60 300 L300 180 L120 180 Z" fill="${ASPHALT}"/>
   <line x1="0" y1="64" x2="440" y2="64" stroke="${LANE}" stroke-width="4"/>
   <line x1="150" y1="178" x2="300" y2="178" stroke="${LANE}" stroke-width="3" stroke-dasharray="8 8"/>`
  + `<g class="mf-1">`+car(-60,90,90,OTHER)+`</g>`
  + `<g class="mf-2">`+car(-190,150,90,OTHER)+`</g>`
  + `<g class="mf-y"><g transform="translate(60,245)"><g transform="rotate(63)"><rect x="-13" y="-24" width="26" height="48" rx="8" fill="${YOU}" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/><rect x="-9" y="-14" width="18" height="9" rx="3" fill="rgba(255,255,255,.5)"/></g></g></g>`
  + youBadge(45,285)
  + chip(220,22,330,"Use the ramp to reach traffic speed, merge into a gap")
);

/* ---------- 11. THREE-SECOND RULE ---------- */
D.following3s = () => wrap(`
  .f3-a{animation:f3-a 6s linear infinite}
  .f3-b{animation:f3-b 6s linear infinite}
  .f3-n1{animation:f3-n 6s steps(1) infinite}
  .f3-n2{animation:f3-n2 6s steps(1) infinite}
  .f3-n3{animation:f3-n3 6s steps(1) infinite}
  @keyframes f3-a{0%{transform:translate(0,0)}100%{transform:translate(430,0)}}
  @keyframes f3-b{0%{transform:translate(0,0)}100%{transform:translate(430,0)}}
  @keyframes f3-n{0%,28%{opacity:0}29%,100%{opacity:1}}
  @keyframes f3-n2{0%,45%{opacity:0}46%,100%{opacity:1}}
  @keyframes f3-n3{0%,62%{opacity:0}63%,100%{opacity:1}}`,
  `<rect x="0" y="90" width="440" height="120" fill="${ASPHALT}"/>
   <line x1="0" y1="150" x2="440" y2="150" stroke="${YELLOW}" stroke-width="3" stroke-dasharray="16 12"/>
   <g transform="translate(300,74)"><rect x="-4" y="0" width="8" height="18" fill="#8a6d4f"/><rect x="-18" y="-26" width="36" height="28" rx="4" fill="#2EBF7B" stroke="#fff" stroke-width="2"/><text y="-7" text-anchor="middle" fill="#fff" style="font-family:'Overpass',sans-serif;font-weight:800;font-size:11px">MARK</text></g>`
  + `<g class="f3-a">`+car(-40,185,90,OTHER)+`</g>`
  + `<g class="f3-b">`+car(-190,185,90,YOU)+`</g>`
  + `<text class="f3-n1" x="150" y="260" text-anchor="middle" style="font-family:'Overpass Mono',monospace;font-weight:700;font-size:22px" fill="#22262A">1…</text>
     <text class="f3-n2" x="220" y="260" text-anchor="middle" style="font-family:'Overpass Mono',monospace;font-weight:700;font-size:22px" fill="#22262A">2…</text>
     <text class="f3-n3" x="290" y="260" text-anchor="middle" style="font-family:'Overpass Mono',monospace;font-weight:700;font-size:22px" fill="#22262A">3</text>`
  + chip(220,22,340,"Lead car passes the mark → count 3s before YOU reach it")
);

/* ---------- 12. CENTER LEFT-TURN LANE ---------- */
D.centerTurnLane = () => wrap(`
  .ctl-y{animation:ctl-y 8s ease-in-out infinite}
  .ctl-t{animation:ctl-t 8s ease-in-out infinite;transform-origin:250px 150px}
  @keyframes ctl-y{0%{transform:translate(-160,0)}30%{transform:translate(-60,0)}48%,60%{transform:translate(0,0)}61%{transform:translate(0,0)}85%{transform:translate(0,-120)}86%,100%{transform:translate(0,-120);opacity:0}}
  @keyframes ctl-t{0%,30%{transform:rotate(0)}48%,60%{transform:rotate(0)}80%,100%{transform:rotate(-90deg)}}`,
  `<rect x="0" y="70" width="440" height="160" fill="${ASPHALT}"/>
   <rect x="230" y="20" width="80" height="50" fill="${ASPHALT}"/>
   <g stroke="${YELLOW}" stroke-width="3">
     <line x1="0" y1="118" x2="440" y2="118"/><line x1="0" y1="124" x2="440" y2="124" stroke-dasharray="12 10"/>
     <line x1="0" y1="182" x2="440" y2="182"/><line x1="0" y1="176" x2="440" y2="176" stroke-dasharray="12 10"/>
   </g>
   <text x="360" y="156" text-anchor="middle" style="font-family:'Overpass',sans-serif;font-weight:800;font-size:13px" fill="${LANE}" opacity=".8">CENTER TURN LANE</text>
   <text x="270" y="44" style="font-family:'Overpass',sans-serif;font-weight:700;font-size:11px" fill="#6B7470">driveway</text>`
  /* car eastbound in right lane, moves into center lane, then turns left up into driveway */
  + `<g class="ctl-y"><g transform="translate(0,0)"><g class="ctl-t"><g transform="translate(250,150)"><g transform="rotate(90)"><rect x="-13" y="-24" width="26" height="48" rx="8" fill="${YOU}" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/><rect x="-9" y="-14" width="18" height="9" rx="3" fill="rgba(255,255,255,.5)"/></g></g></g></g></g>`
  + chip(220,272,360,"Enter the two-way turn lane early — turn only when clear")
);

/* diagram captions used by the app for accessibility */
window.DIAGRAMS = D;
})();
