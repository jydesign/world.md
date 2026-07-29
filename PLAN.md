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
- Dogfood test protocol (the gate evidence): the same shot brief run in
  each of the 4 target tools (GPT Image, Midjourney, Nano Banana, FLUX),
  with and without the world context package; count canon violations per
  10 generations. "Drift with vs. without" is the headline metric — one
  number per tool per week, for the gate and the eventual README.
  Per-tool delivery flows: tool-flows.html.

## Weeks 3–5 — Server + exporters
- MCP server (read-only, 4 tools) per CLAUDE.md scope.
- `prompt` exporter with copy-to-clipboard path.
- `worldmd` CLI: `serve` (localhost viewer + live reload), `lint`
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
  - `worldmd diff` — entity-level changes between two git states; the
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
- 2026-07-28: Renamed the project `worldfile` → `world.md` (deliberate,
  DESIGN.md-style); `world.md` is now the FROZEN working name. The CLI /
  npm package is `worldmd` (dot-free, so the command isn't read as a
  file); the `.world/` format, the per-world `world.md` file, and the repo
  stay `world.md`.
- 2026-07-28: Single-file `WORLD.md` compact form → DEFERRED to V2. The
  `.world/` folder stays the single source of truth; the pasteable
  whole-world block is already `compose_context` target `chat`.
- 2026-07-28: `worldmd diff` → V2 (impact-analyzer seed), not built in
  v0.1. `lint` + `spec` ship in v0.1; diff waits for a passed gate.
- 2026-07-29: compose targets are per-tool profiles — gpt-image,
  midjourney, nano-banana, flux + generic `prompt` fallback (see
  SPEC.md). Scope cut with them: no Firefly/Ideogram/Recraft/SD-self-host
  profiles pre-gate; Imagen 4 never. The viewer ships paste profiles
  only; edit/pipeline profiles belong to the CLI/server.
- 2026-07-29: the Nano Banana edit flow's "diff becomes the edit prompt"
  step is conversational in v0.1 (Claude reads the git diff and writes
  the edit instruction); `worldmd diff` itself stays V2 per the decision
  above.
