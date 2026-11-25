import { FORMATS, PROFILES } from './catalog.js';

export default {
  lang: 'fr',
  dir: 'ltr',
  path: '/',
  locale: 'fr_FR',
  langName: 'Français',
  langShort: 'FR',

  meta: {
    title: 'Domaine Thibica · Huile d\'olive extra vierge biologique de Tunisie',
    description: 'Domaine Thibica : huile d\'olive extra vierge biologique, cultivée par notre famille sur nos propres terres à Thibica, près de Thuburbo Majus, en Tunisie.',
    ogDescription: 'Une huile d\'olive extra vierge biologique, cultivée par notre famille sur nos propres terres à Thibica, en Tunisie.',
    ogImageAlt: 'Étiquette Thibica : l\'ancienne gare de Thibica gravée, huile d\'olive extra vierge, produit de Tunisie',
    orgDescription: 'Huile d\'olive extra vierge biologique de variété Koroneiki, cultivée sur les terres familiales de Thibica, gouvernorat de Zaghouan, Tunisie.'
  },

  nav: {
    links: [
      ['histoire', 'Notre histoire'],
      ['thibica', 'Thibica'],
      ['verger', 'Le verger'],
      ['pressage', 'Du fruit à la bouteille'],
      ['gamme', 'La gamme'],
      ['lettre', 'Le fondateur']
    ],
    order: 'Commander',
    home: 'Domaine Thibica, accueil',
    openMenu: 'Ouvrir le menu',
    languages: 'Langue du site'
  },

  hero: {
    tag: 'Huile d\'olive extra vierge biologique, née sur la terre de notre famille, à quelques kilomètres de Thuburbo Majus, en Tunisie.',
    facts: ['Agriculture biologique', 'Variété Koroneiki', 'De notre propre verger', 'Zaghouan · Tunisie'],
    range: 'Découvrir la gamme',
    story: 'Notre histoire'
  },

  story: {
    eyebrow: 'Notre histoire',
    title: ['Une terre de famille, ', 'replantée', ' pour les générations suivantes'],
    lead: 'Cette terre appartient à notre famille depuis des générations. Pendant des décennies, elle a donné du blé, comme partout dans la plaine d\'El Fahs.',
    text: 'Puis les pluies sont devenues imprévisibles et la céréale n\'offrait plus la même résilience. Plutôt que de regarder la terre souffrir, nous avons choisi de nous adapter. En 2019, nous avons préparé le sol, puis planté nos premiers oliviers, un par un, à la main.',
    pivot: '« J\'ai choisi l\'olivier. Un olivier ne se plante pas pour une saison, il se plante pour des générations. »',
    photos: [
      { alt: 'Le fondateur inspecte les branches d\'un olivier du domaine', caption: 'Au milieu de nos oliviers' },
      { alt: 'Le verger d\'oliviers aujourd\'hui', caption: 'Le verger aujourd\'hui' }
    ],
    lineage: 'Trois générations sur la même terre',
    generations: [
      { role: 'Le grand-oncle', text: 'Premier gardien de la terre, cultivée en blé', alt: 'Portrait au crayon du grand-oncle, premier gardien de la terre' },
      { role: 'L\'oncle', text: 'La terre passe de main en main, toujours en céréales', alt: 'Portrait au crayon de l\'oncle, qui a repris la terre' },
      { role: 'Aujourd\'hui', text: 'Depuis 2019, un verger d\'oliviers biologique' }
    ]
  },

  place: {
    eyebrow: 'Pourquoi Thibica',
    title: 'Un nom romain, une terre d\'oliviers depuis 2 000 ans',
    lead: 'Thibica (Tībīkā) est une localité du gouvernorat de Zaghouan, dans la délégation d\'El Fahs, près de Bir Magra. C\'est là que pousse notre huile.',
    artAlt: 'Étiquette Thibica représentant l\'ancienne gare de Thibica, gravure',
    items: [
      ['Un site antique', 'Thibica est un site archéologique d\'époque romaine, à quelques kilomètres de Thuburbo Majus, en Tunisie, l\'une des plus remarquables cités romaines d\'Afrique du Nord. Sur les colonnes de ses temples, des branches d\'olivier sont sculptées dans la pierre.'],
      ['La vallée de l\'oued Miliane', 'À l\'est d\'El Fahs, la plaine de Thibica appartient à la riche vallée de l\'oued Miliane. Les mosaïques romaines retrouvées dans les environs témoignent de plus de 2 000 ans de céréales et d\'oliviers.'],
      ['L\'ancienne gare', 'La halte ferroviaire de la ligne El Fahs–Bouarada, aujourd\'hui en ruines, est le repère le plus connu du lieu. C\'est elle que l\'on retrouve gravée sur notre étiquette.']
    ]
  },

  orchard: {
    eyebrow: 'Le verger, de 2019 à aujourd\'hui',
    title: ['De la terre nue', 'aux premières branches'],
    prev: 'Chapitre précédent',
    next: 'Chapitre suivant',
    track: 'Les étapes du verger en photos',
    chapters: [
      { n: '01 · Avant 2019', title: 'Une terre à blé', text: 'Avant les oliviers, la terre était plantée en blé tendre, comme partout dans la plaine d\'El Fahs.', alt: 'La terre plantée en blé tendre avant la conversion en oliveraie' },
      { n: '02 · 2019', title: 'Tout commence', text: 'La terre qui donnait du blé est labourée et préparée pour accueillir un verger.', alt: 'Tracteur et pulvériseur labourant la terre nue' },
      { n: '03', title: 'Préparer le sol', text: 'Le sol est travaillé en profondeur avant la plantation.', alt: 'Le tracteur et l\'outil de travail du sol' },
      { n: '04', title: 'Les plants de Koroneiki', text: 'Une variété réputée pour la richesse aromatique de son huile et sa résistance à la sécheresse.', alt: 'Jeunes plants d\'oliviers en godets' },
      { n: '05', title: 'Planter à la main', text: 'Les femmes et les hommes du village plantent chaque arbre, rang après rang.', alt: 'Plantation à la main dans les rangs' },
      { n: '06', title: 'Un tuteur par arbre', text: 'Chaque jeune olivier est guidé pour pousser droit face au vent de la plaine.', alt: 'Jeune plant attaché à son tuteur' },
      { n: '07', title: 'Les premiers arrosages', text: 'La citerne passe de plant en plant pendant les premiers étés.', alt: 'Citerne d\'eau tirée par un tracteur pour arroser les plants' },
      { n: '08', title: 'Les premières pousses', text: 'Les branches s\'allongent et prennent leur reflet argenté.', alt: 'Nouvelle pousse d\'olivier tenue dans la main' },
      { n: '09', title: 'L\'arbre prend forme', text: 'Le tronc s\'épaissit, la couronne se dessine.', alt: 'Jeune olivier sous le ciel bleu' },
      { n: '10', title: 'Grandir ensemble', text: 'Le verger se remplit, arbre après arbre, saison après saison.', alt: 'Un olivier déjà fourni dans le verger' },
      { n: '11 · Aujourd\'hui', title: 'Des branches pleines', text: 'Les oliviers sont désormais prêts à donner leurs fruits.', alt: 'Un olivier aux branches pleines et retombantes' },
      { n: '12 · Aujourd\'hui', title: 'Le Domaine Thibica', text: 'Un verger biologique pensé pour durer et être transmis à nos enfants.', alt: 'Le verger adulte aujourd\'hui' }
    ]
  },

  mill: {
    canvas: 'Animation 3D des étapes de fabrication de l\'huile d\'olive',
    fallback: ['L\'animation 3D n\'est pas disponible sur cet appareil.', 'Les cinq étapes sont décrites ci-dessous.'],
    eyebrow: 'Du fruit à la bouteille',
    title: 'Cinq étapes pour une huile extra vierge',
    lead: 'Suivez le voyage d\'une olive de notre verger jusqu\'à la bouteille. Une extraction mécanique, à froid, sans aucun ajout.',
    hint: 'Faites défiler',
    steps: [
      { title: 'La récolte', text: 'Les olives sont cueillies quand elles virent du vert au violet, au moment où leurs arômes sont les plus intenses. Elles sont transportées en caisses ajourées pour ne pas s\'abîmer.', spec: ['Koroneiki', 'Récolte à maturité'] },
      { title: 'Lavage & broyage', text: 'Effeuillées puis lavées, les olives sont broyées entières, noyau compris. Les meules transforment le fruit en une pâte épaisse qui libère l\'huile contenue dans la pulpe.', spec: ['Fruit entier', 'Le jour même'] },
      { title: 'Le malaxage', text: 'La pâte est brassée lentement pendant de longues minutes. Les fines gouttelettes d\'huile se rassemblent. La température reste basse pour préserver les arômes et les polyphénols.', spec: ['Extraction à froid', 'Moins de 27 °C'] },
      { title: 'L\'extraction', text: 'Par centrifugation, la machine sépare l\'huile de l\'eau de végétation et des grignons. Aucun solvant, aucun additif : seule la force mécanique agit.', spec: ['100 % mécanique', 'Sans additif'] },
      { title: 'La mise en bouteille', text: 'L\'huile repose, puis est conditionnée dans un verre foncé qui la protège de la lumière. De la bouteille de 250 ml au bidon de 5 L, elle arrive à votre table telle qu\'elle est sortie du moulin.', spec: ['Verre protecteur', 'Extra vierge'] }
    ]
  },

  range: {
    eyebrow: 'La gamme',
    title: 'Une seule huile, cinq formats',
    lead: 'Notre huile d\'olive extra vierge biologique, de variété Koroneiki, issue exclusivement de notre verger. Choisissez le format qui vous ressemble.',
    heroAlt: 'La gamme Thibica : bouteilles de 250 ml à 1 L et bidons',
    bottleAlt: (vol) => `Bouteille Thibica ${vol}`,
    pick: 'Demander ce format',
    tinLabel: 'EXTRA VIERGE',
    products: [
      { vol: '250 ml', kind: 'Bouteille verre', text: 'Le format découverte, idéal à offrir ou pour goûter.' },
      { vol: '500 ml', kind: 'Bouteille verre', text: 'La bouteille du quotidien, en cuisine comme à table.' },
      { vol: '750 ml', kind: 'Bouteille verre', text: 'Le classique des grandes tablées familiales.' },
      { vol: '1 L', kind: 'Bouteille verre', text: 'Pour ceux qui ne cuisinent qu\'à l\'huile d\'olive.' },
      { vol: '5 L', kind: 'Bidon', text: 'La réserve de la maison, pour les familles et les restaurants.' }
    ],
    promises: [
      ['Biologique', 'Des arbres cultivés sans engrais ni pesticides de synthèse.'],
      ['Extra vierge', 'Extraite à froid, par des procédés uniquement mécaniques.'],
      ['Mono-domaine', 'Des olives qui viennent toutes de notre propre verger de Thibica.'],
      ['Traçable', 'De l\'arbre à la bouteille, nous connaissons chaque étape.']
    ]
  },

  letter: {
    sideAlt: 'Une branche d\'olivier du domaine, tenue dans la main',
    quote: '« Un projet construit pour durer. »',
    eyebrow: 'Lettre du fondateur',
    title: 'Thibica est une histoire de sens',
    paragraphs: [
      'Cette terre appartient à ma famille depuis des générations. Elle a d\'abord appartenu à mon grand-oncle, puis à mon oncle, et j\'ai aujourd\'hui le privilège, et la responsabilité, de porter cet héritage.',
      'Enfant, j\'ai vu cette terre produire du blé, comme elle l\'avait fait pendant des décennies. C\'était un mode de vie qui faisait vivre notre famille et reflétait les traditions agricoles de la région. Mais comme beaucoup d\'agriculteurs autour de la Méditerranée, nous avons vu l\'effet indéniable du changement climatique. Les pluies sont devenues de plus en plus imprévisibles, et la céréale n\'offre plus la résilience d\'autrefois.',
      'Plutôt que de regarder la terre souffrir, j\'ai choisi de m\'adapter. J\'ai choisi l\'olivier. Parce qu\'il est naturellement adapté à notre climat qui change, et parce qu\'il représente la permanence, la résilience et le renouveau. Un olivier ne se plante pas pour une saison : il se plante pour des générations.',
      'Thibica, petit village romain antique, se trouve à quelques kilomètres de Thuburbo Majus, en Tunisie. En marchant dans ses ruines, on remarque les branches d\'olivier sculptées sur les colonnes des temples, rappel silencieux que cette région produit une huile d\'exception depuis plus de deux mille ans.',
      'Cet héritage n\'est pas seulement de l\'histoire. C\'est une inspiration. Avec le Domaine Thibica, mon ambition n\'est pas simplement de produire de l\'huile d\'olive. C\'est de faire revivre une tradition d\'excellence et de bâtir une entreprise moderne et durable, qui honore notre passé tout en embrassant l\'avenir.',
      'Ce projet réunit agriculture, innovation, savoir-faire et gestion responsable de la terre. Il est pensé pour créer de la valeur, des opportunités pour la communauté locale, et une marque tunisienne premium capable de rejoindre les marchés internationaux.',
      'Après une carrière à diriger des établissements hôteliers au Moyen-Orient, en Asie du Sud-Est et en Afrique, j\'ai appris que les entreprises qui réussissent sont celles qui reposent sur l\'authenticité, une vision à long terme et une exigence de qualité sans compromis. Ce sont ces mêmes principes qui guideront le Domaine Thibica.',
      'Avant tout, c\'est un projet construit pour durer. J\'espère qu\'un jour mes enfants marcheront parmi ces mêmes oliviers, en sachant qu\'ils n\'en ont pas simplement hérité : ces arbres auront été protégés, améliorés, et confiés à la génération suivante.',
      'Bienvenue au Domaine Thibica.'
    ],
    name: 'Hakim Karoui',
    role: 'Fondateur – Domaine THIBICA'
  },

  order: {
    eyebrow: 'Commander',
    title: 'Goûtez Thibica',
    lead: 'Particulier, restaurant, épicerie fine ou importateur : dites-nous ce qu\'il vous faut, nous revenons vers vous avec les prix et les délais.',
    trade: 'Les commandes professionnelles et l\'export sont gérés par TBK Oil Export SARL.',
    direct: 'Vous pouvez aussi nous écrire directement : ',
    logoAlt: 'Logo TBK Oil Export',
    motto: 'Tradition · Qualité · Excellence',
    profiles: PROFILES.fr,
    formats: FORMATS.fr,
    labels: { profile: 'Vous êtes', name: 'Nom', email: 'E-mail', phone: 'Téléphone', optional: 'Facultatif', format: 'Format', qty: 'Quantité', message: 'Message', website: 'Site web' },
    placeholder: 'Ville de livraison, occasion, volume annuel pour les professionnels…',
    errors: { name: 'Indiquez votre nom.', email: 'Indiquez une adresse e-mail valide.', qty: 'Au moins 1.' },
    submit: 'Envoyer ma demande',
    sending: 'Envoi en cours…',
    sentTitle: 'Merci, votre demande est bien envoyée.',
    sentText: (email) => `Nous vous répondons rapidement à l'adresse ${email}.`,
    failedTitle: 'L\'envoi n\'a pas abouti.',
    failedText: 'Vous pouvez nous envoyer la même demande depuis votre messagerie.',
    openMail: 'Ouvrir dans ma messagerie',
    mail: {
      subject: (format) => `Demande de commande Thibica (${format})`,
      greeting: 'Bonjour,',
      intro: 'Je souhaite commander l\'huile d\'olive Thibica.',
      profile: 'Profil', format: 'Format', qty: 'Quantité'
    }
  },

  footer: {
    tagline: 'Huile d\'olive extra vierge biologique · Produit de Tunisie',
    navLabel: 'Pied de page',
    links: [['histoire', 'Histoire'], ['verger', 'Verger'], ['pressage', 'Pressage'], ['gamme', 'Gamme'], ['commander', 'Commander']]
  }
};
