# 8-week plan and gate

Start date: 2026-07-28  →  **THE GATE: 2026-09-22** (start + 8 weeks)

**Commercial thesis** (so there's a crisp answer if asked, and a guardrail
against building it early): the format, MCP server, composer, and viewer are
free forever and vendor-neutral. Potential future revenue is hosted sync and
team governance — a paid layer ON TOP of a free, portable core. Do not build
any of that until post-gate.

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
  A/B'd three ways: (a) no world context, (b) whole-world package paste,
  (c) shot-driven compose (`worldmd shoot` / the viewer shot field).
  Count medium adherence + canon violations per 10 generations.
  "Drift with vs. without" is the headline metric — one number per tool
  per week, for the gate and the eventual README. For Midjourney also
  A/B `--style raw` on/off before hardcoding it into the target.
  Per-tool delivery flows: tool-flows.html.

## Weeks 3–5 — Server + exporters
- MCP server (read-only, 4 tools) per CLAUDE.md scope.
- `prompt` exporter with copy-to-clipboard path.
- `worldmd` CLI: `serve` (localhost viewer + live reload), `lint`
  (frontmatter, broken refs, expired licenses), `spec` (print the format
  for pasting into any AI chat).
- Publish the generated viewer via GitHub Pages CI (zero-cost sharing).
- Repo goes PUBLIC (2026-07-31, superseding the 2026-07-29 private-through-
  gate call). Distribution is still the spec as text — send
  `exporters/spec-prompt.md` or `extract-prompt.md`, both self-contained —
  but a public repo adds discoverability, which helps rather than hinders
  the gate.

## Weeks 5–8 — Five external users
- Targets: AI film/video Discords (Runway, Midjourney, ComfyUI),
  r/aivideo, writing/worldbuilding communities, plus personal agency
  and brand contacts.
- Ask each to put THEIR project into the format and use it ~1 week.
  Do not demo; observe. Hand them `exporters/spec-prompt.md` and nothing
  else — if they need you to explain it, that is the finding.
- One conversation each, notes verbatim into FEEDBACK.md.
- TIMING RISK (named 2026-07-29): the gate needs ≥2 people on a SECOND
  project, so first-project use must finish well before 2026-09-22.
  Start recruiting in week 1–2, not week 5.

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
- 2026-07-29 (from FEEDBACK 001, first MJ test): `medium:` is required
  in style.md and leads every prompt target. Shot-driven compose
  (`worldmd shoot` + viewer shot field) with DETERMINISTIC entity
  resolution is the per-shot path; LLM-based context selection is not
  built pre-gate — the chat targets already are the intelligent path.
- 2026-07-29: Repo stays PRIVATE through the gate — the Cross-TrainerX
  world derives from a confidential project and FEEDBACK.md is a raw
  internal log. Adoption is the spec spreading as text (guardrail 4) via
  `exporters/spec-prompt.md`; individual users get collaborator access if
  they want the worked examples. Revisit only at the gate.
  **SUPERSEDED 2026-07-31 — repo goes PUBLIC.** Three reasons the original
  no longer holds: (a) the confidentiality concern was overstated —
  Narraite is a public site, the Cross-TrainerX world is self-contained
  fiction that never names it, and the one Drive-hosted world (Death of
  the Hired Man) was never in the repo, since `*-viewer.html` is
  gitignored; (b) the repo is also a portfolio artifact while James is
  applying to roles, which the private call didn't weigh; (c) public adds
  discoverability, which helps the gate rather than hindering it — private
  was only ever the safer option, never the strategically better one.
  Noted for the record: the original entry's "through the gate / revisit
  only at the gate" rigidity was AI-authored framing around a looser user
  choice, and timing/gates are James's to move.
- 2026-07-29 (FEEDBACK 003): `--style raw` validated 3/3 → emitted by
  the midjourney target. Left/right canon is NOT claimed at generation
  (prompt-only tools are chirality-weak); it is enforced at shot-line
  staging, selection (canon checklist), reference conditioning, CAD
  insertion, and the never-mirror rule.
- 2026-08-09 (landscape note — WorkOS `auth.md`,
  github.com/workos/auth.md): REFERENCE only, and NOT a comparable project.
  It is a protocol for agents to authenticate to services on a user's
  behalf; a service hosts an AUTH.md telling agents how to authenticate
  with it. Zero functional overlap with visual canon — nothing to adopt,
  nothing to compete with, no interop case.
  What it does confirm is a BRANDING/convention trend, now three
  independent instances: DESIGN.md (design systems for coding agents),
  AUTH.md (authentication for agents), WORLD.md (creative canon for
  generative models). `SOMETHING.md` as a human-editable, machine-readable
  contract an agent reads is a real emerging convention, not a one-off
  analogy. Useful for positioning; changes nothing about scope.
  One structural difference worth remembering rather than copying:
  auth.md is SERVICE-hosted and agent-pulled (the service tells agents how
  to deal with it), while WORLD.md is USER-owned and pushed to any tool
  (the author tells tools how to deal with their work). That inversion is
  the ownership thesis, not a gap — cf. FEEDBACK 017, where an external
  reader independently described the value as "retaining ownership of your
  AI source files." Do NOT adapt hosted discovery: the MCP server is
  already the unbuilt "pull" version of that idea, and anything beyond it
  is post-gate at best.
- 2026-07-29 (positioning research — NCP / Narrative Context Protocol,
  USC ETC / Narrative First, the open JSON edition of the Dramatica
  storyform): REFERENCE, do not adopt or compete. NCP models
  thematic/structural authorial intent (Dynamics, Storypoints,
  Storybeats, the 64-element grid) — it keeps a story's MEANING
  coherent. WORLD.md keeps a world's LOOK coherent across tools
  (entities, canon, per-tool composition). Different question, near-zero
  overlap. Do NOT import Dramatica structure into the scenes/shots model
  — it's heavy, opinionated, trademarked (USC/Write Bros), and violates
  the drop-a-manuscript-and-go ethos; keep shots light (entity ids, beat,
  register, camera intent) exactly as already specced (FEEDBACK 012).
  Deferred interop: an optional NCP beat pointer on a shot — a pointer,
  never a dependency (recorded in SPEC's Deferred list). One pattern
  worth REFERENCING, not the schema: NCP's token-aware LAYERED context
  (spoon-feed only what matters) independently validates our own
  per-target compose + compression-survival precedence (canon/nevers
  always ship; facts/flavor/atmosphere are the droppable pool) — an
  approach already built here before encountering NCP, so this is
  convergent validation, not borrowing. No Dramatica vocabulary or
  content adopted. (Wording note: this line and commit 52a29c1 first read
  "worth stealing" — a phrase carried over from an AI-assisted summary.
  Corrected here for accuracy, since nothing was taken; the original
  commit message is left unrewritten, per this project's
  verbatim-beats-tidy norm.)
