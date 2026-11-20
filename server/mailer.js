import nodemailer from 'nodemailer';

/* Mail sending through the OVH mailbox info@thibica.com (SMTP).
   All credentials come from environment variables, see .env.example. */

const LIMITS = { type: 60, name: 120, email: 200, phone: 40, format: 80, qty: 10, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export function readConfig(env = process.env) {
  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter(k => !env[k]);
  if (missing.length) throw new Error(`Variables d'environnement manquantes : ${missing.join(', ')}`);
  const port = Number(env.SMTP_PORT || 465);
  return {
    smtp: {
      host: env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = SSL direct, 587 = STARTTLS
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
    },
    from: env.MAIL_FROM || `Domaine Thibica <${env.SMTP_USER}>`,
    to: env.MAIL_TO || env.SMTP_USER,
    confirm: env.MAIL_SEND_CONFIRMATION === 'true'
  };
}

/* Returns { ok, status, error } so the HTTP layer stays thin. */
export async function handleContact(payload, env = process.env) {
  if (!payload || typeof payload !== 'object') return { ok: false, status: 400, error: 'Requête invalide.' };
  // Honeypot filled: pretend it worked, send nothing.
  if (payload.website) return { ok: true, status: 200 };

  const d = {
    type: clean(payload.type, LIMITS.type) || 'Non précisé',
    name: clean(payload.name, LIMITS.name),
    email: clean(payload.email, LIMITS.email),
    phone: clean(payload.phone, LIMITS.phone),
    format: clean(payload.format, LIMITS.format),
    qty: clean(payload.qty, LIMITS.qty),
    message: String(payload.message ?? '').trim().slice(0, LIMITS.message)
  };
  if (!d.name || !EMAIL_RE.test(d.email)) return { ok: false, status: 422, error: 'Nom et e-mail valides requis.' };

  const cfg = readConfig(env);
  const transporter = nodemailer.createTransport(cfg.smtp);

  const rows = [['Profil', d.type], ['Nom', d.name], ['E-mail', d.email], ['Téléphone', d.phone || '—'], ['Format', d.format], ['Quantité', d.qty]];
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join('\n')}\n\nMessage :\n${d.message || '—'}`;
  const html = `<h2 style="font-family:Georgia,serif;color:#2f3d25">Nouvelle demande de commande</h2>
<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${rows.map(([k, v]) => `<tr><td style="color:#4a5541"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join('\n')}
</table>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap"><b>Message :</b><br>${esc(d.message || '—')}</p>`;

  await transporter.sendMail({
    from: cfg.from,
    to: cfg.to,
    replyTo: `${d.name} <${d.email}>`,
    subject: `Demande de commande Thibica · ${d.format} · ${d.name}`,
    text,
    html
  });

  if (cfg.confirm) {
    await transporter.sendMail({
      from: cfg.from,
      to: d.email,
      subject: 'Nous avons bien reçu votre demande · Domaine Thibica',
      text: `Bonjour ${d.name},\n\nMerci pour votre demande. Nous revenons vers vous rapidement avec les prix et les délais.\n\nRécapitulatif :\n${text}\n\nDomaine Thibica\ninfo@thibica.com`
    }).catch(() => {}); // the confirmation is a courtesy, the order itself already went through
  }

  return { ok: true, status: 200 };
}
