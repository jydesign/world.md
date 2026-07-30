# FEEDBACK

Raw dogfooding notes — what broke, what dragged, what drifted. Per PLAN.md
weeks 1–3, track three things: **re-explains** (context I re-typed that the
world already held), **drift** (outputs violating canon), **friction**
(annoying to author, maintain, or use). Verbatim beats tidy.

---

## 2026-07-29 — First real world: Cross-TrainerX Spring Launch

Authored `cross-trainerx-spring-launch.world/` from a creative brief
(world.md + style.md + 3 characters + 3 hero objects + 3 locations + CAD
refs) and composed the first Midjourney prompt for Image 1.

### Friction / bugs
- **Viewer crashed on license-less refs.** Entity pages rendered blank
  content when a reference had no `license` field. `license` is optional
  per SPEC, but `refRow()` dereferenced it unconditionally. Surfaced
  immediately on the CAD-pending Cross-TrainerX refs (`approved: false`,
  no license yet). → FIXED in `viewer/world-viewer-prototype.html`.
- **Prose rendered as literal Markdown.** `**bold**`, `*italic*`, and a
  numbered list in `world.md`'s premise showed their raw syntax in the
  viewer (prose was HTML-escaped, never rendered). Frontmatter facts (what
  ships to image prompts) were unaffected. → Inline emphasis + `[[links]]`
  now render; numbered lists still need blank-line separation to break
  across paragraphs (the generator joins soft line-breaks). Block-list
  rendering is still TODO.
- **Palette hexes aren't in the brief.** The brief names colors (graphite
  black, brushed titanium, warm white, kinetic lime) but gives no hexes;
  `style.md` `palette:` wants them, so I invented them. Open question for
  real users: do they think in names or hexes? Maybe `hex` should be
  optional and names allowed to stand alone.

---

## 2026-07-29 — Copy path broke; compose targets added

### Friction / bugs
- **"Copy world package" silently failed in the embedded preview.** The
  viewer relied solely on `navigator.clipboard`, which sandboxed webviews
  block. First real user click on the flagship button → nothing. → FIXED:
  fallback chain (clipboard API → `execCommand` → manual-copy overlay
  with pre-selected text). Lesson for the spec: the copy path must work
  in the least-privileged embed, not just a first-class browser tab.
- **One generic package isn't enough at the moment of paste.** First real
  use immediately wanted a Midjourney-shaped block, not the generic one —
  independently confirming the D02 per-tool-profiles decision. → Viewer
  now has a compose-target picker (Chat / GPT Image / Midjourney /
  Generic) wired to both copy buttons.
- **Sections you don't know exist never get filled.** The Cross-TrainerX
  characters had no `voice` or `refs` — not by choice, but because the
  source brief never mentioned them and the viewer silently hid the
  slots. The empty-states-are-onboarding principle needed to reach
  section level, not just world level. → Entity pages now render every
  SPEC slot for the type; unfilled ones show a dashed invite with a
  copyable starter prompt ("Add voice to Amara Vale: …").
- **Whole-world Midjourney package is ~5,200 chars** — far past the terse
  bar MJ culture will paste habitually. The real MJ unit is a per-shot
  subset (character + object + location). CLI `compose <entities>` covers
  it; the viewer has no entity multi-select (entity pages copy one entity
  + style). Watch whether users want shot-level compose in the viewer.

### Re-explains
- _(pending — watch once the world is reused across multiple MJ sessions)_

### Drift
- _(pending — check returned images against canon: LEFT wrist, scar,
  X-motif, no logos)_

### What worked
- The brief mapped onto the format with **zero forced entity types** —
  campaign = world + style + characters + hero objects + locations + refs.
  No pressure to invent scenes/beats or new types.
- **CAD-pending products fit `references.yaml` cleanly** (`current:
  pending`, `approved: false`). "Own knowledge, not media" held up: the
  world names the CAD without storing it.
- Composing Image 1's prompt was a **copy-the-facts** exercise, not a
  re-description — canon and NEVER rules dropped straight in.

---

## 2026-07-29 — 001 · First Midjourney generation (whole-world paste)

