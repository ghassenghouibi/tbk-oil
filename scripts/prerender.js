import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

/* Runs after `vite build` and `vite build --ssr`: injects the rendered page into dist/index.html. */
const root = fileURLToPath(new URL('..', import.meta.url));
const ssrDir = `${root}.ssr`;
const { render } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href);

const file = `${root}dist/index.html`;
const html = readFileSync(file, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

writeFileSync(file, html.replace(marker, `<div id="root">${render()}</div>`));
rmSync(ssrDir, { recursive: true, force: true });
console.log('prerender: dist/index.html written');
