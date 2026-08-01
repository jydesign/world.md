# world.md

**A format for describing a creative world to generative AI.**

world.md gives image, video, and chat models a persistent, structured
understanding of your world — its characters, objects, locations, style,
and the rules that must never break — so you stop re-explaining it in
every prompt, and your outputs stop drifting.

## The problem

Generative AI is brilliant at the first image and hopeless at the fortieth.
Every session starts from amnesia. You describe your protagonist for the
hundredth time, the model forgets her scar anyway, and the product in shot
three is last month's design. The knowledge exists — scattered across
prompts, docs, and your head. Nothing owns it.

The hard part was never making the image. It's keeping the world consistent
behind all of them.

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
  style.md            # medium, palette, camera, grade, NEVER rules
  characters/
    mara.md
  objects/
    aurawatch.md      # role: hero — flagship product treatment
    tin-mug.md        # role: prop  — anything worn, held, or used
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
  presentation: woman
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

## Start here

**Nothing to install.** The format is text, and the fastest way in is to
let an AI build your world with you.

1. **Let an AI build your world with you.** Two ways in, both self-contained
   — paste one into Claude, ChatGPT, or Gemini:
   - **Starting fresh?** [`exporters/spec-prompt.md`](exporters/spec-prompt.md)
     interviews you about your project and writes the files as you answer.
   - **Already have a script, brief, or notes?**
     [`exporters/extract-prompt.md`](exporters/extract-prompt.md) — paste it,
     then drop your material below it, and it drafts as much of the world as
     it can in one pass, flagging what it guessed.

   (If you were sent this README on its own, ask for whichever file fits —
   it's the only one you need to start.)
2. **Save what it writes** as a `<yourproject>.world/` folder and put it in
   a git repo. The folder is the truth; git is the history.
3. **Compose per shot, not per world.** Take the style, the world canon,
   and *only* the entities your shot needs — then add one line of shot
   direction: *"Mara at Pier 7 at blue hour, tightening a winch."*
4. **When something drifts, fix the world, not the prompt.** Add or tighten
   a canon line, commit it — and every future prompt in every tool inherits
   the fix.

That last step is the whole point. The loop is: generate → spot the drift →
tell your AI what broke → it edits the file → git records it. **The world
gets stronger with every generation you run.**

**If you have the repo and Node**, you can also render a read-only viewer
of any world folder:

```bash
npm install                                  # one dependency: js-yaml
node viewer/generate.mjs harborline.world
```

Open the generated HTML: entities render as pages with a "copy context
package" button and a shot field; every empty slot shows a copy-paste
starter prompt addressed to your AI. Empty states are the onboarding.

A `worldmd` CLI ships with the repo. `lint` is worth running on any world an
AI wrote for you — it catches contract drift the viewer renders straight past
(a stray `role:` map, a broken ref, an unquoted colon that breaks YAML):

```bash
npm install && node cli/worldmd.mjs lint      # lints every *.world here
```

```bash
worldmd lint   [<world>...]  # frontmatter, broken refs, expired licenses       [works]
worldmd spec                 # print the format primer for any AI chat          [works]
worldmd shoot "<shot description>" --target midjourney   # shot-driven compose  [planned]
worldmd serve  <world>       # localhost viewer, live reload                    [planned]
worldmd diff   HEAD~5        # entity-level change log                          [v2]
```

## Using it with AI tools

Compose targets are per-tool profiles, not one generic block — each has its
own budget, phrasing, and reference handling.

- **Chat models (Claude, ChatGPT, Gemini)** — `chat` / `gpt-image`: paste
  the whole world once per session, then brief shots in plain language.
  Long-context tools tolerate the full package comfortably. Prose ships
  here; only facts ship to image prompts.
- **Image tools (Midjourney, FLUX, Nano Banana)** — `midjourney` / `flux` /
  `nano-banana`: a tight block that leads with medium and style, carries
  each entity's facts with its canon beside them, and merges every `never:`
  rule into the negative prompt. Approved image references ride along
  automatically. *(The paste profiles — `chat`, `gpt-image`, `midjourney`,
  `prompt` — work in the viewer today; the edit and pipeline profiles ship
  with the CLI.)*
- **Coding agents (Claude Code, Cursor)** — the world is files in your repo.
  Tell the agent what changed; it edits the world; git records it.

## Five rules that make it work

Learned by generating against a real campaign and counting what broke:

1. **Set `medium:` in `style.md`** (`photograph | 3d-render | illustration |
   anime`) and put it first in every prompt. Without it, image tools fall
   back to their house style — our first run came back as cartoons.
2. **Compose per shot.** Pasting a whole world with no shot direction
   produces a group lineup of everyone in it. Name the two or three
   entities the shot needs.
3. **Entity files describe what is ALWAYS true.** Which image something
   appears in, its framing, its action — that belongs in the shot line.
   Entities are reusable atoms; the shot is the composition.
4. **Phrase positively and physically.** "Plain unbranded top" beats "no
   logos"; "a thin pale healed scar — a small break in the brow hair" beats
   "a scar." Negation is weak in image models, and vague nouns drift.
5. **Keep canon next to what it governs, early in the prompt.** Trailing
   canon gets ignored. Some rules can't be won at generation at all —
   left/right sides, subtle recurring motifs, brand type. Write them as
   canon anyway: canon is *acceptance criteria*, so off-canon outputs
   become objectively cullable, and you enforce the rest with reference
   images and post work.

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
5. **Categories earn their place.** A field or folder is added when a
   compose target consumes it — when leaving it out measurably degrades an
   output. Familiarity to a profession isn't the test; an unused category
   is onboarding tax.

## What this is not

Not an image generator, a DAM, or a prompt library. world.md sits upstream
of all of them: it's the persistent context layer your tools read from.
DESIGN.md gives coding agents a durable understanding of a design system;
world.md does the same for generative models and the worlds they render.

Not a story-theory or narrative-structure tool, either. NCP (Narrative
Context Protocol — the open edition of the Dramatica storyform) preserves a
story's *thematic* coherence: authorial intent, dynamics, story beats. world.md
preserves a world's *visual* coherence: entities, canon, and composing them
into any tool. Different questions, near-zero overlap, complementary.

## Status

`alpha`, and honestly so. What works today: the `.world/` format, the
read-only viewer generator, per-tool context composition, and `worldmd
lint` / `worldmd spec`. Not built yet: the MCP server, and the CLI's
`shoot` / `serve` / `diff`. The format will change.

world.md is a **validation instrument**, not a product. It's being tested
against one question: do a handful of people making real creative work —
short films, campaigns, series, games — put their own project into this
format and keep using it?

**If you're one of those people, the most useful thing you can do is tell
us what broke.** Where you had to re-explain something the world already
knew, what drifted anyway, what was annoying to maintain by hand. Blunt is
better than polite; "I gave up at step 2" is the most valuable sentence you
can send.

Open an issue, or reply directly to whoever shared this with you.

## License

**Code** — the viewer generator, and the CLI and MCP server as they land —
is Apache-2.0. See [LICENSE](LICENSE).

**The format itself is free.** Anyone may implement `.world` in any tool,
commercial or not, with no permission, licensing, or attribution required —
and the spec and primers here may be copied, pasted, and adapted freely
(they are designed to be pasted into a chat window). A format that isn't
free to implement isn't a format; it's a product.

## WORLD.md Viewer Example

<img width="1427" height="825" alt="world-md-viewer-example" src="https://github.com/user-attachments/assets/d010b028-3f93-44d2-8b92-082291437a85" />
