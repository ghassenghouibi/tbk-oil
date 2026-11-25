import { FORMATS, PROFILES } from './catalog.js';

export default {
  lang: 'en',
  dir: 'ltr',
  path: '/en',
  locale: 'en_GB',
  langName: 'English',
  langShort: 'EN',

  meta: {
    title: 'Domaine Thibica · Organic extra virgin olive oil from Tunisia',
    description: 'Domaine Thibica: organic extra virgin olive oil, grown by our family on our own land in Thibica, near Thuburbo Majus, Tunisia.',
    ogDescription: 'Organic extra virgin olive oil, grown by our family on our own land in Thibica, Tunisia.',
    ogImageAlt: 'Thibica label: engraving of the old Thibica railway station, extra virgin olive oil, product of Tunisia',
    orgDescription: 'Organic extra virgin olive oil from the Koroneiki variety, grown on the family land of Thibica, Zaghouan governorate, Tunisia.'
  },

  nav: {
    links: [
      ['histoire', 'Our story'],
      ['thibica', 'Thibica'],
      ['verger', 'The orchard'],
      ['pressage', 'From fruit to bottle'],
      ['gamme', 'The range'],
      ['lettre', 'The founder']
    ],
    order: 'Order',
    home: 'Domaine Thibica, home',
    openMenu: 'Open menu',
    languages: 'Site language'
  },

  hero: {
    tag: 'Organic extra virgin olive oil, born on our family\'s land a few kilometres from Thuburbo Majus, Tunisia.',
    facts: ['Organic farming', 'Koroneiki variety', 'From our own orchard', 'Zaghouan · Tunisia'],
    range: 'Discover the range',
    story: 'Our story'
  },

  story: {
    eyebrow: 'Our story',
    title: ['A family land, ', 'replanted', ' for the generations to come'],
    lead: 'This land has belonged to our family for generations. For decades it grew wheat, like the rest of the El Fahs plain.',
    text: 'Then the rains became unpredictable and the grain no longer held up as it once did. Rather than watch the land suffer, we chose to adapt. In 2019 we prepared the soil, then planted our first olive trees, one by one, by hand.',
    pivot: '“I chose the olive tree. You don\'t plant an olive tree for a season, you plant it for generations.”',
    photos: [
      { alt: 'The founder inspects the branches of one of the estate\'s olive trees', caption: 'Among our olive trees' },
      { alt: 'The olive orchard today', caption: 'The orchard today' }
    ],
    lineage: 'Three generations on the same land',
    generations: [
      { role: 'The great-uncle', text: 'First keeper of the land, sown with wheat', alt: 'Pencil portrait of the great-uncle, first keeper of the land' },
      { role: 'The uncle', text: 'The land passes from hand to hand, still in grain', alt: 'Pencil portrait of the uncle, who took over the land' },
      { role: 'Today', text: 'Since 2019, an organic olive orchard' }
    ]
  },

  place: {
    eyebrow: 'Why Thibica',
    title: 'A Roman name, a land of olive trees for 2,000 years',
    lead: 'Thibica (Tībīkā) is a locality in the governorate of Zaghouan, in the delegation of El Fahs, near Bir Magra. This is where our oil grows.',
    artAlt: 'Thibica label showing an engraving of the old Thibica railway station',
    items: [
      ['An ancient site', 'Thibica is a Roman-era archaeological site a few kilometres from Thuburbo Majus, Tunisia, one of the most remarkable Roman cities in North Africa. Olive branches are carved into the stone of its temple columns.'],
      ['The Oued Miliane valley', 'East of El Fahs, the Thibica plain belongs to the fertile Oued Miliane valley. Roman mosaics found nearby bear witness to more than 2,000 years of grain and olive trees.'],
      ['The old station', 'The railway halt on the El Fahs–Bouarada line, now in ruins, is the best-known landmark of the place. It is the building engraved on our label.']
    ]
  },

  orchard: {
    eyebrow: 'The orchard, from 2019 to today',
    title: ['From bare earth', 'to the first branches'],
    prev: 'Previous chapter',
    next: 'Next chapter',
    track: 'The orchard\'s stages in photos',
    chapters: [
      { n: '01 · Before 2019', title: 'Wheat land', text: 'Before the olive trees, the land was sown with soft wheat, like everywhere on the El Fahs plain.', alt: 'The land sown with soft wheat before it became an olive grove' },
      { n: '02 · 2019', title: 'It all begins', text: 'The land that once grew wheat is ploughed and prepared for an orchard.', alt: 'Tractor and disc harrow ploughing the bare land' },
      { n: '03', title: 'Preparing the soil', text: 'The soil is worked deep before planting.', alt: 'The tractor and its tillage tool' },
      { n: '04', title: 'Koroneiki saplings', text: 'A variety known for the aromatic richness of its oil and its resistance to drought.', alt: 'Young olive saplings in pots' },
      { n: '05', title: 'Planted by hand', text: 'The women and men of the village plant each tree, row after row.', alt: 'Planting by hand along the rows' },
      { n: '06', title: 'A stake for every tree', text: 'Each young olive tree is guided to grow straight against the wind of the plain.', alt: 'Young sapling tied to its stake' },
      { n: '07', title: 'The first waterings', text: 'The water tank goes from sapling to sapling through the first summers.', alt: 'Water tank pulled by a tractor to water the saplings' },
      { n: '08', title: 'The first shoots', text: 'The branches lengthen and take on their silvery sheen.', alt: 'New olive shoot held in the hand' },
      { n: '09', title: 'The tree takes shape', text: 'The trunk thickens and the crown begins to form.', alt: 'Young olive tree under a blue sky' },
      { n: '10', title: 'Growing together', text: 'The orchard fills out, tree after tree, season after season.', alt: 'An already well-grown olive tree in the orchard' },
      { n: '11 · Today', title: 'Full branches', text: 'The olive trees are now ready to bear fruit.', alt: 'An olive tree with full, drooping branches' },
      { n: '12 · Today', title: 'Domaine Thibica', text: 'An organic orchard designed to last and to be passed on to our children.', alt: 'The mature orchard today' }
    ]
  },

  mill: {
    canvas: '3D animation of the olive oil making steps',
    fallback: ['The 3D animation is not available on this device.', 'The five steps are described below.'],
    eyebrow: 'From fruit to bottle',
    title: 'Five steps to an extra virgin oil',
    lead: 'Follow an olive\'s journey from our orchard to the bottle. A mechanical, cold extraction, with nothing added.',
    hint: 'Scroll down',
    steps: [
      { title: 'The harvest', text: 'The olives are picked as they turn from green to purple, when their aromas are at their most intense. They travel in ventilated crates so they are not bruised.', spec: ['Koroneiki', 'Picked at ripeness'] },
      { title: 'Washing & crushing', text: 'Stripped of leaves and washed, the olives are crushed whole, stone included. The millstones turn the fruit into a thick paste that releases the oil held in the pulp.', spec: ['Whole fruit', 'Same day'] },
      { title: 'Malaxation', text: 'The paste is stirred slowly for long minutes, and the fine droplets of oil come together. The temperature stays low to preserve the aromas and polyphenols.', spec: ['Cold extraction', 'Below 27 °C'] },
      { title: 'Extraction', text: 'By centrifugation, the machine separates the oil from the vegetation water and the pomace. No solvents, no additives: only mechanical force.', spec: ['100% mechanical', 'No additives'] },
      { title: 'Bottling', text: 'The oil rests, then is filled into dark glass that protects it from light. From the 250 ml bottle to the 5 L tin, it reaches your table just as it left the mill.', spec: ['Protective glass', 'Extra virgin'] }
    ]
  },

  range: {
    eyebrow: 'The range',
    title: 'One oil, five sizes',
    lead: 'Our organic extra virgin olive oil, Koroneiki variety, exclusively from our own orchard. Choose the size that suits you.',
    heroAlt: 'The Thibica range: bottles from 250 ml to 1 L, and tins',
    bottleAlt: (vol) => `Thibica bottle, ${vol}`,
    pick: 'Request this size',
    tinLabel: 'EXTRA VIRGIN',
    products: [
      { vol: '250 ml', kind: 'Glass bottle', text: 'The discovery size, ideal as a gift or for tasting.' },
      { vol: '500 ml', kind: 'Glass bottle', text: 'The everyday bottle, for the kitchen and the table.' },
      { vol: '750 ml', kind: 'Glass bottle', text: 'The classic for big family meals.' },
      { vol: '1 L', kind: 'Glass bottle', text: 'For those who cook with nothing but olive oil.' },
      { vol: '5 L', kind: 'Tin', text: 'The household reserve, for families and restaurants.' }
    ],
    promises: [
      ['Organic', 'Trees grown without synthetic fertilisers or pesticides.'],
      ['Extra virgin', 'Cold-extracted by purely mechanical processes.'],
      ['Single estate', 'Every olive comes from our own orchard in Thibica.'],
      ['Traceable', 'From tree to bottle, we know every step.']
    ]
  },

  letter: {
    sideAlt: 'An olive branch from the estate, held in the hand',
    quote: '“A project built to last.”',
    eyebrow: 'A letter from the founder',
    title: 'Thibica is a story of meaning',
    paragraphs: [
      'This land has belonged to my family for generations. It first belonged to my great-uncle, then to my uncle, and today I have the privilege, and the responsibility, of carrying this heritage forward.',
      'As a child, I watched this land produce wheat, as it had for decades. It was a way of life that supported our family and reflected the farming traditions of the region. But like many farmers around the Mediterranean, we have seen the undeniable effects of climate change. The rains have become more and more unpredictable, and grain no longer offers the resilience it once did.',
      'Rather than watch the land suffer, I chose to adapt. I chose the olive tree. Because it is naturally suited to our changing climate, and because it stands for permanence, resilience and renewal. You don\'t plant an olive tree for a season: you plant it for generations.',
      'Thibica, a small ancient Roman village, lies a few kilometres from Thuburbo Majus, in Tunisia. Walking through its ruins, you notice the olive branches carved on the temple columns, a silent reminder that this region has produced exceptional oil for more than two thousand years.',
      'This heritage is not just history. It is an inspiration. With Domaine Thibica, my ambition is not simply to produce olive oil. It is to revive a tradition of excellence and to build a modern, sustainable business that honours our past while embracing the future.',
      'This project brings together agriculture, innovation, craftsmanship and responsible stewardship of the land. It is designed to create value, opportunities for the local community, and a premium Tunisian brand able to reach international markets.',
      'After a career running hotels in the Middle East, South-East Asia and Africa, I have learned that the businesses that succeed are those built on authenticity, a long-term vision and an uncompromising standard of quality. These same principles will guide Domaine Thibica.',
      'Above all, this is a project built to last. I hope that one day my children will walk among these same olive trees, knowing that they did not simply inherit them: these trees will have been protected, improved, and entrusted to the next generation.',
      'Welcome to Domaine Thibica.'
    ],
    name: 'Hakim Karoui',
    role: 'Founder – Domaine THIBICA'
  },

  order: {
    eyebrow: 'Order',
    title: 'Taste Thibica',
    lead: 'Private customer, restaurant, delicatessen or importer: tell us what you need and we\'ll get back to you with prices and lead times.',
    trade: 'Trade orders and exports are handled by TBK Oil Export SARL.',
    direct: 'You can also write to us directly: ',
    logoAlt: 'TBK Oil Export logo',
    motto: 'Tradition · Quality · Excellence',
    profiles: PROFILES.en,
    formats: FORMATS.en,
    labels: { profile: 'You are', name: 'Name', email: 'Email', phone: 'Phone', optional: 'Optional', format: 'Size', qty: 'Quantity', message: 'Message', website: 'Website' },
    placeholder: 'Delivery city, occasion, annual volume for trade customers…',
    errors: { name: 'Please enter your name.', email: 'Please enter a valid email address.', qty: 'At least 1.' },
    submit: 'Send my request',
    sending: 'Sending…',
    sentTitle: 'Thank you, your request has been sent.',
    sentText: (email) => `We'll reply shortly to ${email}.`,
    failedTitle: 'Your request couldn\'t be sent.',
    failedText: 'You can send the same request from your email app.',
    openMail: 'Open in my email app',
    mail: {
      subject: (format) => `Thibica order request (${format})`,
      greeting: 'Hello,',
      intro: 'I would like to order Thibica olive oil.',
      profile: 'Customer type', format: 'Size', qty: 'Quantity'
    }
  },

  footer: {
    tagline: 'Organic extra virgin olive oil · Product of Tunisia',
    navLabel: 'Footer',
    links: [['histoire', 'Story'], ['verger', 'Orchard'], ['pressage', 'Pressing'], ['gamme', 'Range'], ['commander', 'Order']]
  }
};