### The test
Pasted the viewer's midjourney-target **whole-world package** (all 3
characters, 3 hero objects, 3 locations, style tail) into Midjourney with
**no shot description**, default params (`ar 4:3`, no `--style raw`).
Verbatim prompt (also reproducible: compose output at commit e312940):

```
Amara Vale: 27, tall, powerfully athletic, deep brown, oval, high cheekbones, dark hazel, black, tightly coiled, gathered in a high braided ponytail, faint scar across the left eyebrow, wearing fitted charcoal training top with subtle tonal paneling, tapered black performance trousers, lime-accented boots, Faint scar across the LEFT eyebrow is always present, Hair is a high braided ponytail, No club badges, sponsors, national emblems, or recognizable uniform elements. Leonie Falk: 24, compact, explosive, athletic, fair with visible freckles, short copper-red, swept back, pale green, strong angular jaw, wearing streamlined charcoal flight suit with titanium fastening hardware, subtle kinetic-lime seams, gloves, compact matte-black parachute pack, Visible freckles and short copper-red hair, Worn eyewear must conform to her face WITHOUT changing her identity or facial structure. Mateo Ríos: 31, broad-shouldered, muscular, elite-athlete presence, warm olive, thick wavy dark-brown, neatly trimmed beard, expressive brown, slightly crooked nose from an old match injury, wearing soft oatmeal knit shirt with sleeves pushed back, loose charcoal training trousers, Slightly crooked nose (old injury) is always present, Neatly trimmed beard, No club badges, sponsors, or national emblems. Cross-TrainerX Orbit Home: compact sculptural device; low cylindrical body; floating graphite-black upper disc, approximately 18 cm tall, warm-white acoustic mesh, brushed-titanium trim, graphite-black disc, narrow kinetic-lime light ring that responds subtly to voice, colorway Warm white and graphite #F4EFE6, on a near, clean surface corner — visible and geometrically simple for CAD insertion, Finished device stands approximately 18 cm tall, Final design inserted from CAD — reserve a clean, geometrically simple placement zone, Realistic surface reflection, soft contact shadow, and a faint lime spill on nearby objects. Cross-TrainerX Pulse Arc: slim performance wearable; softly rectangular black-glass face; rounded titanium chassis, titanium chassis, black glass, narrow graphite strap, flush side crown; thin kinetic-lime light tracing one edge, colorway Graphite #1C1C1E, worn on the LEFT wrist, face turned naturally toward camera, Worn on the LEFT wrist; face toward camera, Final design inserted from CAD — preserve a clean, unobstructed wrist section with anatomically correct proportions, Strap wraps convincingly with gentle skin compression, realistic contact shadow, reflected light, and no intersection with the sleeve, One accent only: kinetic lime tracing a single edge. Cross-TrainerX Vista Air: panoramic goggles; continuous smoke-black lens; slim brushed-titanium brow frame; graphite side modules, smoke-black lens, brushed titanium, graphite, soft black head strap, small kinetic-lime X detail on the strap, colorway Smoke black #1C1C1E, worn on the face, conforming naturally without changing facial structure, Final design inserted from CAD — keep clean visibility around eyes, temples, ears, hairline, and strap path, Conforms naturally to the face WITHOUT changing the wearer's identity or facial structure, Interface is a restrained reflected sliver along the inner lens edge — never dense sci-fi graphics, Small kinetic-lime X detail on the strap. Casa Ladera: open-plan kitchen and living room — pale limestone, warm oak cabinetry, matte graphite fixtures, large sliding windows, a planted interior courtyard, clear Mediterranean spring morning, long geometric morning shadows across the floor, spring, Sunlight and architectural shadows form a subtle X across the kitchen floor. Northstar Ground: steep graphite-colored seating, translucent cantilevered roof, silver structural ribs, fine mist hanging over the pitch, low morning sun, fresh spring grass glowing, quiet — empty before performance, spring, shortly after sunrise, A faint X-shaped reflection appears across two sections of the roof, Floodlights are unlit, receding into the background. The Leap (high-altitude skydive): the open side door of a sleek graphite transport aircraft, thin layered cloud corridors, altitude haze, high-altitude sunlight, the rushing wind of freefall, spring, Two intersecting cloud trails create a subtle X in the distance, Extraordinary but physically convincing — accurate airflow, clothing tension, altitude haze, body mechanics, The aircraft stays visible to make the leap legible. ambitious, intelligent, energetic, human, premium. palette of Graphite black, Brushed titanium, Warm white, Kinetic lime. premium cinematic realism — believable skin, fabric, weather, directional natural sunlight, spring morning / low sun. cinematic full-frame, ~35–85mm; medium-wide to three-quarter. clean and high-fidelity, restrained contrast, consistent skin rendering across the set --no real team crests, sponsor logos, or recognizable trademarks, exaggerated smiles or generic influencer poses, dense sci-fi HUD graphics on product interfaces, essential detail in the outer 20% of the frame, a conventional, sterile technology product-shot look, let hands or props overlap the placement zone, obscure the placement zone with fingers or fabric, dense heads-up-display graphics across the lens
```

