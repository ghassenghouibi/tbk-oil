/* E-mails HTML aux couleurs de Thibica pour le formulaire de commande. Les messageries ignorent les <style> et le CSS
   moderne : mise en page en tableaux, styles en ligne, polices sûres et aucune image (rien à bloquer). Chaque modèle
   renvoie aussi une version texte pour les messageries qui n'affichent pas le HTML.
   L'e-mail à l'équipe est en français ; l'accusé de réception suit la langue du site (fr, en, ar). */

import { FORMATS, PROFILES, translateValue } from '../src/i18n/catalog.js';

const C = {
  paper: '#F3ECDD',
  page: '#E6DFCF',
  ink: '#1F2A1B',
  inkSoft: '#4A5541',
  olive: '#2F3D25',
  mill: '#161D12',
  gold: '#B98A2E',
  goldLight: '#E2BD62',
  line: '#DDD3BD'
};
const EMAIL = 'info@thibica.com';
const LANG_NAMES = { fr: 'Français', en: 'English', ar: 'العربية' };

/* Fonts per script: Georgia/Helvetica have no Arabic glyphs, so Arabic falls back to the system's Arabic faces. */
const FONTS = {
  ltr: { serif: "Georgia,'Times New Roman',serif", sans: "'Helvetica Neue',Arial,Helvetica,sans-serif" },
  rtl: { serif: "Amiri,'Traditional Arabic','Times New Roman',serif", sans: "Tahoma,'Segoe UI',Arial,sans-serif" }
};

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const multiline = (s) => esc(s).replace(/\r?\n/g, '<br>');
const firstName = (name) => name.trim().split(/\s+/)[0] || name;
const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;
const sentAt = () => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Africa/Tunis' }).format(new Date());

