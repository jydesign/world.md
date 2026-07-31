// world.md — shared world loader
//
// ONE parser, used by both the viewer generator and `worldmd lint`. If the
// linter had its own, it could pass a world the generator then crashes on —
// the worst failure mode for a tool whose job is telling you the world is
// valid. Files are truth; this only reads them.

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export const STATUS = ['draft', 'in-iteration', 'approved', 'deprecated'];
export const FORMATS = ['film', 'campaign', 'series', 'game', 'book'];
export const MEDIUMS = ['photograph', '3d-render', 'illustration', 'anime'];
export const OBJECT_ROLES = ['hero', 'prop'];
export const CHARACTER_ROLES = ['protagonist', 'supporting', 'background'];
export const LOCATION_KINDS = ['real', 'fictional', 'real-modified'];

export const readMaybe = p => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);

// prose -> array of paragraphs (plain text; the viewer escapes it)
export function paras(body) {
  if (!body) return [];
  return body
    .split(/\n\s*\n/)
    .map(s => s.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

// refs may be written as "references.yaml#id" (spec) or bare "id"
export const refIds = arr => (arr || []).map(r => String(r).split('#').pop());

// Never throws. Returns { fm, body, error } so the linter can report a bad
// file instead of dying on it, and the generator can fail with a clean message.
export function splitFrontmatter(raw) {
  const m = raw.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw.trim(), error: 'no YAML frontmatter (--- block)' };
  try {
    return { fm: yaml.load(m[1]) || {}, body: (m[2] || '').trim(), error: null };
  } catch (e) {
    const where = e.mark ? ` (line ${e.mark.line + 1})` : '';
    return { fm: {}, body: (m[2] || '').trim(), error: `YAML parse error${where}: ${e.reason || e.message}` };
  }
}

export const COLLECTIONS = [
  { dir: 'characters', type: 'character' },
  { dir: 'objects', type: 'object' },
  { dir: 'locations', type: 'location' },
];

/**
 * Load a .world/ folder.
 * Returns the shape the viewer template expects, plus `files` and `errors`
 * for the linter. Key insertion order is preserved deliberately — the viewer
 * output is byte-compared in tests.
 */
export function loadWorld(worldDir) {
  const dir = path.resolve(worldDir);
  const slug = path.basename(dir).replace(/\.world$/, '');
  const files = [];
  const errors = [];

  const parseFile = (abs, rel, kind) => {
    const { fm, body, error } = splitFrontmatter(fs.readFileSync(abs, 'utf8'));
    const rec = { abs, rel, kind, fm, body, error };
    files.push(rec);
    if (error) errors.push({ file: rel, message: error });
    return rec;
  };

  let world = null;
  if (readMaybe(path.join(dir, 'world.md')) !== null) {
    const { fm, body } = parseFile(path.join(dir, 'world.md'), 'world.md', 'world');
    world = { ...fm, premise: paras(body) };
  }

  let style = null;
  if (readMaybe(path.join(dir, 'style.md')) !== null) {
    const { fm } = parseFile(path.join(dir, 'style.md'), 'style.md', 'style');
    style = fm;
  }

  const loadCollection = (sub, type) => {
    const d = path.join(dir, sub);
    if (!fs.existsSync(d)) return [];
    return fs
      .readdirSync(d)
      .filter(f => f.endsWith('.md'))
      .sort()
      .map(f => {
        const { fm, body } = parseFile(path.join(d, f), `${sub}/${f}`, type);
        const e = { ...fm, prose: paras(body) };
        if (e.refs) e.refs = refIds(e.refs);
        if (e.interface && !e.iface) e.iface = e.interface; // template reads .iface
        return e;
      });
  };

  const characters = loadCollection('characters', 'character');
  const objects = loadCollection('objects', 'object');
  const locations = loadCollection('locations', 'location');

  let refs = {};
  let refsRaw = null;
  const rRaw = readMaybe(path.join(dir, 'references.yaml'));
  if (rRaw !== null) {
    try {
      refsRaw = yaml.load(rRaw) || {};
      refs = refsRaw;
      for (const k of Object.keys(refs)) {
        const r = refs[k] || {};
        if (typeof r === 'object' && !Array.isArray(r)) {
          r.path = r.path || r.url || ''; // template shows a single location string
          refs[k] = r;
        }
      }
    } catch (e) {
      const where = e.mark ? ` (line ${e.mark.line + 1})` : '';
      errors.push({ file: 'references.yaml', message: `YAML parse error${where}: ${e.reason || e.message}` });
      refs = {};
    }
  }

  const WORLD = {
    meta: { slug, name: (world && world.name) || slug },
    world,
    style,
    characters,
    objects,
    locations,
    refs,
  };

  return { WORLD, dir, slug, world, style, characters, objects, locations, refs, refsRaw, files, errors };
}
