#!/usr/bin/env node
// worldmd — the world.md CLI.
//
// Implemented: lint, spec.  Planned: shoot, compose, serve, diff (see PLAN.md).

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import {
  loadWorld, COLLECTIONS,
  STATUS, FORMATS, MEDIUMS, OBJECT_ROLES, CHARACTER_ROLES, LOCATION_KINDS,
} from '../lib/world.mjs';

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');

/* ---------- helpers ---------- */
const show = v => {
  if (v === undefined || v === null) return 'nothing';
  if (Array.isArray(v)) return 'a list';
  if (typeof v === 'object') return 'a map';
  return `"${v}"`;
};
const oneOf = a => a.join(' | ');

/* ---------- lint ---------- */
function lintWorld(worldDir) {
  const W = loadWorld(worldDir);
  const E = [];          // errors  — spec violations, exit 1
  const N = [];          // warnings — thin or risky, exit 0
  const err = (file, msg) => E.push({ file, msg });
  const warn = (file, msg) => N.push({ file, msg });

  // parse failures first — everything downstream is unreliable
  for (const p of W.errors) err(p.file, p.message);
  // ...and a file that didn't parse must not also generate "missing field"
  // noise: the fields are probably there, we just couldn't read them.
  const broke = f => W.files.some(x => x.rel === f && x.error);

  /* --- foundations --- */
  if (!W.world) err('world.md', 'missing — every world needs world.md (premise, era, tone, canon)');
  else if (broke('world.md')) { /* parse error already reported */ }
  else {
    const w = W.world;
    if (!w.name) warn('world.md', 'no `name`');
    if (!w.format) warn('world.md', `no \`format\` (${oneOf(FORMATS)})`);
    else if (!FORMATS.includes(w.format)) err('world.md', `\`format\` is ${show(w.format)} — must be one of ${oneOf(FORMATS)}`);
    if (w.status && !STATUS.includes(w.status)) err('world.md', `\`status\` is ${show(w.status)} — must be one of ${oneOf(STATUS)}`);
    if (!w.era) warn('world.md', 'no `era`');
    if (!Array.isArray(w.canon) || !w.canon.length) warn('world.md', 'no `canon` — canon is what survives every compression; a world without it has no hard rules');
  }

  if (!W.style) err('style.md', 'missing — every world needs style.md (medium, palette, camera, lighting, never)');
  else if (broke('style.md')) { /* parse error already reported */ }
  else {
    const s = W.style;
    if (!s.medium) err('style.md', `no \`medium\` — REQUIRED (${oneOf(MEDIUMS)}). Without it image tools fall back to their house style.`);
    else if (!MEDIUMS.includes(s.medium)) err('style.md', `\`medium\` is ${show(s.medium)} — must be one of ${oneOf(MEDIUMS)}`);
    if (s.status && !STATUS.includes(s.status)) err('style.md', `\`status\` is ${show(s.status)} — must be one of ${oneOf(STATUS)}`);
    for (const f of ['palette', 'camera', 'lighting', 'never']) if (!s[f]) warn('style.md', `no \`${f}\``);
  }

  /* --- entities --- */
  const seenIds = new Map();
  const refKeys = new Set(Object.keys(W.refs || {}));

  for (const { dir, type } of COLLECTIONS) {
    const items = W[dir] || [];
    const recs = W.files.filter(f => f.kind === type);
    items.forEach((e, i) => {
      const rel = recs[i] ? recs[i].rel : `${dir}/?`;
      if (recs[i] && recs[i].error) return; // already reported as a parse failure

      for (const f of ['id', 'type', 'name', 'version', 'status']) {
        if (e[f] === undefined || e[f] === null || e[f] === '') err(rel, `missing required \`${f}\``);
      }
      if (e.status && !STATUS.includes(e.status)) err(rel, `\`status\` is ${show(e.status)} — must be one of ${oneOf(STATUS)}`);
      if (e.type && e.type !== type) err(rel, `\`type\` is ${show(e.type)} but it lives in ${dir}/ — should be "${type}"`);

      // id hygiene
      if (e.id) {
        const base = path.basename(rel).replace(/\.md$/, '');
        if (e.id !== base) err(rel, `\`id\` is ${show(e.id)} but the filename is "${base}.md" — they must match`);
        if (seenIds.has(e.id)) err(rel, `duplicate \`id\` "${e.id}" — already used by ${seenIds.get(e.id)}`);
        else seenIds.set(e.id, rel);
      }

      // per-type contracts
      if (type === 'object') {
        if (e.role === undefined) err(rel, `objects need \`role\` (${oneOf(OBJECT_ROLES)}) — it governs prompt budget`);
        else if (!OBJECT_ROLES.includes(e.role)) err(rel, `\`role\` is ${show(e.role)} — must be exactly ${oneOf(OBJECT_ROLES)}, not a description`);
      }
      if (type === 'character') {
        if (e.role !== undefined && !CHARACTER_ROLES.includes(e.role)) err(rel, `\`role\` is ${show(e.role)} — must be ${oneOf(CHARACTER_ROLES)}`);
        if (!e.physical || !e.physical.presentation) warn(rel, 'no `physical.presentation` — image tools will guess from the name (prose never reaches them)');
      }
      if (type === 'location') {
        if (e.kind === undefined) warn(rel, `no \`kind\` (${oneOf(LOCATION_KINDS)})`);
        else if (!LOCATION_KINDS.includes(e.kind)) err(rel, `\`kind\` is ${show(e.kind)} — must be ${oneOf(LOCATION_KINDS)}`);
      }

      // refs resolve
      for (const id of e.refs || []) {
        if (!refKeys.has(id)) err(rel, `\`refs\` points to "${id}" — no such key in references.yaml`);
      }

      // deliverable coupling: entity files describe what is ALWAYS true
      const prose = (e.prose || []).join(' ');
      if (/\b(image \d|hero of image|shot \d|paired with)\b/i.test(prose)) {
        warn(rel, 'prose looks deliverable-specific ("image 1", "paired with…") — entity files describe what is ALWAYS true; that belongs in the shot line');
      }
    });
  }

  /* --- references.yaml --- */
  const raw = W.refsRaw;
  if (raw && typeof raw === 'object') {
    const keys = Object.keys(raw);
    if (keys.includes('references') && typeof raw.references === 'object') {
      err('references.yaml', 'entries are wrapped under a `references:` key — the TOP-LEVEL keys must be the reference ids (entities cite them as references.yaml#<id>)');
    }
    const today = new Date().toISOString().slice(0, 10);
    for (const k of keys) {
      const r = raw[k];
      if (r === null || typeof r !== 'object' || Array.isArray(r)) {
        err('references.yaml', `\`${k}\` is ${show(r)} — every top-level key must be a reference entry (a map), not a document field`);
        continue;
      }
      if (!r.url && !r.path) warn('references.yaml', `\`${k}\` has no \`url\` or \`path\` — a reference records WHERE truth lives`);
      if (r.approved === undefined) warn('references.yaml', `\`${k}\` has no \`approved\``);
      const exp = r.license && r.license.expiry;
      if (exp) {
        const d = exp instanceof Date ? exp.toISOString().slice(0, 10) : String(exp).slice(0, 10);
        if (d < today) err('references.yaml', `\`${k}\` license EXPIRED ${d} — do not ship outputs using it`);
      }
    }
  }

  return { slug: W.slug, errors: E, warnings: N };
}

