// Guards against the Android blank-screen bug: the native app needs Capacitor's
// runtime loaded before the app, and plugin access must go through js/native.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

test('index.html loads the Capacitor runtime before the app module', () => {
  const html = readFileSync('index.html', 'utf8');
  const runtime = html.indexOf('js/vendor/capacitor.js');
  const app = html.indexOf('js/app.js');
  assert.ok(runtime > 0, 'capacitor.js is included');
  assert.ok(runtime < app, 'capacitor.js comes before app.js');
  assert.ok(readFileSync('js/vendor/capacitor.js', 'utf8').includes('registerPlugin'));
});

test('only js/native.js touches the Capacitor global', () => {
  const files = [];
  const walk = (d) => readdirSync(d).forEach((f) => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (f !== 'vendor') walk(p); } else if (p.endsWith('.js')) files.push(p);
  });
  walk('js');
  for (const f of files) {
    if (f.endsWith('native.js')) continue;
    const src = readFileSync(f, 'utf8');
    assert.ok(!/registerPlugin|window\.Capacitor/.test(src), `${f} must use js/native.js instead`);
  }
});