### Result (4-up, screenshot in James's archive — the repo stores no media)
- **Medium wrong 4/4**: MJ default 3D-cartoon stylization, not photographic.
  Honest root cause: "photograph" existed NOWHERE in the world — a spec
  gap, not model drift. Style facts also sat at the END of the prompt.
- **Group lineup 4/4**: all three athletes in every frame; no location
  legible; products mostly absent or reduced to lime piping. The package
  described a world; MJ needed a shot.
- Wardrobe palette + kinetic-lime accents DID survive (charcoal/lime,
  Mateo's oatmeal knit, Leonie's copper hair) — identity facts carried
  even through the wrong medium.

### Causes → fixes (D03, all applied)
- (a) compose was entity-driven and sent everything → **shot-driven
  compose**: viewer shot field now; `worldmd shoot` specced for the CLI.
- (b) medium was not a world attribute → `medium:` REQUIRED in style.md;
  both worlds set `medium: photograph`.
- (c) style cues must lead in terse-prompt tools → midjourney target now
  opens with medium + grade + light, always.
- (d) comma-lists read as tag clouds → packing order (medium+style →
  shot → entity facts → atmosphere → canon → nevers) with ≈250-word
  budget; canon exempt from trimming.
- Protocol: rerun this brief as the A/B — (a) whole-world paste vs
  (b) shot compose; log medium adherence + canon violations per 10.
  Test `--style raw` on/off before hardcoding it.

---

## 2026-07-29 — 002 · Shot-compose A/B reruns (Midjourney)

Same shot brief as 001: Amara tightens her boot cuff pitch-side at
Northstar Ground at sunrise, Pulse Arc toward camera.

### Arm B — viewer shot compose, `ar 4:3`, no raw (4 images)
- **Medium 4/4 photographic** (001 was 0/4). The headline number moved.
- Single subject 4/4; shot action followed 4/4; watch present; sunrise
  light; no influencer poses.
- **Hair canon violated ~4/4**: loose curls, not the high braided
  ponytail — canon was in the prompt but trailing at the end. Model
  drift with a composer accomplice (placement).
- **Northstar identity absent**: generic track + pylons. Composer's
  fault — the budget trim deleted the location's facts wholesale; only
  its canon shipped. (Incidental X from pylon cross-bracing.)

### Arm C — James's hand-appended version, `ar 16:9 --style raw`
Canon phrased inline next to each entity, bold labels; stadium
architecture still absent from the prompt.
- Photographic 4/4; braided ponytail RETURNED (~4/4) — inline/adjacent
  canon phrasing appears to be what fixed it.
- **X-motif present 3/4 but literal**: big X signage on structures, not
  the canon "faint X-shaped reflection." Phrasing sensitivity — "faint"
  amplified into set dressing. Watch for this class of drift.
- Location still a generic track — expected: no prompt so far has
  carried the stadium description.
- Left-wrist adherence: pending zoom check on picks.

### Lessons → composer (both shipped)
- Canon now packs ADJACENT to each entity's facts ("<name> canon: …"),
  not as a trailing block — arm C is the evidence this placement works.
- Budget trim now truncates entity facts to a ~12-word floor instead of
  deleting them, so location identity always ships (stadium line
  verified present at ~255 in-budget words).
- `--style raw` + medium lead looked right in both raw runs — candidate
  for hardcoding into the midjourney target after one more confirming
  run.

