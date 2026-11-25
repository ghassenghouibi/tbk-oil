/* E-mails HTML aux couleurs de Thibica pour le formulaire de commande. Les messageries ignorent les <style> et le CSS
   moderne : mise en page en tableaux, styles en ligne, polices sûres et aucune image (rien à bloquer). Chaque modèle
   renvoie aussi une version texte pour les messageries qui n'affichent pas le HTML. */

const C = {
  paper: '#F3ECDD',
  paper2: '#E9DFCA',
  page: '#E6DFCF',
  ink: '#1F2A1B',
  inkSoft: '#4A5541',
  olive: '#2F3D25',
  mill: '#161D12',
  gold: '#B98A2E',
  goldLight: '#E2BD62',
  line: '#DDD3BD'
};
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "'Helvetica Neue',Arial,Helvetica,sans-serif";
const EMAIL = 'info@thibica.com';

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const multiline = (s) => esc(s).replace(/\r?\n/g, '<br>');
const firstName = (name) => name.trim().split(/\s+/)[0] || name;
const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;
const sentAt = () => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Africa/Tunis' }).format(new Date());

function button(href, label, primary = true) {
  const bg = primary ? C.olive : C.paper;
  const color = primary ? '#FFFFFF' : C.olive;
  return `<a href="${esc(href)}" style="display:inline-block;background:${bg};border:1px solid ${C.olive};color:${color};font-family:${SANS};font-size:14px;font-weight:bold;text-decoration:none;padding:13px 26px;border-radius:999px;margin:0 8px 10px 0">${esc(label)}</a>`;
}

function label(text, top = 0) {
  return `<p style="margin:${top}px 0 10px;font-family:${SERIF};font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:${C.gold}">${esc(text)}</p>`;
}

