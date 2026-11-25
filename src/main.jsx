import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { DICTS, langFromPath } from './i18n';
import './styles.css';

const lang = langFromPath(location.pathname);
// Already set by the prerendered HTML; needed for `npm run dev`, which serves the French shell on every path.
document.documentElement.lang = lang;
document.documentElement.dir = DICTS[lang].dir;
document.documentElement.classList.add('js');

const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
);
const root = document.getElementById('root');
// Production HTML is prerendered (scripts/prerender.js); `npm run dev` serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
