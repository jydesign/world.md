# WORLD.md — the pasteable primer

This is the payload of `worldmd spec`: hand it to someone with no repo, no
CLI, and no particular AI vendor, and they can build a world in one
conversation. Send it as text (email, DM, gist, paste). It is deliberately
self-contained — do not require the reader to clone anything.

This primer *interviews* the reader from a blank page. If they already have
written material — a script, brief, treatment, or notes — hand them
`extract-prompt.md` instead: it drafts a world from that material in one
pass.

Everything below the line is what you send.

---

I want you to help me build a **`.world/` folder** — a portable, plain-text
description of my creative project that any AI tool can read, so I stop
re-explaining my characters, products, and locations in every prompt.

**How it works.** A world is a small folder of Markdown files. Each file has
YAML frontmatter (the exact facts a model needs) plus prose (the feel). Git
holds the history. The folder is the truth; every prompt is composed from it.

```
myproject.world/
  world.md          # premise, era, tone, canon rules
  style.md          # medium, palette, camera, lighting, NEVER rules
  characters/<id>.md
  objects/<id>.md   # hero products AND recurring props — anything worn, held, or used
  locations/<id>.md
  references.yaml   # where external truth lives (Drive, CAD, approved images)
```

**Where clothing goes.** A person's own always-true outfit lives in that
character's `wardrobe:`. Anything an *activity* owns — a flight suit anyone
who jumps would wear — or that recurs across characters becomes an object
with `role: prop`, so recasting doesn't break continuity and the
description is never duplicated. One-off looks for a single shot are just
prompt text. (Costume isn't its own folder here: a generative model treats
a costume and a prop identically, so `role:` carries the distinction.)

Every entity file needs `id`, `type`, `name`, `version`, `status`
(`draft | in-iteration | approved | deprecated`), and may add `canon:` —
hard rules that must never break. Example:

```markdown
---
id: mara
type: character
name: Mara Voss
version: 3
status: approved
role: protagonist
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

Mara moves like someone who trusts machinery more than people — unhurried,
exact, hands always finding a rail or a lever.
```

**Field contracts — use these exact shapes; do not enrich them.** Frontmatter
is a machine contract, not the place for rich description (that goes in the
prose). Several fields are *controlled values* — one exact word, never a phrase
or a nested map:
- `status`: `draft | in-iteration | approved | deprecated`
- `world.md` `format`: `film | campaign | series | game | book`
- `style.md` `medium`: `photograph | 3d-render | illustration | anime`
- object `role`: `hero | prop` — governs prompt budget, so it MUST be one of
  these two words, not a description
- character `role`: `protagonist | supporting | background`
- character `physical.presentation`: what an image should render —
  `woman | man | androgynous`, etc.
- location `kind`: `real | fictional | real-modified`
Everything else the story needs goes in the prose, not in invented nested
frontmatter — tools ignore extra keys, and that is exactly where structure
silently drifts. Quote any value containing a colon (`ending: "…a single word:
dead"`) or the file will not parse.

**Five rules that make this work** (learned the hard way — please follow them):

1. **`style.md` must set `medium:`** — `photograph | 3d-render | illustration
   | anime`. Put it first in every prompt. Without it, image tools default to
   their house style and you get cartoons.
2. **Entity files describe what is ALWAYS true.** Which image something
   appears in, its framing, its action — that goes in the shot line, never in
   the world. Entities are reusable atoms; the shot is the composition.
3. **Keep canon next to the thing it governs**, and put it early in a prompt.
   Trailing canon gets ignored.
4. **Phrase positively, not negatively.** "Plain unbranded top" beats "no
   logos." Negation is weak in image models. Describe physical reality: "a
   thin pale healed scar — a small break in the brow hair," not "a scar."
5. **Some rules can't be won at generation** — left/right sides, subtle
   recurring motifs, brand typography. Write them as canon anyway: canon is
   *acceptance criteria*, so off-canon outputs become objectively cullable,
   and you enforce the rest with reference images and post work.

**The world never stores media.** `references.yaml` records *where* truth
lives — a Drive link, a CAD export, an approved reference image URL. Its
**top-level keys are the reference ids** (entities cite them as
`references.yaml#<id>`); do not wrap entries under a `references:` key or add a
document-level `version:`/`status:`. Each entry: `kind`, `source`, `url` or
`path`, `current`, `approved`, optional `license` and `note`. Never copy the
asset in.

**How you use it.** Compose per shot, not per world: take the style, the
world canon, and *only* the entities your shot names, then add one line of
shot direction. For terse tools (Midjourney) put medium and style first and
merge all `never:` lists into `--no`. For image-generating chats (ChatGPT,
Gemini, Ideogram) paste the whole world once per session and brief shots in
plain language.

---

**Now, please do this:**

1. Ask me what I'm making — the format (film, campaign, series, game, book),
   the era, the tone, and any rules that must never break.
2. Ask about my visual style: medium, 4–6 palette colors, camera/lens
   language, lighting, and what should never appear.
3. Ask me for one character, one object, and one location to start. Just one
   each — don't try to map my whole project.
4. Then write the actual files as Markdown I can save, following the shape
   above. Use my words, not stock phrasing.
5. Tell me what's still empty and worth filling next.

Ask your questions a few at a time, not all at once. If I give you a brief or
a script, extract the durable facts into entity files and leave the
shot-specific direction out.

**Validate before you show me a file.** Check each one and fix or flag what
fails: required fields present and `status` valid; `style.md` has a `medium`;
every object has `role: hero|prop`; every character has a `role` and a
`physical.presentation`; every location has a `kind`; all controlled values are
single words, not phrases or maps; `references.yaml` top-level keys are the ids
and every `refs:` resolves to one; no unquoted colons in values; and no
deliverable-specific detail ("Image 1", "paired with…") is sitting in an entity
file. Report anything you couldn't satisfy.
