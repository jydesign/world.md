# 8-week plan and gate

Start date: ____________  (fill in — the gate date is start + 8 weeks)

## Weeks 1–3 — Hand-written dogfood
- Pick ONE real project as the test world: ____________
- Write its .world folder by hand per SPEC.md. No code yet.
- Use it immediately: paste files into Claude / Midjourney / Runway
  sessions during real creative work.
- Track in FEEDBACK.md from day one:
  - re-explains: times I re-typed context already in the world
  - drift: outputs violating canon
  - friction: what was annoying to maintain by hand

## Weeks 3–5 — Server + exporters
- MCP server (read-only, 4 tools) per CLAUDE.md scope.
- `prompt` exporter with copy-to-clipboard path.
- `worldfile` CLI: `serve` (localhost viewer + live reload), `lint`
  (frontmatter, broken refs, expired licenses), `spec` (print the format
  for pasting into any AI chat).
- Publish the generated viewer via GitHub Pages CI (zero-cost sharing).
- Open-source the repo; SPEC.md becomes the heart of the README.

## Weeks 5–8 — Five external users
- Targets: AI film/video Discords (Runway, Midjourney, ComfyUI),
  r/aivideo, writing/worldbuilding communities, plus personal agency
  and brand contacts.
- Ask each to put THEIR project into the format and use it ~1 week.
  Do not demo; observe.
- One conversation each, notes verbatim into FEEDBACK.md.

## THE GATE (pre-committed — do not move)
By week 8: do >= 2 external people use it on a SECOND project without
being prompted?

- YES -> thesis alive. V2 = change propagation ("product bumped to v20;
  which context packages / assets are stale?") grounded in git diffs
  of the world.
  V2 build paths, recorded now but NOT before the gate:
  - `worldfile diff` — entity-level changes between two git states; the
    seed of the impact analyzer above.
  - Viewer via MCP Apps (official MCP UI extension, Jan 2026): one
    codebase renders inline in Claude AND ChatGPT. Caveats: needs a
    remote/hosted server, Claude requires domain signing, ChatGPT
    support is partial. If asked to build this before the gate, push back.
  - `style.md` importing DESIGN.md brand tokens (interop only).
- NO  -> scrap on evidence. Leave the repo public as a finished
  artifact. Write nothing further.

## Standing rules
- No UI beyond the read-only viewer (see CLAUDE.md) before the gate.
  No renaming. No new strategy docs.
- Scope questions are answered by CLAUDE.md guardrails, not by memory
  of the old research corpus.

## Decisions (v0.1) — pre-committed, revisit only at the gate
- 2026-07-28: Single-file `WORLD.md` compact form → DEFERRED to V2. The
  `.world/` folder stays the single source of truth; the pasteable
  whole-world block is already `compose_context` target `chat`.
- 2026-07-28: `worldfile diff` → V2 (impact-analyzer seed), not built in
  v0.1. `lint` + `spec` ship in v0.1; diff waits for a passed gate.
