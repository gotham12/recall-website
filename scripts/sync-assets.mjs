import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = path.join(root, 'assets', 'site');
const destDir = path.join(root, 'public', 'screenshots');

if (!fs.existsSync(siteDir)) {
  console.log('No assets/site directory — skipping sync');
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });

for (const name of fs.readdirSync(siteDir)) {
  if (!name.endsWith('.png')) continue;
  fs.copyFileSync(path.join(siteDir, name), path.join(destDir, name));
  console.log(`synced ${name}`);
}
