// ← Renseignez ici l'adresse qui reçoit les demandes de commande.
export const CONTACT_EMAIL = '';

export const reduceMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const NAV_LINKS = [
  ['histoire', 'Notre histoire'],
  ['thibica', 'Thibica'],
  ['verger', 'Le verger'],
  ['pressage', 'Du fruit à la bouteille'],
  ['gamme', 'La gamme'],
  ['lettre', 'Le fondateur']
];

export const FORMATS = [
  'Bouteille verre 250 ml',
  'Bouteille verre 500 ml',
  'Bouteille verre 750 ml',
  'Bouteille verre 1 L',
  'Bidon 5 L',
  'Plusieurs formats'
];

export const PRODUCTS = [
  { vol: '250 ml', img: 'bouteille-1.jpg', kind: 'Bouteille verre', h: .62, text: 'Le format découverte, idéal à offrir ou pour goûter.' },
  { vol: '500 ml', img: 'bouteille-2.jpg', kind: 'Bouteille verre', h: .78, text: 'La bouteille du quotidien, en cuisine comme à table.' },
  { vol: '750 ml', img: 'bouteille-3.jpg', kind: 'Bouteille verre', h: .9, text: 'Le classique des grandes tablées familiales.' },
  { vol: '1 L', img: 'bouteille-4.jpg', kind: 'Bouteille verre', h: 1, text: 'Pour ceux qui ne cuisinent qu\'à l\'huile d\'olive.' },
  { vol: '5 L', kind: 'Bidon', h: 1, tin: true, text: 'La réserve de la maison, pour les familles et les restaurants.' }
];

export const CHAPTERS = [
  { img: 'terre-ble.jpg', alt: 'La terre plantée en blé tendre avant la conversion en oliveraie', n: '01 · Avant 2019', title: 'Une terre à blé', text: 'Avant les oliviers, la terre était plantée en blé tendre, comme partout dans la plaine d\'El Fahs.' },
  { img: 'labour-2019.jpg', alt: 'Tracteur et pulvériseur labourant la terre nue', n: '02 · 2019', title: 'Tout commence', text: 'La terre qui donnait du blé est labourée et préparée pour accueillir un verger.' },
  { img: 'fondateur-tracteur.jpg', alt: 'Le tracteur et l\'outil de travail du sol', n: '03', title: 'Préparer le sol', text: 'Le sol est travaillé en profondeur avant la plantation.' },
  { img: 'plants.jpg', alt: 'Jeunes plants d\'oliviers en godets', n: '04', title: 'Les plants de Koroneiki', text: 'Une variété réputée pour la richesse aromatique de son huile et sa résistance à la sécheresse.' },
  { img: 'plantation.jpg', alt: 'Plantation à la main dans les rangs', n: '05', title: 'Planter à la main', text: 'Les femmes et les hommes du village plantent chaque arbre, rang après rang.' },
  { img: 'jeune-plant.jpg', alt: 'Jeune plant attaché à son tuteur', n: '06', title: 'Un tuteur par arbre', text: 'Chaque jeune olivier est guidé pour pousser droit face au vent de la plaine.' },
  { img: 'arrosage.jpg', alt: 'Citerne d\'eau tirée par un tracteur pour arroser les plants', n: '07', title: 'Les premiers arrosages', text: 'La citerne passe de plant en plant pendant les premiers étés.' },
  { img: 'pousse.jpg', alt: 'Nouvelle pousse d\'olivier tenue dans la main', n: '08', title: 'Les premières pousses', text: 'Les branches s\'allongent et prennent leur reflet argenté.' },
  { img: 'jeune-olivier.jpg', alt: 'Jeune olivier sous le ciel bleu', n: '09', title: 'L\'arbre prend forme', text: 'Le tronc s\'épaissit, la couronne se dessine.' },
  { img: 'olivier-croissance.jpg', alt: 'Un olivier déjà fourni dans le verger', n: '10', title: 'Grandir ensemble', text: 'Le verger se remplit, arbre après arbre, saison après saison.' },
  { img: 'olivier-charge.jpg', alt: 'Un olivier aux branches pleines et retombantes', n: '11 · Aujourd\'hui', title: 'Des branches pleines', text: 'Les oliviers sont désormais prêts à donner leurs fruits.' },
  { img: 'verger-aujourdhui.jpg', alt: 'Le verger adulte aujourd\'hui', n: '12 · Aujourd\'hui', title: 'Le Domaine Thibica', text: 'Un verger biologique pensé pour durer et être transmis à nos enfants.' }
];

export const STEPS = [
  { title: 'La récolte', text: 'Les olives sont cueillies quand elles virent du vert au violet, au moment où leurs arômes sont les plus intenses. Elles sont transportées en caisses ajourées pour ne pas s\'abîmer.', spec: ['Koroneiki', 'Récolte à maturité'] },
  { title: 'Lavage & broyage', text: 'Effeuillées puis lavées, les olives sont broyées entières, noyau compris. Les meules transforment le fruit en une pâte épaisse qui libère l\'huile contenue dans la pulpe.', spec: ['Fruit entier', 'Le jour même'] },
  { title: 'Le malaxage', text: 'La pâte est brassée lentement pendant de longues minutes. Les fines gouttelettes d\'huile se rassemblent. La température reste basse pour préserver les arômes et les polyphénols.', spec: ['Extraction à froid', 'Moins de 27 °C'] },
  { title: 'L\'extraction', text: 'Par centrifugation, la machine sépare l\'huile de l\'eau de végétation et des grignons. Aucun solvant, aucun additif : seule la force mécanique agit.', spec: ['100 % mécanique', 'Sans additif'] },
  { title: 'La mise en bouteille', text: 'L\'huile repose, puis est conditionnée dans un verre foncé qui la protège de la lumière. De la bouteille de 250 ml au bidon de 5 L, elle arrive à votre table telle qu\'elle est sortie du moulin.', spec: ['Verre protecteur', 'Extra vierge'] }
];
