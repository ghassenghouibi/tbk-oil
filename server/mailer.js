import nodemailer from 'nodemailer';
import { confirmationEmail, orderEmail } from './email-templates.js';
import { LANGS } from '../src/i18n/catalog.js';

/* Mail sending through Resend's SMTP relay (domain thibica.com verified in Resend), so it never
   depends on the mailbox password. All credentials come from environment variables, see .env.example. */

const LIMITS = { type: 60, name: 120, email: 200, phone: 40, format: 80, qty: 10, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    // Where customers' replies to the acknowledgement go (MAIL_FROM may be a no-reply address).
    replyTo: env.MAIL_REPLY_TO || env.MAIL_TO || undefined,
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
    message: String(payload.message ?? '').trim().slice(0, LIMITS.message),
    lang: LANGS.includes(payload.lang) ? payload.lang : 'fr' // language of the page the order came from
  };
  if (!d.name || !EMAIL_RE.test(d.email)) return { ok: false, status: 422, error: 'Nom et e-mail valides requis.' };

  const cfg = readConfig(env);
  const transporter = nodemailer.createTransport(cfg.smtp);

  await transporter.sendMail({
    from: cfg.from,
    to: cfg.to,
    replyTo: `${d.name} <${d.email}>`,
    ...orderEmail(d)
  });

  if (cfg.confirm) {
    await transporter.sendMail({
      from: cfg.from,
      to: d.email,
      replyTo: cfg.replyTo,
      ...confirmationEmail(d)
    }).catch(() => {}); // the confirmation is a courtesy, the order itself already went through
  }

  return { ok: true, status: 200 };
}