---

## 2026-07-29 — 003 · Run 3: composer v2 (canon-adjacent + location floor), ar 16:9 raw

### What held (4 images)
- **Northstar Ground appeared 4/4** — steep seating + translucent
  cantilevered roof in every frame. The truncation-floor fix worked on
  its first outing; location identity had been absent in every prior run.
- Braided ponytail held (~4/4); medium photographic 4/4; watch present
  4/4; lime accents on boots; no poses/smiles drift.
- X-motif landed as a **faint roof reflection** (frame 4) — per canon
  this time, not the literal signage of run 002-C.
- `--style raw` right 3/3 runs → now emitted by the midjourney target.

### What drifted
- **Chirality ~2/4**: watch and scar flip between her left and right
  side across frames; profile direction inconsistent.

### Diagnosis + decision (the left/right problem)
Prompt-only diffusion tools are chirality-weak by construction: training
corpora are full of mirrored images, so "watch on wrist" is learned
side-agnostic, and anatomical-left vs viewer-left is ambiguous once the
pose rotates. **world.md does not pretend to fix this at generation.**
Enforcement is layered:
1. Stage the side in the shot line ("kneeling, her left side toward
   camera") — pose language beats anatomical labels.
2. Canon checklist at selection — flipped frames are objectively
   cullable, never shipped.
3. Approved character reference (added `amara-ref` slot) rides along as
   `--cref` / omni-ref — image refs hold identity + chirality far better
   than text.
4. CAD insertion guarantees the product's side in post; generation only
   owes a clean placement zone (already canon).
5. The never-mirror world canon protects chirality downstream.
This run is the canonical example of **canon as acceptance criteria, not
just prompt text.**

**Follow-up:** James picked run 003's top-row/second frame as the
approved Amara reference (scar LEFT, watch LEFT) — `amara-ref` v1,
approved, MJ CDN URL recorded. The composer now emits approved http
image refs as `--oref` automatically (D02 attachable-refs, minimal
implementation). No media stored — the URL is the record.

---

## 2026-07-29 — 004 · Reference-conditioned run (oref + side-staged shot, ar 16:9 raw)

### Tooling note
MJ's web UI absorbs the `--oref`/`--cref` URL out of the pasted prompt
and shows it in its Omni Reference slot — looked like it "dumped" the
URL but it applied it. Composer output is compatible as-is. (Param chip
showed v 7.)

### What held (4 images)
- **Identity locked 4/4** — same face as the approved reference in every
  frame. The reference layer of the chirality stack works.
- Braided ponytail 4/4; photographic 4/4; watch present 4/4, face
  toward camera mostly; stadium roof present where framing allows;
  left-side staging appears to have improved watch-side consistency
  (final zoom check on the pick still owed).

### What drifted — NEW CLASS
- **Sponsor-like swoosh mark on the top ~2/4** — despite "no club
  badges" canon AND `--no sponsor logos`. Known model behavior: negation
  is weak for logos; "athletic training top" + athletic reference image
  pull apparel-brand priors. Lime seams also migrated from boots to the
  top (minor wardrobe drift).
- Fix applied where it belongs — in the world: Amara's wardrobe default
  now reads "plain unbranded charcoal training top … (no logos or
  marks)". Positive phrasing > negation; SPEC notes the pattern. Apply
  the same phrasing to Mateo/Leonie when their images go into rotation.

---

## 2026-07-29 — 005 (setup) · Scar→tattoo drift; references propagate their own flaws

- James: the scar has rendered as a **tattoo-like brow mark since run
  001**; he picked the reference as overall favorite and the flaw rode
  in — **a reference lock propagates its own drift**. (Earlier frames
  showed taped/stitched versions — also off-canon: that's a fresh
  injury, not a faint healed scar.)
- Render cause: "scar across the eyebrow" is ambiguous to image models —
  drifts to ink marks or the fashion "eyebrow slit."
- Lessons →
  - Approve references AGAINST THE CANON CHECKLIST feature by feature,
    not by overall favorite. Version them; supersede, don't patch
    (amara-ref v1 flaw documented in references.yaml; v2 to replace it).
  - Describe marks by physical reality: world now says "thin pale healed
    scar through the outer LEFT eyebrow — a small break in the brow
    hair; skin mark only, never ink, tattoo, stitches, or tape."
