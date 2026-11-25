import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

/* Build-time only (scripts/prerender.js): the page's HTML is written into dist/index.html, so search engines,
   social previews and visitors without JavaScript get the full content before the bundle loads. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