/* Small helpers bound to one text direction, so every block mirrors correctly in Arabic. */
function kit(dir) {
  const { serif, sans } = FONTS[dir];
  const start = dir === 'rtl' ? 'right' : 'left';
  const end = dir === 'rtl' ? 'left' : 'right';

  const button = (href, label, primary = true) => {
    const bg = primary ? C.olive : C.paper;
    const color = primary ? '#FFFFFF' : C.olive;
    return `<a href="${esc(href)}" style="display:inline-block;background:${bg};border:1px solid ${C.olive};color:${color};font-family:${sans};font-size:14px;font-weight:bold;text-decoration:none;padding:13px 26px;border-radius:999px;margin:0;margin-bottom:10px;margin-${end}:8px">${esc(label)}</a>`;
  };

  const label = (text, top = 0) =>
    `<p style="margin:${top}px 0 10px;font-family:${serif};font-size:${dir === 'rtl' ? '14px' : '11px;letter-spacing:.22em;text-transform:uppercase'};color:${C.gold}">${esc(text)}</p>`;

  /* Rows are [label, html value]; values must already be escaped. */
  const detailsTable = (rows) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
${rows.map(([k, v]) => `<tr>
<td valign="top" align="${start}" style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${sans};font-size:${dir === 'rtl' ? '14px' : '12px;letter-spacing:.08em;text-transform:uppercase'};color:${C.inkSoft};width:120px">${esc(k)}</td>
<td valign="top" align="${start}" style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${sans};font-size:15px;color:${C.ink}">${v}</td>
</tr>`).join('\n')}
</table>`;

  const messageBlock = (title, message) => `${label(title, 28)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td align="${start}" style="background:${C.paper};border-${start}:3px solid ${C.gold};padding:18px 22px;font-family:${serif};font-size:16px;${dir === 'rtl' ? '' : 'font-style:italic;'}line-height:1.7;color:${C.ink}">${multiline(message)}</td>
</tr></table>`;

  return { serif, sans, start, button, label, detailsTable, messageBlock };
}

function layout({ lang, dir, preheader, eyebrow, body, footer }) {
  const { serif, sans, start } = kit(dir);
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Domaine Thibica</title></head>
<body dir="${dir}" style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.page}">${esc(preheader)}</div>
<table role="presentation" dir="${dir}" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" dir="${dir}" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFDF8">
<tr><td align="center" bgcolor="${C.mill}" style="background:${C.mill};padding:34px 40px 28px">
<div dir="ltr" style="font-family:Georgia,serif;font-size:12px;letter-spacing:.32em;color:${C.goldLight}">DOMAINE</div>
<div dir="ltr" style="font-family:Georgia,serif;font-size:34px;letter-spacing:.14em;color:#FFFFFF;line-height:1.1;margin-top:4px">THIBICA</div>
<div style="width:48px;height:1px;background:${C.gold};margin:14px auto 12px;line-height:1px;font-size:0">&nbsp;</div>
<div style="font-family:${serif};font-size:${dir === 'rtl' ? '17px' : '15px;font-style:italic'};color:#D9CFB5">${esc(eyebrow)}</div>
</td></tr>
<tr><td align="${start}" style="padding:36px 40px 40px;text-align:${start}">${body}</td></tr>
<tr><td align="center" bgcolor="${C.olive}" style="background:${C.olive};padding:24px 40px;font-family:${sans};font-size:12px;line-height:1.8;color:#C9C1AB">${footer}</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

/* À l'équipe : nouvelle demande de commande, toujours en français. `d` est la demande nettoyée par handleContact. */
export function orderEmail(d) {
  const { serif, sans, button, label, detailsTable, messageBlock } = kit('ltr');
  const rows = [['Profil', d.type], ['Nom', d.name], ['E-mail', d.email], ['Téléphone', d.phone || '—'], ['Format', d.format], ['Quantité', d.qty], ['Langue', LANG_NAMES[d.lang]]];
  const replyHref = `mailto:${d.email}?subject=${encodeURIComponent(`Votre demande de commande Thibica (${d.format})`)}`;

  const body = `${label(d.type)}
<h1 style="margin:0 0 4px;font-family:${serif};font-size:30px;font-weight:normal;line-height:1.2;color:${C.olive}">${esc(d.name)}</h1>
<p style="margin:0 0 24px;font-family:${sans};font-size:14px;color:${C.inkSoft}">${esc(sentAt())}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px"><tr>
<td width="50%" bgcolor="${C.paper}" style="background:${C.paper};padding:16px 20px;border-right:2px solid #FFFDF8">
<div style="font-family:${sans};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.inkSoft}">Format</div>
<div style="font-family:${serif};font-size:20px;color:${C.olive};margin-top:4px">${esc(d.format)}</div></td>
<td width="50%" bgcolor="${C.paper}" style="background:${C.paper};padding:16px 20px;border-left:2px solid #FFFDF8">
<div style="font-family:${sans};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.inkSoft}">Quantité</div>
<div style="font-family:${serif};font-size:20px;color:${C.olive};margin-top:4px">${esc(d.qty)}</div></td>
</tr></table>
${detailsTable([
    ['Nom', esc(d.name)],
    ['E-mail', `<a href="mailto:${esc(d.email)}" style="color:${C.olive}">${esc(d.email)}</a>`],
    ['Téléphone', d.phone ? `<a href="${esc(telHref(d.phone))}" style="color:${C.olive}">${esc(d.phone)}</a>` : '—'],
    ['Profil', esc(d.type)],
    ['Langue', `${esc(LANG_NAMES[d.lang])}${d.lang === 'fr' ? '' : ' · <span style="color:#4A5541">répondez de préférence dans cette langue</span>'}`]
  ])}
${messageBlock('Message', d.message || '—')}
<p style="margin:30px 0 0">${button(replyHref, `Répondre à ${firstName(d.name)}`)}${d.phone ? button(telHref(d.phone), 'Appeler', false) : ''}</p>`;

  return {
    subject: `Demande de commande Thibica · ${d.format} · ${d.name}`,
    html: layout({
      lang: 'fr',
      dir: 'ltr',
      preheader: `${d.name} · ${d.qty} × ${d.format}${d.message ? ` · ${d.message.slice(0, 100)}` : ''}`,
      eyebrow: 'Nouvelle demande de commande',
      body,
      footer: `Envoyé depuis le formulaire « Commander » du site. Répondre à cet e-mail écrit directement à ${esc(d.name)}.`
    }),
    text: `Nouvelle demande de commande\n\n${rows.map(([k, v]) => `${k} : ${v}`).join('\n')}\n\nMessage :\n${d.message || '—'}`
  };
}

const CONFIRMATION = {
  fr: {
    dir: 'ltr',
    subject: 'Nous avons bien reçu votre demande · Domaine Thibica',
    preheader: 'Merci pour votre demande. Nous revenons vers vous avec les prix et les délais.',
    eyebrow: 'Demande bien reçue',
    thanks: (name) => `Merci, ${name}.`,
    intro: 'Votre demande est bien arrivée au domaine. Nous revenons vers vous très vite avec les prix, les délais et les modalités de livraison.',
    summary: 'Récapitulatif de votre demande',
    labels: { format: 'Format', qty: 'Quantité', type: 'Profil', phone: 'Téléphone' },
    message: 'Votre message',
    more: 'Une précision à ajouter ? Répondez simplement à cet e-mail.',
    write: 'Nous écrire',
    sign: 'L\'équipe du Domaine Thibica',
    tagline: 'Huile d\'olive extra vierge biologique · Produit de Tunisie',
    hello: (name) => `Bonjour ${name},`,
    textIntro: 'Merci pour votre demande. Nous revenons vers vous rapidement avec les prix et les délais.',
    sep: ' : '
  },
  en: {
    dir: 'ltr',
    subject: 'We\'ve received your request · Domaine Thibica',
    preheader: 'Thank you for your request. We\'ll get back to you with prices and lead times.',
    eyebrow: 'Request received',
    thanks: (name) => `Thank you, ${name}.`,
    intro: 'Your request has reached the estate. We\'ll get back to you very soon with prices, lead times and delivery details.',
    summary: 'Your request',
    labels: { format: 'Size', qty: 'Quantity', type: 'Customer type', phone: 'Phone' },
    message: 'Your message',
    more: 'Anything to add? Simply reply to this email.',
    write: 'Write to us',
    sign: 'The Domaine Thibica team',
    tagline: 'Organic extra virgin olive oil · Product of Tunisia',
    hello: (name) => `Hello ${name},`,
    textIntro: 'Thank you for your request. We\'ll get back to you shortly with prices and lead times.',
    sep: ': '
  },
  ar: {
    dir: 'rtl',
    subject: 'تلقّينا طلبكم · ضيعة تبيكة',
    preheader: 'شكرًا على طلبكم. سنعود إليكم بالأسعار ومواعيد التسليم.',
    eyebrow: 'تمّ استلام طلبكم',
    thanks: (name) => `شكرًا، ${name}.`,
    intro: 'وصل طلبكم إلى الضيعة. سنعود إليكم قريبًا جدًا بالأسعار ومواعيد التسليم وطرق الشحن.',
    summary: 'ملخّص طلبكم',
    labels: { format: 'الحجم', qty: 'الكمية', type: 'الصفة', phone: 'الهاتف' },
    message: 'رسالتكم',
    more: 'هل تودّون إضافة شيء؟ يكفي أن تردّوا على هذه الرسالة.',
    write: 'راسلونا',
    sign: 'فريق ضيعة تبيكة',
    tagline: 'زيت زيتون بكر ممتاز عضوي · منتج تونسي',
    hello: (name) => `مرحبًا ${name}،`,
    textIntro: 'شكرًا على طلبكم. سنعود إليكم قريبًا بالأسعار ومواعيد التسليم.',
    sep: ': '
  }
};

/* Au client : accusé de réception dans la langue du site, avec le récapitulatif de sa demande. */
export function confirmationEmail(d) {
  const lang = CONFIRMATION[d.lang] ? d.lang : 'fr';
  const t = CONFIRMATION[lang];
  const { serif, sans, button, label, detailsTable, messageBlock } = kit(t.dir);
  const format = translateValue(FORMATS, d.format, lang);
  const type = translateValue(PROFILES, d.type, lang);
  const phone = d.phone ? `<span dir="ltr">${esc(d.phone)}</span>` : '—';

  const body = `<h1 style="margin:0 0 16px;font-family:${serif};font-size:32px;font-weight:normal;line-height:1.3;color:${C.olive}">${esc(t.thanks(firstName(d.name)))}</h1>
<p style="margin:0 0 28px;font-family:${sans};font-size:15px;line-height:1.8;color:${C.ink}">${esc(t.intro)}</p>
${label(t.summary)}
${detailsTable([
    [t.labels.format, esc(format)],
    [t.labels.qty, esc(d.qty)],
    [t.labels.type, esc(type)],
    [t.labels.phone, phone]
  ])}
${d.message ? messageBlock(t.message, d.message) : ''}
<p style="margin:32px 0 14px;font-family:${sans};font-size:15px;line-height:1.8;color:${C.ink}">${esc(t.more)}</p>
<p style="margin:0">${button(`mailto:${EMAIL}`, t.write)}</p>
<p style="margin:30px 0 0;font-family:${serif};font-size:18px;${t.dir === 'rtl' ? '' : 'font-style:italic;'}color:${C.olive}">${esc(t.sign)}</p>`;

  const footer = `<b dir="ltr" style="color:#EFE7D4;letter-spacing:.14em;font-family:Georgia,serif">DOMAINE THIBICA</b><br>
${esc(t.tagline)}<br>
<span dir="ltr">TBK Oil Export SARL · <a href="mailto:${EMAIL}" style="color:${C.goldLight};text-decoration:none">${EMAIL}</a></span>`;

  const L = t.labels;
  return {
    subject: t.subject,
    html: layout({ lang, dir: t.dir, preheader: t.preheader, eyebrow: t.eyebrow, body, footer }),
    text: `${t.hello(d.name)}\n\n${t.textIntro}\n\n${t.summary}\n${L.format}${t.sep}${format}\n${L.qty}${t.sep}${d.qty}\n${L.type}${t.sep}${type}\n${L.phone}${t.sep}${d.phone || '—'}\n\n${t.message}${t.sep}\n${d.message || '—'}\n\n${t.sign}\n${EMAIL}`
  };
}