/* Rows are [label, html value]; values must already be escaped. */
function detailsTable(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
${rows.map(([k, v]) => `<tr>
<td valign="top" style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${C.inkSoft};width:120px">${esc(k)}</td>
<td valign="top" style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;color:${C.ink}">${v}</td>
</tr>`).join('\n')}
</table>`;
}

function messageBlock(title, message) {
  return `${label(title, 28)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:${C.paper};border-left:3px solid ${C.gold};padding:18px 22px;font-family:${SERIF};font-size:16px;font-style:italic;line-height:1.6;color:${C.ink}">${multiline(message)}</td>
</tr></table>`;
}

function layout({ preheader, eyebrow, body, footer }) {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Domaine Thibica</title></head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.page}">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFDF8">
<tr><td align="center" bgcolor="${C.mill}" style="background:${C.mill};padding:34px 40px 28px">
<div style="font-family:${SERIF};font-size:12px;letter-spacing:.32em;color:${C.goldLight}">DOMAINE</div>
<div style="font-family:${SERIF};font-size:34px;letter-spacing:.14em;color:#FFFFFF;line-height:1.1;margin-top:4px">THIBICA</div>
<div style="width:48px;height:1px;background:${C.gold};margin:14px auto 12px;line-height:1px;font-size:0">&nbsp;</div>
<div style="font-family:${SERIF};font-size:15px;font-style:italic;color:#D9CFB5">${esc(eyebrow)}</div>
</td></tr>
<tr><td style="padding:36px 40px 40px">${body}</td></tr>
<tr><td align="center" bgcolor="${C.olive}" style="background:${C.olive};padding:24px 40px;font-family:${SANS};font-size:12px;line-height:1.7;color:#C9C1AB">${footer}</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

const brandFooter = `<b style="color:#EFE7D4;letter-spacing:.14em;font-family:${SERIF}">DOMAINE THIBICA</b><br>
Huile d'olive extra vierge biologique · Produit de Tunisie<br>
TBK Oil Export SARL · <a href="mailto:${EMAIL}" style="color:${C.goldLight};text-decoration:none">${EMAIL}</a>`;

/* À l'équipe : nouvelle demande de commande. `d` est la demande déjà nettoyée par handleContact. */
export function orderEmail(d) {
  const rows = [['Profil', d.type], ['Nom', d.name], ['E-mail', d.email], ['Téléphone', d.phone || '—'], ['Format', d.format], ['Quantité', d.qty]];
  const replyHref = `mailto:${d.email}?subject=${encodeURIComponent(`Votre demande de commande Thibica (${d.format})`)}`;

  const body = `${label(d.type)}
<h1 style="margin:0 0 4px;font-family:${SERIF};font-size:30px;font-weight:normal;line-height:1.2;color:${C.olive}">${esc(d.name)}</h1>
<p style="margin:0 0 24px;font-family:${SANS};font-size:14px;color:${C.inkSoft}">${esc(sentAt())}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px"><tr>
<td width="50%" bgcolor="${C.paper}" style="background:${C.paper};padding:16px 20px;border-right:2px solid #FFFDF8">
<div style="font-family:${SANS};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.inkSoft}">Format</div>
<div style="font-family:${SERIF};font-size:20px;color:${C.olive};margin-top:4px">${esc(d.format)}</div></td>
<td width="50%" bgcolor="${C.paper}" style="background:${C.paper};padding:16px 20px;border-left:2px solid #FFFDF8">
<div style="font-family:${SANS};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.inkSoft}">Quantité</div>
<div style="font-family:${SERIF};font-size:20px;color:${C.olive};margin-top:4px">${esc(d.qty)}</div></td>
</tr></table>
${detailsTable([
    ['Nom', esc(d.name)],
    ['E-mail', `<a href="mailto:${esc(d.email)}" style="color:${C.olive}">${esc(d.email)}</a>`],
    ['Téléphone', d.phone ? `<a href="${esc(telHref(d.phone))}" style="color:${C.olive}">${esc(d.phone)}</a>` : '—'],
    ['Profil', esc(d.type)]
  ])}
${messageBlock('Message', d.message || '—')}
<p style="margin:30px 0 0">${button(replyHref, `Répondre à ${firstName(d.name)}`)}${d.phone ? button(telHref(d.phone), 'Appeler', false) : ''}</p>`;

  return {
    subject: `Demande de commande Thibica · ${d.format} · ${d.name}`,
    html: layout({
      preheader: `${d.name} · ${d.qty} × ${d.format}${d.message ? ` · ${d.message.slice(0, 100)}` : ''}`,
      eyebrow: 'Nouvelle demande de commande',
      body,
      footer: `Envoyé depuis le formulaire « Commander » du site. Répondre à cet e-mail écrit directement à ${esc(d.name)}.`
    }),
    text: `Nouvelle demande de commande\n\n${rows.map(([k, v]) => `${k} : ${v}`).join('\n')}\n\nMessage :\n${d.message || '—'}`
  };
}

/* Au client : accusé de réception avec le récapitulatif de sa demande. */
export function confirmationEmail(d) {
  const body = `<h1 style="margin:0 0 16px;font-family:${SERIF};font-size:32px;font-weight:normal;line-height:1.2;color:${C.olive}">Merci, ${esc(firstName(d.name))}.</h1>
<p style="margin:0 0 28px;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.ink}">Votre demande est bien arrivée au domaine. Nous revenons vers vous très vite avec les prix, les délais et les modalités de livraison.</p>
${label('Récapitulatif de votre demande')}
${detailsTable([
    ['Format', esc(d.format)],
    ['Quantité', esc(d.qty)],
    ['Profil', esc(d.type)],
    ['Téléphone', esc(d.phone || '—')]
  ])}
${d.message ? messageBlock('Votre message', d.message) : ''}
<p style="margin:32px 0 14px;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.ink}">Une précision à ajouter ? Répondez simplement à cet e-mail.</p>
<p style="margin:0">${button(`mailto:${EMAIL}`, 'Nous écrire')}</p>
<p style="margin:30px 0 0;font-family:${SERIF};font-size:18px;font-style:italic;color:${C.olive}">L'équipe du Domaine Thibica</p>`;

  return {
    subject: 'Nous avons bien reçu votre demande · Domaine Thibica',
    html: layout({
      preheader: 'Merci pour votre demande. Nous revenons vers vous avec les prix et les délais.',
      eyebrow: 'Demande bien reçue',
      body,
      footer: brandFooter
    }),
    text: `Bonjour ${d.name},\n\nMerci pour votre demande. Nous revenons vers vous rapidement avec les prix et les délais.\n\nRécapitulatif :\nFormat : ${d.format}\nQuantité : ${d.qty}\nProfil : ${d.type}\nTéléphone : ${d.phone || '—'}\n\nMessage :\n${d.message || '—'}\n\nL'équipe du Domaine Thibica\n${EMAIL}`
  };
}
