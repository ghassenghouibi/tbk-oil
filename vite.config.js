import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/* In `npm run dev`, serve the /api functions from the same Vite server (Vercel does it in production),
   with the variables from .env / .env.local. */
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''));
      server.middlewares.use('/api', async (req, res, next) => {
        const name = req.url.split('?')[0].replace(/^\/+|\/+$/g, '');
        if (!/^[\w-]+$/.test(name)) return next();
        try {
          const mod = await server.ssrLoadModule(`/api/${name}.js`);
          const handler = mod[req.method];
          if (!handler) { res.statusCode = 405; return res.end(); }
          const chunks = [];
          for await (const c of req) chunks.push(c);
          const request = new Request(`http://localhost${req.originalUrl}`, {
            method: req.method,
            headers: req.headers,
            body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks)
          });
          const response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (err) {
          server.config.logger.error(String(err?.stack || err));
          res.statusCode = 500; res.end();
        }
      });
    }
  };
}

/* `npm run preview`: serve /en and /ar from their prerendered folders, like the rewrites in vercel.json. */
function previewLanguages() {
  return {
    name: 'preview-languages',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const m = req.url.match(/^\/(en|ar)\/?(\?.*)?$/);
        if (m) req.url = `/${m[1]}/index.html${m[2] ?? ''}`;
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), devApi(), previewLanguages()],
  base: '/',
  // The Three.js chunk (~515 kB, 134 kB gzip) is loaded on demand, after the first screen.
  build: { chunkSizeWarningLimit: 600 }
});
