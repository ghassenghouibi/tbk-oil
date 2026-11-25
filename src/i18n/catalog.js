/* Lists shared by the order form and the server e-mails. The same index means the same thing in every
   language, so the form sends the French value to the team and the e-mail templates can translate it back. */
export const LANGS = ['fr', 'en', 'ar'];

export const FORMATS = {
  fr: ['Bouteille verre 250 ml', 'Bouteille verre 500 ml', 'Bouteille verre 750 ml', 'Bouteille verre 1 L', 'Bidon 5 L', 'Plusieurs formats'],
  en: ['250 ml glass bottle', '500 ml glass bottle', '750 ml glass bottle', '1 L glass bottle', '5 L tin', 'Several sizes'],
  ar: ['قارورة زجاجية 250 مل', 'قارورة زجاجية 500 مل', 'قارورة زجاجية 750 مل', 'قارورة زجاجية 1 لتر', 'صفيحة 5 لترات', 'عدة أحجام']
};

export const PROFILES = {
  fr: ['Particulier', 'Professionnel / export'],
  en: ['Private customer', 'Trade / export'],
  ar: ['فرد', 'مهني / تصدير']
};

/* French value → same entry in `lang` (falls back to the value itself). */
export function translateValue(list, value, lang) {
  const i = list.fr.indexOf(value);
  return i < 0 ? value : list[lang]?.[i] ?? value;
}
