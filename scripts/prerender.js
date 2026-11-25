import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

/* Runs after `vite build` and `vite build --ssr`: writes one fully rendered page per language
   (dist/index.html = French, dist/en/index.html, dist/ar/index.html), each with its own <head>. */
const SITE = 'https://www.thibica.com';
const root = fileURLToPath(new URL('..', import.meta.url));
const ssrDir = `${root}.ssr`;
const { render, DICTS } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href);

const LATIN_FONTS = 'family=Cinzel:wght@500;600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Mulish:wght@400;600;700&family=Amiri:wght@700';
const ARABIC_FONTS = 'family=Cinzel:wght@500;600&family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@400;600;700';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const urlOf = (d) => SITE + (d.path === '/' ? '/' : d.path);

function head(d) {
  const url = urlOf(d);
  const alternates = Object.values(DICTS)
    .map(a => `<link rel="alternate" hreflang="${a.lang}" href="${urlOf(a)}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${urlOf(DICTS.fr)}">`);
  const ogLocales = Object.values(DICTS).filter(a => a !== d).map(a => `<meta property="og:locale:alternate" content="${a.locale}">`);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: 'Domaine Thibica',
        alternateName: 'ضيعة تبيكة',
        legalName: 'TBK Oil Export SARL',
        url: `${SITE}/`,
        logo: `${SITE}/img/icon-512.png`,
        image: `${SITE}/img/og-image.jpg`,
        email: 'info@thibica.com',
        description: d.meta.orgDescription,
        address: { '@type': 'PostalAddress', addressLocality: 'El Fahs', addressRegion: 'Zaghouan', addressCountry: 'TN' },
        contactPoint: { '@type': 'ContactPoint', email: 'info@thibica.com', contactType: 'sales', availableLanguage: ['French', 'English', 'Arabic'] }
      },
      { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Domaine Thibica', inLanguage: Object.keys(DICTS), publisher: { '@id': `${SITE}/#organization` } },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: d.meta.title, description: d.meta.description, inLanguage: d.lang, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#organization` } }
    ]
  };

  return [
    `<title>${esc(d.meta.title)}</title>`,
    `<meta name="description" content="${esc(d.meta.description)}">`,
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    `<link rel="canonical" href="${url}">`,
    ...alternates,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="Domaine Thibica">',
    `<meta property="og:locale" content="${d.locale}">`,
    ...ogLocales,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${esc(d.meta.title)}">`,
    `<meta property="og:description" content="${esc(d.meta.ogDescription)}">`,
    `<meta property="og:image" content="${SITE}/img/og-image.jpg">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${esc(d.meta.ogImageAlt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<link href="https://fonts.googleapis.com/css2?${d.dir === 'rtl' ? ARABIC_FONTS : LATIN_FONTS}&display=swap" rel="stylesheet">`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`
  ].join('\n');
}

const template = readFileSync(`${root}dist/index.html`, 'utf8');
const HEAD_RE = /<!--head:start[\s\S]*?<!--head:end-->/;
const ROOT = '<div id="root"></div>';
if (!HEAD_RE.test(template) || !template.includes(ROOT) || !template.includes('<html lang="fr">')) {
  throw new Error('prerender: index.html markers not found (head:start/head:end, #root, <html lang>)');
}

for (const d of Object.values(DICTS)) {
  const html = template
    .replace('<html lang="fr">', `<html lang="${d.lang}" dir="${d.dir}">`)
    .replace(HEAD_RE, head(d))
    .replace(ROOT, `<div id="root">${render(d.lang)}</div>`);
  const dir = d.path === '/' ? `${root}dist` : `${root}dist${d.path}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, html);
  console.log(`prerender: ${d.path} (${d.lang})`);
}
rmSync(ssrDir, { recursive: true, force: true });