- Run 005 = tightened wardrobe + scar phrasing, same oref for identity;
  cull for a scar-correct frame → approve as amara-ref v2.

### Run 005 results (A/B: with vs without oref)
- **Arm B (no reference, text-only)**: watch/wrist left-consistent; NEW
  DRIFT — hair rendered as loose braids hanging down the back/shoulders
  in 4/4, not gathered up. "High braided ponytail" specified the braid
  pattern but not clearly enough that it must be gathered UP and off the
  neck — a text-underspecification gap, distinct from the scar issue.
  → Fixed: physical.hair + canon now say "gathered UP ... into one high
  ponytail on the crown (never loose braids hanging down)". Faces mostly
  turned away/down in this arm — scar not scoreable from these frames.
- **Arm A (with oref)**: identity locked to reference as expected; no
  obvious tattoo-swoosh brow mark or apparel logo visible at review
  resolution in frames 2–4 — promising that the scar/logo text fixes are
  doing something even against the flawed reference, but NOT confirmed
  without a zoomed crop. Awaiting James's zoom on a frontal frame to
  identify a scar-correct amara-ref v2 candidate.

---

## 2026-07-29 — 006 · GPT Image (ChatGPT create-image), all three campaign images

First cross-tool run. Same world, `gpt-image` target + one shot line per
image, composed in ChatGPT's image mode.

**Shot prompts used (preserved verbatim — reusable, and the answer to
"don't retype the shot"):**
1. `Amara kneels pitch-side at Northstar Ground at sunrise tightening her
   boot cuff, her left side toward camera, Pulse Arc watch face toward
   camera.`
2. `Mateo Ríos prepares breakfast after training in his home Casa Ladera.
   He holds a ceramic bowl of fruit while speaking naturally toward the
   kitchen counter, caught mid–voice command rather than posing. Nearby is
   the Cross-TrainerX Orbit Home.`
3. `Leonie Falk leaps from the open side of a sleek parachuter's aircraft
   in The Leap (high-altitude skydive). Wearing Cross-TrainerX Vista Air`

### Result — strongest output of the test series, and stronger AS A SET
- All three read as one campaign: consistent palette, premium realism,
  lime accents, lockup treatment. Set coherence beat Midjourney's.
- Products landed properly for the first time: **Orbit Home** correct
  (low cylinder, warm-white mesh, brushed trim, lime ring) on a clean
  island corner; **Vista Air** panoramic smoke-black lens; **Pulse Arc**
  on wrist. Locations legible in all three (stadium roof + steep seating,
  limestone/oak kitchen with courtyard, aircraft + valley).
- Per-tool finding: long-context chat targets tolerate the full world
  package far better than terse tools — the compression fight is a
  Midjourney-specific problem, not a format problem.

### Drift
- **X-motif still renders LITERAL** (roof X, wall X, cloud X) rather than
  the canon "faint X-shaped reflection." Recurrence of the 002-C class —
  across two different tools now, so this is a phrasing problem in the
  world, not a model quirk. Candidate rewording: describe it as an
  incidental structural coincidence, never a graphic.
- **Models invent the wordmark.** GPT Image added "FIND YOUR NEXT" +
  Cross-TrainerX lockups unprompted. Canon says leave SPACE for a
  headline; it never described the mark, so the model designed one. GAP:
  registered `crosstrainerx-wordmark` ref (pending) — register the real
  asset and composite type in post rather than generating it.

