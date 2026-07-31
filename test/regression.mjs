#!/usr/bin/env node
// Minimal regression suite. Guards the two things most likely to break
// quietly: the shared loader drifting from what the viewer expects, and the
// example worlds falling out of spec.
//
//   npm test

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import url from 'node:url';
import { loadWorld } from '../lib/world.mjs';

const ROOT = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const WORLDS = fs.readdirSync(ROOT).filter(f => f.endsWith('.world'));
let failed = 0;
const ok = m => console.log(`  ✓ ${m}`);
const bad = m => { console.log(`  ✗ ${m}`); failed++; };

console.log('world.md regression\n');

// 1. every example world in the repo must lint clean — they are what new
//    users copy, so they have to be exemplary
for (const w of WORLDS) {
  try {
    execFileSync('node', [path.join(ROOT, 'cli/worldmd.mjs'), 'lint', path.join(ROOT, w)], { stdio: 'pipe' });
    ok(`${w} lints clean`);
  } catch {
    bad(`${w} does NOT lint clean — run: node cli/worldmd.mjs lint ${w}`);
  }
}

// 2. the loader must produce the shape the viewer template reads
for (const w of WORLDS) {
  const L = loadWorld(path.join(ROOT, w));
  const shape = ['meta', 'world', 'style', 'characters', 'objects', 'locations', 'refs'];
  const keys = Object.keys(L.WORLD);
  if (shape.every((k, i) => keys[i] === k)) ok(`${w} loader shape + key order`);
  else bad(`${w} loader shape changed: ${keys.join(',')}`);
}

// 3. the generator must run and emit a self-contained page with data injected
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'worldmd-'));
for (const w of WORLDS) {
  const out = path.join(tmp, `${w}.html`);
  try {
    execFileSync('node', [path.join(ROOT, 'viewer/generate.mjs'), path.join(ROOT, w), out], { stdio: 'pipe' });
    const html = fs.readFileSync(out, 'utf8');
    const hasData = /const WORLD = \{[\s\S]*"meta"/.test(html);
    const noPlaceholder = !html.includes("MODE==='example'?'harborline'");
    if (hasData && noPlaceholder) ok(`${w} generates a populated viewer`);
    else bad(`${w} generated page missing injected data or still templated`);
  } catch (e) {
    bad(`${w} generator threw: ${String(e.message).split('\n')[0]}`);
  }
}
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n${failed ? `${failed} failure(s)` : 'all passing'}\n`);
process.exit(failed ? 1 : 0);
