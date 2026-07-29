# world.md

**A format for describing a creative world to generative AI.**

world.md gives image, video, and chat models a persistent, structured
understanding of your world — its characters, objects, locations, style,
and the rules that must never break — so you stop re-explaining it in
every prompt, and your outputs stop drifting.

## The problem

Every AI generation session starts from amnesia. You describe your
protagonist for the hundredth time, the model forgets her scar anyway, and
the product in shot three is last month's design. The knowledge exists —
scattered across prompts, docs, and your head. Nothing owns it.

world.md makes that knowledge into files: human-editable, git-versioned,
readable by any AI tool.

## The format

A world is a small `.world/` folder of plain Markdown files — one for the
premise and canon, one for visual style, and one per character, object,
and location. Each file pairs machine-readable attributes (YAML
frontmatter — the exact facts) with human description (Markdown prose —
the feel).

```
harborline.world/
  world.md            # premise, era, canon
  style.md            # palette, camera, grade, NEVER rules
  characters/
    mara.md
  objects/
    aurawatch.md      # role: hero
    tin-mug.md        # role: prop
  locations/
    pier-7.md
  references.yaml     # where external truth lives — never the media itself
```

A single entity file (`characters/mara.md`):

```markdown
---
id: mara
type: character
name: Mara Voss
version: 3
status: approved
physical:
  age: 34
  hair: black, cropped, silver streak at left temple
  marks: thin scar above right eyebrow
wardrobe:
  default: charcoal field jacket, worn boots
canon:
  - "Silver streak is ALWAYS visible; never fully black hair"
  - "Never wears the color red"
---

Mara moves like someone who trusts machinery more than people —
unhurried, exact, hands always finding a rail or a lever...
```

A model that reads the world keeps the silver streak, the left-side crown
on the hero object, and the fog — in the first generation and the
fiftieth.

Full format: [SPEC.md](SPEC.md). *(A compact single-file form that tooling
can explode into a `.world/` folder is planned; today a world is the
folder.)*

## Getting started

The format is just text — there's nothing to install to start.

- **By hand or with an AI.** Write the files yourself, or paste the format
  spec into Claude / ChatGPT and say "help me build my world."
- **See it.** Generate a read-only viewer from any world folder (needs
  Node):

  ```bash
  node viewer/generate.mjs harborline.world
  ```

  Open the generated HTML — populated entities render; every empty slot
  shows a copy-paste starter prompt addressed to your AI.

A `worldmd` CLI is in development:

```bash
worldmd serve  <world>                          # localhost viewer, live reload   [in progress]
worldmd lint   <world>                           # frontmatter, broken refs, licenses [in progress]
worldmd compose mara aurawatch --target prompt   # compressed block for image/video   [planned]
worldmd spec                                     # print the format for any AI chat    [planned]
worldmd diff   HEAD~5                             # entity-level change log             [v2]
```

## Using it with AI tools

- **Chat models (Claude, ChatGPT, Gemini):** paste the composed context —
  or, once the server ships, serve the world over MCP. Prose ships to
  chat; only facts ship to image prompts.
- **Image & video tools (Midjourney, Runway, …):** the `prompt` target
  produces a tight block — current versions, physical facts, canon, merged
  NEVER rules. Paste it before your shot description.
- **Coding agents (Claude Code, Cursor):** the world is files in your repo.
  Tell the agent what changed; it edits the world; git records it.

## Principles

1. **Own knowledge, not media.** References point to where truth lives (a
   Drive link, a CAD export, a licensed image). The world never stores the
   asset.
2. **Canon always survives.** Rules marked `canon` are included in every
   context package at every compression level. `never` lists merge and
   always ship.
3. **Git is history.** Versions, branches, and blame come free;
   entity-level change analysis (`worldmd diff`: "aurawatch v18→v19: crown
   side changed") is on the roadmap.
4. **Vendor-neutral by design.** The format, the composer, and the viewer
   never depend on one AI vendor. Your world works everywhere, or it isn't
   worth keeping.

## What this is not

Not an image generator, a DAM, or a prompt library. world.md sits upstream
of all of them: it's the persistent context layer your tools read from.
DESIGN.md gives coding agents a durable understanding of a design system;
world.md does the same for generative models and the worlds they render.

## Status

`alpha`, and honestly so: the `.world/` format and a read-only viewer
generator work today; the MCP server and the `worldmd` CLI are in active
development; the format will change. world.md is a validation instrument —
we're looking for a handful of early users making real creative work
(short films, campaigns, series, games). If you put your project into this
format, tell us what broke: open an issue or start a discussion.

## License

Apache-2.0
