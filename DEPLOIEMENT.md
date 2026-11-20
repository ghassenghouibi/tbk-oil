# Déploiement · Domaine Thibica

## Développement local

```bash
npm install
# Remplissez SMTP_PASS dans .env.local (mot de passe de la boîte OVH info@thibica.com)
npm run dev        # http://localhost:5173 : le site et /api/contact
```

## Mise en ligne avec la CLI Vercel

```bash
npm i -g vercel@latest
vercel login
npm run deploy:preview   # 1re fois : répondez aux questions, gardez les réglages Vite détectés
```

### Ajouter les variables d'environnement (une seule fois)

Le fichier `.env.local` n'est **pas** envoyé à Vercel. Ajoutez chaque variable de `.env.example`
pour la production et la préversion (Preview) :

```bash
vercel env add SMTP_HOST                # ssl0.ovh.net
vercel env add SMTP_PORT                # 465
vercel env add SMTP_USER                # info@thibica.com
vercel env add SMTP_PASS                # le mot de passe de la boîte OVH
vercel env add MAIL_FROM                # Domaine Thibica <info@thibica.com>
vercel env add MAIL_TO                  # info@thibica.com
vercel env add MAIL_SEND_CONFIRMATION   # true
```

Vous pouvez aussi passer par le tableau de bord : Project → Settings → Environment Variables.
Une modification de variable ne s'applique qu'au **prochain** déploiement.

```bash
npm run deploy           # mise en production
```

### Vérifier l'envoi

Envoyez une demande depuis le formulaire « Commander » du site en ligne.
Le message doit arriver dans info@thibica.com, avec le client en « Répondre à ».
En cas d'échec : `vercel logs <url-du-déploiement>` et cherchez `[contact]`.

## Côté OVH (à vérifier une fois)

- **Bonne offre SMTP** : MX Plan (inclus avec le domaine) = `ssl0.ovh.net:465`.
  Email Pro = `pro1.mail.ovh.net:587`. Exchange = l'hôte affiché dans l'espace client, port 587.
- **Mot de passe** : celui de la boîte info@thibica.com (Espace client OVH → Emails → la boîte → Modifier le mot de passe).
- **SPF / DKIM** : dans la zone DNS de thibica.com, vérifiez que l'enregistrement SPF contient
  `include:mx.ovh.com` et activez DKIM dans l'espace client OVH (Emails → DKIM). Sans ça,
  l'accusé de réception envoyé aux clients risque d'arriver en spam.

## Nom de domaine

Pour servir le site sur thibica.com : `vercel domains add thibica.com`, puis suivez les
enregistrements DNS indiqués (à créer dans la zone DNS OVH). **Ne touchez pas aux enregistrements MX**,
ce sont eux qui font fonctionner la boîte mail OVH.
