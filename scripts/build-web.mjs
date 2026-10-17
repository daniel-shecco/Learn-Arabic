// Copies the static web app into www/, the folder Capacitor packages into the
// native Android / iOS apps. The app has no bundler, so this is a plain copy.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'www');
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const f of ['index.html', 'manifest.webmanifest', 'sw.js', 'css', 'js', 'icons']) {
  cpSync(join(root, f), join(out, f), { recursive: true });
}
console.log('Web app copied to www/');
