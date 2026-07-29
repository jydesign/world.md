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