### Scope requests raised by dogfooding (logged per guardrail 1, not built)
- **Wardrobe as its own entity type**, for remixability ("Leonie at Casa
  Ladera wearing a watch"). Assessment: remix ALREADY works — the shot
  field resolves entities across all three collections independently, so
  that exact shot composes today. Shared wearables that recur or carry
  canon are already expressible as `object` + `role: prop` (the object
  entry test IS the atomic threshold); per-shot outfit changes are
  `wardrobe.variants`. Recommend keeping deferred.
- **Scenes/shots as managed variables** — real friction: three shot lines
  hand-typed, dozens for a real campaign. But "story beats" is the
  named-in-guardrail-1 failure mode and doesn't move the week-8 gate.
  Recommend deferring; if FEEDBACK demands it, the shape is a flat
  `shots.yaml` (shot line + entities named), explicitly non-canonical —
  no beats, no sequence, no relationships, NOT a scene entity type.
- **Deliverable coupling in entity prose** (James: should a character
  ever say "Hero of Image 1… paired with northstar-ground"?). Correct
  catch, my authoring error — fixed across all 9 entity files, and the
  principle is now in SPEC: entity files describe what is ALWAYS true;
  deliverable specifics belong in the shot line.

---

## 2026-07-29 — 007 · Activity-owned wardrobe, X-motif control, brand marks

### Wardrobe, take two — James's better example wins the argument
"The skydiver's outfit would only be associated with a character under
certain conditions. If you change who skydives, you still need continuity
of what ANYONE in this world wears skydiving." Correct, and the first
counter-argument (use `wardrobe.variants`) fails here: it would duplicate
the rig across three characters and require three edits to change it.
**But no new entity type is needed** — SPEC's object definition already
covers "anything characters WEAR", and the rig passes the entry test
(recurs + has canon).
- Created `objects/skydive-rig.md` (`role: prop`): the configuration
  belongs to the activity, so recasting the leap keeps continuity.
- **Bug this exposed**: Leonie's `wardrobe.default` WAS the flight suit —
  she was permanently dressed to jump. Default is now her ordinary
  performance-lifestyle apparel; the freefall variant POINTS at the
  shared object instead of restating it (references over duplication,
  applied to wardrobe).
- SPEC now states the rule: activity-owned configurations are `role: prop`
  objects, referenced from `wardrobe.variants`, never in `default`;
  per-person outfits stay character attributes. Wardrobe-as-its-own-type
  remains deferred — with a concrete reason, not a hand-wave.

### X-motif — controllable, but only partly at generation
Diagnosis: the canon token "X-shaped light motif" reads to models as
*make an X graphic*, so both MJ and GPT Image produced signage and decals.
Fixes:
- World canon rewritten to describe the physical CAUSE, not the shape:
  "an incidental X … formed where two real elements cross — light,
  shadow, reflection, structural members, vapour trails … never painted,
  printed, projected, or signage."
- style.md `never`: painted/decal/projected X shapes.
- Honest limit: "subtle motif in every frame" is inherently unreliable in
  prompt-only tools — subtlety is what diffusion amplifies. Treat it like
  chirality: bias it in the prompt, GUARANTEE it at selection/post. The
  location-level canon lines were already well-phrased (roof reflection,
  floor shadows, crossing trails) and those read better than the
  world-level abstraction — evidence that concrete beats conceptual.

### Verified: recast + remix both compose correctly
- Recast test — `"Amara Vale leaps from the aircraft door in The Leap
  wearing the skydive rig and Vista Air"` resolves Amara + Skydive rig +
  Vista Air + The Leap, with the rig's continuity canon shipping and
  Leonie correctly absent. Activity-owned wardrobe works as intended.
- Remix test — `"Leonie Falk at Casa Ladera wearing the Pulse Arc"`
  resolves exactly those three. The original remix scenario needed no
  format change at all.
- **New friction, honest**: that 4-entity recast composes to **487 words**
  for Midjourney. Canon is budget-exempt by design (it must survive), so
  canon-rich shots balloon past what MJ users will paste habitually.
  Trade-off is deliberate, not a bug — but it means per-shot entity count
  is the real lever. The copy toast now reports word count for the
  midjourney target so over-stuffed shots are visible, not silent. Watch
  whether users start trimming by hand (per tool-flows: whatever they cut
  first is what compression should drop first).

### Brand marks — references, not descriptions (scope answer)
Question: does the wordmark belong in a design-system file / DESIGN.md /
external system? Scope answer: the v0.1 mechanism is already right —
`references.yaml` records WHERE the asset lives and never describes its
glyphs; canon reserves the negative space; type is composited in post.
Added a style `never` for generated wordmarks/headline type. A DESIGN.md
brand-token import stays deferred V2 interop — building it now would drag
a design-system dependency into a context format before the gate.

---

## 2026-07-29 — 008 · D05 film-production mental model, reconciled

James probed whether the categories match filmmakers' mental models, via
a draft (D05) proposing four new top-level categories — `wardrobe/`,
`audio.md`, `factions/`, `vfx-gfx/` — plus `role: set-dressing`, on the
grounds that physical production groups elements by **department
ownership**.

### The reconciliation
Department boundaries divide **labor and budget**. Entity types here
divide **what a model must keep consistent**. Those are different axes,
and conflating them is how the taxonomy grows: a generative model sees a
costume and a prop identically, so a Costume/Props split buys a familiar
label and no compositional difference.

Adopted a governing rule instead (now in SPEC): **a category earns its
place when a compose target consumes it** — when leaving it out
measurably degrades an output. Evidence for the rule from our own logs:
across runs 001–005, every drift traced to phrasing and packing
(missing `medium`, canon placement, trimmed location facts, chirality,
logo negation). **None traced to insufficient categorization.**

### Per-proposal verdicts
- `wardrobe/` — NO. Already works as `objects` + `role: prop`; the
  skydive rig proves it, including recasting. Real problem underneath was
  discoverability, fixed below.
- `audio.md` — DEFER with a clear "when": no v0.1 target consumes sound
  (all four targets are image tools). It earns in when a video/audio
  target exists. Good idea, wrong week.
- `factions/lore` — NO, and the most dangerous of the five: it is a
  relationship container (guardrail 1 names relationships and scopes),
  and it reaches an image only *through* wardrobe, insignia, and
  locations, which are already entities.
- `vfx-gfx/` — NO, already covered: in-universe screen graphics are the
  `interface:` field of the object that displays them (the Pulse Arc's
  readiness ring is authored this way today). Better placement, too —
  the UI belongs to the device.
- `role: set-dressing` — DEFER, but the likeliest future addition. It is
  a value, not a type, and it has a real compositional meaning (drops
  first under budget). Needs evidence of a world where props and dressing
  must be trimmed separately; the entry test already excludes one-off
  scene items.

### The real question underneath, and the fix
"How does a user or AI know to define wardrobe as an object?" —
discoverability, not taxonomy. Three fixes, all inside v0.1:
1. SPEC now states a three-question decision rule (person-specific →
   `wardrobe:`; activity-owned/recurring/canon-bearing → `objects` +
   `role: prop`; one-off → prompt text).
2. The primer (`exporters/spec-prompt.md`) teaches the same rule, so
   external users get it without the repo.
3. The viewer's Wardrobe empty state and its starter prompt now say it
   at the moment of authoring — which answers "should we signal it in the
   character file itself": the signal belongs where the user is looking.

Also fixed: SPEC still instructed "reference it from a character's
`wardrobe.variants`", contradicting the pointer we had just removed from
Leonie. Corrected — no character file points at a shared object.

---

## 2026-07-29 — 009 · Gender was never in the world (added `presentation`)

James asked how a model knows a character's gender. Audited: **no
character had any gender signal in frontmatter** — no field, no pronouns.
Pronouns existed only in prose (1 "her" for Amara, 1 "his" for Mateo),
and prose ships to CHAT TARGETS ONLY. So every Midjourney run in this log
carried zero gender information from the world. What the model actually
used:
1. **Name priors** — Amara / Mateo / Leonie carry strong training
   associations.
2. **Pronouns James happened to type in the shot line** ("her boot cuff").
3. **An incidental secondary characteristic** — Mateo's beard rides in
   `physical.hair`, so he alone had a shipped cue. Luck, not design.

Three of four are accidental. Predictable failure modes: invented or
gender-ambiguous names (a core audience — fantasy/sci-fi worlds), shot
lines without pronouns, non-Western names where priors are unreliable,
and any deliberately androgynous or in-disguise presentation.

**This is a re-explain in disguise**, which is the metric PLAN tracks: if
you must type "a woman" into every shot line to hold it stable, the world
should own it instead.

Passes the earning test (SPEC): an image target CONSUMES this directly,
unlike deferred categories that reach an image only indirectly.

### Fix — one optional field, no new type
`physical.presentation:` — describes what is RENDERED, not identity.
Descriptive values ("woman", "man", "androgynous", "masculine-presenting")
keep androgynous / non-binary / in-disguise cases expressible, which an
identity label would flatten. Applied to all four example characters;
documented in SPEC, the primer, and the viewer's Physical empty-state +
starter prompt.

Verified with a deliberately pronoun-free shot line: composes as
"Amara Vale: woman, 27, tall, powerfully athletic…" — previously the
prompt contained no gender word at all.

Note: the CHAT side already worked and needed nothing — prose ships to
chat and carries pronouns naturally. Only the image path was blind, so
one field was the whole fix.

---

## 2026-07-29 — 010 · Second onboarding path: one-pass extraction

Friction (James, first ChatGPT test of `spec-prompt.md`): the interview
primer is thorough but slow — a lot of back-and-forth before you have
anything on the page. And many real users arrive with material already
written (script, brief, treatment, brand guide), so an interview asks them
to re-type what they already have.

Fix: `exporters/extract-prompt.md` — paste it, drop your material below it,
and one best-effort pass returns a full `.world/` draft with every
inference tagged `# inferred` and the deliverable-specific moments split
into a "Suggested shots (not canon)" list. This is exactly how the
Cross-TrainerX world was built from the D01 brief — now packaged for anyone.

Two entry modes now: **interview** (blank page → spec-prompt.md) and
**extract** (existing material → extract-prompt.md). README "Start here"
presents both; the primers cross-link each other.

Design note: the two primers share the format+rules block verbatim (also
in SPEC), so it now lives in three places. Accepted for self-containment —
each primer must work as a single paste. The real dedup is `worldmd spec`
generating both from SPEC once Node exists; deferred, not forgotten.

---

## 2026-07-29 — 011 · Validated + conformed a primer-built world (Death of the Hired Man)

James built a full world by pasting the poem + notes into a chat, then
asked me to validate it before sharing. First real "did the AI follow the
structure" test. Ran a structural lint (built in-session, ruby — it IS
`worldmd lint` made real) and conformed the result.

