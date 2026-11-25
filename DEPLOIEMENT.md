# Déploiement · Domaine Thibica

## Envoi des e-mails (Resend)

Le formulaire « Commander » envoie les e-mails via **Resend** (domaine `thibica.com` vérifié dans Resend),
depuis `no-reply@thibica.com`, vers `info@thibica.com`. Le site utilise une **clé API Resend** et jamais le
mot de passe de la boîte OVH : on peut changer ce mot de passe librement, le formulaire continue de marcher.

## Développement local

```bash
npm install
# Copiez .env.example en .env.local et mettez la clé API Resend dans SMTP_PASS
npm run dev        # http://localhost:5173 : le site et /api/contact
```

## Mise en ligne avec la CLI Vercel

```bash
npm run deploy:preview   # préversion
npm run deploy           # mise en production
```

### Variables d'environnement

Le fichier `.env.local` n'est **pas** envoyé à Vercel. Les variables de `.env.example` sont définies sur Vercel
pour Production et Preview (Project → Settings → Environment Variables, ou `vercel env add`) :
`SMTP_HOST=smtp.resend.com`, `SMTP_PORT=465`, `SMTP_USER=resend`, `SMTP_PASS=<clé API Resend>`,
`MAIL_FROM`, `MAIL_TO`, `MAIL_REPLY_TO`, `MAIL_SEND_CONFIRMATION`.
Une modification de variable ne s'applique qu'au **prochain** déploiement.

### Vérifier l'envoi

Envoyez une demande depuis le formulaire « Commander » du site en ligne.
Le message doit arriver dans info@thibica.com, avec le client en « Répondre à ».
Chaque envoi apparaît dans le tableau de bord Resend (Emails).
En cas d'échec : `vercel logs <url-du-déploiement>` et cherchez `[contact]`.

## Côté DNS (OVH)

Les enregistrements Resend (DKIM `resend._domainkey`, et MX/SPF sur le sous-domaine `send`) doivent rester
dans la zone DNS de thibica.com. **Ne touchez pas aux enregistrements MX du domaine principal**, ce sont eux
qui font fonctionner la boîte mail OVH.

## Nom de domaine

L'adresse officielle du site est **https://www.thibica.com** : c'est elle qui figure dans la balise canonique,
le sitemap, robots.txt, les balises Open Graph et les données structurées (`index.html`, `public/`).
Sur Vercel, `thibica.com` redirige en 308 vers `www.thibica.com`, et `thibica.vercel.app` aussi (`vercel.json`),
pour qu'une seule adresse soit indexée. Si le domaine principal change un jour, changez-le à tous ces endroits.

Pour ajouter un domaine : `vercel domains add <domaine>`, puis suivez les enregistrements DNS indiqués
(à créer dans la zone DNS OVH). **Ne touchez pas aux enregistrements MX**, ce sont eux qui font fonctionner
la boîte mail OVH.

## Référencement (SEO)

Le site est une seule page React, **pré-rendue au build** (`npm run build` lance `scripts/prerender.js`) :
`dist/index.html` contient déjà tout le texte, que les moteurs de recherche et les aperçus de partage lisent
sans exécuter de JavaScript. Après la mise en ligne, déclarez `https://www.thibica.com/sitemap.xml` dans
Google Search Console et Bing Webmaster Tools.
