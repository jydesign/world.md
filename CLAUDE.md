# Project: world.md (working name — FROZEN, do not rename)

## What this is
An open-source spec + MCP server for portable creative-world context.
A `.world/` folder of Markdown/YAML files describes a creative project's
characters, products, locations, style, and rules. An MCP server serves
that context to AI tools (Claude, ChatGPT) and exports formatted context
packages for image/video tools (Midjourney, Runway).

Thesis being tested: persistent, structured world context measurably
reduces re-prompting and output drift for people making AI-assisted
creative work.

This is a VALIDATION INSTRUMENT, not a platform. See PLAN.md for the
8-week gate and kill criteria.

## v0.1 scope (hard caps)
- Entity types: character, object (role: hero | prop), location, style,
  rules. NO others.
- Files: plain Markdown + YAML frontmatter, versioned in git. No database.
- References point to external truth (URLs, paths, DAM links). The world
  NEVER stores media.
- MCP server is READ-ONLY: world_summary, get_entity, search_world,
  compose_context(entities, target). No write tools in v0.1.
- compose_context targets are per-tool profiles: `chat`, `gpt-image`,
  `midjourney`, `nano-banana`, `flux`, plus generic `prompt` fallback
  (see SPEC.md). No profiles beyond these before the gate.
- UI limited to the read-only viewer described below. No auth.
  No hosting. Local server + open repo only.

## Viewer (the one UI, scoped)
The viewer is a READ-ONLY generated projection of the .world/ folder —
Storybook pattern: files are truth, UI is a renderer. Rules:
- Never a database. It reads the folder; refs render by fetching source
  URLs at view time, never by storing media.
- Every entity page and the world header get a "Copy context package"
  button (compose_context with a UI handle).
- EMPTY STATES ARE THE ONBOARDING: each unfilled slot shows the shape
  of what belongs there plus a copyable starter prompt addressed to
  Claude. The structure teaches the user what to say.
- Write path stays conversational (user tells Claude -> Claude edits
  files -> git commits -> viewer re-renders). NO edit forms or CRUD
  before the week-8 gate unless FEEDBACK.md demands them by name.
- A prototype exists (world-viewer-prototype.html) showing the target
  look: paper chrome, world palette colors the accents, canon/never
  rules visually highlighted, example/empty mode toggle.
- Distribution: the viewer is generated static HTML from the folder.
  `worldmd serve` runs it on localhost with live reload while files
  change; publishing the same generated HTML via GitHub Pages (a CI
  action on the world repo) is the intended zero-cost sharing path.

## Guardrails (read these when tempted)
1. Do not add entity types, inheritance, scopes, relationships, story
   beats, or provenance chains. Prior versions of this idea died of
   taxonomy. If a real external user asks, log it in FEEDBACK.md instead.
2. Do not rename the project or the core concepts.
3. Do not write new strategy documents. Writing energy goes to README.md
   or user conversations only.
4. Ship ugly. The spec spreading as text is the adoption strategy.
5. When in doubt, ask: "does this help reach the week-8 gate faster?"
   If no, cut it.
6. Neutrality of the read path is non-negotiable. The format, the MCP
   context server, the copy-paste context package, and the viewer must
   never depend on any single AI vendor. Claude Code may be the best
   WRITE path for now; the READ paths work everywhere, because "your
   world works everywhere" is the moat.
7. Do not build monetization, accounts, hosted sync, or team features
   before the gate. Commercial thesis (PLAN.md): free forever and
   vendor-neutral core; potential future revenue is a paid layer for
   hosted sync and team governance. That is the whole answer to "what's
   the business" until post-gate.

## Repo layout (target)
- SPEC.md            — the .world format spec (doubles as README core)
- PLAN.md            — 8-week plan and gate
- FEEDBACK.md        — raw notes from dogfooding + the 5 users
- harborline.world/  — the worked example world
- viewer/            — read-only viewer generator + prototype template
- server/            — MCP server (TypeScript, @modelcontextprotocol/sdk)
- exporters/         — context-package templates per target

## Background
Distilled from a longer research corpus (Narrative Context Engine /
World Systems, 2022–2026). The durable ideas kept: own knowledge not
media; references over duplication; context package over prompt; change
propagation as the eventual V2 (a versioned format makes diffing
natural later). Everything else was deliberately cut.

External validation: Google Labs' DESIGN.md (github.com/google-labs-code/
design.md) applies the same pattern — YAML frontmatter tokens + markdown
prose, git as truth, a lint/diff/spec CLI — to design systems for coding
agents. Positioning analogy: "DESIGN.md : coding agents :: world.md :
generative models."
