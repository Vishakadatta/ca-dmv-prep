/* Question bank — grounded in the California Driver's Handbook (DL 600, 2025).
   q: question · c: choices · a: index of correct answer · e: explanation
   t: topic key · sign: key into SIGNS · dia: key into DIAGRAMS */
(function(){

const TOPICS = [
  {k:"signs",   name:"Signs & Signals",   ico:`<svg viewBox="0 0 40 40"><polygon points="12,2 28,2 38,12 38,28 28,38 12,38 2,28 2,12" fill="#B3282D"/><text x="20" y="25" text-anchor="middle" fill="#fff" style="font-family:Overpass,sans-serif;font-weight:800;font-size:10px">STOP</text></svg>`},
  {k:"row",     name:"Right-of-Way",      ico:`<svg viewBox="0 0 40 40"><polygon points="2,4 38,4 20,38" fill="#B3282D"/><polygon points="8,8 32,8 20,32" fill="#fff"/></svg>`},
  {k:"turns",   name:"Turns & Lanes",     ico:`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#363B41"/><path d="M26 32V18a6 6 0 0 0-6-6h-6" fill="none" stroke="#F2C230" stroke-width="4"/><path d="M17 6v12l-9-6z" fill="#F2C230"/></svg>`},
  {k:"speed",   name:"Speed Limits",      ico:`<svg viewBox="0 0 40 40"><rect x="7" y="1" width="26" height="38" rx="4" fill="#fff" stroke="#22262A" stroke-width="2.5"/><text x="20" y="18" text-anchor="middle" style="font-family:Overpass,sans-serif;font-weight:800;font-size:7px" fill="#22262A">LIMIT</text><text x="20" y="33" text-anchor="middle" style="font-family:Overpass,sans-serif;font-weight:800;font-size:15px" fill="#22262A">25</text></svg>`},
  {k:"parking", name:"Parking",           ico:`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#2E7CC0"/><text x="20" y="29" text-anchor="middle" fill="#fff" style="font-family:Overpass,sans-serif;font-weight:900;font-size:24px">P</text></svg>`},
  {k:"freeway", name:"Freeway Driving",   ico:`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#363B41"/><path d="M14 40L18 4h4l4 36" fill="#4a5157"/><g stroke="#F5F5F2" stroke-width="3" stroke-dasharray="5 5"><line x1="20" y1="6" x2="20" y2="38"/></g></svg>`},
  {k:"share",   name:"Sharing the Road",  ico:`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#E3E9DF"/><circle cx="11" cy="28" r="6" fill="none" stroke="#22262A" stroke-width="2.5"/><circle cx="29" cy="28" r="6" fill="none" stroke="#22262A" stroke-width="2.5"/><path d="M11 28l7-11h7M18 17l7 11" stroke="#22262A" stroke-width="2.5" fill="none"/><circle cx="27" cy="10" r="4" fill="#22262A"/></svg>`},
  {k:"alcohol", name:"Alcohol & Drugs",   ico:`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#B3282D"/><path d="M12 9h16l-6 9v10h4v3H14v-3h4V18z" fill="#fff"/></svg>`},
  {k:"safe",    name:"Safe Driving",      ico:`<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="6" fill="#006B54"/><circle cx="20" cy="20" r="10" fill="none" stroke="#fff" stroke-width="3"/><path d="M20 20l6-5" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`},
  {k:"weather", name:"Weather & Hazards", ico:`<svg viewBox="0 0 40 40"><rect x="5" y="5" width="30" height="30" rx="4" transform="rotate(45 20 20)" fill="#FFC72C" stroke="#22262A" stroke-width="2"/><path d="M12 22c3-2 5 2 8 0s4 2 8 0" fill="none" stroke="#22262A" stroke-width="3"/><path d="M12 29c3-2 5 2 8 0s4 2 8 0" fill="none" stroke="#22262A" stroke-width="3"/></svg>`},
  {k:"law",     name:"License & Law",     ico:`<svg viewBox="0 0 40 40"><rect x="2" y="7" width="36" height="26" rx="4" fill="#fff" stroke="#22262A" stroke-width="2"/><circle cx="13" cy="18" r="4.5" fill="#2EBF7B"/><path d="M7 28c1.5-4 9-4 11 0" fill="#2EBF7B"/><g stroke="#9AA3A8" stroke-width="2.5"><line x1="23" y1="15" x2="33" y2="15"/><line x1="23" y1="21" x2="33" y2="21"/><line x1="23" y1="27" x2="30" y2="27"/></g></svg>`}
];

const Q = [];
const add = (t, q, c, a, e, extra) => Q.push(Object.assign({t,q,c,a,e}, extra||{}));

/* ============ SIGNS & SIGNALS ============ */
add("signs","What must you do at this sign?",["Come to a complete stop, then proceed when it is safe","Slow to 5 mph and roll through if no one is coming","Stop only if another vehicle is present","Yield to traffic on your left only"],0,
"A stop sign means a <b>complete stop</b> — wheels stopped — at the limit line, before the crosswalk, or before entering the intersection. A slow roll is a violation even on an empty street.",{sign:"stop"});

add("signs","This sign means:",["Slow down, give the right-of-way, and stop if necessary","Stop completely every time","The road ahead is closed","Merge left immediately"],0,
"A <b>yield</b> sign means slow down and let cross traffic and pedestrians go first. You don't have to stop if the way is genuinely clear — but you must be prepared to.",{sign:"yield"});

add("signs","What does this sign tell you?",["Do not enter — the road is closed to you","No parking beyond this point","Road narrows ahead","One-way traffic joining"],0,
"<b>Do Not Enter</b> usually marks a freeway offramp or the exit end of a one-way street. If you see it while driving, you are about to go the wrong way.",{sign:"doNotEnter"});

add("signs","You see this sign while driving. What has happened?",["You are traveling against traffic and must turn around safely","You have entered a toll road","You missed your exit","You are in a bus-only lane"],0,
"<b>Wrong Way</b> appears after Do Not Enter as a last warning. Pull over to the right, stop, and back out or turn around when it is safe — do not keep driving forward.",{sign:"wrongWay"});

add("signs","A yellow diamond-shaped sign always means:",["A warning about conditions on or near the road ahead","A regulation you must obey by law","Guidance to a city or service","A construction detour"],0,
"<b>Yellow diamonds warn.</b> White rectangles state the law, red means prohibition or stop, green gives direction, orange means work zone, and blue marks motorist services.",{sign:"curve"});

add("signs","This sign warns that:",["A traffic signal is ahead — be ready to stop","A signal is out of order","You may not turn at the next light","There is a flashing beacon only"],0,
"A <b>signal ahead</b> sign appears where the light is hard to see until late — around a curve or over a rise. Ease off the accelerator and cover the brake.",{sign:"signalAhead"});

add("signs","What does the fluorescent yellow-green pentagon sign indicate?",["A school zone or school crossing","A recreation area","A bicycle route","A hospital zone"],0,
"That distinctive <b>yellow-green pentagon</b> is used only for schools and school crossings. Slow to 25 mph (or as posted) and watch for children who may step out without looking.",{sign:"school"});

add("signs","A round yellow sign with a black X and two R's means:",["A railroad crossing is ahead","A road closure is ahead","A rest area is ahead","A rough road is ahead"],0,
"This is the <b>advance warning</b> for a railroad crossing. Slow down, look both ways, and never start across unless you can clear the tracks completely.",{sign:"rrAdvance"});

add("signs","At a crossbuck sign with no gates or lights, you must:",["Yield to any train and cross only when it is clearly safe","Always stop before crossing","Sound your horn and proceed","Cross at no more than 5 mph"],0,
"A <b>crossbuck</b> has the same legal force as a yield sign. Look and listen in both directions — a train needs more than a mile to stop and cannot swerve.",{sign:"crossbuck"});

add("signs","What does a solid white line between lanes of traffic mean?",["Lane changes are discouraged or prohibited — stay in your lane","Traffic moves in opposite directions","You may pass freely","It marks the edge of the freeway"],0,
"A <b>solid white line</b> separates lanes going the same direction and discourages (or where doubled, prohibits) changing lanes. Broken white lines mean changing lanes is allowed when safe.");

add("signs","Two solid yellow lines down the middle of the road mean:",["Do not pass or cross except to turn left into a driveway","A two-way left-turn lane","Passing is allowed with care","The road ahead is one-way"],0,
"<b>Double solid yellow</b> means no passing in either direction. You may cross them only to turn left into or out of a driveway or private road, or where a lane marking permits.");

add("signs","A broken yellow line on your side of the center line means:",["You may pass when it is safe to do so","You must never cross the line","There is a bike lane to your left","The road becomes one-way ahead"],0,
"On a two-way road, a <b>broken yellow line on your side</b> means passing is permitted when the way ahead is clear. If the line on your side is solid, you may not pass.");

add("signs","The far-left lane marked with a white diamond ◇ on a freeway is:",["A carpool / HOV lane with occupancy rules","A lane reserved for trucks","A lane closed for maintenance","An exit-only lane"],0,
"A <b>white diamond</b> marks an HOV (carpool) lane. Signs at the entrance state how many occupants you need and during which hours. Enter and exit only where the line is broken.");

add("signs","A flashing red traffic light means:",["Stop completely, then go when it is safe — like a stop sign","Slow down and proceed with caution","The signal is broken; treat it as green","Stop and wait for it to turn green"],0,
"<b>Flashing red = stop sign.</b> A flashing yellow means slow down and proceed carefully. A dark, fully non-functioning signal is treated as a four-way stop.");

add("signs","A yellow traffic light means:",["The light is about to turn red — stop if you can do so safely","Speed up to clear the intersection","Stop only if a police officer is present","The light is about to turn green"],0,
"Yellow means <b>caution — the red is coming</b>. Stop if you can do so safely. Entering on yellow is legal only when stopping would be unsafe; entering after it turns red is a violation.");

add("signs","What does a green arrow showing with a red light mean?",["You may turn in the arrow's direction — that movement is protected","You must wait for the full green ball","You may turn only after stopping","Oncoming traffic also has a green arrow"],0,
"A <b>green arrow is a protected movement</b> — oncoming and cross traffic are being held. Still scan for pedestrians who may be finishing a crossing.");

add("signs","White painted curb means:",["A loading zone for passengers or mail — very brief stops only","No stopping at any time","Disabled parking only","Freight loading only"],0,
"<b>White</b> = passenger or mail loading, usually a few minutes at most. <b>Green</b> = limited-time parking. <b>Yellow</b> = freight loading. <b>Red</b> = no stopping, standing, or parking. <b>Blue</b> = disabled parking with a placard or plate.");

add("signs","A blue painted curb is reserved for:",["Vehicles displaying a disabled placard or plate","Emergency vehicles","Deliveries under 20 minutes","Government vehicles"],0,
"<b>Blue</b> curbs are for drivers with disabilities or the person who is transporting them. Parking there without a valid placard carries a large fine and a tow.");

add("signs","A red painted curb means:",["No stopping, standing, or parking at any time","Parking for 15 minutes maximum","Emergency vehicles may park","Stopping allowed to load passengers"],0,
"<b>Red</b> means no stopping at all — not even to wait with the engine running. The only exception is a bus at a marked bus stop.");

add("signs","An orange sign or cone zone means:",["Construction or maintenance ahead — slow down and expect changes","A detour has ended","An emergency scene","A special event"],0,
"<b>Orange</b> is the work-zone color. Fines are typically <b>doubled</b> in a construction zone, and a flagger's directions override the signs and signals.",{sign:"roadWork"});

/* ============ RIGHT-OF-WAY ============ */
add("row","You and another car arrive at a four-way stop at exactly the same time. Who goes first?",["The car on the right","The car on the left","Whoever signals first","The larger vehicle"],0,
"At a tie, <b>the car on your right goes first</b>. Otherwise the first vehicle to come to a complete stop goes first. When in doubt, waving someone through and going slowly beats guessing.",{dia:"fourWayStop"});

add("row","You are turning left at a green light with no arrow. Oncoming traffic is approaching. You must:",["Wait and yield to all oncoming traffic, then turn when clear","Turn quickly before they arrive","Proceed — a green light gives you the right-of-way","Sound your horn and turn"],0,
"A <b>green ball is permission to enter the intersection, not permission to turn across traffic</b>. Oncoming vehicles going straight have the right-of-way. Wait for a genuine gap.",{dia:"unprotectedLeft"});

add("row","At an intersection with no signs or signals at all, you should:",["Yield to any vehicle that arrives first, and to the car on your right in a tie","Always stop and wait for all traffic to clear","Proceed first if you are going straight","Sound your horn and proceed"],0,
"An <b>uncontrolled intersection</b> follows the same logic as a four-way stop: first there goes first, ties go to the right. Slow down enough that you can stop if the other driver assumes otherwise.");

add("row","You are entering a freeway from an on-ramp. Who has the right-of-way?",["Traffic already on the freeway","You, because you are merging","Whoever is traveling faster","The vehicle in the right lane must move over"],0,
"<b>Merging traffic yields.</b> Use the ramp to match freeway speed, find a gap, signal, check your blind spot, and blend in. Stopping at the end of a ramp is dangerous.",{dia:"mergeFreeway"});

add("row","A pedestrian is crossing at an unmarked crosswalk at an intersection. You must:",["Yield — a crosswalk exists at nearly every intersection whether painted or not","Proceed if the pedestrian is not yet in your lane","Yield only if the crosswalk is painted","Sound your horn to warn them"],0,
"Every intersection has a legal <b>crosswalk whether or not it is painted</b>. Yield to pedestrians, and never pass a vehicle stopped at a crosswalk — someone may be crossing in front of it.");

add("row","When entering a roundabout you must:",["Yield to traffic already circulating, then enter to the right","Stop completely before entering","Enter and let others yield to you","Signal left before entering"],0,
"Roundabouts run <b>counter-clockwise</b> and traffic inside has the right-of-way. Enter to the right when there is a gap, stay in your lane, and signal right just before your exit.",{dia:"roundabout"});

add("row","You are about to make a right turn on a green light and a pedestrian is stepping into the crosswalk. You should:",["Wait for the pedestrian to clear your path before turning","Turn behind them quickly","Sound your horn so they hurry","Turn if you can pass with a meter to spare"],0,
"A green light never overrides a pedestrian's right-of-way in the crosswalk. <b>Wait.</b> Turning drivers strike pedestrians far more often than drivers going straight.");

add("row","A blind pedestrian using a white cane or guide dog is at the corner. You must:",["Stop and yield the whole crossing before proceeding","Sound your horn to signal them","Proceed slowly around them","Wave them across"],0,
"California law requires you to <b>yield completely</b> to a pedestrian with a white cane or guide dog. Don't honk or shout directions — engine noise and quiet are how they judge traffic.");

add("row","You are turning left from a driveway onto a street. You must yield to:",["All traffic on the street and any pedestrians on the sidewalk","Only traffic coming from your left","Only pedestrians","Nobody — traffic must let you out"],0,
"A vehicle entering the roadway from a driveway, alley, or private road <b>yields to everything</b> — traffic in both directions and pedestrians crossing the sidewalk you cross.");

add("row","Two cars arrive at a T-intersection. The road you are on ends. You must:",["Yield to traffic on the through road","Proceed if you arrived first","Yield only to traffic from the left","Turn right without stopping"],0,
"At a <b>T-intersection</b>, the road that ends yields to the through road. Arriving first does not change this.");

add("row","On a mountain road, two cars meet on a narrow section where only one can pass. Who backs up?",["The car heading downhill backs up","The car heading uphill backs up","The smaller vehicle backs up","Whoever arrived second"],0,
"The vehicle <b>going downhill yields</b> and backs up, because it has better control reversing and the uphill car may struggle to restart on the grade.");

add("row","An emergency vehicle with lights and siren is approaching from behind. You should:",["Pull over to the right edge of the road and stop until it passes","Speed up to clear the intersection ahead","Stop immediately in your lane","Move to the left lane"],0,
"Pull <b>to the right and stop</b> — do not stop in an intersection. If you are already in one, clear it first, then pull right. Never follow closer than 300 feet behind an emergency vehicle.",{dia:"emergency"});

add("row","You are approaching a stopped emergency vehicle with flashing lights on the shoulder of a freeway. California's Move Over law requires you to:",["Move over one lane if safe, or slow down significantly if you cannot","Maintain your speed and lane","Stop until the scene is clear","Sound your horn as a warning"],0,
"The <b>Move Over, Slow Down</b> law covers police, fire, ambulance, tow trucks, and Caltrans vehicles. Change lanes away from them when it is safe; when it isn't, slow to a safe, reduced speed.");

/* ============ TURNS & LANES ============ */
add("turns","After making a right turn on red, you must end up in:",["The lane nearest to the right curb","Any lane that is clear","The center lane","The far-left lane"],0,
"Turn from the rightmost lane <b>into the lane nearest the right curb</b>. You can change lanes afterward once you have signalled and checked.",{dia:"rightOnRed"});

add("turns","Right turn on a red light is:",["Allowed after a complete stop, unless a sign prohibits it","Never allowed in California","Allowed without stopping if clear","Allowed only between 9 a.m. and 4 p.m."],0,
"You may turn right on red <b>after coming to a complete stop</b> and yielding to pedestrians and cross traffic — unless a NO TURN ON RED sign is posted. The same applies to a red arrow.",{dia:"rightOnRed"});

add("turns","When making a left turn onto a multi-lane road, you should complete the turn in:",["The lane closest to the center line on the road you enter","Any available lane","The far-right lane","The lane with least traffic"],0,
"Left turns finish <b>in the leftmost lane</b> of the road you are entering. Swinging wide across lanes is both a violation and a common cause of side-impact crashes.",{dia:"leftTurnTarget"});

add("turns","How far before a turn must you signal?",["At least 100 feet","At least 25 feet","At least 500 feet","Signalling is optional if no one is behind you"],0,
"Signal <b>at least 100 feet</b> before turning — roughly five car lengths. On the freeway signal about five seconds ahead of a lane change so drivers have time to react.");

add("turns","A center lane marked with solid and broken yellow lines on both sides may be used:",["Only to make a left turn, or to start a permitted U-turn","As an ordinary travel lane","For passing slow traffic","As a carpool lane"],0,
"That is a <b>two-way left-turn lane</b>. Enter it within about 200 feet of your turn, wait there for a gap, then turn. Driving along it is illegal.",{dia:"centerTurnLane"});

add("turns","You may legally make a U-turn on a divided highway:",["Only where a paved opening in the divider is provided","At any point where it is clear","Never, under any circumstance","Only at night"],0,
"On a <b>divided highway</b> you may only cross where an opening is provided in the divider. Never drive over or across a raised median or double yellow lines to reverse direction.",{sign:"noUturn"});

add("turns","U-turns in a residential district are legal:",["When no vehicle is approaching within 200 feet and there is no sign prohibiting it","Only at an intersection with a signal","Only if there is no oncoming traffic at all","Never"],0,
"In a residential district you may U-turn when <b>no car is coming within 200 feet</b>, or at an intersection unless a sign forbids it. U-turns are never allowed in a business district except at an intersection or a designated opening.");

add("turns","Before changing lanes you should:",["Signal, check mirrors, and look over your shoulder at the blind spot","Signal and change immediately","Check only your rear-view mirror","Sound your horn"],0,
"Mirrors cannot see everything. Always <b>turn your head and check the blind spot</b> before moving over — a motorcycle or small car can sit there completely hidden.");

add("turns","You want to turn right at a corner with a bike lane. You should:",["Merge into the bike lane within 200 feet of the corner after checking for cyclists","Turn from the traffic lane across the bike lane","Stop and wave any cyclist past first","Signal and turn wide around the bike lane"],0,
"Turning across a bike lane is what causes 'right hook' collisions. <b>Merge into the bike lane</b> (it becomes dashed near the corner) after checking over your shoulder, then turn from it.");

add("turns","You may drive across a sidewalk:",["Only to enter or leave a driveway or alley, yielding to pedestrians","Never","When traffic is heavy","If you sound your horn first"],0,
"Crossing a sidewalk is permitted only to reach a <b>driveway or alley</b>, and pedestrians on that sidewalk always have the right-of-way.");

add("turns","When you are passing another vehicle, you should return to your lane:",["Only when you can see the passed vehicle in your rear-view mirror","As soon as you are alongside","When the other driver flashes their lights","After counting three seconds"],0,
"Seeing <b>both of their headlights in your rear-view mirror</b> means you have enough room to return safely. Cutting back in early forces the other driver to brake.");

add("turns","Passing on the right is legal:",["When the road has two or more lanes in your direction, or the driver ahead is turning left","Never in California","Only on a freeway","Only when the other car signals you past"],0,
"You may pass on the right on a <b>multi-lane road</b> or when a driver is turning left — but never by driving onto the shoulder or off the paved roadway.");

/* ============ SPEED ============ */
add("speed","Unless posted otherwise, the speed limit in a residential or business district is:",["25 mph","20 mph","35 mph","30 mph"],0,
"California's default limit in <b>residential and business districts is 25 mph</b>. It applies even where no sign is posted.");

add("speed","Unless otherwise posted, the speed limit in a school zone when children are present is:",["25 mph","15 mph","20 mph","30 mph"],0,
"<b>25 mph</b> within 500–1000 feet of a school when children are outside or crossing. Some school zones post 15 mph — obey the sign.",{sign:"school"});

add("speed","The speed limit when crossing a blind railroad crossing (no clear view of the tracks) is:",["15 mph","25 mph","10 mph","20 mph"],0,
"<b>15 mph</b> applies at a blind railway crossing, in an alley, and at a blind intersection where you cannot see 100 feet along the cross street.");

add("speed","The maximum speed limit on most California freeways for cars is:",["65 mph","70 mph","55 mph","75 mph"],0,
"<b>65 mph</b> is the standard maximum, with some rural stretches posted at 70. Vehicles towing a trailer and most large trucks are limited to <b>55 mph</b>.",{sign:"speedLimit"});

add("speed","The maximum speed for a vehicle towing a trailer on a California freeway is:",["55 mph","65 mph","45 mph","60 mph"],0,
"Towing a trailer, or driving a three-or-more-axle truck, limits you to <b>55 mph</b> and generally to the right-hand lanes.");

add("speed","The 'basic speed law' means:",["You may never drive faster than is safe for current conditions","You may drive 10 mph over the limit if traffic does","The posted limit is always safe to drive","Speed limits apply only in daylight"],0,
"The <b>basic speed law</b> outranks the posted number: in fog, rain, heavy traffic, or a crowd of pedestrians, the safe speed may be far lower than the sign — and driving the posted limit can still be a violation.");

add("speed","On a two-lane road you may exceed the speed limit while passing:",["Never — the limit applies even while passing","By up to 10 mph","When the vehicle ahead is unusually slow","Only on a downhill grade"],0,
"There is <b>no passing exemption</b> in California. If you cannot complete the pass within the limit, do not start it.");

add("speed","Driving slower than the flow of traffic is:",["Potentially unlawful — you must keep right and may be cited for impeding traffic","Always safest","Only a problem on freeways","Encouraged for new drivers"],0,
"Blocking traffic is a violation. If a line of cars builds up behind you on a two-lane road, <b>pull over where safe and let them pass</b>.");

add("speed","At 55 mph on a dry road, roughly how far will your car travel before stopping once you decide to brake?",["About 300 feet — the length of a football field","About 100 feet","About 60 feet","About 500 feet"],0,
"Reaction plus braking at 55 mph works out to roughly <b>300 feet</b>. This is why tailgating is so dangerous — the gap you need is much longer than it feels.");

/* ============ SAFE DRIVING ============ */
add("safe","The recommended minimum following distance in good conditions is:",["Three seconds","One second","Two car lengths","Ten feet per 10 mph"],0,
"Pick a fixed object; when the car ahead passes it, count <i>one-thousand-one, one-thousand-two, one-thousand-three</i>. If you reach the object first, you are too close.",{dia:"following3s"});

add("safe","You should increase your following distance to four seconds or more when:",["Following a motorcycle, towing a trailer, or driving in rain","Traffic is light","Driving in the right lane","Your car is new"],0,
"Add seconds whenever stopping is harder or the vehicle ahead can stop faster than you: <b>rain, fog, ice, towing, following a motorcycle</b>, or driving behind a large truck that blocks your view.");

add("safe","Your blind spot is best described as:",["The area around your car not visible in mirrors, checked by turning your head","The area directly in front of the hood","Anywhere behind the rear bumper","Only relevant to trucks"],0,
"Mirrors leave a wedge on each side where a whole car can hide. <b>Turn your head</b> before every lane change; mirrors alone are never enough.");

add("safe","Using a hand-held cell phone while driving in California is:",["Illegal — the phone must be hands-free, and drivers under 18 cannot use one at all","Legal at red lights","Legal for calls but not texting","Legal on surface streets only"],0,
"Adults may only use a phone <b>hands-free</b>, mounted, with a single tap or swipe. Drivers <b>under 18 may not use any phone or hands-free device</b> while driving.");

add("safe","Seat belts in California must be worn by:",["The driver and every passenger, in every seat","Front-seat occupants only","Only occupants under 18","Only on freeways"],0,
"<b>Everyone, every seat.</b> The driver is legally responsible for passengers under 16. A belt worn correctly sits low across the hips and across the chest — never under the arm.");

add("safe","A child must ride in the back seat in a car seat or booster until they are:",["At least 8 years old or 4 feet 9 inches tall","6 years old","5 years old or 40 pounds","10 years old"],0,
"Children under 8 must be in a car or booster seat in the back, unless they are <b>4'9\" or taller</b>. Children under 2 must ride <b>rear-facing</b> unless they exceed 40 lb or 40 inches.");

add("safe","If your car begins to skid, you should:",["Ease off the accelerator and steer gently where you want to go","Brake hard immediately","Steer sharply the opposite way","Pull the parking brake"],0,
"<b>Ease off, steer where you want to go.</b> Sudden braking or a sharp jerk of the wheel makes a skid worse. Keep your movements small and smooth.");

add("safe","If your right wheels drift off the pavement onto the shoulder, you should:",["Ease off the gas, hold the wheel straight, and steer back gently when slowed","Brake hard and steer back at once","Turn sharply back onto the road","Accelerate to regain the lane"],0,
"Slow down first, then <b>ease back on</b>. Yanking the wheel at speed is the classic cause of an over-correction rollover.");

add("safe","Your headlights must be turned on:",["From 30 minutes after sunset to 30 minutes before sunrise, and whenever you use windshield wipers","Only in complete darkness","Only when visibility is under 100 feet","Only on unlit roads"],0,
"California's rule: <b>lights on whenever your wipers are on</b> because of weather, and from half an hour after sunset to half an hour before sunrise. Also use them in fog, rain, and low visibility.");

add("safe","When driving at night, you must dim your high beams when you are within:",["500 feet of an oncoming vehicle or 300 feet behind one","100 feet of any vehicle","1000 feet of any vehicle","Any distance where you can see taillights"],0,
"Dim high beams within <b>500 feet oncoming</b> and <b>300 feet when following</b>. If an oncoming driver fails to dim, look toward the right edge line rather than into their lights.");

add("safe","Honking your horn is appropriate when:",["You need to alert another driver or a pedestrian to avoid a collision","Someone is driving too slowly","A light has just turned green","You are frustrated in traffic"],0,
"The horn is a <b>safety device, not a comment</b>. Use it to prevent a crash — a light tap to make sure a driver drifting into your lane knows you are there.");

/* ============ PARKING ============ */
add("parking","When parking facing downhill with a curb, you should turn your front wheels:",["Toward the curb","Away from the curb","Straight ahead","Toward the center of the road"],0,
"Downhill, the car would roll forward — point the wheels <b>toward the curb</b> so the front tire catches it. Uphill with a curb, point them <b>away</b> so it rolls back into the curb. With no curb, always point them toward the edge of the road.",{dia:"hillParking"});

add("parking","When parking facing uphill next to a curb, your front wheels should point:",["Away from the curb, so the car rolls back into it","Toward the curb","Straight ahead","It does not matter with the parking brake set"],0,
"Uphill with a curb: wheels <b>away from the curb</b>, then let the car roll back a few inches so the rear of the front tire rests against it. Always set the parking brake as well.",{dia:"hillParking"});

add("parking","When parking on any hill with no curb, your front wheels should be turned:",["Toward the edge of the road","Toward the center of the road","Straight ahead","Toward the uphill side"],0,
"With <b>no curb</b> to catch the car, always aim the wheels at the shoulder so a rolling vehicle leaves the roadway instead of entering traffic.",{dia:"hillParking"});

add("parking","You may not park within how many feet of a fire hydrant?",["15 feet","10 feet","25 feet","5 feet"],0,
"Keep <b>15 feet</b> clear of a fire hydrant. Other no-park zones: within 3 feet of a disabled-access sidewalk ramp, in a crosswalk, on a sidewalk, or in front of a driveway.");

add("parking","Parking is prohibited within how many feet of a railroad crossing?",["7.5 feet","15 feet","30 feet","50 feet"],0,
"Stay <b>7.5 feet</b> back from a railroad crossing. Trains overhang the rails by about three feet on each side, so parking close is genuinely dangerous.");

add("parking","It is illegal to park:",["On a sidewalk, in a crosswalk, or in front of a driveway","Only where a sign says so","Anywhere on a residential street overnight","In any unmarked space"],0,
"Also prohibited: <b>double parking</b>, parking on a bridge or in a tunnel unless permitted, within an intersection, and in a space marked for disabled parking without a placard.");

add("parking","When you park parallel to a curb, your wheels must be no more than:",["18 inches from the curb","6 inches from the curb","2 feet from the curb","3 feet from the curb"],0,
"Park within <b>18 inches</b> of the curb. Farther out and you narrow the traffic lane and risk a citation.");

add("parking","Before opening your door into traffic, you must:",["Check for traffic and cyclists, and open it only when it is safe","Open it quickly so it is done","Sound your horn","Open it only from the passenger side"],0,
"Dooring a cyclist is a serious injury crash and a violation. Check mirrors and over your shoulder — or use the <b>Dutch reach</b>, opening with your far hand so your body turns naturally.");

add("parking","Leaving a child under 6 alone in a parked car is:",["Illegal unless a person aged 12 or older is supervising them","Legal if the car is locked","Legal for up to 15 minutes","Legal if the windows are open"],0,
"A child under six may not be left in a vehicle without someone <b>12 or older</b> present — especially where the engine is running or the keys are in the ignition. Cars heat to lethal temperatures within minutes.");

/* ============ FREEWAY ============ */
add("freeway","Before merging onto a freeway from an on-ramp, you should:",["Match the speed of freeway traffic while still on the ramp","Stop at the end of the ramp and wait","Enter slowly and speed up in the lane","Signal and merge immediately"],0,
"The <b>acceleration lane exists so you can reach traffic speed</b>. Merging much slower than the flow forces everyone behind to brake and is a common cause of freeway collisions.",{dia:"mergeFreeway"});

add("freeway","When you want to exit a freeway, you should:",["Signal, move into the exit lane early, and slow down mainly on the offramp","Brake hard in the travel lane before the exit","Cross several lanes at the last moment","Slow to 25 mph a mile before the exit"],0,
"Get into the <b>exit lane well before</b> the ramp and do most of your slowing on the deceleration lane, not in the fast-moving travel lane.");

add("freeway","If you miss your freeway exit, you should:",["Continue to the next exit","Reverse along the shoulder","Make a U-turn at the next opening in the divider","Stop and wait for a gap to back up"],0,
"<b>Go to the next exit.</b> Backing up or crossing a median on a freeway is illegal and one of the most dangerous things you can do.");

add("freeway","Which lanes should slower traffic use on a multi-lane freeway?",["The right-hand lanes","The left-hand lanes","The center lane only","Any lane, as long as speed is legal"],0,
"<b>Keep right except to pass.</b> Trucks and vehicles towing trailers are generally restricted to the right-hand lanes and limited to 55 mph.");

add("freeway","You may drive on the shoulder of a freeway:",["Only in an emergency, or when directed by an officer or sign","When traffic is stopped","To reach an exit faster","To pass a slow vehicle"],0,
"The shoulder is for <b>emergencies</b>. If you must stop, pull as far right as possible, turn on your hazard lights, and exit from the passenger side away from traffic.");

add("freeway","If your car breaks down on the freeway, you should:",["Pull well onto the right shoulder, turn on hazard lights, and stay belted inside if traffic is heavy","Stand behind the car to warn traffic","Stop in the left lane and call for help","Walk along the roadway to the nearest exit"],0,
"Get <b>fully off the traffic lanes</b>, hazards on, and either stay inside with belts fastened or move well beyond the guardrail. Standing near the roadside is where people are struck.");

add("freeway","A carpool (HOV) lane may be entered:",["Only where the lane line is broken","At any point when the lane is empty","Only at freeway entrances","Anywhere with a signal"],0,
"Crossing the <b>solid double line</b> into or out of an HOV lane is a violation. Wait for the dashed section, then move over in one deliberate lane change.");

/* ============ SHARING THE ROAD ============ */
add("share","A school bus has stopped ahead with red lights flashing and its stop arm out. On an undivided road you must:",["Stop in both directions and remain stopped until the lights stop flashing","Slow to 10 mph and pass carefully","Stop only if you are behind the bus","Pass on the left with caution"],0,
"<b>Flashing red on an undivided road stops everyone</b>, both directions. You may only continue past without stopping when a raised median or physical barrier separates you from the bus.",{dia:"schoolBus"});

add("share","A school bus's flashing yellow lights mean:",["It is about to stop — slow down and prepare to stop","You may pass at reduced speed","Children have already boarded","The bus is disabled"],0,
"Amber lights are the warning stage before the red lights and stop arm. <b>Slow down and get ready to stop</b> — do not try to beat the bus.",{dia:"schoolBus"});

add("share","When passing a bicyclist in your lane, California law requires:",["At least 3 feet of clearance, or slow down and pass only when safe","At least 1 foot of clearance","You must never pass a bicycle","At least 6 feet at all times"],0,
"The <b>Three Feet for Safety Act</b>. Where you cannot give three feet, slow to a safe speed and pass only when it will not endanger the rider.",{dia:"bikePass"});

add("share","Bicyclists on the road:",["Have the same rights and duties as drivers and may use a full lane when needed","Must always ride on the sidewalk","Must always stay in the gutter","Have the right-of-way at all times"],0,
"A cyclist is a legal vehicle operator. They may <b>take the full lane</b> to avoid parked-car doors, debris, or a lane too narrow to share — that is legal riding, not obstruction.");

add("share","Large trucks have big blind spots. The safest place to be is:",["Where you can see the truck driver's face in their side mirror","Directly behind the trailer","Alongside the cab on the right","Just ahead of the front bumper"],0,
"If you cannot see the driver in the mirror, <b>they cannot see you</b>. The blind spots are worst directly behind and along the right side of the trailer.");

add("share","A large truck is making a right turn ahead of you and swings wide to the left first. You should:",["Stay back and never try to squeeze in on their right","Pass on the right quickly","Sound your horn","Move up beside the cab"],0,
"Trucks need the extra room to bring the trailer around. The space they open on the right is a <b>trap, not a lane</b> — that is where squeeze-play crashes happen.");

add("share","When a motorcycle is 'lane splitting' between lanes of slow traffic in California, it is:",["Legal — allow room and do not block them","Illegal and you may block it","Legal only on freeways","Legal only above 35 mph"],0,
"California is the one state where <b>lane splitting is legal</b>. Deliberately blocking or opening a door to stop a rider is illegal. Check mirrors before changing lanes in stopped traffic.");

add("share","When following a motorcycle you should:",["Allow at least a three to four second following distance","Follow at two seconds as with a car","Drive alongside for visibility","Use your high beams to be seen"],0,
"Motorcycles can <b>stop far faster than a car</b>, and their brake light is small. Give them extra room and never share a lane with a rider.");

add("share","A light-rail train or streetcar is approaching the intersection as you wait to turn. You should:",["Yield to it — never turn in front of a light-rail vehicle","Turn quickly if you have a green light","Proceed as it must stop for you","Sound your horn"],0,
"Light-rail vehicles run on their <b>own signals and cannot swerve</b>. They also weigh far too much to stop quickly. Yield, even if you have a green light.");

add("share","You are approaching a horse and rider on a rural road. You should:",["Slow down, give wide clearance, and avoid sudden noise","Sound your horn to alert the rider","Pass quickly to reduce the time alongside","Flash your lights"],0,
"Horses spook. <b>Slow, quiet, and wide</b> — no horn, no revving. If the rider signals you to stop, do so.");

/* ============ ALCOHOL & DRUGS ============ */
add("alcohol","The blood alcohol concentration (BAC) limit for a driver aged 21 or over is:",["0.08%","0.05%","0.10%","0.01%"],0,
"<b>0.08%</b> for drivers 21 and over. But you can be arrested below that if your driving is impaired — the number is a ceiling, not a permission slip.");

add("alcohol","For a driver under 21, California's 'zero tolerance' BAC limit is:",["0.01%","0.05%","0.08%","0.02%"],0,
"<b>0.01%</b> — effectively any measurable alcohol. That level can be reached with a single drink, and it also triggers a one-year license suspension.");

add("alcohol","For a driver of a commercial vehicle, the BAC limit is:",["0.04%","0.08%","0.02%","0.01%"],0,
"Commercial drivers are held to <b>0.04%</b>. Drivers on DUI probation and anyone carrying passengers for hire are held to <b>0.01%</b>.");

add("alcohol","Refusing to take a chemical test when lawfully arrested for DUI results in:",["An automatic license suspension under the implied consent law","No penalty until convicted","A warning on the first refusal","A fine only"],0,
"Driving in California is legal consent to testing. <b>Refusal means an automatic suspension</b> — one year for a first refusal — on top of the DUI penalties themselves.");

add("alcohol","Which of these will sober up a person who has been drinking?",["Only time","Coffee","A cold shower","Exercise and fresh air"],0,
"<b>Only time.</b> The liver removes alcohol at roughly one standard drink per hour and nothing speeds it up. Coffee produces a wide-awake drunk, which is more dangerous, not less.");

add("alcohol","An open container of alcohol in a vehicle:",["Is illegal in the passenger compartment, even if nobody is drinking","Is legal if the driver does not drink","Is legal in the glove box","Is legal for passengers only"],0,
"Open containers must be in the <b>trunk</b> or somewhere not normally occupied by passengers. This applies to cannabis in an open package too.");

add("alcohol","Prescription or over-the-counter medication can:",["Impair driving and lead to a DUI arrest even when legally prescribed","Never result in a DUI charge","Only matter if combined with alcohol","Be ignored if you feel fine"],0,
"<b>DUI covers any impairing substance</b>, prescribed or not. Antihistamines, sleep aids, and painkillers are common culprits — read the label and check for drowsiness warnings.");

add("alcohol","A first DUI conviction in California can result in:",["Jail time, fines, a license suspension, and an ignition interlock device","A warning only","Only a fine","Points on your record with no suspension"],0,
"A first offence brings <b>fines and penalty assessments running into thousands of dollars</b>, up to six months in jail, DUI school, a suspension, and an ignition interlock requirement.");

add("alcohol","Driving under 21 with alcohol in the vehicle (even unopened) is:",["Illegal unless it is in the trunk and you are accompanied by a parent or guardian, or you are working","Always legal if unopened","Legal if a passenger owns it","Legal in the back seat"],0,
"Under 21, carrying alcohol at all is prohibited with narrow exceptions — <b>in the trunk with a parent, guardian, or responsible adult present</b>, or in the course of employment.");

/* ============ WEATHER & HAZARDS ============ */
add("weather","When it starts to rain, the road is most slippery:",["During the first few minutes, as rain lifts oil off the pavement","After several hours of rain","Only when it is also cold","Only on freeways"],0,
"Oil and rubber build up on dry pavement, and the <b>first rain floats it into a greasy film</b>. Slow down and increase your following distance immediately.",{sign:"slippery"});

add("weather","Hydroplaning happens when:",["Your tires ride up on a film of water and lose contact with the road","Your brakes overheat","Your tires are over-inflated","Your engine loses power in water"],0,
"It can start around <b>35 mph</b> and worsens with worn tires. Recovery: <b>ease off the accelerator, hold the wheel steady, do not brake hard</b> until the tires regain grip.",{sign:"slippery"});

add("weather","In dense fog, the correct action is:",["Slow down and use low-beam headlights","Use high beams for more light","Use hazard lights while driving normally","Follow the car ahead closely to see its lights"],0,
"<b>Low beams</b> — high beams reflect off the fog and make it worse. If it becomes too thick to continue, pull completely off the road, turn on hazards, and wait.");

add("weather","When driving through deep standing water, you should afterward:",["Test your brakes gently at low speed to dry them out","Brake hard once to clear water","Do nothing — brakes are unaffected","Accelerate hard to spin water off"],0,
"Wet brakes grab unevenly or barely work. <b>Drive slowly and apply light pressure</b> for a short distance to dry them before you need them.");

add("weather","If your brakes fail completely, you should:",["Pump the pedal, then use the parking brake gradually and downshift","Turn off the ignition immediately","Steer into oncoming traffic to slow down","Pull the parking brake fully at once"],0,
"Pump the pedal to try to rebuild pressure, <b>downshift</b>, and apply the parking brake gradually while holding the release so you can ease off if the rear wheels lock.");

add("weather","If a tire blows out while you are driving, you should:",["Grip the wheel firmly, ease off the gas, and let the car slow before pulling off","Brake hard immediately","Accelerate to stabilise the car","Steer sharply onto the shoulder"],0,
"A blowout pulls hard to one side. <b>Hold the wheel firmly, do not brake hard</b>, let speed bleed off, then steer gently to the shoulder.");

add("weather","If your accelerator sticks, the first thing to do is:",["Shift into neutral and brake, then pull off the road","Switch the engine off at once","Pump the accelerator repeatedly","Pull the parking brake"],0,
"<b>Neutral first.</b> Switching the ignition off can lock the steering and kill the power brakes, so shift to neutral, brake, and steer to the shoulder before shutting down.");

add("weather","When driving into bright sun glare, you should:",["Use your sun visor and sunglasses, and increase your following distance","Speed up to get through it","Turn on your high beams","Follow the car ahead closely"],0,
"Glare hides pedestrians and brake lights completely. <b>Slow down, add space</b>, and keep the windshield clean inside and out — smears make it dramatically worse.");

add("weather","At night you should drive:",["Slowly enough to stop within the distance your headlights show","At the same speed as in daylight","With high beams at all times","Using only the taillights of the car ahead as a guide"],0,
"Headlights on low beam show roughly 350 feet ahead. <b>Overdriving your headlights</b> — moving faster than you can stop within that distance — is a common cause of night collisions.");

/* ============ LICENCE & LAW ============ */
add("law","California's minimum liability insurance requires coverage of at least:",["$30,000 for injury to one person","$5,000 for injury to one person","$100,000 for injury to one person","$15,000 for injury to one person"],0,
"Since 2025 the minimum is <b>$30,000</b> for one person's injury, <b>$60,000</b> for all injuries in one crash, and <b>$15,000</b> for property damage. You must carry proof in the vehicle.");

add("law","You must report a collision to the DMV within 10 days if:",["Anyone was injured or killed, or property damage exceeds $1,000","Any collision occurs at all","Only if the police did not attend","Only if you were at fault"],0,
"File form <b>SR-1 within 10 days</b> for injury, death, or over $1,000 in damage — regardless of fault, and even if the police already wrote a report.");

add("law","If you hit a parked car and cannot find the owner, you must:",["Leave a note with your name, address, and details, and notify the police","Drive away if damage looks minor","Wait one hour then leave","Report it only if damage exceeds $500"],0,
"Leave your <b>name, address, and an explanation</b> securely on the vehicle, and report it. Leaving without doing so is a hit-and-run.");

add("law","You must notify the DMV within 5 days if you:",["Sell or transfer your vehicle","Change your car insurance","Get a new job","Repaint your vehicle"],0,
"Report the <b>sale or transfer within 5 days</b>. You have <b>10 days</b> to report a change of address, and must carry a license that shows a current address.");

add("law","A provisional license holder under 18 may not, for the first 12 months:",["Drive between 11 p.m. and 5 a.m. or carry passengers under 20 without a licensed adult 25 or older","Drive on freeways","Drive more than 50 miles from home","Drive a vehicle over 10 years old"],0,
"California's provisional restrictions: <b>no driving 11 p.m.–5 a.m.</b> and <b>no passengers under 20</b> unless accompanied by a licensed parent, guardian, or driver 25 or older.");

add("law","Under California's 'point count' system, your license may be suspended if you accumulate:",["4 points in 12 months, 6 in 24 months, or 8 in 36 months","2 points in 12 months","10 points in 12 months","5 points in 6 months"],0,
"Most moving violations are <b>1 point</b>; DUI, reckless driving, and hit-and-run are <b>2 points</b>. Reaching 4/6/8 points marks you a negligent operator.");

add("law","A police officer signals you to pull over. You should:",["Signal, pull to the right as soon as safe, stop, and stay in the vehicle","Stop immediately in your lane","Get out and walk to the officer","Continue to a well-lit area miles away"],0,
"Pull <b>right and stop as soon as it is safe</b>, turn off the engine, and keep your hands visible on the wheel. Wait for instructions before reaching for documents.");

add("law","When you are stopped by an officer, you must present:",["Your driver license, vehicle registration, and proof of insurance","Only your driver license","Only your registration","Your passport and license"],0,
"All three: <b>license, registration, and evidence of financial responsibility</b>. Keep the paperwork somewhere you can reach without an alarming search.");

add("law","Driving with a suspended license is:",["A serious offence that can lead to a fine, jail, and vehicle impoundment","A minor infraction","Allowed for commuting to work","Allowed if you have insurance"],0,
"It is a <b>misdemeanour</b>, and your car can be impounded on the spot. If your license is suspended, do not drive at all until it is reinstated in writing.");

add("law","Street racing or a speed contest on a public road can result in:",["License suspension, vehicle impoundment, and criminal charges","A fine only","A warning for a first offence","Points but no suspension"],0,
"Speed contests bring <b>up to 90 days in jail, fines, a 30-day impound, and a suspension</b> — and far more if anyone is injured.");

add("law","Littering from your vehicle is:",["Illegal, with a fine and possible community service","A civil matter only","Allowed for organic waste","Only illegal on freeways"],0,
"Throwing anything from a vehicle — including a cigarette — carries a <b>fine of $1,000 or more</b> plus mandatory litter cleanup for repeat offences.");

add("law","If your license is lost or stolen, you should:",["Apply for a duplicate at the DMV","Drive with a photocopy","Wait until renewal","Report it only to the police"],0,
"Apply for a <b>duplicate license</b>. A photocopy is not a valid license, and driving without one in your possession is itself a violation.");

/* ============ EXTRA MIXED / COMMONLY MISSED ============ */
add("row","Traffic signals at an intersection are completely dark due to a power failure. You should treat it as:",["A four-way stop","A green light in the main direction","A yield for all directions","An intersection to be avoided"],0,
"A dark signal means <b>stop at all approaches and proceed in turn</b>, exactly like a four-way stop. Never assume the cross street has a working red.",{dia:"fourWayStop"});

add("turns","You may cross a double yellow line:",["To turn left into or out of a driveway or private road","To pass a slow vehicle","Never, under any circumstances","When traffic is light"],0,
"Crossing double yellow is allowed <b>only to turn left</b> into or out of a driveway or private road, or where a broken line or opening is provided.");

add("safe","A car is tailgating you closely. The safest response is:",["Move over when safe and let them pass","Brake sharply to warn them","Speed up to open a gap","Flash your brake lights repeatedly"],0,
"Let them go. Brake-checking removes the space you need <b>in front</b> of you — which is the space that would actually save you.");

add("safe","Road rage is best avoided by:",["Not making eye contact, not responding, and putting distance between you","Confronting the driver","Matching their behavior so they back off","Following them to note the plate"],0,
"Do not engage. <b>Give way, avoid eye contact, and if you feel threatened, drive to a police station</b> — never to your home.");

add("safe","If you are drowsy while driving, the best action is:",["Pull over somewhere safe and rest or change drivers","Open the window and turn up the music","Drink coffee and continue","Slow down and continue"],0,
"Drowsiness impairs you much like alcohol, and micro-sleeps happen without warning. <b>Only sleep fixes it</b> — pull over and rest.");

add("share","A pedestrian is jaywalking mid-block in front of your car. You must:",["Slow or stop — you cannot hit them even if they are in the wrong","Continue since they lack the right-of-way","Sound your horn and maintain speed","Swerve into the next lane"],0,
"Pedestrians outside a crosswalk must yield to you, but you still have a <b>duty to exercise due care</b>. Being technically right is no defence in a collision.");

add("weather","A traffic officer is directing traffic at an intersection where the signal shows green. You should:",["Follow the officer's directions, which override the signal","Follow the signal","Stop and wait for the signal to change","Proceed slowly through regardless"],0,
"<b>A person directing traffic outranks every sign and signal</b> — officer, firefighter, flagger, or crossing guard.");

add("law","Your vehicle's registration must be:",["Renewed annually and the current card kept in the vehicle","Renewed every two years","Displayed on the windshield","Renewed only when you sell the car"],0,
"Registration is renewed <b>annually</b>, with the sticker on the rear plate and the card in the car. A smog check is required for most vehicles every two years.");

add("freeway","On a freeway with four or more lanes in each direction, vehicles towing trailers must generally use:",["The right two lanes","Any lane","The left lane only","The center lanes"],0,
"Where three or more lanes run in your direction, a <b>vehicle towing a trailer uses the right two lanes</b>; on narrower freeways, the rightmost lane.");

add("signs","A pennant-shaped yellow sign on the LEFT side of the road means:",["You are entering a no-passing zone","A left curve is ahead","There is a school on the left","Merging traffic from the left"],0,
"The <b>no-passing pennant</b> is the only sign posted on the left. It marks the start of a zone where you may not pass.",{sign:"noPassing"});

add("signs","A green traffic sign gives you:",["Guidance — directions, distances, and destinations","A regulation you must obey","A warning of a hazard","Information about services"],0,
"<b>Green = guidance</b> (exits, distances). <b>Blue</b> marks motorist services like food and fuel. <b>Brown</b> marks parks and recreation areas.");

add("turns","You approach a green light that has been green for a long time as you get close. This is a 'stale green'. You should:",["Cover the brake and be ready to stop","Speed up to clear the intersection","Maintain speed since it is green","Change lanes to the left"],0,
"A <b>stale green</b> is about to turn yellow. Ease off, cover the brake, and be ready to stop rather than being surprised into a hard choice.");

add("parking","You are parking on a level street. Before you leave the car you should:",["Set the parking brake and leave it in park (or in gear for a manual)","Leave it in neutral with the brake off","Turn the wheels toward the curb","Leave the engine running briefly"],0,
"<b>Parking brake on, transmission in park</b> — or in first or reverse gear for a manual. Never leave the keys in an unattended running vehicle.");

add("share","When a pedestrian with a service animal steps off the curb, you should:",["Stop and give them the entire crossing","Sound the horn so they know you are there","Drive slowly around them","Wave them across so they know it is clear"],0,
"<b>Stop and wait.</b> Waving or honking is confusing and may push someone into the path of another car you cannot control.");

add("alcohol","Cannabis use in a vehicle is:",["Illegal to smoke or ingest while driving or riding, and open containers must be sealed or in the trunk","Legal for passengers","Legal if the driver does not partake","Legal when the vehicle is parked on a street"],0,
"It is illegal to <b>smoke or ingest cannabis in a moving vehicle</b>, for the driver or any passenger, and an open package must be in the trunk. Driving while impaired by cannabis is a DUI.");

add("weather","Black ice is most likely to form:",["On bridges and overpasses, which freeze before the roadway","In the middle of long straight roads","Only where snow has fallen","On uphill grades only"],0,
"<b>Bridges and overpasses freeze first</b> because cold air circulates above and below them. Slow down well before you reach them and avoid braking on the structure.");

add("safe","When backing up, the safest technique is:",["Check behind the vehicle first, then reverse slowly while looking over your right shoulder","Rely on the rear-view mirror","Use only the backup camera","Reverse quickly to reduce exposure"],0,
"Walk behind the car or check before you get in — children and low objects vanish below the rear window. <b>Turn and look</b>; cameras and mirrors have blind zones.");

add("law","Texting while driving in California is:",["Prohibited for all drivers","Allowed at a red light","Allowed if the phone is in a mount","Allowed for drivers over 18"],0,
"Writing, sending, or reading text-based messages is prohibited for <b>all drivers</b>, including while stopped at a light. A mounted phone may only be operated with a single tap or swipe.");

add("row","A funeral procession with headlights on is passing through an intersection. You should:",["Yield and not cut into or through the procession","Proceed if you have a green light","Sound your horn and pass","Join the end of the procession to pass safely"],0,
"Let the procession pass intact. <b>Do not cut through it</b>, even with a green light — vehicles in a procession follow the lead vehicle through.");

add("share","An 'ambulance ahead' or a slow-moving vehicle displaying an orange triangle means:",["The vehicle travels 25 mph or less — slow down and pass only when safe","The vehicle is broken down","The vehicle is oversized","The vehicle is a school bus"],0,
"The <b>orange triangle</b> marks a vehicle that cannot exceed 25 mph — farm equipment or road machinery. Slow early; closing speed is deceptively high.");

add("speed","Fines for speeding in a construction zone where workers are present are:",["Doubled","The same as elsewhere","Reduced to a warning","Waived if traffic is flowing"],0,
"<b>Fines double</b> in an active work zone, and hitting a worker carries far heavier penalties. Obey the flagger even when the road looks clear.",{sign:"roadWork"});

add("freeway","The best way to handle a vehicle that is merging onto the freeway beside you is:",["Move over one lane if safe, or adjust speed to open a gap","Speed up to prevent them merging","Maintain speed and position exactly","Sound your horn"],0,
"Courtesy here is also self-preservation. <b>Move over or adjust speed</b> so the merging driver has somewhere to go.",{dia:"mergeFreeway"});

add("turns","When you plan to turn right, you should position your vehicle:",["As close as practical to the right edge of the roadway","In the center of the lane","Slightly left to swing wide","In the left portion of the lane"],0,
"Hug the right so nobody can slip up your inside. <b>Turn from the rightmost lane into the rightmost lane.</b>",{dia:"rightOnRed"});

add("weather","Your vehicle starts to skid on ice and the rear end slides right. You should:",["Steer gently to the right, in the direction the rear is sliding","Steer left to counter it","Brake firmly","Accelerate to straighten out"],0,
"<b>Steer where you want to go</b>, which in a rear skid means gently in the direction the rear has slid. Smooth, small inputs; no braking.");

add("law","Before you can be issued a California driver license, you must:",["Pass the knowledge test, a vision test, and the behind-the-wheel drive test","Only pass the knowledge test","Only hold a license from another state","Complete 100 hours of driving"],0,
"You need <b>vision, knowledge, and driving tests</b>, plus proof of identity, residency, and a Social Security number. New residents have <b>10 days</b> to get a California license.");

add("signs","When you see this sign, you should:",["Slow down and expect traffic to join your lane","Change lanes immediately","Stop and yield","Speed up to pass the merge point"],0,
"Adjust your speed to open a gap for merging traffic. Neither driver should have to <b>stop</b> in a merge — the goal is to blend at speed.",{sign:"merge"});

add("signs","This sign means:",["The road ahead divides into two one-way roadways — keep right","Two-way traffic ahead","A median is ending","A lane is closed"],0,
"A <b>divided highway begins</b>. Stay to the right of the median; the left roadway carries oncoming traffic.",{sign:"dividedHwy"});

add("signs","This sign warns that:",["Two-way traffic is ahead — the one-way road is ending","The road is closed ahead","A passing lane begins","Traffic merges from the left"],0,
"You are leaving a one-way or divided section and will meet <b>oncoming traffic</b>. Keep right and do not pass unless markings allow.",{sign:"twoWay"});

add("signs","This sign means:",["Your lane ends ahead — merge with the adjacent lane","The road narrows to a bridge","There is a pedestrian island ahead","A truck lane begins"],0,
"<b>Lane ends.</b> Signal early and merge before you run out of pavement. In slow traffic, alternating (zipper merging) at the end keeps everyone moving.",{sign:"laneEnds"});

add("share","When driving near a large truck on a downgrade, you should be aware that:",["Trucks may build speed and need much greater stopping distance","Trucks stop faster than cars","Trucks always use engine brakes and stop quickly","Truck speed is unaffected by grade"],0,
"A loaded truck can need <b>twice the stopping distance</b> of a car, and far more downhill. Never cut in front and then brake.");

add("parking","Green painted curb means:",["Parking is allowed for a limited time, shown on the sign or curb","No parking at any time","Loading zone for freight","Reserved for electric vehicles"],0,
"<b>Green</b> = short-term parking, with the limit posted. Look for the painted number or nearby sign for the allowed duration.");

add("law","If your car is being towed away for a parking violation, you should:",["Contact the local police or parking authority to locate and reclaim it","Report it stolen","Wait at the location","Contact your insurance company first"],0,
"Call the <b>local police non-emergency line</b> or the posted number to find where it was taken. Fees rise daily, so act quickly.");

add("safe","Your car's anti-lock brakes (ABS) work best when you:",["Press firmly and hold the pedal down, steering as needed","Pump the pedal rapidly","Apply light pressure only","Use the parking brake at the same time"],0,
"With ABS, <b>press hard and steer</b> — the pulsing under your foot is normal. Pumping defeats the system.");

add("weather","When approaching a flooded roadway, the correct action is:",["Turn around — do not drive through standing water of unknown depth","Drive through quickly","Drive slowly through the deepest part","Follow another vehicle across"],0,
"<b>Turn around, don't drown.</b> Twelve inches of moving water can float a car and the roadbed underneath may already be gone.");

add("row","At a railroad crossing with lowered gates, you must:",["Wait until the gates rise fully and the lights stop — never drive around them","Drive around if no train is visible","Proceed after 30 seconds","Cross if the gate is only partly down"],0,
"A second train may be coming on another track. <b>Never drive around a gate</b> — it is illegal and the most common cause of crossing fatalities.",{sign:"crossbuck"});

add("share","Children playing near the road require extra caution because:",["They can dart into the street suddenly and are hard to see","They always look before crossing","They are usually supervised","Drivers always have the right-of-way"],0,
"Slow down near parks, schools, and residential streets. Look <b>under parked cars</b> for feet, and treat a bouncing ball as a child about to follow it.");

add("alcohol","Alcohol affects your driving by:",["Slowing reaction time, impairing judgment, and reducing coordination","Only affecting vision","Only mattering above the legal limit","Making you more alert briefly"],0,
"Impairment starts <b>well below 0.08%</b> — judgment is affected first, which is exactly what makes people believe they are fine to drive.");

add("law","If you change your address, you must notify the DMV within:",["10 days","30 days","5 days","60 days"],0,
"You have <b>10 days</b> to report an address change to the DMV. Report a vehicle sale within <b>5 days</b>.");

add("speed","Approaching a blind intersection where you cannot see 100 feet in either direction, the speed limit is:",["15 mph","25 mph","20 mph","30 mph"],0,
"<b>15 mph</b> at a blind intersection, in an alley, and at a blind railway crossing.");

add("turns","When your view of an intersection is blocked by a parked truck, you should:",["Edge forward slowly until you can see, then proceed if clear","Proceed at normal speed since you have the right-of-way","Sound your horn and cross","Reverse and take another route"],0,
"<b>Creep and peek.</b> Move forward a few inches at a time until you have a real view, then commit.");

add("freeway","Cruise control should not be used:",["In rain, on wet roads, or in heavy traffic","On long straight freeways","On dry roads at steady speed","When traffic is light"],0,
"Cruise control can <b>keep power on during a hydroplane</b> and slows your reaction. Turn it off in rain, ice, fog, and dense traffic.");

add("safe","The safest hand position on the steering wheel is:",["9 and 3 o'clock, with thumbs along the rim","10 and 2 o'clock with thumbs hooked inside","One hand at 12 o'clock","Both hands at the bottom of the wheel"],0,
"<b>9 and 3</b> gives the most control and keeps your hands and thumbs clear of the airbag's path. Hooked thumbs can be broken by a deploying airbag.");

add("signs","An octagonal (eight-sided) shape always means:",["Stop","Yield","Railroad crossing","No passing"],0,
"Shape carries meaning even when the sign is dirty, faded, or snow-covered: <b>octagon = stop, triangle = yield, diamond = warning, pennant = no passing, round = railroad ahead</b>.",{sign:"stop"});

window.TOPICS = TOPICS;
window.QUESTIONS = Q;
})();
