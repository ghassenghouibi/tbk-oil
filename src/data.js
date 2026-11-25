// Adresse publique affichée sur le site. L'envoi réel passe par /api/contact (voir .env.example).
// Les textes sont dans src/i18n/ (fr, en, ar) ; ce fichier ne garde que ce qui ne se traduit pas.
export const CONTACT_EMAIL = 'info@thibica.com';

export const reduceMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Same order as range.products in the dictionaries.
export const PRODUCTS = [
  { img: 'bouteille-1.jpg', h: .62 },
  { img: 'bouteille-2.jpg', h: .78 },
  { img: 'bouteille-3.jpg', h: .9 },
  { img: 'bouteille-4.jpg', h: 1 },
  { h: 1, tin: true }
];

// Same order as orchard.chapters in the dictionaries.
export const CHAPTER_IMAGES = [
  'terre-ble.jpg', 'labour-2019.jpg', 'fondateur-tracteur.jpg', 'plants.jpg', 'plantation.jpg', 'jeune-plant.jpg',
  'arrosage.jpg', 'pousse.jpg', 'jeune-olivier.jpg', 'olivier-croissance.jpg', 'olivier-charge.jpg', 'verger-aujourdhui.jpg'
];

// Same order as story.generations; the last one (today) has no portrait.
export const GENERATION_IMAGES = ['portrait-grand-oncle.jpg', 'portrait-oncle.jpg', null];
