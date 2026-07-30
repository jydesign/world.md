# world.md — one-pass extraction primer

Use this when you ALREADY have written material — a script, treatment,
creative brief, brand guide, character notes — and want a fast first draft
instead of an interview. Paste this whole file into Claude, ChatGPT, or
Gemini, then paste or attach your material below it. The model makes one
best-effort pass and hands back a full `.world/` folder draft, marking what
it inferred and what's still missing.

Starting from a blank page instead? Use `spec-prompt.md` — it interviews you.

Everything below the line is what you send (put your material at the very end).

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
lives — a Drive link, a CAD export, an approved reference image URL — with
`current:`, `license:`, and `approved:`. Never copy the asset in.

**How you use it.** Compose per shot, not per world: take the style, the
world canon, and *only* the entities your shot names, then add one line of
shot direction. For terse tools (Midjourney) put medium and style first and
merge all `never:` lists into `--no`. For chat tools (ChatGPT, Claude,
Gemini) paste the whole world once per session and brief shots in plain
language.

---

**Now, please do this — one best-effort pass, then we refine. Do not
interview me first; draft from the material, then tell me what's thin.**

1. **Read all of my material first.** Find the durable, reusable entities:
   the recurring characters, the products/objects, the locations, and the
   overall visual style.
2. **Separate the world from the shots.** The world is what is ALWAYS true
   (who a character is, what a product looks like). A specific image, scene,
   or shot — its framing, its action, which entities it pairs — is a
   *deliverable*, not the world. Durable facts become entity files; specific
   shots go in a separate list at the end labeled "Suggested shots (not
   canon)". This is the single most important step — briefs are usually
   organized by shot, and it is easy to bake a one-time moment into a
   character by mistake.
3. **Write the files** as Markdown code blocks, each labeled with its path:
   `world.md` (premise, era, tone, canon), `style.md` (`medium:` FIRST, then
   palette, camera, lighting, `never:`), one file per character / object /
   location, and `references.yaml` for any external asset named (CAD,
   images, brand marks) — recording only where it lives, never inventing its
   contents.
4. **Mark every inference.** If my material didn't state something you filled
   in — a palette hex, a character's `presentation`, the `medium` — tag it
   `# inferred` so I can correct it. Never invent a canon rule that my
   material doesn't support: a wrong canon rule is worse than a missing one.
5. **Apply the entry test.** Something earns its own file only if it recurs
   across the material OR carries a rule. One-off scene props are shot text,
   not entities.

Then finish with two short lists:

- **Gaps & inferences** — what you guessed, what's thin, and the 3–5
  highest-value things I should add next.
- **Suggested shots (not canon)** — the deliverable-specific moments you
  kept out of the world, phrased as ready-to-use shot lines.

Use my words wherever possible; keep entity prose to a few sentences. If my
material is a shot-by-shot brief, expect most of it to be shots — only the
durable facts become the world.

My material follows:
