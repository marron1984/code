import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
await cp('src/styles.css', 'dist/assets/styles.css');

const html = await readFile('index.html', 'utf8');
const productionHtml = html
  .replace('/src/styles.css', '/assets/styles.css')
  .replace('/src/App.tsx', '/assets/App.js');

await writeFile('dist/index.html', productionHtml);
