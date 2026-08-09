# Early-user outreach templates

Three asks, in escalating order. **Start with A, always.**

The ladder exists because of FEEDBACK 018: four people were sent the
week-long ask cold, four said some version of "this is amazing," and none
of them tried it. The diagnosis is that a `.world` file is worthless until
you have the intent to generate images with it — so asking someone to
*author* one before they have felt the payoff is backwards. A gives them
the payoff first, using a world that already exists.

- **A — borrow a world.** 5 min, zero authoring. Default first touch.
- **B — build your own.** For anyone who liked A.
- **C — use it for a week on a real project.** For a known target user, or
  anyone still around after B.

Try page: https://jydesign.github.io/world.md/
Repo: https://github.com/jydesign/world.md

---

## A — borrow a world (default, first touch)

Subject: 5 minutes? I want to know if this lands

Hi [name],

[One personal hook — e.g. "You've mentioned how much time you burn
re-describing the same characters to Midjourney. This is the thing I've
been building for exactly that."]

I built a plain-text format for describing a creative world — characters,
products, locations, style — so AI tools stop making you re-explain it in
every prompt.

Rather than explain it, there are two finished worlds here with shots
already written:

https://jydesign.github.io/world.md/

Pick one, click a shot, hit copy, paste it into ChatGPT or whatever image
tool you like. Then do a second shot from the same world. That's it —
nothing to install, no files to make.

The thing to watch for is that the character stays itself in a scene
nobody wrote in advance. If that lands, I'd love to know. If it doesn't, I
*really* want to know — "I didn't get it" is the most useful thing you
could send me.

[James]

---

## B — build your own (for anyone who liked A)

Subject: want to make one for your own project?

Hi [name],

Glad that landed. If you want to point it at something of your own, it
takes about ten minutes and an AI chat does the writing:

Paste `exporters/spec-prompt.md` into ChatGPT or Claude and it interviews
you and writes the files. If you already have a script, brief, or notes,
use `extract-prompt.md` instead — drop your material in and it drafts the
whole world in one pass, flagging what it guessed.

Both are here: https://github.com/jydesign/world.md/tree/main/exporters

Then run a couple of shots the same way you did with mine. What I'm after
is where it fell short: what it failed to ask, what you had to fix by
hand, what felt like busywork.

[James]

---

## C — the week-long ask (for a known target user)

Subject: a rough thing I built — would you kick the tires?

Hi [name],

[One personal hook.]

It's called WORLD.md: a plain-text way to write down a project's
characters, products, locations, and style once, so AI tools stop making
you re-explain them every prompt. It's early and rough, and honestly I'm
trying to find out whether it's useful to anyone but me.

Start here: https://github.com/jydesign/world.md — the README is a ~5 min
read. Then paste `exporters/spec-prompt.md` into Claude or ChatGPT and
it'll interview you and build your world with you.

The ask: take one real project you're actively working on — not a test —
put it into the format, and use it for a week the way you normally
generate. Then tell me, bluntly, where it fell down: where you had to
re-explain something it should've known, what drifted anyway, where you
gave up. "I quit at step 2" is genuinely the most useful thing you can
send me.

No rush and no polish expected — thank you for taking a look.

[James]

---

## Notes (do not send these)

- **Never open with C.** That is the mistake FEEDBACK 018 recorded. A
  week-long commitment reads as a favor and gets warm encouragement instead
  of a trial. Encouragement from friends is the most dangerous feedback a
  validation instrument can collect — it feels like progress and means
  nothing.
- **A works because it inverts the funnel.** Experience, then comprehension,
  then authoring — not the other way round. They feel the payoff using
  somebody else's world and learn nothing about the format, which is the
  point.
- **Pre-test every shot you point someone at.** The shots on the try page
  are ones James ran himself. If a first-ever attempt returns a moderation
  block or a bad frame, the demo does not merely fail — it discredits the
  idea. See FEEDBACK 014: Midjourney refused a prompt until the merged
  `never:` dump was removed from `--no`.
- **Steer first-timers to chat tools** (ChatGPT / Gemini / Claude). They
  tolerate the full package and have gentler moderation. Midjourney is the
  better demo for MJ natives, but it needs the terser target.
- **C asks for ONE project, not "and then try another."** The gate is
  whether >=2 people reach for it on a SECOND project *unprompted*.
  Mentioning a second project contaminates the exact signal being measured.
- **When someone gets stuck, resist helping — record where they stuck.**
  Per PLAN: if they need you to explain it, that IS the finding. Every
  rescue erases a data point. Capture the friction verbatim in FEEDBACK.md.
- **Do not demo; observe.** One debrief per user, notes verbatim.
- **For Discord / community DMs**: drop the subject line and send A with
  just the try-page link. It needs no attachment and no repo visit.
