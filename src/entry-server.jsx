import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { DICTS } from './i18n';

/* Build-time only (scripts/prerender.js): each language's HTML is written into dist/, so search engines,
   social previews and visitors without JavaScript get the full content before the bundle loads. */
export function render(lang) {
  return renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>
  );
}
