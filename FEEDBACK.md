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