### The headline finding
**The AI wrote a superb "story bible" but treated frontmatter as rich
description, not a machine contract.** It nailed the FOLDER (right files,
right folders, canon + prose already spec-perfect) and consistently
overrode FIELD CONTRACTS with its own richer schema:
- `role:` as a nested map (`{occupation, narrative}` / `{category,
  narrative}`) on every character AND object — instead of the controlled
  word. `role` has a compositional job (`hero` vs `prop` drives budget),
  so a map there breaks compose, not just style.
- `references.yaml` wrapped every entry under a top-level `references:`
  key with doc-level `version:`/`status:`; non-spec entry fields; `license`
  as a prose sentence. Broke the "top-level keys are the ids" convention.
- Deep bespoke frontmatter everywhere (`dramatic_structure`,
  `psychology`, `visual_motifs`, `narrative_function`, …) — harmless to
  the tools (ignored) but where drift hides.
- `physical.presentation` missing on all characters; `kind` missing on
  all locations; `medium` was the ONE contract that stuck (we hammered it
  in earlier — evidence the primer CAN pin these when explicit).
- A YAML parse error from an unquoted colon (`a single word: dead`) that
  blocked the whole file — proof the viewer alone is a poor validator
  (it would just crash), and that a lint is the right tool.

### The lesson
Folder shape is self-evident to a model; **controlled vocabularies and
conventions are not** — an eager model "improves" them. Content richness
was never the problem; contract precision was.

### Actions
- Conformed all 10 files (canon + prose kept verbatim; contract fields
  reshaped; bespoke nested frontmatter dropped — recoverable from Drive
  history). Re-lint: 0 errors. Renders + composes.
- Hardened BOTH primers: a "Field contracts — use these exact shapes"
  block (controlled values for status/format/medium/role/kind +
  presentation, the references-key convention, "rich detail goes in prose
  not invented frontmatter", quote colons); added `role:` to the entity
  example; and a self-validation step so the AI checks its own output
  against the contract before handing it over.
- The world lives in James's Drive (confidential Narraite project), not
  the repo — so it is not committed. The lint script stays in-session
  (scratchpad); `worldmd lint` is its specced Node home.