function report(res) {
  const { slug, errors, warnings } = res;
  console.log(`\n  ${slug}.world`);
  if (!errors.length && !warnings.length) {
    console.log('    ✓ clean');
  }
  for (const e of errors) console.log(`    ✗ ERROR  ${e.file}: ${e.msg}`);
  for (const w of warnings) console.log(`    ! warn   ${w.file}: ${w.msg}`);
  console.log(`    ${errors.length} error${errors.length === 1 ? '' : 's'}, ${warnings.length} warning${warnings.length === 1 ? '' : 's'}`);
  return errors.length;
}

function cmdLint(args) {
  let targets = args.filter(a => !a.startsWith('-'));
  if (!targets.length) {
    targets = fs.readdirSync(process.cwd()).filter(f => f.endsWith('.world') && fs.statSync(f).isDirectory());
    if (!targets.length) {
      console.error('usage: worldmd lint <path-to.world> [...]\n(no *.world folders found here)');
      process.exit(1);
    }
  }
  console.log('world.md lint');
  let failed = 0;
  for (const t of targets) {
    if (!fs.existsSync(t)) { console.error(`\n  not found: ${t}`); failed++; continue; }
    failed += report(lintWorld(t));
  }
  console.log('');
  process.exit(failed ? 1 : 0);
}

/* ---------- spec ---------- */
function cmdSpec() {
  const p = path.join(ROOT, 'exporters', 'spec-prompt.md');
  const txt = fs.readFileSync(p, 'utf8');
  // print only the payload — everything after the first "---" separator line
  const i = txt.indexOf('\n---\n');
  console.log(i < 0 ? txt : txt.slice(i + 5).trim());
}

/* ---------- dispatch ---------- */
const USAGE = `worldmd — tools for .world folders

  worldmd lint [<world>...]   validate frontmatter, refs, licenses (default: all *.world here)
  worldmd spec                print the format primer for pasting into any AI chat

Planned (see PLAN.md): shoot, compose, serve, diff`;

const [cmd, ...rest] = process.argv.slice(2);
switch (cmd) {
  case 'lint': cmdLint(rest); break;
  case 'spec': cmdSpec(); break;
  case undefined:
  case '-h':
  case '--help': console.log(USAGE); break;
  case 'shoot':
  case 'compose':
  case 'serve':
  case 'diff':
    console.error(`worldmd ${cmd}: not built yet — see PLAN.md. Today: \`worldmd lint\` and \`worldmd spec\`.`);
    process.exit(2);
  default:
    console.error(`unknown command: ${cmd}\n\n${USAGE}`);
    process.exit(1);
}
