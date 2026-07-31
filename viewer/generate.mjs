#!/usr/bin/env node
// world.md viewer generator
// Reads a .world/ folder and renders a self-contained, read-only viewer
// page. The prototype (world-viewer-prototype.html) IS the template — we
// parse the folder into the data shape it expects, inject it, and apply a
// few surgical patches to generalize the slug and add per-slot empty
// states. Files are truth; this only projects them. No database, no media.
//
// usage:  node generate.mjs <path-to.world> [out.html]

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { loadWorld } from '../lib/world.mjs';

const worldArg = process.argv[2];
if (!worldArg) {
  console.error('usage: node generate.mjs <path-to.world> [out.html]');
  process.exit(1);
}
const absWorld = path.resolve(worldArg);
if (!fs.existsSync(absWorld)) {
  console.error('not found:', absWorld);
  process.exit(1);
}
const slug = path.basename(absWorld).replace(/\.world$/, '');
const outFile = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(process.cwd(), `${slug}-viewer.html`);
const here = path.dirname(url.fileURLToPath(import.meta.url));
const templatePath = path.join(here, 'world-viewer-prototype.html');

/* ---------- parsing (shared with `worldmd lint` — see lib/world.mjs) ---------- */
const L = loadWorld(absWorld);
if (L.errors.length) {
  console.error('cannot generate — fix these first (or run `worldmd lint`):');
  for (const e of L.errors) console.error(`  ${e.file}: ${e.message}`);
  process.exit(1);
}
const { WORLD, world, style, characters, objects, locations, refs } = L;

/* ---------- build viewer from the prototype template ---------- */
let tpl = fs.readFileSync(templatePath, 'utf8');

function replaceOnce(find, repl, label) {
  const i = tpl.indexOf(find);
  if (i < 0) throw new Error('template anchor not found: ' + (label || find.slice(0, 60)));
  tpl = tpl.slice(0, i) + repl + tpl.slice(i + find.length);
}

// robustness guards for partial/empty worlds
replaceOnce('  const s=WORLD.style;', '  const s=WORLD.style; if(!s) return [];', 'styleEssentials guard');
replaceOnce('  const n=[...WORLD.style.never];', '  const n=[...((WORLD.style&&WORLD.style.never)||[])];', 'mergedNevers guard');
replaceOnce(
  "  if(MODE==='empty'){toast('Nothing here yet — copy a starter prompt below');return}",
  "  if(MODE==='empty'){toast('Nothing here yet — copy a starter prompt below');return}\n  if(!WORLD.world){toast('Nothing here yet — nothing to copy');return}",
  'copyWorldPackage guard'
);

// drop the Harborline-specific hardcoded badge
replaceOnce('<span class="badge">audience: festival short</span>', '', 'audience badge');

// brand slug in the sidebar
replaceOnce(
  "${MODE==='example'?'harborline':'untitled'}.world",
  "${MODE==='empty'?'untitled':((WORLD.meta&&WORLD.meta.slug)||'untitled')}.world",
  'brand slug'
);

// per-slot empty states in the populated view (Foundations)
replaceOnce(
  "${navBtn('World','world.md',{type:'world'},null,A('world'))}",
  "${WORLD.world?navBtn('World','world.md',{type:'world'},null,A('world')):emptySlot('world.md',{type:'invite',key:'world'})}",
  'foundations world'
);
replaceOnce(
  "${navBtn('Style','style.md',{type:'style'},null,A('style'))}",
  "${WORLD.style?navBtn('Style','style.md',{type:'style'},null,A('style')):emptySlot('style.md',{type:'invite',key:'style'})}",
  'foundations style'
);
// per-slot empty states for the three collections
replaceOnce(
  "${WORLD.characters.map(c=>navBtn(c.name,null,{type:'entity',coll:'characters',id:c.id},'var(--w-slate)',A('entity',c.id))).join('')}",
  "${WORLD.characters.length?WORLD.characters.map(c=>navBtn(c.name,null,{type:'entity',coll:'characters',id:c.id},'var(--w-slate)',A('entity',c.id))).join(''):emptySlot('Add a character',{type:'invite',key:'character'})}",
  'characters list'
);
replaceOnce(
  "${WORLD.objects.map(o=>navBtn(o.name,null,{type:'entity',coll:'objects',id:o.id},o.role==='hero'?'var(--w-amber)':'var(--w-fog)',A('entity',o.id))).join('')}",
  "${WORLD.objects.length?WORLD.objects.map(o=>navBtn(o.name,null,{type:'entity',coll:'objects',id:o.id},o.role==='hero'?'var(--w-amber)':'var(--w-fog)',A('entity',o.id))).join(''):emptySlot('Add an object',{type:'invite',key:'object'})}",
  'objects list'
);
replaceOnce(
  "${WORLD.locations.map(l=>navBtn(l.name,null,{type:'entity',coll:'locations',id:l.id},'var(--w-hull)',A('entity',l.id))).join('')}",
  "${WORLD.locations.length?WORLD.locations.map(l=>navBtn(l.name,null,{type:'entity',coll:'locations',id:l.id},'var(--w-hull)',A('entity',l.id))).join(''):emptySlot('Add a location',{type:'invite',key:'location'})}",
  'locations list'
);
replaceOnce(
  "${navBtn('Registry','references.yaml',{type:'refs'},null,A('refs'))}",
  "${Object.keys(WORLD.refs||{}).length?navBtn('Registry','references.yaml',{type:'refs'},null,A('refs')):emptySlot('Register a source',{type:'invite',key:'refs'})}",
  'references slot'
);

// router: render invites for empty slots in the populated view too
replaceOnce(
  "if(PAGE.type==='world') c.innerHTML=pageWorld();",
  "if(PAGE.type==='invite') c.innerHTML=pageInvite(PAGE.key);\n    else if(PAGE.type==='world') c.innerHTML=WORLD.world?pageWorld():pageInvite('world');",
  'router world'
);
replaceOnce(
  "else if(PAGE.type==='style') c.innerHTML=pageStyle();",
  "else if(PAGE.type==='style') c.innerHTML=WORLD.style?pageStyle():pageInvite('style');",
  'router style'
);
replaceOnce(
  "else if(PAGE.type==='refs') c.innerHTML=pageRefs();",
  "else if(PAGE.type==='refs') c.innerHTML=Object.keys(WORLD.refs||{}).length?pageRefs():pageInvite('refs');",
  'router refs'
);
replaceOnce(
  'else c.innerHTML=pageWorld();',
  "else c.innerHTML=WORLD.world?pageWorld():pageInvite('world');",
  'router fallback'
);

// slug in crumbs + world.md footer (all literal occurrences)
tpl = tpl.replaceAll('harborline.world', "${((WORLD.meta&&WORLD.meta.slug)||'untitled')}.world");

// finally, inject the real world data in place of the prototype's sample
const injected = 'const WORLD = ' + JSON.stringify(WORLD, null, 2) + ';';
tpl = tpl.replace(/const WORLD = \{[\s\S]*?\n\};/, () => injected);

fs.writeFileSync(outFile, tpl);
console.log('wrote', path.relative(process.cwd(), outFile), '—', {
  world: !!world,
  style: !!style,
  characters: characters.length,
  objects: objects.length,
  locations: locations.length,
  refs: Object.keys(refs).length,
});
