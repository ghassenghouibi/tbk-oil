import { handleContact } from '../server/mailer.js';

/* Vercel Function: POST /api/contact (the order form). */
export async function POST(request) {
  let payload;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return Response.json({ ok: false, error: 'Requête trop volumineuse.' }, { status: 413 });
    payload = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  try {
    const { ok, status, error } = await handleContact(payload);
    return Response.json({ ok, error }, { status });
  } catch (err) {
    console.error('[contact] envoi impossible :', err);
    return Response.json({ ok: false, error: 'Envoi impossible pour le moment.' }, { status: 500 });
  }
}
