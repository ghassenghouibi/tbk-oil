import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

document.documentElement.classList.add('js');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
const root = document.getElementById('root');
// Production HTML is prerendered (scripts/prerender.js); `npm run dev` serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
