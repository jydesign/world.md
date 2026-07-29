# .world format — v0.1 draft

A `.world/` folder is a human-editable, git-versioned description of a
creative project's persistent context. It owns knowledge, not media.

## Folder structure

```
myproject.world/
  world.md          # premise, tone, era, hard rules (canon)
  style.md          # visual language, palette, lens, negative rules
  characters/<id>.md
  objects/<id>.md   # hero products AND recurring props
  locations/<id>.md
  references.yaml   # registry of external truth sources
```

Frontmatter is the machine-readable contract; prose is the rich
description sent to AI tools. Required fields for every entity:
`id`, `type`, `name`, `version`, `status`
(status: draft | in-iteration | approved | deprecated).

## world.md
Frontmatter: `name`, `format` (film|campaign|series|game|book), `era`,
`status`, `canon:` (rules that must never be violated anywhere).
Optional frontmatter: `tone`, `audience` (one short line each — the
viewer renders them as fields).
Prose: premise (2–3 paragraphs), themes. Max 2 pages.

## style.md
Frontmatter:
- `palette:` list of {name, hex, use}
- `camera:` {lens, framing, movement}
- `lighting:` {quality, direction, time_bias}
- `materials:` recurring textures/finishes
- `grade:` film stock / LUT feel
- `mood:` 5–8 keywords
- `never:` negative visual rules
Prose: one-page visual essay.

## Character (characters/<id>.md)
```yaml
---
id: mara
type: character
name: Mara Voss
aliases: [Mara]
version: 3
status: approved
role: protagonist            # protagonist | supporting | background
physical:
  age: 34
  build: lean, 5'9"
  hair: black, cropped, silver streak left temple
  eyes: gray
  marks: thin scar above right eyebrow
wardrobe:
  default: charcoal field jacket, worn boots
  variants:
    formal: midnight-blue suit, no tie
voice: low, deliberate, dry humor
portrayal:                    # only when a real person is involved
  actor: null
  ai_generation_consent: n/a
refs: [references.yaml#mara-headshot]
canon:
  - "Silver streak is ALWAYS visible; never fully black hair"
  - "Never wears the color red"
relationships:                # plain strings in v0.1 — no graph
  - "Sister of Elias (estranged)"
---
Prose: personality, relevant backstory, movement, default expressions.
```
`physical` + `wardrobe.default` survive prompt compression; `canon`
always survives; personality prose ships to chat target only.

## Object (objects/<id>.md)
One type for anything characters wear, hold, or use. Required extra
field `role:` — governance level, not kind:
- `role: hero` — flagship product treatment: `form:` {silhouette,
  scale, materials, colorways: [{name, hex}], key_features},
  `interface:` (visible screen/controls/lights), `placement:` ("worn
  on left wrist, face toward camera"), CAD/render `refs`, strict
  `version` bumping ("crown on the LEFT as of v19"), `never:`.
- `role: prop` — lighter contract: prose description, `canon` if it
  has identity rules ("Mara's mug: chipped blue enamel, always in her
  left hand"), refs optional, version defaults to 1.

Entry test — an object only earns a file if it recurs across outputs
OR has a canon rule. One-off scene items are prompt text, not world
context.

## Location (locations/<id>.md)
Frontmatter: `kind` (real|fictional|real-modified), `geography`,
`architecture`,
- `atmosphere:` {weather, light, sound, season}
- `subareas:` named spots as strings ("the pier"), not entities
- `restrictions:` legal/licensing notes for real places
- `refs`, `canon`, `never`

## references.yaml
Each entry:
```yaml
aurawatch-cad:
  kind: cad-export            # image|cad-export|video|doc|voice
  source: google-drive        # getty|drive|dropbox|local|dam
  url: https://...
  current: v19
  license: {owner: Client, use: "EU media only", expiry: 2027-01-01}
  approved: true
  note: "Check with ID team before hero assets"
```
The world stores this record, never the media.

## Precedence & compression
- Entity `canon` > `style.md` > `world.md` prose.
- All `never:` lists merge and ALWAYS survive compression.
- `prompt` target packs until budget: name → version → canon →
  physical/form → wardrobe/colorway → style essentials → merged nevers.
- Hero objects outrank props in the budget; props drop first.
- Deprecated entities excluded unless explicitly requested.

## Context packages
`compose_context(entities, target)` — targets are per-tool profiles, not
one generic block. Each profile defines a token budget, a phrasing style,
and how references are handled.

v0.1 profiles:
- `chat` — world.md summary + style.md + full entity files, one block.
  Generic long-context chat (Claude, Gemini, etc.); the MCP default.
- `gpt-image` — long-context chat profile: instruction preamble + full
  world; load once per session, brief shots conversationally after.
- `midjourney` — terse block, the hardest compression case: canon +
  physical/form facts as comma descriptors, style essentials, merged
  `never` lists emitted as `--no`.
- `nano-banana` — edit-instruction phrasing for canon-preserving edits
  ("change X; everything else identical"). CLI/MCP only.
- `flux` — programmatic output (JSON) for API/pipeline use: text block +
  approved reference paths. CLI/MCP only.
- `prompt` — generic ~150-word compressed fallback.

The viewer's copy buttons implement the paste profiles (chat, gpt-image,
midjourney, prompt); edit/pipeline profiles ship with the CLI and server.

References must be attachable, not just linkable: compose can optionally
collect approved reference files to pass alongside text for
multi-reference tools (FLUX, Nano Banana). Interface defined in v0.1;
implementation minimal.

Out of scope pre-gate: Firefly, Ideogram, Recraft, self-hosted SD
profiles. Imagen 4 is deprecated — never target it.

## Tooling — `worldmd` CLI (v0.1)
- `worldmd serve <world>` — serve the generated viewer on localhost
  with live reload as files change.
- `worldmd lint <world>` — validate frontmatter, flag broken refs and
  expired/unapproved licenses.
- `worldmd spec` — print this format spec for pasting into any AI chat,
  so non-MCP tools can author valid world files.
(Vendor-neutral by construction — see CLAUDE.md guardrail 6.)

## Deferred (v2 candidates only if FEEDBACK.md demands)
Wardrobe as entities; structured relationships; scenes/story beats;
timelines; per-entity permissions.
- `worldmd diff` — entity-level changes between two git states; the
  seed of the V2 world-diff / impact analyzer.
- Compact single-file `WORLD.md` that tooling explodes into a `.world/`
  folder. Deferred: the folder stays the single source of truth for
  v0.1, and the pasteable whole-world block is already `compose_context`
  target `chat`. (See PLAN.md decision log.)
- `style.md` importing brand tokens from a DESIGN.md file (interop only).
