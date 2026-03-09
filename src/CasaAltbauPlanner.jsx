import React, { useState, useEffect, useCallback, useRef } from "react";

const MN=["Foundations","Structural Thinking","Spatial Intelligence","Designer Refinement"];
const DY=["Mon","Tue","Wed","Thu","Fri"];
const SC={Mon:"#f0c040",Tue:"#60aaff",Wed:"#ff6b6b",Thu:"#4cdd80",Fri:"#d070ff"};
const SN={Mon:"What I'd Never Do",Tue:"Design Icon",Wed:"Mistake I See",Thu:"At Home",Fri:"If I Were Your Designer"};
const PIL={Mon:"Authority",Tue:"Education",Wed:"Shareability",Thu:"Personal",Fri:"Aspiration"};
const PILC={Authority:"#f0c040",Education:"#60aaff",Shareability:"#ff6b6b",Personal:"#4cdd80",Aspiration:"#d070ff"};

const D=[
// M1W1
[{d:"Mon",t:"Filling space just because it's empty",p:"Negative space, hierarchy, visual rest",f:"Reel",h:"I'd never fill a corner just because it's empty.",
sc:`I'd never fill a corner just because it's empty.

That impulse to put something in every gap? That's not designing. That's nervous decorating.

Empty space isn't wasted. It's what gives everything around it room to actually matter. A corner with nothing in it can hold more weight than one stuffed with a plant you bought because you panicked at IKEA.

Space is a material. Use it like one.`,
dn:`Let the IKEA line land with a tiny smile. Not a punchline, just recognition. "We've all done this" energy.`,
br:`Your actual empty corner, multiple angles\nSlow pan across the room showing the corner in context\nYour hand almost reaching to place something, then pulling back\nOptional: overstuffed corner elsewhere as contrast`,
ca:`An empty corner isn't a problem to solve. It's a decision to protect.\n\nThe impulse to fill every gap is the same impulse that makes a room feel like it's trying too hard. Breathing room isn't wasted space — it's what gives everything else permission to land.\n\nThe hardest design skill isn't adding. It's knowing when to stop.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #interiordesign"},
{d:"Tue",t:"Arco Lamp (1962)",p:"Structural balance, counterweight logic",f:"Carousel",h:"Arco Lamp, 1962. Still unmatched.",
sc:`SLIDE 1: Arco Lamp, 1962. Still unmatched.
SLIDE 2: [Hero image — let the lamp own the frame]
SLIDE 3: What makes this work isn't the curve. It's the counterweight. 65kg of marble holding a light three meters from the wall. No ceiling mount needed.
SLIDE 4: PRINCIPLE — Structural balance. The base does all the heavy lifting (literally) so the shade can float.
SLIDE 5: PRINCIPLE — Counterweight logic. Beauty that started as an engineering problem.
SLIDE 6: It replaced the need for a ceiling point above a dining table. Function dressed up as sculpture.
SLIDE 7: [In context — real lived-in room, not a showroom]
SLIDE 8: TAKEAWAY — Great design doesn't fight gravity. It negotiates with it.`,
dn:`Slide 8 is the save trigger. Keep it clean, text-forward, easy to screenshot.`,
br:`High-contrast hero image, dark/neutral bg\nAnnotated close-up of base vs arc\nThe lamp over a dining table in a real home\nDetail of marble base texture`,
ca:`The Arco Lamp is over 60 years old and still the most elegant solution to a simple problem: how do you get light above a table without drilling into the ceiling?\n\nCastiglioni's answer was 65kg of marble and a steel arc. Physics as aesthetic. Honestly, the confidence alone.\n\nSave this if you think good design starts with a good problem.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #homedecor"},
{d:"Wed",t:"Rugs too small",p:"Zoning, cohesion, ground plane logic",f:"Reel",h:"If your living room feels off, check your rug.",
sc:`If your living room feels off, check your rug.

Nine times out of ten, it's too small. A rug that floats in the middle of the room doesn't ground anything. It just... hovers there. Looking confused.

Front legs of every seated piece should land on the rug. Minimum. The rug defines the zone. If it's too small, nothing around it feels connected.

Small shift. Completely different room.`,
dn:`"Looking confused" — personify the rug. Pause after "hovers there." Let the image land.`,
br:`Overhead shot of your rug with furniture\nBefore/after diagram on iPad\nClose-up of chair leg on rug edge\nOptional: tiny rug in big room for humor (bath mat energy)`,
ca:`The rug is the floor plan you can see. Get it wrong and nothing above it will feel right.\n\nMost rugs I see are one size too small. They float in the center, disconnected from everything.\n\nFront legs on the rug. Minimum. That's the whole rule.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #collectedhome #designinspiration"},
{d:"Thu",t:"Leaving a corner intentionally empty",p:"Breathing room as a design choice",f:"Reel",h:"I left this corner empty for three months before I was sure.",
sc:`[Open with the corner. Natural light. Ambient sound. No music for 3 sec.]

I left this corner empty for three months before I was sure.

The instinct was to put something there. A plant. A lamp. Literally anything. But every time I walked past it, the room felt better without it.

Some spaces are doing their job by staying open.`,
dn:`Softest content of the week. No teaching, just showing. If the voiceover feels too simple, it's perfect.`,
br:`The corner in morning and golden hour light\nSlow approach toward the corner, handheld\nYou walking past in daily routine\nWider shot showing corner as part of composition`,
ca:`Three months of resisting the urge to fill this corner.\n\nEvery time I considered adding something, the room quietly reminded me it didn't need it. Some of the best design decisions aren't things you add. They're things you protect from being added.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Diagnose before buying",p:"Friction analysis, behaviour-first design",f:"Reel",h:"If I walked into your home, the first thing I'd do is watch you move through it.",
sc:`If I walked into your home, the first thing I'd do is watch you move through it.

Not look at your furniture. Not check your color palette. I'd watch where you pause. Where you sidestep. Where you dump your keys.

Because the room already knows what's wrong. The friction tells you everything.

Diagnose first. Decorate later. Always later.`,
dn:`Hook subverts expectations — people expect "I'd repaint." You say "I'd watch you walk." "Where you dump your keys" is the relatability anchor. Deliver casually.`,
br:`You walking through your apartment naturally\nKeys landing on a surface\nA tight spot you squeeze past\nYou standing in a doorway observing the room\nPOV hand on doorframe entering a room`,
ca:`Design doesn't start with a mood board. It starts with watching how a space actually gets used.\n\nWhere do you hesitate? Where does the flow break? Where do things pile up? That's your brief. The room is already telling you what it needs.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M1W2
[{d:"Mon",t:"Making everything match perfectly",p:"Contrast, layering, tension",f:"Carousel",h:"Most people match everything. I never would.",
sc:`SLIDE 1: Most people match everything. I never would.
SLIDE 2: [A "matchy" setup — same wood, same metal, same era. Coordinated but lifeless]
SLIDE 3: Same wood tone everywhere. Same metal finish. Same era. It looks coordinated. But it doesn't feel alive. Where's the friction? Where's the story?
SLIDE 4: PRINCIPLE — Contrast creates depth. Matte next to polished. Vintage next to new. Rough next to smooth.
SLIDE 5: PRINCIPLE — Tension is what makes a room feel collected instead of catalog.
SLIDE 6: [Your space showing intentional contrast: different eras, materials touching]
SLIDE 7: [Close-up of two contrasting materials side by side]
SLIDE 8: TAKEAWAY — Collected, not coordinated. Let the room tell more than one story.`,
dn:`Slide 8 "Collected, not coordinated" is your save trigger. This reframes matching as a limitation, not a goal.`,
br:`A "too matchy" vignette — all one tone\nYour space showing contrast\nClose-up textures: wood grain vs metal vs fabric\nTwo objects side by side that shouldn't work but do`,
ca:`A room where everything matches is a room that stopped evolving.\n\nContrast creates depth. A raw wood table next to a velvet chair. Brass next to matte black. The tension between things that don't "go together" is exactly what makes a room feel lived in.\n\nCollected, not coordinated.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"Wishbone Chair (1949)",p:"Steam-bent wood, paper cord seat",f:"Carousel",h:"One chair. Three weeks to make. Still no shortcut.",
sc:`SLIDE 1: DESIGN ICON 02. Wishbone Chair, 1949. STILL ICONIC. One chair. Three weeks to make. Still no shortcut.
SLIDE 2: [Full photo. Wishbone in a real home.]
SLIDE 3: Y-back detail. Hans Wegner stole the shape from a Chinese emperor's throne. He kept seeing portraits of Danish merchants lounging on Ming dynasty chairs and figured, why is this not in every dining room?
SLIDE 4: 14 parts. 100 steps. All by hand. The back and armrest are one single piece of steam-bent wood. No one has figured out how to fake that part yet.
SLIDE 5: The seat was never meant to be paper. They wanted rope but it was post-war and there wasn't any. So they wove 120 meters of paper cord by hand instead. Turned out better than the original plan. [Paper cord weave detail]
SLIDE 6: Carl Hansen took one look and said it looked like garden furniture. Made it anyway. Became the bestselling chair in the company's 116-year history. [Chair silhouette]
SLIDE 7: Japan buys over a quarter of every chair made. There's a whole book about it, only in Japanese. They also still get the original seat height because in the 90s Europe's version went up 2cm. People got taller. The chair didn't. [Y-back close-up]
SLIDE 8: [Full photo. Wishbone at a dining table, lived-in.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Y-back detail\nPaper cord weave detail\nChair silhouette\nY-back close-up\nWishbone at a dining table, lived-in`,
ca:`Hans Wegner stole the shape from a Chinese emperor's throne. The back and armrest are one steam-bent piece of wood. No one has figured out how to fake that yet.\n\nThe seat was supposed to be rope. Post-war rationing meant 120 metres of paper cord instead. Turned out better.\n\nCarl Hansen thought it looked like garden furniture. Made it anyway.`,
tg:"#wishbonechair #hanswegner #carlhansen #designicon #danishdesign #midcenturymodern #diningchair #iconicdesign #interiordesigninspo #designhistory #scandinaviandesign #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Furniture against walls",p:"Depth, layering, perimeter bias",f:"Reel",h:"Your room isn't the problem. Your layout is.",
sc:`Your room isn't the problem. Your layout is.

Pushing everything against the walls doesn't make the room feel bigger. It makes the center feel like a dance floor nobody asked for.

Pull the sofa forward. Even 30 centimeters. That's it. Let the room breathe from the middle, not just the edges.

One move. Different room.`,
dn:`"Dance floor nobody asked for" — deliver like it just occurred to you. Conversational, slightly amused.`,
br:`Top-down diagram showing walls vs pulled-in layout\nYour sofa from behind showing the gap\nYou physically pulling furniture forward\nWide shot showing depth in your living room`,
ca:`The safest layout is usually the weakest one.\n\nFurniture against every wall creates a dead center and rigid edges. Pulling pieces forward creates layers, depth, and breathing room.\n\nThe room feels larger when it has a middle, not just edges.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Living with a space before changing it",p:"Patience as design intelligence",f:"Reel",h:"We moved in four months ago. I still haven't touched this wall.",
sc:`[Shot of an untouched wall. TEXT: "We moved in four months ago. I still haven't touched this wall."]

Not because I don't have ideas. I have too many. That's exactly why I'm waiting.

Living in a space before designing it is the most underrated skill. You learn where the light falls. Where you actually sit. What actually bothers you versus what you think bothers you.

Patience isn't passive. It's research.`,
dn:`Film the wall in different lights: morning, afternoon, evening. Show time passing through light shifts.`,
br:`The empty wall in different light conditions\nYou sitting across from it, thinking\nA notebook with unexecuted ideas\nThe apartment from hallway showing the wall`,
ca:`Four months in and this wall is still untouched.\n\nNot because I'm undecided. Because I'm still learning. Every week the apartment teaches me something about how we actually use it.\n\nPatience isn't indecision. It's the first phase of good design.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Subtraction first",p:"Visual load reduction, imbalance exposure",f:"Carousel",h:"Before I'd ever add anything, I'd remove three things.",
sc:`SLIDE 1: Before I'd ever add anything to your room, I'd remove three things.
SLIDE 2: [A cluttered surface — real, honest, relatable]
SLIDE 3: Most rooms don't need more. They need less getting in the way of what's already good.
SLIDE 4: REMOVE — The cushion that doesn't belong. (We all have one.)
SLIDE 5: REMOVE — The side table blocking the path. (It migrated there. Nobody approved this.)
SLIDE 6: REMOVE — The candle that's been there since 2019, doing absolutely nothing.
SLIDE 7: [The cleared surface — clean, breathing, intentional]
SLIDE 8: TAKEAWAY — Subtraction is the fastest renovation you'll ever do. And the cheapest. Which is honestly the best part.`,
dn:`The "since 2019" line is funny because it's specific. Each REMOVE slide should feel like a confession. We've all got these objects.`,
br:`Your hand removing objects one by one\nBefore/after of a surface\nThe "edit pile" gathered together\nThe cleared shelf with beautiful light`,
ca:`The cheapest redesign in the world costs nothing. It's removal.\n\nBefore you buy a single new thing, take three things out of the room. Live with the space that opens up. Most of the time, that space was the missing piece.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #collectedhome #interiordesign"}],
// M1W3
[{d:"Mon",t:"Rushing large furniture decisions",p:"Scale, mass distribution, circulation",f:"Reel",h:"I'd never rush a sofa decision. Ever.",
sc:`I'd never rush a sofa decision. Ever.

A sofa sets the scale for everything around it. Too small and the room swallows it. Too deep and the walkway dies. Too long and suddenly your living room is just... sofa.

This isn't about style. It's about mass. The biggest piece controls the physics of everything else.

Take your time with the heavy decisions. Everything lighter follows.`,
dn:`"Just... sofa" — the pause before "sofa" is everything. Let it hang. That's the laugh.`,
br:`Your sofa in context showing its room relationship\nMeasuring tape next to the sofa\nYou sitting on the sofa looking at the room\nDoorway shot showing sofa as the anchor`,
ca:`The sofa isn't just seating. It's the gravitational center of the room.\n\nGet the scale wrong and every other piece will feel slightly off. Take your time with the decisions that carry the most weight.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #interiordesign"},
{d:"Tue",t:"Eames Lounge (1956)",p:"Molded plywood, shock mount engineering",f:"Carousel",h:"One chair. Inspired by a baseball glove. Still the fastest way to never leave your living room.",
sc:`SLIDE 1: DESIGN ICON 03. Eames Lounge, 1956. STILL ICONIC. One chair. Inspired by a baseball glove. Still the fastest way to never leave your living room.
SLIDE 2: [Full photo. Eames Lounge in a real living room.]
SLIDE 3: Molded plywood shell detail. Charles Eames wanted a chair that felt like a baseball glove. Not sculptural. Not a design statement. He literally told Herman Miller he wanted something that hugs you back. They spent three years trying to bend plywood without cracking it.
SLIDE 4: Three shells. Three angles. Zero chance you sit upright. The seat, back, and headrest each tilt independently. It's engineered to make you recline whether you planned to or not.
SLIDE 5: The rubber shock mounts almost ended it. Those little rubber discs connecting wood to aluminum? Engineers said they'd fail under stress. The Eameses tested hundreds of versions. They still fail sometimes. Herman Miller still replaces them for free. [Shock mount detail close-up]
SLIDE 6: Billy Wilder got chair number one. The director was so famous for napping on set that the Eameses basically designed it for him. He asked for "something to take long naps in." They took that very seriously. [Chair silhouette]
SLIDE 7: You can't get the original wood anymore. Brazilian rosewood was banned from export in 1992. So every vintage rosewood version is frozen in time. They go for $10K+ now. The chair outlived its own tree. [Rosewood veneer close-up]
SLIDE 8: [Full photo. Eames Lounge at a reading nook or living room, lived-in.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Molded plywood shell detail\nShock mount detail close-up\nChair silhouette\nRosewood veneer close-up\nFull room shot, lived-in`,
ca:`The Eames Lounge started as a nap request from a film director and ended up in MoMA's permanent collection. Charles and Ray Eames spent years cracking plywood (literally) to get the curves right, used rubber shock mounts that engineers swore would fail, and originally wrapped it in Brazilian rosewood you can't even buy anymore.\n\n70 years later it's still the chair people point at and say "one day." Fair enough.\n\nFull story in the slides.`,
tg:"#eameslounge #eamesloungechair #designicon #midcenturymodern #hermanmiller #charlesandrayeames #furnituredesign #iconicdesign #interiordesigninspo #designhistory #midcenturyfurniture #chairdesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Art hung too high",p:"Relational placement, vertical proportion",f:"Carousel",h:"One thing. Costs nothing to fix. Changes everything.",
sc:`SLIDE 1: One thing. Costs nothing to fix. Changes everything.
SLIDE 2: [Art hung too high — the classic mistake. The gap between art and furniture is visible]
SLIDE 3: Your art is hung too high. I can almost guarantee it. The center of the piece should sit at 145cm from the floor.
SLIDE 4: PRINCIPLE — Relational placement. Art should connect to the furniture below it, not float toward the ceiling.
SLIDE 5: [Diagram or annotated photo showing the 145cm rule]
SLIDE 6: When art is too high, it disconnects from the room. Drop it. Let it join the conversation.
SLIDE 7: [Correct height — art relating to sofa/console below]
SLIDE 8: TAKEAWAY — 145cm from the floor to the center. Your room and your neck will thank you.`,
dn:`"Your neck will thank you" is the kicker. Throwaway humor — like you just remembered necks exist.`,
br:`Art at wrong height showing the gap\nMeasuring tape at 145cm mark\nArt at correct height connecting to furniture\nClose-up of nail hole being filled (evidence of the move)`,
ca:`145cm from the floor to the center of the piece. That's the number.\n\nArt that floats too high disconnects from everything below it. Drop it to where your eyes naturally land.\n\nThe free fix that changes everything.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #collectedhome #designinspiration"},
{d:"Thu",t:"Editing instead of adding",p:"Restraint as refinement",f:"Reel",h:"I removed two things from this shelf today. It finally breathes.",
sc:`[Close-up of a shelf. Three objects with space between them. TEXT: "I removed two things from this shelf today. It finally breathes."]

The books that were there just for color. The vase filling a gap because the gap felt weird.

Now the three things that stayed have room to actually exist.

Editing isn't losing something. It's letting what stays become more visible.`,
dn:`This is quiet. The shelf is the star. Your voice is secondary.`,
br:`Close-up shelf pan across remaining objects\nRemoved objects sitting together elsewhere\nYour hand adjusting spacing of what's left\nLight falling on the shelf naturally`,
ca:`Two things removed. Three things revealed.\n\nEvery object on a shelf is either earning its place or diluting the ones around it. Today I chose presence over fullness.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Scale before style",p:"Ergonomic proportion, circulation",f:"Reel",h:"You don't need a designer. You need a tape measure and a different question.",
sc:`You don't need a designer to fix your living room. You need a tape measure and a different question.

Before I'd ask about your taste, I'd measure. How wide is the walkway? How deep is the seat? Can two people pass without doing that awkward sideways shuffle?

Scale fixes more problems than style ever will. Get the proportions right and honestly, almost anything looks good.`,
dn:`The "sideways shuffle" — actually do it. Physical comedy. Not exaggerated, just real. It's the moment people send to their partner.`,
br:`You holding a tape measure in the room\nMeasuring the walkway gap\nThe sideways shuffle demonstration\nWide shot of a well-proportioned room`,
ca:`Style is the conversation everyone wants to have. Scale is the one that actually matters.\n\nMeasure your walkways. Check furniture depth against room width. When proportion is right, style gets dramatically easier.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M1W4
[{d:"Mon",t:"Designing around trends",p:"Longevity, architectural logic",f:"Reel",h:"My friends always ask why nothing in my home looks trendy.",
sc:`My friends always ask why nothing in my home looks trendy.

Because trends are someone else's answer to a question I never asked.

I'd rather have a room that makes sense in ten years than one that photographs well for one season then makes you cringe at your own grid.

Longevity isn't boring. It's just quieter.`,
dn:`"Cringe at your own grid" is the line. Everyone has experienced this. Say it like you have too.`,
br:`Slow pan across your space — timeless, personal pieces\nA specific un-trendy piece you love\nPhone scrolling trending interiors (contrast)\nClose-up: leather, wood, linen — materials that age well`,
ca:`Trends are seasonal. Rooms are not.\n\nNothing in my apartment was chosen because it was "in." Every piece is here because it solved a problem or earned its spot over time.\n\nThat's not boring. That's architecture thinking applied to living.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"PH Artichoke (1958)",p:"72-leaf glare shield, aircraft cable construction",f:"Carousel",h:"72 leaves. One rule. You should never see the bulb.",
sc:`SLIDE 1: DESIGN ICON 04. PH Artichoke, 1958. STILL ICONIC. 72 leaves. One rule. You should never see the bulb.
SLIDE 2: [Full photo. PH Artichoke hanging in a real home, warm glow.]
SLIDE 3: Leaf layer detail. Henningsen grew up with gas lamps and never got over it. When electric light showed up in his town, he thought it was hideous. Harsh, flat, unflattering. He spent the rest of his career trying to make a bulb feel like a candle. The Artichoke was his answer, 34 years in the making.
SLIDE 4: 72 copper leaves. Each one hung by hand. Twelve rows of six, positioned so you can't see the light source from any angle. Not above, not below, not from across the room. That was the only brief. He took it personally.
SLIDE 5: It was so heavy they had to hang it from aircraft cables. The original was built for a waterfront restaurant in Copenhagen called Langelinie Pavillonen. When they finally got it up, they realized normal ceiling mounts wouldn't hold it. Steel aircraft cables. For a lamp. Nobody blinked. [Full lamp from below, interior architecture]
SLIDE 6: Somebody stole the originals off the ceiling. In the middle of the night, someone broke into the restaurant and cut the Artichokes down. Just took them. Most were eventually recovered but imagine being that committed to a lighting fixture. [Lamp silhouette]
SLIDE 7: He tested light with a candle in a baby carriage. Henningsen painted his attic black, put a candle on a plate inside a pram, wrapped it in greased paper, and rolled it around on floor tracks measuring how light moved. Thousands of readings. That's how every PH lamp started. In a baby carriage. [Copper leaf close-up, warm patina]
SLIDE 8: [Full photo. PH Artichoke over a dining table, lived-in.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Leaf layer detail\nFull lamp from below, interior architecture\nLamp silhouette\nCopper leaf close-up, warm patina\nOver a dining table, lived-in`,
ca:`Poul Henningsen thought electric light was ugly. So he spent 34 years fixing it. The PH Artichoke has 72 hand-hung copper leaves, was originally so heavy it needed aircraft cables, and at some point somebody loved it enough to steal the originals right off the restaurant ceiling.\n\nOh, and he designed every PH lamp by rolling a candle around his blacked-out attic in a baby carriage. As you do.\n\nFull story in the slides.`,
tg:"#phartichoke #poulhenningsen #louispoulsen #designicon #danishdesign #lightingdesign #scandinaviandesign #midcenturymodern #iconicdesign #interiordesigninspo #designhistory #pendantlamp #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Too many small objects",p:"Hierarchy, visual fragmentation, rhythm",f:"Reel",h:"This is the most common reason a room doesn't feel finished.",
sc:`This is the most common reason a room doesn't feel finished. Not too little. Too much.

Too many small objects scattered everywhere, each one fighting for attention, none of them winning. It's like a group project where everyone talks at once.

Group objects in odd numbers. Vary the height. Let one piece lead each grouping.

Three things with intention will always outperform twelve things with none.`,
dn:`"Group project where everyone talks at once" — deliver with slight exhaustion. Like you've seen this a hundred times.`,
br:`Surface covered in small objects (the before)\nSame surface edited to three objects (the after)\nClose-up of a well-composed grouping: tall, medium, small\nYour hands removing objects one by one`,
ca:`A room full of small things isn't decorated. It's scattered.\n\nGroup in odd numbers. Vary the height. Let one piece lead. Three things with intention outperform twelve with none.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Removing clutter to restore calm",p:"Editing as self-care",f:"Reel",h:"Sunday reset. Nothing added. Just removed.",
sc:`[Slow shots of freshly edited space. Morning light. TEXT: "Sunday reset. Nothing added. Just removed."]

The stack of books that migrated to the coffee table. The extra throw layered out of habit. The candle that stopped being intentional weeks ago and was just... there. Existing.

Same room. Less noise. Feels like itself again.`,
dn:`"Existing" — flat, observational. Like the candle's existential crisis is mildly amusing to you.`,
br:`Coffee table before and after\nA throw being folded and put away\nA candle being picked up and moved\nCleared room with beautiful light\nHands smoothing a surface after clearing`,
ca:`Nothing was purchased. Nothing was rearranged. Just removed.\n\nThe books, the extra throw, the candle there out of habit. Sometimes the best reset is remembering what the room felt like before you started adding.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #homedecor"},
{d:"Fri",t:"Fix lighting hierarchy",p:"Layered lighting, dimensionality",f:"Reel",h:"Before I'd ever talk about color, I'd turn off half your lights.",
sc:`Before I'd ever talk about color, I'd turn off half your lights.

Most rooms have too much of the same kind of light. One overhead, everything evenly lit, zero depth. It's like taking a photo with the flash on. Technically bright. Emotionally nothing.

A reading lamp here. Ambient light there. One pool of warmth, one shadow. That's where a room gets its mood.

Fix the light. The room transforms. And you didn't have to repaint a single wall.`,
dn:`"Flash on" metaphor sticks. Instant recognition. Don't explain further. Let it land.`,
br:`Overhead on: flat, institutional (the before)\nSame room, overhead off, two lamps on (atmospheric after)\nClose-up of lamp turning on, warm glow spreading\nShadow falling across a wall\nYou adjusting a lamp angle`,
ca:`Color, furniture, and layout get all the attention. Lighting gets ignored. And it controls everything.\n\nOne overhead flattens a room. Layers of light create depth, warmth, and mood. Three sources minimum. That's where atmosphere lives.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #designthinking #interiordesign"}],
// M2W1 (WK5)
[{d:"Mon",t:"Designing for photos instead of living",p:"Usability vs composition",f:"Reel",h:"I'd never design a room that only works in photos.",
sc:`I'd never design a room that only works in photos.

A room that looks perfect from one angle but can't be lived in is a set, not a home. If you're scared to put your feet on the coffee table, something went wrong.

Beautiful and functional aren't opposites. If you have to choose, choose the one you can sit in without anxiety.

If it doesn't work with your life, it doesn't work. Period.`,
dn:`"Scared to put your feet on the coffee table" — everyone knows this feeling. Slight incredulity. Obviously ridiculous but somehow common.`,
br:`Styled vignette from one angle (gorgeous)\nReveal from another angle (impractical)\nYour space being used: you sitting, book open, lived-in\nPhone held up framing a "perfect" shot vs wider reality`,
ca:`A room that exists only for the camera is a room nobody enjoys.\n\nDesign should pass two tests: does it photograph well, and can you live in it with your eyes closed? Both matter. But livability wins.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #interiordesign"},
{d:"Tue",t:"Noguchi Table (1947)",p:"Asymmetric balance, self-stabilizing base",f:"Carousel",h:"Three parts. No screws. Born out of pure revenge.",
sc:`SLIDE 1: DESIGN ICON 05. Noguchi Table, 1947. STILL ICONIC. Three parts. No screws. Born out of pure revenge.
SLIDE 2: [Full photo. Noguchi Table in a real living room.]
SLIDE 3: Wood base pivot joint detail. Noguchi designed this table to get back at someone who stole his idea. In 1939 a British furniture designer asked him to make a coffee table. Noguchi sent a model, heard nothing back. Then saw the guy selling a version of it in a magazine ad. While Noguchi was in an internment camp. His response? "In revenge, I made my own variant of my own table."
SLIDE 4: Two identical pieces. One pin. That's the whole table. The base is two curved wooden forms, placed inversely and joined at a single pivot point. They form a self-stabilizing tripod. The glass top just sits on it. No connectors. No glue. It holds because the geometry is right.
SLIDE 5: Herman Miller called it "knockdown furniture." Because it ships in three pieces and you assemble it yourself. In 1947, flat-pack before flat-pack was a thing. The whole idea was that sculpture shouldn't be precious. It should show up at your door in a box. [Glass top resting on base, assembly detail]
SLIDE 6: He originally made it as a birthday present for his sister. George Nelson, Herman Miller's design director, stopped by Noguchi's studio and saw him building it from scavenged glass and two wood offcuts. Nelson basically said, "We're producing that." The birthday gift became one of the bestselling tables of the 20th century. [Table silhouette, side profile]
SLIDE 7: They stopped making it. People lost their minds. Production ended in 1973. The table instantly became a collector's item. People were hunting them down for years. Herman Miller brought it back in 1984 and it hasn't stopped since. The Goodyear table that started all of this? Sold at auction for $4.45 million. [Wood grain close-up, walnut base]
SLIDE 8: [Full photo. Noguchi Table in a lived-in room, books and coffee on it.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Wood base pivot joint detail\nGlass top resting on base, assembly detail\nTable silhouette, side profile\nWood grain close-up, walnut base\nRoom shot with books and coffee on it`,
ca:`The Noguchi Table exists because someone stole Isamu Noguchi's design and told him "anybody can make a three-legged table." He was in a WWII internment camp at the time. So he made his own version, better, and named it after himself just to be clear. Three parts, no screws, glass just resting on wood because the balance is that precise.\n\nIt went out of production in 1973. People panicked. It came back in 1984 and hasn't left since.\n\nFull story in the slides.`,
tg:"#noguchitable #isamunoguchi #hermanmiller #designicon #midcenturymodern #coffeetable #moderndesign #sculptureforuse #iconicdesign #interiordesigninspo #designhistory #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Curtains too short",p:"Vertical elongation, framing",f:"Reel",h:"If your ceilings feel low, check your curtains.",
sc:`If your ceilings feel low, check your curtains.

Curtains that stop at the window frame cut the wall in half. Visually, the room shrinks. It's like wearing trousers that are two inches too short. Technically fine. Emotionally wrong.

Mount the rod as close to the ceiling as possible. Let the fabric fall all the way to the floor.

Your ceiling didn't grow. Your curtains did. Same result.`,
dn:`"Trousers two inches too short" — everyone can feel this analogy. Deliver casually, like it just came to you.`,
br:`Curtains at wrong height (before)\nCurtains at correct height in your apartment\nClose-up of rod mounted near ceiling\nFull-length fabric touching the floor`,
ca:`Curtains are vertical architecture. Hang them wrong and the room loses height it never lost.\n\nRod to the ceiling. Fabric to the floor. The room stretches without changing a single measurement.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #collectedhome #designinspiration"},
{d:"Thu",t:"Adjusting curtain height at home",p:"Small shift, different room",f:"Reel",h:"Moved the curtain rod up 20cm today. Different room.",
sc:`[Shot of adjusted curtains. Full light. TEXT: "Moved the curtain rod up 20cm today. Different room."]

Same curtains. Same window. But the ceiling feels like it exhaled.

One of those changes that costs almost nothing and shifts everything.

Twenty centimeters and a screwdriver. The renovation nobody talks about.`,
dn:`"The renovation nobody talks about" — quick, dry, delivered like a PSA for unglamorous fixes.`,
br:`Curtain rod close-up near ceiling\nFull fabric drop to floor\nLight through curtains (dreamy)\nOld screw holes visible (keeps it real)`,
ca:`Twenty centimeters. Same curtains, same window. But the room breathes differently now.\n\nSmall moves with outsized impact. That's what design actually looks like most of the time.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Define primary use",p:"Functional hierarchy",f:"Reel",h:"The first question I'd ask isn't what style you like.",
sc:`The first question I'd ask isn't what style you like.

It's: what actually happens in this room? Do you work here? Collapse here? Argue with someone about what to watch here?

Because the primary use dictates everything. The lighting height. The furniture arrangement. The circulation.

Style comes last. Function sets the bones.

Tell me what happens in the room. I'll tell you what it needs.`,
dn:`"Argue about what to watch" is the laugh. Everyone has this argument. Humanizes the design process.`,
br:`Different rooms being used: working, eating, lounging\nYour room set up for its primary function\nYou sitting in different positions in the same room\nA notepad with "What happens here?" written on it`,
ca:`Before color. Before furniture. Before mood boards.\n\nThe first question: what does this room need to do? The answer shapes everything. Style is the finish. Function is the foundation.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M2W2 (WK6)
[{d:"Mon",t:"Ignoring vertical proportion",p:"Sightlines, ceiling balance",f:"Reel",h:"Most people forget to look up. I never would.",
sc:`Most people forget to look up. I never would.

When everything sits at the same height, the ceiling disappears. You're living in the bottom half of your apartment and paying rent for the whole thing.

You need something tall. A floor lamp. A bookshelf. Art that reaches past the sofa line.

Vertical proportion is the dimension most rooms are missing. And it's free real estate. Literally.`,
dn:`"Paying rent for the whole thing" — funny because it's financially true. Deliver like a realization.`,
br:`Camera tilting from furniture level to empty ceiling\nFloor lamp or tall plant reaching upward\nComparison: flat room vs room with vertical elements\nArt creating vertical interest`,
ca:`A room with nothing above eye level is missing a dimension.\n\nThe ceiling is half the space. A tall lamp, a high shelf, art that reaches upward. Vertical proportion turns a flat layout into atmosphere.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #interiordesign"},
{d:"Tue",t:"Barcelona Chair (1929)",p:"Roman sella curulis, steel X-frame",f:"Carousel",h:"Built for a king. The king never sat in it.",
sc:`SLIDE 1: DESIGN ICON 06. Barcelona Chair, 1929. STILL ICONIC. Built for a king. The king never sat in it.
SLIDE 2: [Full photo. Barcelona Chair in a real interior.]
SLIDE 3: Chrome frame detail. Lilly Reich probably designed it. Mies van der Rohe gets all the credit but his partner and collaborator Lilly Reich handled the interiors and furniture for the pavilion. Recent scholarship puts her as the true architect of the design. After they stopped working together, Mies never designed another piece of furniture. Make of that what you will.
SLIDE 4: The pavilion it was made for only stood for seven months. The German Pavilion was pulled down after the Exposition ended. The chair survived. They rebuilt the entire building from scratch in 1986 because people couldn't stop talking about a place that no longer existed. The chairs were already back in production by then.
SLIDE 5: He based it on a 2,000-year-old Roman chair. The sella curulis was a folding seat used by magistrates and emperors. Mies took the crossed-leg structure, remade it in steel, and stripped everything decorative. A modern throne with no gold, no bulk, and no apology. [Steel X-frame cross detail]
SLIDE 6: The original cushions were ivory pigskin. Each cushion is now cut from a single cowhide. Hand-welted, hand-tufted, every button done individually. The leather straps underneath are dyed to match. It takes longer to upholster than to build the frame. Knoll still stamps Mies's signature into the steel. [Leather tufting close-up]
SLIDE 7: One curve becomes the back. The other becomes the seat. The frame is two crossed steel bars. The back legs sweep up into the backrest. The front legs curve forward into the seat. That's it. The whole structure is in the intersection. Originally bolted together, redesigned in 1950 so the frame could be one seamless piece of stainless steel. [Chair silhouette, side profile]
SLIDE 8: [Full photo. Barcelona Chair in a living room or lobby, lived-in.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Chrome frame detail\nSteel X-frame cross detail\nLeather tufting close-up\nChair silhouette, side profile\nRoom shot with lived-in context`,
ca:`The Barcelona Chair was designed as a modern throne for the King and Queen of Spain. They never sat in it. The pavilion it was made for lasted seven months. And the person who probably actually designed it -- Lilly Reich -- barely gets mentioned.\n\nMies based the frame on a 2,000-year-old Roman magistrate's chair, stripped everything decorative, and built it from two crossed steel curves. After he and Reich stopped working together, he never designed another piece of furniture.\n\nFull story in the slides.`,
tg:"#barcelonachair #miesvanderrohe #lillyreich #knoll #designicon #modernistdesign #bauhaus #iconicfurniture #interiordesigninspo #designhistory #midcenturymodern #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Too many focal points",p:"Hierarchy clarity",f:"Reel",h:"Your room isn't busy. It's competing with itself.",
sc:`Your room isn't busy. It's competing with itself.

A bold rug, a statement sofa, a gallery wall, a sculptural lamp. Each beautiful on its own. Together, they're a dinner party where everyone talks over everyone.

A room needs one thing that leads and everything else to support it. One voice, not a choir where everyone picked a different song.

Pick the star. Let everything else be the stage.`,
dn:`"Dinner party where everyone talks over everyone" — relatable. The humor is in recognition.`,
br:`Room with too many statements (styled temporarily)\nSame space with pieces removed until one dominates\nClose-up of the "star"\nSupporting cast: quieter pieces playing their role`,
ca:`When everything shouts, nothing is heard.\n\nEvery room needs hierarchy. One dominant piece. Everything else supports it. Not less important. Just quieter.\n\nPick the star. Let the rest be the stage.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #collectedhome #designinspiration"},
{d:"Thu",t:"Editing competing statement pieces",p:"Choosing what gets to speak",f:"Reel",h:"Took one piece out of the living room. Now the room has a voice.",
sc:`[Living room with one clear focal point. TEXT: "Took one piece out of the living room. Now the room has a voice."]

Two statement pieces fighting for attention. Neither winning. Like two friends telling the same story at the same time.

So one had to go. Not because it was wrong. Just because this wasn't its room.

Sometimes editing is relocation, not elimination.`,
dn:`"Like two friends telling the same story" — immediate recognition. Warm, not judgmental.`,
br:`The room with its current focal point\nThe spot where the other piece was\nThe relocated piece in its new home (looking great there)\nA quiet moment in the simplified room`,
ca:`Two pieces fighting for the same spotlight. Neither winning.\n\nOne moved to another room. Not discarded, redirected. The piece that stayed now has the presence it always deserved.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Rebalance visual weight",p:"Mass distribution",f:"Reel",h:"If I walked into your home, I'd rearrange before I'd buy.",
sc:`If I walked into your home, I'd rearrange before I'd buy.

Most rooms don't need new things. They need existing things in better positions. All the weight on one side. Everything heavy in the same corner. It's like loading a suitcase and only using the left half.

Shift the heavy piece opposite. Move a tall object to balance a low one. Before spending a single euro, redistribute what you already own.

The cheapest designer move is a furniture shuffle. And your back will forgive you eventually.`,
dn:`"Your back will forgive you eventually" — self-deprecating. Deliver like you speak from experience.`,
br:`You pushing furniture (real, effortful)\nBefore and after of a room arrangement\nOverhead diagram of weight distribution\nYou stepping back and assessing (the designer squint)`,
ca:`Before I'd spend a euro in your home, I'd move what's already there.\n\nMost rooms have the right pieces in the wrong positions. Redistributing is free and changes everything.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M2W3 (WK7)
[{d:"Mon",t:"Buying everything at once",p:"Temporal layering, rhythm",f:"Carousel",h:"I'd never furnish a room in one trip.",
sc:`SLIDE 1: I'd never furnish a room in one trip.
SLIDE 2: [A room that looks "frozen" — same store, same season, same energy]
SLIDE 3: A room bought all at once feels frozen. Same store, same season, same Saturday afternoon. It's a time capsule nobody wants to open.
SLIDE 4: PRINCIPLE — Temporal layering. Mixing eras creates depth that can't be bought in one transaction.
SLIDE 5: [A piece found on holiday. Something inherited. Something saved up for]
SLIDE 6: PRINCIPLE — Rhythm. A room built slowly has natural variation — different decisions, different moments, different energy.
SLIDE 7: [Your room showing collected pieces from different times]
SLIDE 8: TAKEAWAY — Time is a design material. The best rooms are gathered, not purchased.`,
dn:`"Time capsule nobody wants to open" — people instantly picture that one IKEA trip. Let it land.`,
br:`Close-ups of pieces from different eras in your home\nA vintage find\nWide shot showing the "layered over time" feeling\nYou examining a piece with care`,
ca:`A room furnished in a weekend is frozen in one moment.\n\nThe most interesting spaces are layered over time. Each piece carries a different decision, a different story. That's what collected feels like.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"Wassily Chair (1925)",p:"Tubular steel, Bauhaus material experiment",f:"Carousel",h:"The first steel tube chair ever made. Inspired by a bicycle.",
sc:`SLIDE 1: DESIGN ICON 07. Wassily Chair, 1925. STILL ICONIC. The first steel tube chair ever made. Inspired by a bicycle.
SLIDE 2: [Full photo. Wassily Chair in a real interior.]
SLIDE 3: Chrome tube bend detail. Breuer bought a bike and changed furniture forever. He was 23, riding around Dessau, looked down at the handlebars and thought: why isn't furniture made from this? Asked a local shop how they bent the tubes. "Like macaroni." That was enough.
SLIDE 4: It's not named after who you think. Breuer called it the B3. Decades later an Italian manufacturer found out Kandinsky had loved the prototype so much Breuer made him a personal copy. They named the chair after the painter. He had nothing to do with designing it.
SLIDE 5: He ran the woodworking shop. Made it from steel. Breuer headed the carpentry department at the Bauhaus. Then showed up with a chair made of bent metal tubes and leather straps. No wood anywhere. He called it "my most extreme work." [Full frame structure, side angle]
SLIDE 6: The original straps weren't leather. The first version used Eisengarn, a cotton yarn coated in wax until it went stiff and shiny like iron. A Bauhaus weaving student developed the material specifically for this chair. Leather came later in the 60s. [Strap and frame connection close-up]
SLIDE 7: The Nazis shut down the school that made it. Breuer was a Hungarian Jew. The Bauhaus was closed, he fled to London, then the U.S. The chair survived every regime that tried to erase the movement that created it. [Chrome frame reflection detail]
SLIDE 8: [Full photo. Wassily Chair in a living room, lived-in.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Chrome tube bend detail\nFull frame structure, side angle\nStrap and frame connection close-up\nChrome frame reflection detail\nRoom shot with lived-in context`,
ca:`Marcel Breuer was 23, riding a bicycle, looked at his handlebars and thought: why not furniture? That's how the first tubular steel chair got started. He ran the Bauhaus woodworking shop and showed up with a chair made entirely of metal. Kandinsky loved it so much he got a personal copy. The Nazis closed the Bauhaus. The chair is still in production 100 years later.\n\nFull story in the slides.`,
tg:"#wassilychair #marcelbreuer #bauhaus #knoll #designicon #tubularsteel #modernistdesign #iconicfurniture #interiordesigninspo #designhistory #midcenturymodern #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Mixed light temperatures",p:"Atmosphere coherence",f:"Reel",h:"One thing is making your home feel like a waiting room.",
sc:`One thing is making your home feel like a waiting room.

Mixed light temperatures. A warm bulb here, a daylight bulb there. Your brain can't settle because the room is sending mixed signals. It's like a room that can't decide what mood it's in.

Pick a temperature. For living spaces, warm. 2700K. Every bulb, every lamp. Consistency is what makes light feel like atmosphere instead of accident.

Same room. Same lamps. Different kelvin. That's the fix.`,
dn:`"A room that can't decide what mood it's in" — the room has a personality crisis. Relatable and slightly funny.`,
br:`Two lamps with different color temperatures (visible contrast)\nClose-up of bulb box showing kelvin\nRoom in consistent warm light (the after)\nYou changing a bulb`,
ca:`If your room feels uncomfortable and you can't explain why, check bulb temperatures.\n\nMixing warm and cool light creates visual noise. One temperature throughout. 2700K. That's the fix.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Changing bulb temperatures",p:"Warmth calibration",f:"Reel",h:"Replaced three bulbs tonight. Same room, different feeling.",
sc:`[Room in warm light. TEXT: "Replaced three bulbs tonight. Same room, different feeling."]

Three cool-white bulbs. Replaced with 2700K. Nothing else changed.

The walls softened. The furniture looks warmer. The whole room exhaled. Like it finally got permission to relax.

Five minutes. Three bulbs. Best renovation I've done this year.`,
dn:`"Permission to relax" — the room exhaling. Keep it soft and genuine.`,
br:`Warm lamps glowing (close-up, medium, wide)\nA bulb in your hand\nThe room from sofa perspective in warm light\nAmbient detail: a book, a cup in warm glow`,
ca:`Swapped three bulbs. Cool white out. Warm 2700K in.\n\nSame lamps, same furniture. But the room went from clinical to comfortable in five minutes.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Audit light before color",p:"Perception psychology",f:"Reel",h:"Before I'd pick a paint color, I'd spend a day watching the light.",
sc:`Before I'd ever pick a paint color, I'd spend a day watching the light.

Because paint doesn't have one color. It has about twelve. Depending on the hour, the window direction, the bulb temperature.

That warm beige you loved at the store? It goes grey at 4pm in a north-facing room. And then you've painted an entire wall in a color you only liked under fluorescent lighting at the hardware store. We've all been there.

Light is what makes color work. Audit it first.`,
dn:`"Fluorescent lighting at the hardware store" — collective shame moment. Say it with solidarity. You've done this too.`,
br:`Same wall at different times of day (quick cuts)\nPaint swatch against wall in different light\nPaint cans and swatches\nWindow light shifting`,
ca:`Paint doesn't have one color. It shifts all day long.\n\nBefore choosing, spend a full day in the room. Watch how morning differs from afternoon. How artificial light changes everything at night. Then choose.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M2W4 (WK8)
[{d:"Mon",t:"Over-labeling your style",p:"Concept over category",f:"Reel",h:"I'd never call my home a 'style.' It's a decision log.",
sc:`I'd never call my home a "style." It's a decision log.

The moment you label your home "Scandinavian" or "mid-century" or "japandi" — remember japandi? — you start editing out things that don't fit the category.

But the best rooms don't fit a label. They fit the person. Stop curating toward a Pinterest board. Start designing toward how you actually want to feel at 9pm on a Tuesday.

Your home isn't a genre. It's a biography.`,
dn:`"Remember japandi?" — micro-joke. Quick, throwaway. "9pm on a Tuesday" is specific enough to be felt.`,
br:`Your room — pieces that resist a single label\nSomething that doesn't fit any trend but works perfectly\nPhone scrolling style labels (contrast)\nYou using the space naturally`,
ca:`Style labels are cages disguised as clarity.\n\nStop asking "does this fit my aesthetic?" Start asking "does this make my room better at 9pm on a Tuesday?"`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"E-1027 Table (1927)",p:"Chrome arm, height-adjustable, bedside function",f:"Carousel",h:"Designed so her sister could eat breakfast in bed. That's the whole brief.",
sc:`SLIDE 1: DESIGN ICON 08. E-1027 Table, 1927. STILL ICONIC. Designed so her sister could eat breakfast in bed. That's the whole brief.
SLIDE 2: [Full photo. E-1027 table beside a bed or sofa.]
SLIDE 3: Chrome tube and glass detail. Le Corbusier was so obsessed with this house he vandalised it. Gray designed the table for her villa on the French Riviera. After she moved out, Le Corbusier painted murals all over the white walls without permission. She called it vandalism. He never credited her. For decades people assumed he designed it.
SLIDE 4: The name is a love letter in code. E for Eileen. 10 for J (Jean). 2 for B (Badovici). 7 for G (Gray). The house and table are named after the couple who built them. They broke up right after it was finished.
SLIDE 5: It slides over the bed. That's the whole point. Her sister hated crumbs on the sheets. Gray designed a glass top on an adjustable chrome arm that holds a tray above the mattress. Crumbs fall through. Problem solved, forever. [Height adjustment mechanism]
SLIDE 6: Three materials. No decoration. Chrome steel, a glass disc, and nothing else. Height-adjustable, so it works as a bedside table, a sofa table, or a reading surface. One design, every room. [Full table profile]
SLIDE 7: She had no architecture training. Gray studied painting, then lacquer work. Zero formal training in architecture or furniture. This was her first table. The house was her first building. Both ended up in MoMA. [Table in context, close angle]
SLIDE 8: [Full photo. E-1027 table in a lived-in room.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Chrome tube and glass detail\nHeight adjustment mechanism\nFull table profile\nTable in context, close angle\nLived-in room context`,
ca:`Eileen Gray designed this table because her sister wanted breakfast in bed without crumbs. A chrome arm, a glass disc, adjustable height. She also designed the house it was made for. Le Corbusier painted murals all over the walls without permission and never credited her. She had no formal training. Both the house and the table are in MoMA.\n\nFull story in the slides.`,
tg:"#eileengray #e1027 #classicon #designicon #modernistdesign #womenindesign #irishdesign #iconicfurniture #interiordesigninspo #designhistory #midcenturymodern #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Furniture too small for the room",p:"Scale imbalance, mass confidence",f:"Carousel",h:"Your furniture isn't wrong. It's just too small for the room.",
sc:`SLIDE 1: Your furniture isn't wrong. It's just too small for the room.
SLIDE 2: [A large room with undersized furniture — everything floating]
SLIDE 3: Undersized furniture makes a large room feel uncertain. The pieces hover. Nothing anchors. It looks like the room is waiting for the rest of the delivery.
SLIDE 4: PRINCIPLE — Scale confidence. The furniture should match the room's ambition.
SLIDE 5: You need mass. A bigger sofa. A larger rug. Art that fills the wall, not decorates it like a shy post-it note.
SLIDE 6: [Properly scaled furniture — the same room, filled with confidence]
SLIDE 7: PRINCIPLE — Scale anchoring. One oversized piece grounds an entire room.
SLIDE 8: TAKEAWAY — Scale up. The room can take it. It's been waiting.`,
dn:`"Shy post-it note" is visual humor. Tiny art on a massive wall. The art didn't choose to be there.`,
br:`Large room with small furniture\nProperly scaled pieces in the same room\nArt that fills a wall vs art lost on a wall\nYou stepping back, gesturing at the scale`,
ca:`Small furniture in a big room creates visual anxiety. Everything floats.\n\nThe fix isn't more pieces. It's bigger ones. Scale up the sofa, the rug, the art. Let the furniture match the room's ambition.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Upscaling art or rug for proportion",p:"Confidence in scale",f:"Reel",h:"Swapped the rug for one twice the size. Should have done it months ago.",
sc:`[Room with bigger rug. TEXT: "Swapped the rug for one twice the size. Should have done it months ago."]

Same room. Same furniture. But now the floor has a plan. The sofa belongs to a zone. The chairs have context.

One piece, scaled up. Everything else finally makes sense.

It's like the room let out a breath it had been holding since we moved in.`,
dn:`"A breath it had been holding" — genuine relief. You've been looking at this rug for months knowing it was wrong.`,
br:`Wide shot with the new rug\nFurniture legs on the rug (proof)\nComparison if available\nYou standing at the rug edge showing scale`,
ca:`One change. Twice the size. Different room.\n\nScale isn't about the object. It's about the relationship between the object and the room.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Clarify circulation paths",p:"Movement mapping",f:"Reel",h:"I'd follow you around your apartment for an hour before touching anything.",
sc:`If I were your designer, I'd follow you around your apartment for an hour before touching anything.

Because circulation tells me everything. Where you squeeze past the coffee table. Where you avoid that one corner. Where the traffic jam happens every morning between you and the dog and the bathroom door.

A clear path isn't just practical. It's what makes a room feel calm. Blocked circulation is the hidden source of most spatial anxiety.

If walking through your room feels like an obstacle course, the furniture needs to move. Not you.`,
dn:`"You and the dog and the bathroom door" — specificity makes it real. Substitute your actual bottleneck. The more specific, the more relatable.`,
br:`You walking your daily path through the apartment\nA tight spot you squeeze past\nA clear walkway (the after)\nThe dog blocking the hallway (if applicable)\nOverhead diagram of circulation paths`,
ca:`Circulation is the invisible layer that controls how a room feels.\n\nIf you're squeezing past furniture or choosing the long way around, the layout needs work. Clear paths create calm.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M3W1 (WK9)
[{d:"Mon",t:"Ignoring natural light direction",p:"Orientation, reflectance",f:"Reel",h:"I'd never place a sofa without knowing where the light falls first.",
sc:`I'd never place a sofa without knowing where the light falls first.

North light is cool and consistent. South is warm and dramatic. East gives you mornings. West gives you golden evenings and the aggressive 4pm sun in your eyes during a movie.

Every room has a light personality. If you ignore it, you'll fight the space forever. And the light will always win. It was here before your furniture.

Work with the light. Let it decide where things go.`,
dn:`"Aggressive 4pm sun in your eyes during a movie" — oddly specific, universally annoying. Slight eye squint optional.`,
br:`Same spot at 3-4 times of day\nLight moving across a wall (timelapse or cuts)\nSun hitting where you sit\nShadows shifting across a surface`,
ca:`Every room has a light personality. Cool north. Warm south. Morning east. Golden west.\n\nWork with it, not against it. The light was here first.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #interiordesign"},
{d:"Tue",t:"Anglepoise (1932)",p:"Spring mechanism, arm anatomy, task lighting",f:"Carousel",h:"A car engineer invented a lamp. It outlasted the car industry that made him.",
sc:`SLIDE 1: DESIGN ICON 09. Anglepoise, 1932. STILL ICONIC. A car engineer invented a lamp. It outlasted the car industry that made him.
SLIDE 2: [Full photo. Anglepoise lamp on a desk in a real interior.]
SLIDE 3: Spring mechanism detail. He wasn't a designer. He was a suspension engineer. George Carwardine built car suspension systems. When the company went bankrupt, he started tinkering with springs in his garden shed in Bath. He invented one that could hold any position you put it in. Then thought: that's a lamp.
SLIDE 4: They pulled one out of a lake after 40 years. It still worked. During WWII, Anglepoise made lamps for bomber navigation tables. In 1985 they salvaged a crashed plane from Loch Ness. Gave the lamp a new battery. It switched on.
SLIDE 5: It moves like a human arm. That was the point. Springs, cranks, and levers arranged so you can reposition it with one finger and it stays exactly where you leave it. Carwardine modelled the movement on the anatomy of an arm. Still the same mechanism today. [Arm joint close-up]
SLIDE 6: He wanted to call it the Equipoise. The patent office said no. "Equipoise" was already a word, so the Trade Marks Registry rejected it. They went with Anglepoise instead. The first version had four springs and was built for factories. The three-spring version for homes came in 1935 and never stopped. [Base and spring assembly]
SLIDE 7: The BBC banned it for encouraging furtive thoughts. In 1949, a BBC executive issued a memo forbidding staff from working under only an Anglepoise. He believed a man in a dim room with a desk lamp would "nurture furtive ideas and produce degenerate programme material." The Director General overruled him. [Lamp shade detail, warm light]
SLIDE 8: [Full photo. Anglepoise on a table, lived-in home.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Spring mechanism detail\nArm joint close-up\nBase and spring assembly\nLamp shade detail, warm light\nDesk or table, lived-in home`,
ca:`George Carwardine wasn't a designer. He was a car suspension engineer. When the company went bankrupt he started tinkering in his garden shed and invented a spring that holds any position. Then he put a light on it. During WWII they put one in a bomber that crashed into Loch Ness. 40 years later they fished it out. It still worked.\n\nAlso, the BBC once banned it for encouraging "furtive ideas." That got overruled.\n\nFull story in the slides.`,
tg:"#anglepoise #georgecarwardine #britishdesign #designicon #tasklamp #industrialdesign #iconicdesign #lightingdesign #interiordesigninspo #designhistory #vintagelighting #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Blocked walkways",p:"Ergonomic clearance",f:"Reel",h:"If your room feels small, it's not the room. It's the path.",
sc:`If your room feels small, it's not the room. It's the path.

Blocked walkways make any space feel cramped. You need 75 centimeters of clear path minimum. 90 is comfortable.

If you're turning sideways to get past the coffee table, the coffee table is in the wrong place. The table doesn't care. It'll be happy somewhere else.

Fix the path. The room grows without moving a single wall.`,
dn:`"The table doesn't care" — deadpan. Absurd enough to be funny, true enough to be useful.`,
br:`You doing the sideways squeeze past furniture\nClear walkway at floor level\nTape measure showing the 75cm gap\nBefore/after of the same path`,
ca:`75cm. That's the minimum for a comfortable walkway.\n\nIf you're squeezing past anything, it's a layout problem. Move the obstacle. The room grows.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #collectedhome #designinspiration"},
{d:"Thu",t:"Improving walkway flow",p:"Movement as design material",f:"Reel",h:"Rotated the table 45 degrees. The whole room opened up.",
sc:`[Walking through room smoothly. TEXT: "Rotated the table 45 degrees. The whole room opened up."]

Same table. Same room. But the path from kitchen to living room is clear.

Sometimes the fix isn't removing anything. It's changing the angle. Fifteen minutes and a slightly sore back.

Movement through a room is a design material. Treat it like one.`,
dn:`"Slightly sore back" — casual, honest. Furniture rearranging is physical work and that's real.`,
br:`Walking the clear path (POV or follow shot)\nThe table at its new angle\nYou pushing it into position\nRoom from kitchen doorway showing open path`,
ca:`Same table. Different angle. Entirely different room.\n\nSometimes the fix costs nothing but a willingness to try. And a strong back.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Map movement first",p:"Behaviour mapping",f:"Reel",h:"I'd spend the first 20 minutes watching how you walk through your home.",
sc:`I'd spend the first 20 minutes just watching how you walk through your home.

Not measuring. Not sketching. Watching. Where do you go first in the morning? What path do you repeat ten times a day? Where do you avoid?

Movement reveals what words can't. Your body already knows what the room needs. My job would be to listen to it.

The body doesn't lie about space. Pinterest does. But the body? Never.`,
dn:`"Pinterest does. But the body? Never." — the kicker. Contrast unreliable inspiration with reliable instinct. Small smile. Cut.`,
br:`Your morning path (natural, documentary)\nRepeated movement: kitchen to coffee maker\nYou standing in a doorway observing\nQuick overhead sketch of movement paths`,
ca:`Movement is information. Your daily path is the best brief a designer can get.\n\nWhere you go first. What you repeat. What you avoid. The body doesn't lie about space.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M3W2 (WK10)
[{d:"Mon",t:"Overlooking storage planning",p:"Cognitive load, visual density",f:"Reel",h:"I'd never design a room without solving storage first.",
sc:`I'd never design a room without solving storage first.

Because here's what happens: you design a beautiful room. Then life fills it with stuff that has nowhere to go. Cables. Remotes. That one blanket. Seventeen phone chargers. The random collection of things that make a home and a surface a disaster zone.

Storage isn't boring. It's what protects the design from your actual life.

Solve storage first. Design everything else around it.`,
dn:`"Seventeen phone chargers" — hyperbolic, specific, and universally true. Adjust to your actual clutter weakness.`,
br:`Beautiful room, tilt to chaos — cables, remotes, stacked stuff\nClean solution: cabinet, basket, hidden drawer\nYou closing a cabinet with satisfaction\nThe "real life" surface vs the "stored" surface`,
ca:`Storage is what protects your design from real life.\n\nWithout it, surfaces become shelves and corners become dumping grounds. Solve where things go before deciding how things look.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #interiordesign"},
{d:"Tue",t:"Componibili (1967)",p:"Injection-moulded ABS, pressure-lock modules",f:"Carousel",h:"Plastic storage. In MoMA. Still Kartell's bestseller after 57 years.",
sc:`SLIDE 1: DESIGN ICON 10. Componibili, 1967. STILL ICONIC. Plastic storage. In MoMA. Still Kartell's bestseller after 57 years.
SLIDE 2: [Full photo. Componibili stacked beside a bed or in a bathroom.]
SLIDE 3: Interlocking module detail. Her husband founded the company. She made it famous. Anna Castelli Ferrieri co-founded Kartell with her husband in 1949. One of the first women in Italy to graduate in architecture. She designed the product that's outsold everything else they've ever made.
SLIDE 4: No screws. No glue. You just stack them. Each cylinder locks into the next by pressure alone. The door slides open through a hole that also lets the whole thing be injection-moulded in one shot. The engineering is the design.
SLIDE 5: Plastic wasn't furniture. She made it furniture. In the 1960s plastic was factory material. Ferrieri proved it could be beautiful and last decades. Kartell was the first company in the world to use ABS plastic for home furnishings. [Colour range, stacked units]
SLIDE 6: It works in every room because it was designed for none of them. Bedside table, bathroom storage, bar cart topper. Add castors, add a lid that doubles as a tray, stack two or four. You decide what it is. [Componibili in a bathroom or hallway]
SLIDE 7: MoMA and the Pompidou both have one. Shown at MoMA in 1972 at the exhibition that introduced America to Italian design. Permanent collection ever since. The Pompidou has one too. For a plastic cylinder. [Lid/tray detail]
SLIDE 8: [Full photo. Componibili in a lived-in bedroom.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Interlocking module detail\nColour range, stacked units\nComponibili in a bathroom or hallway\nLid/tray detail\nLived-in bedroom context`,
ca:`Anna Castelli Ferrieri co-founded Kartell, was one of the first women in Italy to graduate in architecture, and designed a plastic cylinder that's been their bestseller for 57 years. No screws. No glue. Just stack. It's in MoMA and the Pompidou. Plastic wasn't furniture until she decided it was.\n\nFull story in the slides.`,
tg:"#componibili #kartell #annacastelliferrieri #designicon #italiandesign #moderndesign #iconicdesign #interiordesigninspo #designhistory #modulardesign #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Stacked statement pieces",p:"Dominant vs supporting elements",f:"Reel",h:"Your room has three lead singers and no backup.",
sc:`Your room has three lead singers and no backup.

A bold rug. A sculptural sofa. A massive artwork. Each gorgeous on its own. Together, they're three divas in one dressing room. Nobody's having a good time.

Choose one dominant piece per room. Everything else should support it, not audition against it.

Hierarchy isn't about having less. It's about knowing who goes on stage first.`,
dn:`"Three divas in one dressing room" — visual chaos everyone can picture. Slightly weary, entirely affectionate.`,
br:`Corner with too many statements (styled, then simplified)\nSame space with one clear lead\nClose-up of the star piece\nRemoved pieces in other rooms (relocated, not rejected)`,
ca:`Three stars. Zero harmony.\n\nChoose one piece to lead. Let the rest support. That's not minimalism. That's composition.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Removing a competing focal point",p:"Letting one piece lead",f:"Reel",h:"Moved the mirror to another room. The art finally has presence.",
sc:`[Wall with painting. Clean, focused. TEXT: "Moved the mirror to another room. The art finally has presence."]

The mirror was beautiful. But next to the painting, they were splitting attention. Like two people telling you a story at the same time.

One goes. The other transforms.

Sometimes two right pieces are wrong together.`,
dn:`"Two people telling you a story at the same time" — immediate recognition. Everyone has tuned out of exactly this situation.`,
br:`The painting with space around it\nThe mirror in its new home (looking great)\nLight falling on the painting without competition\nThe wall from the doorway`,
ca:`The mirror wasn't wrong. Just wrong company.\n\nMoved it to the hallway. The painting now has the wall. Editing is about relationships between objects.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Identify visual imbalance",p:"Compositional reading",f:"Carousel",h:"Stand in the doorway and read the room like a page.",
sc:`SLIDE 1: The second thing I'd do is stand in the doorway and read the room like a page.
SLIDE 2: [POV from a doorway looking into a room]
SLIDE 3: Left to right, top to bottom. Where does the weight sit? Is everything on one side? Is one corner contributing nothing?
SLIDE 4: PRINCIPLE — Visual weight distribution. Heavy pieces, dark colors, and tall objects carry more weight.
SLIDE 5: PRINCIPLE — Compositional reading. Train yourself to scan a room the way you'd scan a painting.
SLIDE 6: [Diagram or annotated room showing lopsided vs balanced weight]
SLIDE 7: Visual imbalance is why a room feels "off" even when every piece is lovely. It's not the pieces. It's the distribution.
SLIDE 8: TAKEAWAY — Read the room. Literally.`,
dn:`"Contributing nothing" about an empty corner — a mild performance review for a part of your room. Say it with gentle disappointment.`,
br:`POV from doorway scanning left to right\nYou in the doorway observing (silhouette works)\nLopsided room (everything on one side)\nRebalanced room`,
ca:`Stand in the doorway. Read the room like a page.\n\nIf all the weight sits on one side, the room will always feel unsettled. Balance isn't symmetry. It's distribution.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M3W3 (WK11)
[{d:"Mon",t:"Ignoring acoustics",p:"Material absorption, sensory layering",f:"Reel",h:"I'd never ignore how a room sounds.",
sc:`I'd never ignore how a room sounds.

Hard floors, bare walls, glass surfaces. Beautiful? Yes. But the room echoes. Conversations bounce. It sounds like a waiting room even when it looks like a magazine.

Textiles absorb sound. A rug, curtains, a soft sofa. They don't just look warm. They sound warm. Your ears are decorating whether you realize it or not.

Design for the ears, not just the eyes.`,
dn:`Record the actual clap echo test. Real sound > any explanation.`,
br:`Clap in an echoey room (record the reverb)\nTextiles absorbing sound: rug, curtains\nCozy room that looks AND sounds warm\nFabric textures close-up`,
ca:`A room that echoes isn't finished. No matter how it looks.\n\nAcoustics are invisible comfort. Textiles absorb sound and transform how a space feels. Design for the ears too.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"Tulip Table (1956)",p:"Pedestal base, aluminium stem, single-form logic",f:"Carousel",h:"One leg. Because four was a slum.",
sc:`SLIDE 1: DESIGN ICON 11. Tulip Table, 1956. STILL ICONIC. One leg. Because four was a slum.
SLIDE 2: [Full photo. Tulip Table in a real dining room.]
SLIDE 3: Pedestal base detail. Saarinen looked under a dining table and was disgusted. "The undercarriage of chairs and tables makes an ugly, confusing, unrestful world." His solution: remove every leg but one. He called it clearing up "the slum of legs." That phrase made the cover of TIME in 1956.
SLIDE 4: He wanted it to be one material. The technology didn't exist yet. The whole point was a single unbroken form. But fiberglass kept snapping at the base. So he used cast aluminium for the stem and plastic for the top. It bothered him for the rest of his life. Which wasn't long.
SLIDE 5: He trained as a sculptor before he ever touched furniture. Saarinen studied sculpture in Paris before architecture at Yale. His father was a famous architect. His mother was a textile artist. The Tulip is a sculpture that happens to hold dinner plates. [Base curve meeting the floor]
SLIDE 6: The TWA Terminal is this table turned into a building. Saarinen's airport terminal at JFK uses the same sweeping curves and single-form logic as the Tulip. An architecture historian called it "the pedestal chair turned into a building." He designed both at the same time. [Table top edge, marble detail]
SLIDE 7: He died at 51. This was his last furniture design. Brain tumour, 1961. The Pedestal Collection had been out for three years. He never saw it become the most copied table of the 20th century. Knoll has made it continuously since 1957. They've never stopped. [Full table profile, white interior]
SLIDE 8: [Full photo. Tulip Table in a lived-in dining room, chairs around it.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Pedestal base detail\nBase curve meeting the floor\nTable top edge, marble detail\nFull table profile, white interior\nLived-in dining room with chairs`,
ca:`Eero Saarinen hated table legs. Called them a slum. So he designed a table with one. He wanted it made from a single material but the technology didn't exist yet, so he faked it with aluminium and plastic. It bothered him until he died at 51 from a brain tumour. Knoll has made it continuously since 1957. Nobody's improved on it.\n\nFull story in the slides.`,
tg:"#tuliptable #eerosaarinen #knoll #designicon #pedestaltable #midcenturymodern #moderndesign #iconicfurniture #interiordesigninspo #designhistory #diningroom #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"No visual anchor",p:"Compositional stability",f:"Reel",h:"If your room feels unsettled, it's missing an anchor.",
sc:`If your room feels unsettled, it's missing an anchor.

An anchor is the one piece everything else relates to. A large rug. A substantial sofa. Art that holds the wall. Without it, objects float. The eye has nowhere to land. Like a group photo where nobody knows where to look.

Give the room a center of gravity.

Every room needs a "this is where it starts."`,
dn:`"Group photo where nobody knows where to look" — instant recognition. The awkwardness IS the room without an anchor.`,
br:`Room without anchor (everything same weight)\nOne piece added that changes everything\nRoom from multiple angles returning to anchor\nYou gesturing at the anchor piece`,
ca:`Every room needs one thing that holds it down.\n\nWithout it, objects float and the eye wanders. One piece that says "this is where the room begins."`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Adding an anchor object",p:"Grounding a space",f:"Reel",h:"One piece. Everything else now makes sense around it.",
sc:`[Room with anchor piece. TEXT: "One piece. Everything else now makes sense around it."]

Before this, the room had good pieces but no center. They were all just coexisting. Politely but uselessly.

One substantial piece gave everything a point of reference.

The room has gravity now.`,
dn:`"Politely but uselessly" — the furniture was making small talk instead of forming relationships. Dry, amused.`,
br:`Anchor piece from multiple angles\nOther pieces relating to it\nWide shot with nice light\nDetail of anchor's texture or material`,
ca:`Before: pieces floating in space. After: one anchor and suddenly everything has a relationship.\n\nAn anchor doesn't just sit in a room. It organizes it.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Evaluate material temperature",p:"Contrast calibration",f:"Reel",h:"You don't need new furniture. You need one warm next to one cool.",
sc:`You don't need new furniture. You need one warm material next to one cool one.

A room that's all warm materials feels heavy. Like a hug that lasts too long. All cool feels sterile. Like a dentist's office that went to design school.

The magic is in the contrast. Wood next to marble. Velvet next to steel. Linen next to glass.

Not everything cozy. Not everything sharp. The tension between them.`,
dn:`"Hug that lasts too long" and "dentist's office that went to design school" — both absurd and precise. Same pace, same weight.`,
br:`Material close-ups: wood, marble, steel, fabric\nTwo contrasting materials touching\nYour hand across different surfaces (ASMR-adjacent)\nRoom showing the temperature mix`,
ca:`All warm: heavy. All cool: sterile. The magic is in the mix.\n\nWood next to marble. Velvet next to steel. Comfort with edge.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M3W4 (WK12)
[{d:"Mon",t:"Sourcing from one store only",p:"Contrast, authenticity",f:"Reel",h:"I'd never furnish an entire room from one brand.",
sc:`I'd never furnish an entire room from one brand.

A room sourced from one place looks like a catalog page. Coherent but lifeless. No friction. No story. No "where did you find that?"

Mix a vintage find with something new. Pair something expensive with something humble. Let the room look like it was gathered by a person with taste and patience, not a shopping cart with a credit limit.

Nobody's life story comes from one store.`,
dn:`"Where did you find that?" is the compliment collected rooms earn. Catalog rooms never get asked that question.`,
br:`"Catalog" corner (everything matching)\nYour mixed space (different eras, brands)\nVintage next to modern close-up\nYou holding a piece with a story`,
ca:`A room from one store is a room with one story.\n\nMix eras. Mix price points. The most interesting rooms are gathered over time.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"Maralunga (1973)",p:"Bicycle chain headrest, Compasso d'Oro",f:"Carousel",h:"The sofa that got punched into existence.",
sc:`SLIDE 1: DESIGN ICON 12. Maralunga, 1973. STILL ICONIC. The sofa that got punched into existence.
SLIDE 2: [Full photo. Maralunga in a real living room.]
SLIDE 3: Headrest fold detail. The owner of Cassina hated the prototype so much he punched it. Cesare Cassina saw the first model and was so disgusted he broke the backrest with his fist. It crumpled over itself. Magistretti looked at it and said, "Right, great, it looks perfect to me like that." That broken shape became the design.
SLIDE 4: There's a bicycle chain hidden inside. The headrest raises and lowers with a single finger. Underneath the foam is a bicycle chain mechanism that locks it in place. Two positions, two different sofas. Nobody sees the engineering. Everybody feels it.
SLIDE 5: It started as a sketch on a napkin. Magistretti sent Cassina a simple drawing of a cushion that could fold. No technical specs, no measurements. Just the idea of a backrest that moves. Cassina's engineers figured out how to make it real. [Low-back profile view]
SLIDE 6: Third-generation architect. First-generation rebel. His father and grandfather were both architects. He studied at Milan Polytechnic and came out believing there's no excuse for bad design. The Maralunga was his way of saying a sofa should actually change shape when you need it to. [High-back profile view]
SLIDE 7: Compasso d'Oro. MoMA. Still in production. Won Italy's top design prize in 1979. Entered MoMA's permanent collection. Cassina reissued it in 2014 with updated seams but the same bicycle chain. Over 50 years and they've never needed to redesign it. [Leather texture close-up]
SLIDE 8: [Full photo. Maralunga in a lived-in room, someone actually on it.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Headrest fold detail\nLow-back profile view\nHigh-back profile view\nLeather texture close-up\nLived-in room with person on it`,
ca:`Cesare Cassina saw the first prototype of this sofa and punched it. Broke the backrest. Magistretti looked at the crumpled shape and said "perfect." There's a bicycle chain hidden inside the cushions that lets you raise or lower the headrest with one finger. Won the Compasso d'Oro. In MoMA. Still in production after 50 years with the same mechanism.\n\nFull story in the slides.`,
tg:"#maralunga #vicomagistretti #cassina #designicon #italiandesign #sofadesign #moderndesign #iconicfurniture #interiordesigninspo #designhistory #livingroom #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Cold lighting in warm rooms",p:"Temperature alignment",f:"Reel",h:"Your room isn't cold. Your lighting is.",
sc:`Your room isn't cold. Your lighting is.

Warm textiles. Rich woods. Soft fabrics. But the bulbs are cool-white. The materials say "curl up here." The light says "time for your annual performance review."

2700K for warm rooms. The materials already did the work. The light just needs to agree.

Fix the temperature. The room will finally feel the way it looks.`,
dn:`"Annual performance review" — that specific cool-white meeting room feeling. Everyone's been there. The contrast with "curl up" makes it stick.`,
br:`Room with warm materials but cool light (before)\nSame room with warm bulbs (after)\nBulb being swapped\nWarm materials glowing under correct light`,
ca:`Warm materials. Cool light. The room is fighting itself.\n\nMatch light to mood. 2700K for warm rooms. Five minute fix.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Correcting bulb warmth",p:"Atmosphere repair",f:"Reel",h:"One bulb swap. Office to home.",
sc:`[Kitchen in warm light. TEXT: "One bulb swap. The room went from office to home."]

Kitchen pendant had a 4000K bulb. Clean, bright, clinical. Like cooking under interrogation lights.

Swapped to 2700K. Same room. But now dinner feels like dinner.

One bulb. Five minutes. The renovation nobody posts about but everybody needs.`,
dn:`"Cooking under interrogation lights" — funny because kitchen lighting is genuinely often terrible. Slight wince.`,
br:`Kitchen pendant glowing warm\nDinner prep in warm light\nBulb showing kelvin number\nHands doing something normal in beautiful light`,
ca:`4000K out. 2700K in. Kitchen went from workspace to dining room.\n\nOne bulb. The renovation nobody posts about but everybody needs.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Simplify the floor plane",p:"Ground cohesion",f:"Reel",h:"If I looked at your floor, I'd know exactly what's wrong above it.",
sc:`If I looked at your floor, I'd know exactly what's wrong with the room above it.

Too many rugs. Random furniture legs creating a forest. The floor looks like a Tetris game nobody's winning.

One rug per zone. Clear paths between. Visible floor as breathing room.

When the ground plane makes sense, everything above follows. The floor is the first layout.`,
dn:`"Tetris game nobody's winning" — visual, absurd, slightly exhausting. If you play Tetris, deliver with losing-player energy.`,
br:`High-angle of your floor showing zone and path\nOne well-placed rug with correct furniture placement\nClear floor between zones\nOverhead sketch of floor plan`,
ca:`The floor tells the truth about the room above it.\n\nSimplify the ground plane and the room reorganizes itself. The floor is the first layout.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M4W1 (WK13)
[{d:"Mon",t:"Ignoring sightlines",p:"Visual sequencing",f:"Reel",h:"I'd never arrange a room without standing in the doorway first.",
sc:`I'd never arrange a room without standing in the doorway first.

The first thing you see when you walk in sets everything. If it's the back of a sofa, the room feels closed. Like it turned its back on you. Rude, honestly.

If it's a beautiful piece across the room, it pulls you in. Sightlines are choreography. Design what the eye meets first. Then second. Then third.

Sequence is what separates rooms from spaces with furniture in them.`,
dn:`"Turned its back on you. Rude, honestly." — deadpan personification. The sofa is being rude. Mild offense. Quick beat.`,
br:`POV from doorway of each room\nBack of a sofa (the wrong sightline)\nBeautiful sightline to art, window, or lamp\nYou in doorway assessing (designer squint)`,
ca:`The doorway is the opening scene. What the eye meets first sets everything.\n\nDesign the sequence. First: draws you in. Second: grounds you. Third: rewards a closer look.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #interiordesign"},
{d:"Tue",t:"Stool 60 (1933)",p:"L-leg bent birch, stackable, multi-use",f:"Carousel",h:"Three legs. One bend. The most copied piece of furniture in history.",
sc:`SLIDE 1: DESIGN ICON 13. Stool 60, 1933. STILL ICONIC. Three legs. One bend. The most copied piece of furniture in history.
SLIDE 2: [Full photo. Stool 60 in a real interior.]
SLIDE 3: L-leg bend detail. Everyone else was bending steel. Aalto bent a tree. While Breuer and Mies were building furniture from chrome tubes, Aalto wanted something warm. He and a Finnish carpenter figured out how to saw slots into birch and glue veneer strips into the grooves until the wood bent without breaking. That one invention launched everything.
SLIDE 4: He tested the prototype by throwing it at the floor. Repeatedly. Aalto wanted to know if the legs would snap. They didn't. The L-leg patent was granted in 1933 and the stool has been in continuous production ever since. Over 90 years. Same factory in Turku.
SLIDE 5: Three parts. 45 production steps. 25 just for the leg. A round birch seat and three bent legs. No screws, no joints, no hardware visible. Each leg attaches directly to the underside of the seat. It flat-packs, it stacks into a spiralling tower, and it ships anywhere. [Stacked stools, spiral view]
SLIDE 6: It's a stool. It's a table. It's whatever you need. Seat, side table, nightstand, display surface, step stool. Aalto designed it with no fixed purpose. Artek calls it "the most elemental of furniture pieces." He'd agree. [Stool used as side table]
SLIDE 7: Apple uses them in every store on earth. Stool E60, the four-legged version, is the seating in every Apple Store worldwide. IKEA copied the three-legged version so closely with the Frosta that it was quietly pulled from their catalogue. The original is still in Turku. [Birch grain close-up]
SLIDE 8: [Full photo. Stool 60 in a lived-in home.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`L-leg bend detail\nStacked stools, spiral view\nStool used as side table\nBirch grain close-up\nLived-in home context`,
ca:`Everyone was bending steel. Aalto bent a birch tree. Three legs, a round seat, no hardware. He tested the prototype by throwing it at the floor until he was sure the legs wouldn't snap. 90 years later, same factory in Finland, same design. Apple puts them in every store. IKEA copied them so closely they had to stop.\n\nFull story in the slides.`,
tg:"#stool60 #alvaraalto #artek #designicon #finnishdesign #scandinaviandesign #bentwood #iconicfurniture #interiordesigninspo #designhistory #minimalistdesign #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Overusing symmetry",p:"Dynamic balance vs rigidity",f:"Reel",h:"Your room isn't boring. It's too symmetrical.",
sc:`Your room isn't boring. It's too symmetrical.

Two matching lamps. Two matching chairs. Everything mirrored. It reads as controlled, not calm. Like a very convincing impression of a hotel lobby.

Try breaking it. Replace one lamp with something different at a different height. Keep the chairs but offset them slightly.

Dynamic balance is more interesting than perfect symmetry. Slightly off is where life lives.`,
dn:`"Convincing impression of a hotel lobby" — hotels are designed to feel neutral. Your home shouldn't. Mild alarm at the resemblance.`,
br:`Symmetrical setup (styled temporarily)\nOne element changed (different lamp, offset chair)\nThe asymmetrical element close-up\nThe room feeling alive after the change`,
ca:`Perfect symmetry is the default. Defaults are rarely interesting.\n\nDynamic balance creates visual interest symmetry suppresses. Slightly off is where life lives.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #collectedhome #designinspiration"},
{d:"Thu",t:"Adjusting sightlines at entry",p:"First impression design",f:"Reel",h:"Changed what you see when you walk in. Everything feels different.",
sc:`[Walking through front door. Light from living room visible. TEXT: "Changed what you see when you walk in. The whole apartment feels different."]

Moved the bookshelf so the first thing you see is the window, not a wall.

One shift. The apartment greets you with light instead of a dead end. Went from "you live here" to "welcome home."

The entry sightline sets the emotional tone for everything.`,
dn:`"You live here" vs "welcome home" — the contrast is felt, not explained. Two different energies in five words each.`,
br:`POV walking through front door (new sightline)\nBookshelf in new position\nLight visible from entrance\nHallway feeling open and inviting`,
ca:`One change to the entry. Now you walk into light instead of a wall.\n\nThe first thing you see when entering is the most important design decision in the apartment.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Rebalance height distribution",p:"Vertical hierarchy",f:"Reel",h:"If everything is at the same height, it'll always feel flat.",
sc:`If everything in your room is at the same height, it'll always feel flat.

Sofa, coffee table, sideboard. All roughly at hip height. The room has no vertical rhythm. Like a song with one note. Technically correct. Emotionally flat.

Add something tall. Hang art higher on one wall. Plant on a stand.

Low, medium, high. Three heights. One room that finally feels three-dimensional.`,
dn:`"A song with one note" — felt instantly. Monotone. Quick analogy, move on.`,
br:`Room at "one height" (flat horizon line)\nFloor lamp reaching upward\nArt at higher position\nRoom with vertical variation (noticeably alive)\nPlant elevated on a stand`,
ca:`A room where everything sits at the same height is a room without rhythm.\n\nSomething tall, something mid, something low. Vertical distribution creates dimension.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M4W2 (WK14)
[{d:"Mon",t:"Neglecting ceiling fixtures",p:"Vertical layering",f:"Carousel",h:"Most people forget the ceiling exists. I never do.",
sc:`SLIDE 1: Most people forget the ceiling exists. I never do.
SLIDE 2: [Camera tilted up — boring flush mount. Nothing happening]
SLIDE 3: A builder-grade flush mount says "I didn't think about this." A pendant that drops into the room says "every inch was considered."
SLIDE 4: PRINCIPLE — The fifth wall. The ceiling is real estate. Neglected by 90% of apartments.
SLIDE 5: PRINCIPLE — Vertical layering. A pendant creates a vertical center the room can organize around.
SLIDE 6: [A beautiful pendant or sculptural fixture. The upgrade]
SLIDE 7: [The room from below, looking up at the fixture]
SLIDE 8: TAKEAWAY — Look up. If there's nothing worth looking at, that's your next project.`,
dn:`"Builder-grade flush mount" — said with gentle disdain. Not at the owner. At the fixture's lack of ambition.`,
br:`Camera tilting up to boring fixture\nBeautiful pendant or sculptural light\nPendant from below (looking up)\nRoom feeling complete with the right fixture`,
ca:`The ceiling is half the room. Most people treat it like it doesn't exist.\n\nSwap the flush mount for something with presence. The fifth wall deserves attention.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"Panthella (1971)",p:"Reflective base, opal acrylic diffusion",f:"Carousel",h:"A mushroom that lights a room. No bulb visible. No glare. Just glow.",
sc:`SLIDE 1: DESIGN ICON 14. Panthella, 1971. STILL ICONIC. A mushroom that lights a room. No bulb visible. No glare. Just glow.
SLIDE 2: [Full photo. Panthella lamp glowing in a real interior.]
SLIDE 3: Shade curve meeting the base. Panton was called the most un-Danish Danish designer alive. His contemporaries made quiet, minimal things. He made a plastic S-shaped chair, rooms in solid colour, and a mushroom lamp that glows from every surface. He thought most people lived in "dreary, grey-beige conformity." The Panthella was his fix.
SLIDE 4: He wanted the original in metal. The technology wasn't ready. Panton designed the shade and base to both reflect light. Metal would have done it best, but manufacturing couldn't deliver in 1971. So he used opal acrylic instead. The metal version finally came out decades later, after his death.
SLIDE 5: The base isn't just a stand. It's a reflector. Light hits the inside of the hemispherical shade, bounces down to the trumpet-shaped base, and reflects outward. No glare from any angle. The whole lamp is the light source. Panton learned that from Poul Henningsen, his mentor. [Lamp from below, glow detail]
SLIDE 6: One line. No interruptions. From shade to base, the profile is a single unbroken curve. No joints, no seams, no visible hardware. Panton trained as an architect and studied sculpture. Every lamp he made was a building in miniature. [Side profile silhouette]
SLIDE 7: He worked for Arne Jacobsen. Then did the opposite of everything Jacobsen stood for. Two years in Jacobsen's office after graduating. Then he left and spent his career in colour, plastic, and provocation. Jacobsen made the Egg Chair. Panton made a room you could live inside like one. [Lamp in colour, warm glow]
SLIDE 8: [Full photo. Panthella in a lived-in bedroom or living room.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Shade curve meeting the base\nLamp from below, glow detail\nSide profile silhouette\nLamp in colour, warm glow\nBedroom or living room context`,
ca:`Verner Panton thought most people were afraid of colour. So he designed a mushroom lamp where the shade and the base both reflect light, no glare from any angle. He wanted it in metal but the technology wasn't ready in 1971. He studied under Arne Jacobsen and then spent his whole career doing the opposite. The Panthella is still Louis Poulsen's most recognisable lamp after the Artichoke.\n\nFull story in the slides.`,
tg:"#panthella #vernerpanton #louispoulsen #designicon #danishdesign #lightingdesign #scandinaviandesign #iconicdesign #interiordesigninspo #designhistory #tablelamp #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Underscaled art",p:"Scale anchoring",f:"Reel",h:"That art isn't small because of the frame. It's small because of the wall.",
sc:`That art isn't small because of the frame. It's small because of the wall.

A 40cm piece on a 3-meter wall isn't art. It's a polite suggestion that art might live here someday. It's basically a rumor.

Art should occupy two-thirds of the wall width above the furniture. Oversized reads as intentional. Undersized reads as "I wasn't sure."

Scale up. The wall can take it. The room is begging for it.`,
dn:`"It's basically a rumor" — the art is so small it's hinting at its own existence. Deadpan. Like this still confuses you.`,
br:`Small art on a big wall (staged)\nProperly scaled art filling the space\nTwo-thirds rule shown visually\nYou stepping back from a large piece (satisfied nod)`,
ca:`A small frame on a big wall isn't art. It's an apology.\n\nTwo-thirds of the wall width. Oversized = intentional. Undersized = uncertain. Scale up. Always.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Swapping ceiling fixture scale",p:"Vertical presence",f:"Reel",h:"New pendant. The ceiling finally participates.",
sc:`[New pendant in room. Camera looking up. TEXT: "New pendant. The ceiling finally participates in the room."]

The old flush mount did its job. Lit the room. Nothing more. A colleague who shows up and contributes the minimum.

The new pendant drops into the space. The ceiling went from background to participant.

The fifth wall. Finally earning its rent.`,
dn:`"Colleague who contributes the minimum" — workplace humor applied to a light fixture. Everyone knows this colleague.`,
br:`Pendant from below (looking up)\nPendant casting light downward\nRoom with pendant as wider composition\nOld fixture for contrast (photo if available)`,
ca:`Old fixture: functional. New pendant: transformative.\n\nThe ceiling stops being background. The fifth wall, finally participating.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Reduce competing textures",p:"Material clarity",f:"Reel",h:"Before I'd add texture, I'd count the ones already there.",
sc:`Before I'd add texture, I'd count the ones already there.

Wool, linen, velvet, leather, bouclé, jute. All beautiful. All together? The room feels like a textile sample library having an identity crisis.

Three to four textures per room. Maximum. One dominant. Two supporting. Maybe one accent.

Texture is a chorus, not a crowd. Give each one a part to sing.`,
dn:`"Textile sample library having an identity crisis" — specific, visual, slightly overwhelmed. Deliver like you've witnessed this many times.`,
br:`Many textures rapid cuts (overwhelming on purpose)\nSlow shots of three curated textures\nYour hand running over each\nThe room showing curated mix working`,
ca:`Texture is a tool. Too many tools = chaos.\n\nThree to four per room. One dominant, two supporting, one accent. Material clarity makes a room feel composed.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M4W3 (WK15)
[{d:"Mon",t:"Letting everything be new",p:"Temporal contrast, patina",f:"Reel",h:"I'd never have a room where everything was bought in the same year.",
sc:`I'd never have a room where everything was bought in the same year.

New rooms feel unlived. They lack the warmth time gives. A scratch that tells a story. A chair from another decade. A lamp that survived a move.

Mixing eras creates depth. It tells the eye someone lives here, not that someone ordered here. On a Tuesday. With free shipping.

Let your room have a past. Even if you have to borrow one.`,
dn:`"On a Tuesday. With free shipping." — devastating specificity. Everyone has done a 2am order. Let the pause build before the kicker.`,
br:`Vintage piece close-up (patina, wear, character)\nThat piece next to something new\nFlea market footage if available\nHands examining a vintage object`,
ca:`New is clean. New-only is sterile.\n\nA vintage piece creates temporal contrast — warmth, story, and depth that can't be bought new. Let your room have layers of time.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"Hang-It-All (1953)",p:"Maple balls, welded wire frame, Eames colour theory",f:"Carousel",h:"A coat rack for kids. Now in MoMA.",
sc:`SLIDE 1: DESIGN ICON 15. Hang-It-All, 1953. STILL ICONIC. A coat rack for kids. Now in MoMA.
SLIDE 2: [Full photo. Hang-It-All on a wall in a real home.]
SLIDE 3: Coloured ball and wire joint. Ray Eames never gave up painting. She just changed her palette. She was an abstract painter before she was a designer. The Hang-It-All was her colour theory on a wall. Fourteen maple balls in different sizes on a welded wire frame. Charles built the structure. Ray made it art.
SLIDE 4: It was designed to get children to hang up their stuff. Originally sold through a toy company called Tigrett alongside the Eames House of Cards and a colouring toy. The brief was: make kids want to use a coat rack. The solution was: make it look like a game.
SLIDE 5: The balls aren't decoration. They protect your clothes. A normal hook rips linen coats and stretches sweaters. Rounded wooden balls don't. The playfulness people love is actually the function. Every ball is a hook that does less damage. [Close-up of ball hooks with items hanging]
SLIDE 6: They built it with the same technique as their chairs. The welded steel wire frame uses the same process they developed for the Eames wire chairs and table bases. They had a plywood moulding machine they nicknamed "Kazam" after the magician's phrase. Everything they made came from the same workshop logic. [Wire frame structure detail]
SLIDE 7: The Eameses had no children together. It hung in their house anyway. You can see it in photos of their home in Pacific Palisades. Designed for kids, used by adults, collected by museums. Herman Miller stopped making it for decades. Brought it back in 1994. Hasn't stopped since. [Hang-It-All in context, entryway]
SLIDE 8: [Full photo. Hang-It-All in a lived-in hallway or kids' room.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`Coloured ball and wire joint\nClose-up of ball hooks with items hanging\nWire frame structure detail\nHang-It-All in context, entryway\nLived-in hallway or kids' room`,
ca:`Ray Eames was a painter before she was a designer. The Hang-It-All was her colour theory on a coat rack. Fourteen wooden balls on a wire frame, designed to make kids actually hang up their stuff. The balls aren't decorative. They're round so they don't rip your clothes. The Eameses had no children together but it hung in their house anyway. Stopped production for years. Came back in 1994. Now it's in MoMA.\n\nFull story in the slides.`,
tg:"#hangitall #eames #charlesandrayeames #hermanmiller #vitra #designicon #midcenturymodern #coatrack #iconicdesign #interiordesigninspo #designhistory #kidsdesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Misaligned furniture",p:"Axis logic",f:"Carousel",h:"Something feels off but you can't name it. It's alignment.",
sc:`SLIDE 1: Something feels off but you can't name it. It's alignment.
SLIDE 2: [Furniture slightly off-axis — the sofa 3 degrees from the wall]
SLIDE 3: The sofa angled slightly. The rug not centering. The art misaligned with furniture below. Tiny offsets your brain notices even when you don't.
SLIDE 4: PRINCIPLE — Axis logic. Furniture should be parallel or perpendicular to walls and each other.
SLIDE 5: [Diagram or annotated photo showing aligned vs misaligned]
SLIDE 6: It's like a picture frame one degree off. You can't relax. Your brain is trying to fix it for you. Constantly.
SLIDE 7: [Corrected room — everything snapped to grid. Visual relief]
SLIDE 8: TAKEAWAY — Align the axes. The room will quietly snap into place.`,
dn:`"Your brain won't let you" — relatable. The brain as uninvited interior designer. Mild exasperation toward your own brain.`,
br:`Furniture slightly off-axis (subtle)\nYou nudging it into alignment (satisfying)\nRug centered under table\nThe "click" moment when everything lines up`,
ca:`The room feels wrong but looks fine. It's alignment.\n\nSmall offsets create subconscious tension. Parallel or perpendicular. Watch the room relax.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Introducing aged materials",p:"Time as a design element",f:"Reel",h:"Added a 1960s side table. The room finally has a past.",
sc:`[Close-up of vintage side table. Grain, patina, imperfections. TEXT: "Added a 1960s side table. The room finally has a past."]

Everything else is relatively new. Clean lines. Fresh fabrics. But missing something I couldn't name.

This table brought patina, warmth, and about 60 years of character. The room stopped feeling assembled and started feeling inhabited.

Age isn't imperfection. It's the best conversation starter in the room.`,
dn:`"About 60 years of character" — said with respect. The table has lived more life than the rest of the room combined.`,
br:`Vintage piece texture, patina, marks\nThe piece next to something modern\nLight on the aged surface\nYou adjusting it with care`,
ca:`One vintage piece changed the room's feeling.\n\nNew-only feels assembled. One piece with age gives everything context.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Define dominant material",p:"Composition control",f:"Carousel",h:"Every great room has one material that leads. Which one is yours?",
sc:`SLIDE 1: Every great room has one material that leads. Which one is yours?
SLIDE 2: [Your room with dominant material highlighted — wood appearing in table, shelf, frame]
SLIDE 3: Wood? Stone? Linen? Leather? One material should set the tone and appear in at least three places. The thread that ties the room.
SLIDE 4: PRINCIPLE — Dominant material. The one that leads. Everything else responds.
SLIDE 5: [Supporting materials shown in contrast and complement]
SLIDE 6: PRINCIPLE — Composition control. Cohesive without being matchy. One leads, rest follows.
SLIDE 7: [Wide shot showing the material story across the room]
SLIDE 8: TAKEAWAY — Name your dominant material. If you can't, that's the project.`,
dn:`"If you can't, that's the project" — direct, slightly challenging. The moment the viewer looks at their room.`,
br:`Dominant material in three places (connect visually)\nSupporting materials in contrast\nRoom wide shot showing material story\nYou pointing out the thread`,
ca:`Name the dominant material in your room. If you can't, that's the problem.\n\nOne material sets the tone. Appears three times. Everything relates to it. That's composition.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}],
// M4W4 (WK16)
[{d:"Mon",t:"Ignoring shadow",p:"Dimensional perception",f:"Reel",h:"I'd never flatten a room with even lighting.",
sc:`I'd never flatten a room with even lighting.

Shadow is what gives a room dimension. Without it, everything reads flat. It's like a drawing with no shading. Technically complete. Emotionally empty.

Create pools of light and let the rest fall into soft darkness. A reading corner lit. The hallway in shadow.

Light is only half the story. Shadow is the other half. And honestly, it's the better half.`,
dn:`"The better half" — cheeky. You're team shadow. Deliver like a confession.`,
br:`Room fully lit: flat, institutional\nSame room: selective lighting, shadow\nLamp casting a pool, shadow around it\nShadow on wall, corner, surface\nContrast between lit and unlit`,
ca:`Even lighting is comfortable. Also flat.\n\nShadow creates dimension, mood, hierarchy. Light is only meaningful when shadow defines it.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #collectedhome #interiordesign"},
{d:"Tue",t:"Panton Chair (1967)",p:"Single-piece polypropylene, cantilever S-curve",f:"Carousel",h:"The first chair made from a single piece of plastic. It took a decade to build.",
sc:`SLIDE 1: DESIGN ICON 16. Panton Chair, 1967. STILL ICONIC. The first chair made from a single piece of plastic. It took a decade to build.
SLIDE 2: [Full photo. Panton Chair in a real interior.]
SLIDE 3: S-curve profile detail. Fifteen manufacturers said no. One said let's try. Panton shopped the idea around for years. Everyone rejected it. A famous American designer said it shouldn't even be called a chair. Vitra's founder saw the prototype, couldn't sit in it, and agreed to make it anyway. They spent five years and ten prototypes getting it right.
SLIDE 4: He got the idea from a stack of plastic buckets. Panton saw buckets nested together and thought: a chair should do that. No legs, no joints, no assembly. One continuous S-curve that stacks. He'd been sketching it since 1956. It took eleven years to find the material.
SLIDE 5: It kept breaking. They kept remaking it. The first 150 were fibreglass. Too expensive. The next version was polyurethane foam. Then polystyrene, which cracked over time. Production stopped in 1979. They tried again in the 90s with polypropylene. That one finally held. Four materials, four decades. [Chair from behind, curve detail]
SLIDE 6: No legs. No frame. Just one shape. The seat, back, and base are one unbroken piece. It's cantilevered, which means it floats forward without rear legs. The S-curve isn't decorative. It's structural. Without it the chair collapses. [Stacked Panton Chairs]
SLIDE 7: It made the cover of Vogue. In 1995, British Vogue put it on the cover. In 1970, Nova magazine used it for a feature called "How to undress in front of your husband." It's in MoMA, the Vitra Design Museum, and the Danish Culture Canon. A plastic chair in the national canon. [Chair in bold colour, styled interior]
SLIDE 8: [Full photo. Panton Chair in a lived-in room.]`,
dn:`8-slide Instagram carousel, 1080x1350px.\nPost to Instagram and TikTok simultaneously.\nSlides use Casa Altbau brand design system:\nBackground: Dark Wine #3D1C24\nHeadlines: Linen White #F2EDE6\nLabels (PRINCIPAL/FACT): Olive Gold #B5A33A\nBody text: Warm Taupe #9B8A85\nCA mark: Dusty Rose #D4918E\nFonts: DM Serif Display (headlines), DM Sans (body)`,
br:`S-curve profile detail\nChair from behind, curve detail\nStacked Panton Chairs\nChair in bold colour, styled interior\nLived-in room context`,
ca:`Fifteen manufacturers said no. It kept breaking in new materials. Production stopped for four years. They remade it four times in four decades. And it still ended up on the cover of Vogue, in MoMA, and in the Danish national culture canon. Verner Panton saw a stack of plastic buckets and thought: that's a chair. It took eleven years to prove him right.\n\nFull story in the slides.`,
tg:"#pantonchair #vernerpanton #vitra #designicon #plasticchair #danishdesign #iconicdesign #midcenturymodern #interiordesigninspo #designhistory #popdesign #furnituredesign #casaaltbau #designeducation #interiordesign"},
{d:"Wed",t:"Flat lighting everywhere",p:"Depth creation",f:"Reel",h:"Your room doesn't lack furniture. It lacks shadow.",
sc:`Your room doesn't lack furniture. It lacks shadow.

One overhead light. Everything visible. Nothing atmospheric. Like leaving all the lights on in a restaurant. Technically functional. Romantically hopeless.

A floor lamp in one corner. A table lamp with a warm pool. Dim the overhead or just turn it off.

Three sources at different heights. That's the minimum for three dimensions.

Depth comes from layers. Not brightness. Layers.`,
dn:`"Romantically hopeless" — restaurant analogy payoff. Everyone's been in a badly lit restaurant. Quick delivery.`,
br:`Overhead on: flat, clinical (before)\nLayered lighting: atmospheric (after)\nEach light turned on individually (the build)\nShadow appearing on walls\nRoom from sofa in layered light (payoff)`,
ca:`Flat lighting flattens everything.\n\nThree sources at different heights. That's the minimum. Depth comes from layers, not brightness.`,
tg:"#casaaltbau #quietdesign #intentionalhome #minimalistliving #altbauliebe #designinspiration"},
{d:"Thu",t:"Adding layered lighting for shadow",p:"Sculpting with darkness",f:"Reel",h:"Turned off the overhead. Added two low lamps. The room came alive.",
sc:`[Room at dusk. Two lamps glowing. Overhead off. TEXT: "Turned off the overhead. Added two low lamps. The room came alive."]

The overhead was doing everything. And because of that, nothing well. Like a friend who insists on helping with everything and somehow makes more work.

Two lamps. Two pools of warmth. The rest in shadow.

Sometimes the best lighting move is turning something off.`,
dn:`"Friend who helps with everything and makes more work" — universally known. Said with gentle exasperation and love.`,
br:`Overhead being turned off (deliberate click)\nTwo lamps glowing warm\nShadow between pools of light\nYou settling into the sofa (the reward)`,
ca:`Overhead off. Two low lamps on.\n\nShadow isn't darkness. It's the space between pools of warmth.`,
tg:"#casaaltbau #quietdesign #intentionalhome #interiordesignprinciples #designthinking #homedecor"},
{d:"Fri",t:"Re-evaluate negative space",p:"Breathing logic",f:"Reel",h:"The last thing I'd do as your designer is look at what's not there.",
sc:`The last thing I'd do as your designer is look at what's not there.

After all the placing, styling, and adjusting, the final step is always subtraction. What can be removed? Where can the room exhale? What's there because it belongs and what's there because you forgot to question it?

Negative space isn't absence. It's the frame around everything you kept. It's what makes the good pieces great.

The last act of design is always editing. Always.`,
dn:`This is the series closer. Quiet conviction. Not a punchline. A period. The series ends on restraint — which is the entire thesis.`,
br:`Completed room, wide and beautiful\nIntentional empty space close-ups\nRoom from doorway emphasizing breathing room\nSlow pull-back as final shot (cinematic closure)`,
ca:`The final step isn't adding the last piece. It's removing the one you don't need.\n\nNegative space is the frame that makes everything work. The last act of design is always editing.`,
tg:"#casaaltbau #quietdesign #intentionalhome #apartmentdesign #altbauliebe #interiordesign"}]
];

/* ─── Editable Field ─── */
function EditField({ value, onChange, color, style, multiline = true }) {
  const baseStyle = {
    background: "transparent", border: "1px solid transparent",
    borderRadius: "3px", outline: "none", width: "100%",
    fontFamily: "'Inter', sans-serif", resize: "vertical",
    padding: "6px 8px", margin: "-6px -8px",
    transition: "border-color 0.15s, background 0.15s",
    ...style,
  };
  const handlers = {
    onFocus: (e) => { e.currentTarget.style.borderColor = (color || "#333"); e.currentTarget.style.background = "#0a0a0a"; },
    onBlur: (e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; },
  };
  if (!multiline) {
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={{ ...baseStyle, height: "auto" }} {...handlers} />;
  }
  const rows = Math.max(2, (value || "").split("\n").length + 1);
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} style={{ ...baseStyle, lineHeight: style?.lineHeight || 1.75 }} {...handlers} />;
}

/* ─── Modal Brief Component ─── */
function BriefModal({ item, mo, tw, onClose, edits, onEdit }) {
  const c = SC[item.d];
  const key = `${tw - 1}-${item.d}`;

  const get = (field) => edits[key]?.[field] ?? item[field] ?? "";
  const set = (field) => (val) => onEdit(key, field, val);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const Section = ({ label }) => (
    <div style={{
      fontSize: "0.7rem", letterSpacing: "3.5px", textTransform: "uppercase",
      color: "#999", marginBottom: "8px", marginTop: "28px",
      borderTop: "1px solid #252525", paddingTop: "16px"
    }}>{label}</div>
  );

  const fieldBase = { color: "#d0d0d0", fontFamily: "'Inter', sans-serif" };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)",
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        padding: "32px 16px", overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#131313", border: "1px solid #252525",
          borderRadius: "6px", maxWidth: "660px", width: "100%",
          padding: "40px 38px", position: "relative",
          color: "#d0d0d0", lineHeight: 1.75, fontFamily: "'Inter', sans-serif",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          marginBottom: "40px",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "14px", right: "16px",
            background: "none", border: "1px solid #444",
            color: "#888", fontSize: "0.75rem", cursor: "pointer",
            borderRadius: "3px", padding: "4px 10px",
            fontFamily: "Inter", letterSpacing: "1px",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#666"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#444"; }}
        >
          ESC
        </button>

        {/* Badge row */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
          <span style={{
            display: "inline-block", background: c, color: "#000",
            padding: "4px 14px", borderRadius: "3px", fontSize: "0.68rem",
            fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase"
          }}>{item.d} · {SN[item.d]}</span>
          <span style={{
            display: "inline-block", background: "#1e1e1e", color: "#aaa",
            padding: "4px 12px", borderRadius: "3px", fontSize: "0.64rem",
            fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase"
          }}>{item.f}</span>
          <span style={{
            display: "inline-block", background: c + "18", color: c,
            padding: "4px 10px", borderRadius: "3px", fontSize: "0.64rem",
            fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase"
          }}>{PIL[item.d]}</span>
        </div>

        {/* Meta */}
        <div style={{
          color: "#777", fontSize: "0.68rem", letterSpacing: "1.5px",
          marginBottom: "22px", textTransform: "uppercase"
        }}>Casa Altbau · Month {mo + 1}: {MN[mo]} · Week {tw}</div>

        {/* Title */}
        <EditField value={get("t")} onChange={set("t")} color={c} multiline={false}
          style={{ ...fieldBase, fontSize: "1.25rem", fontWeight: 600, color: "#f0f0f0", lineHeight: 1.35, marginBottom: "4px" }} />

        {/* Principle */}
        <EditField value={get("p")} onChange={set("p")} color={c} multiline={false}
          style={{ ...fieldBase, fontSize: "0.84rem", color: "#888", fontStyle: "italic", marginTop: "8px", marginBottom: "20px" }} />

        {/* Hook */}
        <Section label="Hook (0-2 sec)" />
        <div style={{ borderLeft: `3px solid ${c}`, paddingLeft: "14px" }}>
          <EditField value={get("h")} onChange={set("h")} color={c} multiline={false}
            style={{ ...fieldBase, fontSize: "0.95rem", color: "#e8e8e8", fontStyle: "italic", lineHeight: 1.65 }} />
        </div>

        {/* Script */}
        <Section label="Script" />
        <EditField value={get("sc")} onChange={set("sc")} color={c}
          style={{ ...fieldBase, fontSize: "0.88rem", color: "#d0d0d0", lineHeight: 1.85 }} />

        {/* Delivery Notes */}
        <Section label="Delivery Notes" />
        <div style={{ background: "#0e0e0e", padding: "14px 16px", borderRadius: "4px", borderLeft: `3px solid ${c}44` }}>
          <EditField value={get("dn")} onChange={set("dn")} color={c}
            style={{ ...fieldBase, fontSize: "0.84rem", color: "#aaa", lineHeight: 1.7 }} />
        </div>

        {/* B-Roll */}
        <Section label="B-Roll Checklist" />
        <EditField value={get("br")} onChange={set("br")} color={c}
          style={{ ...fieldBase, fontSize: "0.84rem", color: "#aaa", lineHeight: 1.9 }} />

        {/* Caption */}
        <Section label="Caption (Instagram)" />
        <EditField value={get("ca")} onChange={set("ca")} color={c}
          style={{ ...fieldBase, fontSize: "0.86rem", color: "#bbb", lineHeight: 1.7 }} />

        {/* Tags */}
        <div style={{ marginTop: "24px", borderTop: "1px solid #252525", paddingTop: "14px" }}>
          <EditField value={get("tg")} onChange={set("tg")} color={c} multiline={false}
            style={{ ...fieldBase, fontSize: "0.78rem", color: "#777", letterSpacing: "0.3px" }} />
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "28px", borderTop: "1px solid #1e1e1e", paddingTop: "14px",
          fontSize: "0.6rem", color: "#555", textTransform: "uppercase",
          letterSpacing: "2.5px", display: "flex", justifyContent: "space-between"
        }}>
          <span>Casa Altbau Content Plan</span>
          <span>{SN[item.d]} · WK{tw}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Planner ─── */
export default function P() {
  const [mo, setMo] = useState(0);
  const [wk, setWk] = useState(0);
  const [vw, setVw] = useState("week");
  const [ap, setAp] = useState(null);
  const [sts, setSts] = useState({});
  const [modalItem, setModalItem] = useState(null);
  const [edits, setEdits] = useState({});
  const [allData, setAllData] = useState(() => D.map(w => w.map(i => ({ ...i }))));
  const [dragOver, setDragOver] = useState(null); // "weekIdx-day"
  const dragRef = useRef(null); // { weekIdx, day, item }

  const wi = mo * 4 + wk;
  const data = allData[wi];
  const tw = wi + 1;
  const stC = { Idea: "#f0c040", Drafting: "#60aaff", Ready: "#d070ff", Posted: "#4cdd80" };
  const sk = (d) => `${wi}-${d}`;

  const openDoc = useCallback((item) => {
    setModalItem(item);
  }, []);

  const closeModal = useCallback(() => {
    setModalItem(null);
  }, []);

  const handleEdit = useCallback((key, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [key]: { ...(prev[key] || {}), [field]: value },
    }));
  }, []);

  const getEdited = (item, field) => {
    const key = `${wi}-${item.d}`;
    return edits[key]?.[field] ?? item[field] ?? "";
  };

  /* ── Drag & Drop ── */
  const handleDragStart = useCallback((weekIdx, day, item, e) => {
    dragRef.current = { weekIdx, day, item };
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", ""); // required for Firefox
    e.currentTarget.style.opacity = "0.4";
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.currentTarget.style.opacity = "1";
    dragRef.current = null;
    setDragOver(null);
  }, []);

  const handleDragOver = useCallback((weekIdx, day, e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const key = `${weekIdx}-${day}`;
    setDragOver(key);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(null);
  }, []);

  const handleDrop = useCallback((targetWeekIdx, targetDay, e) => {
    e.preventDefault();
    setDragOver(null);
    const src = dragRef.current;
    if (!src) return;
    if (src.weekIdx === targetWeekIdx && src.day === targetDay) return;

    setAllData(prev => {
      const next = prev.map(w => w.map(i => ({ ...i })));
      const srcWeek = next[src.weekIdx];
      const tgtWeek = next[targetWeekIdx];
      const srcIdx = srcWeek.findIndex(x => x.d === src.day);
      const tgtIdx = tgtWeek.findIndex(x => x.d === targetDay);

      if (srcIdx === -1) return prev;

      if (tgtIdx === -1) {
        // Target slot is empty: move item there
        const [moved] = srcWeek.splice(srcIdx, 1);
        moved.d = targetDay;
        tgtWeek.push(moved);
      } else {
        // Both slots occupied: swap
        const srcItem = srcWeek[srcIdx];
        const tgtItem = tgtWeek[tgtIdx];
        const srcDay = srcItem.d;
        const tgtDay = tgtItem.d;
        srcItem.d = tgtDay;
        tgtItem.d = srcDay;
        srcWeek[srcIdx] = tgtItem;
        tgtWeek[tgtIdx] = srcItem;
      }
      return next;
    });

    dragRef.current = null;
  }, []);

  const isMatch = (d) => !ap || PIL[d] === ap;
  const bs = {
    borderRadius: "3px", fontSize: "0.72rem", cursor: "pointer",
    fontFamily: "Inter", letterSpacing: "1px", textTransform: "uppercase",
    transition: "all 0.15s", border: "1px solid #333", padding: "5px 13px"
  };

  return (
    <div style={{
      fontFamily: "'Inter',sans-serif", background: "#0f0f0f",
      color: "#e0e0e0", padding: "20px", minHeight: "100vh"
    }}>
      {/* Modal */}
      {modalItem && (
        <BriefModal item={modalItem} mo={mo} tw={tw} onClose={closeModal} edits={edits} onEdit={handleEdit} />
      )}

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        borderBottom: "1px solid #222", paddingBottom: "14px", marginBottom: "20px",
        flexWrap: "wrap", gap: "10px"
      }}>
        <div>
          <h1 style={{
            fontSize: "1.3rem", fontWeight: 700, letterSpacing: "3px",
            textTransform: "uppercase", color: "#fff", margin: 0
          }}>Casa Altbau</h1>
          <p style={{
            fontSize: "0.68rem", color: "#777", letterSpacing: "2px",
            textTransform: "uppercase", margin: "4px 0 0"
          }}>Content Planner · 80 Pieces · Reels + Carousels</p>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {["week", "overview"].map((v) => (
            <button key={v} onClick={() => { setVw(v); setAp(null); }} style={{
              ...bs,
              background: vw === v ? "#fff" : "#1a1a1a",
              color: vw === v ? "#000" : "#888",
              borderColor: vw === v ? "#fff" : "#333"
            }}>{v}</button>
          ))}
        </div>
      </div>

      {/* Pillar Filters */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "14px", flexWrap: "wrap" }}>
        <span style={{
          fontSize: "0.66rem", color: "#666", letterSpacing: "2px",
          textTransform: "uppercase", display: "flex", alignItems: "center", marginRight: "4px"
        }}>PILLARS</span>
        {Object.entries(PILC).map(([p, c]) => (
          <button key={p} onClick={() => setAp(ap === p ? null : p)} style={{
            ...bs, background: ap === p ? c : "#1a1a1a",
            color: ap === p ? "#000" : c,
            borderColor: ap === p ? c : c + "44",
            fontSize: "0.68rem", padding: "4px 12px"
          }}>{p}</button>
        ))}
      </div>

      {/* Month tabs */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "8px", flexWrap: "wrap" }}>
        {MN.map((m, i) => (
          <button key={i} onClick={() => { setMo(i); setWk(0); }} style={{
            ...bs, fontWeight: mo === i ? 600 : 400,
            background: mo === i ? "#fff" : "#1a1a1a",
            color: mo === i ? "#000" : "#888",
            borderColor: mo === i ? "#fff" : "#333",
            padding: "6px 13px"
          }}>M{i + 1} · {m}</button>
        ))}
      </div>

      {/* Week tabs */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "18px", alignItems: "center" }}>
        {[0, 1, 2, 3].map((w) => (
          <button key={w} onClick={() => setWk(w)} style={{
            ...bs,
            background: wk === w ? "#333" : "#1a1a1a",
            color: wk === w ? "#fff" : "#777",
            borderColor: wk === w ? "#444" : "#333"
          }}>WK {mo * 4 + w + 1}</button>
        ))}
        <span style={{
          fontSize: "0.66rem", color: "#666", marginLeft: "6px", letterSpacing: "1px"
        }}>WEEK {tw} / 16</span>
      </div>

      {/* WEEK VIEW */}
      {vw === "week" && (
        <>
          {/* Legend */}
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "14px" }}>
            {DY.map((d) => {
              const item = data.find((x) => x.d === d);
              return (
                <div key={d} style={{
                  background: "#1a1a1a", border: `1px solid ${SC[d]}33`,
                  borderRadius: "3px", padding: "3px 10px", fontSize: "0.7rem",
                  color: SC[d], letterSpacing: "1px", opacity: isMatch(d) ? 1 : 0.3
                }}>
                  <span style={{ fontWeight: 600 }}>{d}</span> · {SN[d]}{" "}
                  <span style={{ color: "#777", fontSize: "0.64rem" }}>({item?.f})</span>
                </div>
              );
            })}
          </div>

          <p style={{
            fontSize: "0.66rem", color: "#666", letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "8px"
          }}>Drag cards to rearrange · Click to open brief</p>

          {/* Grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(5,1fr)",
            gap: "5px", marginBottom: "20px"
          }}>
            {DY.map((d) => (
              <div key={d} style={{
                background: "#1a1a1a", borderRadius: "3px", padding: "4px",
                textAlign: "center", fontSize: "0.66rem", fontWeight: 600,
                color: SC[d], letterSpacing: "1.5px", opacity: isMatch(d) ? 1 : 0.3
              }}>{d}</div>
            ))}
            {DY.map((d) => {
              const item = data.find((x) => x.d === d);
              const isOver = dragOver === `${wi}-${d}`;
              if (!item) return (
                <div key={d}
                  onDragOver={(e) => handleDragOver(wi, d, e)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(wi, d, e)}
                  style={{
                    background: isOver ? "#1c1c1c" : "transparent",
                    border: isOver ? "1px dashed #555" : "1px dashed transparent",
                    borderRadius: "3px", minHeight: "150px",
                    transition: "all 0.15s",
                  }}
                />
              );
              const st = sts[sk(d)];
              const match = isMatch(d);
              return (
                <div
                  key={`c-${d}`}
                  draggable
                  onDragStart={(e) => handleDragStart(wi, d, item, e)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(wi, d, e)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(wi, d, e)}
                  onClick={() => openDoc(item)}
                  style={{
                    background: isOver ? "#1e1e1e" : (match ? "#141414" : "#0d0d0d"),
                    border: isOver ? "1px dashed #666" : `1px solid ${match ? "#1f1f1f" : "#151515"}`,
                    borderRadius: "3px", padding: "9px", minHeight: "150px",
                    cursor: "grab", transition: "all 0.2s", position: "relative",
                    opacity: match ? 1 : 0.25
                  }}
                  onMouseEnter={(e) => {
                    if (match) {
                      e.currentTarget.style.borderColor = SC[d] + "77";
                      e.currentTarget.style.background = "#181818";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = match ? "#1f1f1f" : "#151515";
                    e.currentTarget.style.background = match ? "#141414" : "#0d0d0d";
                  }}
                >
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: "5px"
                  }}>
                    <span style={{
                      fontSize: "0.64rem", color: SC[d], fontWeight: 600,
                      letterSpacing: "1px", textTransform: "uppercase", opacity: 0.85
                    }}>{item.f}</span>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%", background: "#4cdd80"
                    }} title="Script ready" />
                  </div>
                  <div style={{
                    fontSize: "0.76rem", color: SC[d], fontWeight: 600,
                    marginBottom: "3px", lineHeight: 1.35
                  }}>{getEdited(item, "t")}</div>
                  <div style={{
                    fontSize: "0.64rem", color: "#777", marginBottom: "5px", lineHeight: 1.35
                  }}>{getEdited(item, "p")}</div>
                  <div style={{
                    fontSize: "0.68rem", color: "#999", fontStyle: "italic",
                    lineHeight: 1.4, borderLeft: `2px solid ${SC[d]}33`, paddingLeft: "6px"
                  }}>{getEdited(item, "h")}</div>
                  {st && (
                    <div style={{ marginTop: "5px", fontSize: "0.6rem", color: stC[st] }}>
                      ● {st}
                    </div>
                  )}
                  <div style={{ marginTop: "6px" }}>
                    <select
                      value={st || ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSts((p) => ({ ...p, [sk(d)]: e.target.value }));
                      }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: "0.64rem", border: `1px solid ${stC[st] || "#333"}`,
                        borderRadius: "3px", padding: "2px 4px", background: "#1a1a1a",
                        color: stC[st] || "#777", fontFamily: "Inter", outline: "none", width: "100%"
                      }}
                    >
                      <option value="">Status</option>
                      <option value="Idea">Idea</option>
                      <option value="Drafting">Drafting</option>
                      <option value="Ready">Ready</option>
                      <option value="Posted">Posted</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          {/* YT Row */}
          <p style={{
            fontSize: "0.66rem", color: "#666", letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "6px", marginTop: "8px"
          }}>YouTube (Long-Form) — This Week</p>
          <div style={{
            background: "#141414", border: "1px solid #1f1f1f",
            borderRadius: "3px", padding: "10px", marginBottom: "20px", minHeight: "50px"
          }}>
            <div style={{ fontSize: "0.76rem", color: "#777", fontStyle: "italic" }}>
              Plan your YouTube video here — different content, long-form
            </div>
          </div>
        </>
      )}

      {/* OVERVIEW */}
      {vw === "overview" && (
        <div>
          <p style={{
            fontSize: "0.66rem", color: "#666", letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "10px"
          }}>Month {mo + 1}: {MN[mo]} — Drag cards to rearrange</p>
          <div style={{
            display: "grid", gridTemplateColumns: "auto repeat(5,1fr)", gap: "4px"
          }}>
            <div />
            {DY.map((d) => (
              <div key={d} style={{
                background: "#1a1a1a", borderRadius: "3px", padding: "4px",
                textAlign: "center", fontSize: "0.62rem", fontWeight: 600,
                color: SC[d], letterSpacing: "1.5px", opacity: isMatch(d) ? 1 : 0.3
              }}>{SN[d].toUpperCase()}</div>
            ))}
            {[0, 1, 2, 3].map((w) => {
              const gi = mo * 4 + w;
              const wd = allData[gi];
              return (
                <React.Fragment key={`row-${w}`}>
                  <div style={{
                    background: "#1a1a1a", borderRadius: "3px", padding: "5px",
                    fontSize: "0.64rem", fontWeight: 700, color: "#bbb",
                    letterSpacing: "1.5px", display: "flex", alignItems: "center"
                  }}>WK{gi + 1}</div>
                  {DY.map((d) => {
                    const item = wd.find((x) => x.d === d);
                    const isOver = dragOver === `${gi}-${d}`;
                    const match = isMatch(d);
                    if (!item) return (
                      <div key={d}
                        onDragOver={(e) => handleDragOver(gi, d, e)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(gi, d, e)}
                        style={{
                          background: isOver ? "#1c1c1c" : "transparent",
                          border: isOver ? "1px dashed #555" : "1px dashed transparent",
                          borderRadius: "3px", minHeight: "60px",
                          transition: "all 0.15s",
                        }}
                      />
                    );
                    return (
                      <div
                        key={`${w}-${d}`}
                        draggable
                        onDragStart={(e) => handleDragStart(gi, d, item, e)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOver(gi, d, e)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(gi, d, e)}
                        onClick={() => { setWk(w); openDoc(item); }}
                        style={{
                          background: isOver ? "#1e1e1e" : (match ? "#141414" : "#0d0d0d"),
                          border: isOver ? "1px dashed #666" : ("1px solid " + (match ? "#1f1f1f" : "#151515")),
                          borderRadius: "3px", padding: "6px", cursor: "grab",
                          minHeight: "60px", position: "relative", transition: "all 0.15s",
                          opacity: match ? 1 : 0.2
                        }}
                        onMouseEnter={(e) => { if (match) e.currentTarget.style.borderColor = "#444"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = match ? "#1f1f1f" : "#151515"; }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                          <span style={{
                            fontSize: "0.56rem", color: SC[d], letterSpacing: "1px",
                            textTransform: "uppercase", opacity: 0.8
                          }}>{item.f}</span>
                          <div style={{
                            width: "4px", height: "4px", borderRadius: "50%", background: "#4cdd80"
                          }} />
                        </div>
                        <div style={{
                          fontSize: "0.68rem", color: "#e0e0e0", lineHeight: 1.4, marginBottom: "2px"
                        }}>{item.t}</div>
                        <div style={{
                          fontSize: "0.58rem", color: "#777", lineHeight: 1.3
                        }}>{item.p}</div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
