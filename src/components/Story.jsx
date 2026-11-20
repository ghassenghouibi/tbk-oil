import { SectionHeading } from './ui';

/* The three generations. The portraits are pencil drawings: they are blended into the paper
   so they read as part of the page, like engravings on the label. */
const GENERATIONS = [
  { role: 'Le grand-oncle', text: 'Premier gardien de la terre, cultivée en blé', img: 'portrait-grand-oncle.jpg', alt: 'Portrait au crayon du grand-oncle, premier gardien de la terre' },
  { role: 'L\'oncle', text: 'La terre passe de main en main, toujours en céréales', img: 'portrait-oncle.jpg', alt: 'Portrait au crayon de l\'oncle, qui a repris la terre' },
  { role: 'Aujourd\'hui', text: 'Depuis 2019, un verger d\'oliviers biologique', now: true }
];

function OliveSprig() {
  return (
    <svg viewBox="0 0 100 125" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M30 108 C42 84 52 60 70 22" />
        <path d="M44 78 q-20 -4 -24 -20 q16 0 24 20 z M48 68 q20 -10 22 -26 q-16 4 -22 26 z M55 52 q-18 -8 -18 -24 q14 4 18 24 z M61 40 q18 -10 18 -24 q-14 6 -18 24 z M37 93 q18 -4 26 -18 q-16 -2 -26 18 z" />
      </g>
      <g fill="currentColor"><ellipse cx="34" cy="70" rx="5" ry="6.5" transform="rotate(-20 34 70)" /><ellipse cx="66" cy="62" rx="4.5" ry="6" transform="rotate(25 66 62)" /></g>
    </svg>
  );
}

export default function Story() {
  return (
    <section id="histoire">
      <div className="wrap story-grid">
        <div className="story-text reveal">
          <SectionHeading
            eyebrow="Notre histoire"
            title={<>Une terre de famille, <em>replantée</em> pour les générations suivantes</>}
            lead="Cette terre appartient à notre famille depuis des générations. Pendant des décennies, elle a donné du blé, comme partout dans la plaine d'El Fahs."
          />
          <p>Puis les pluies sont devenues imprévisibles et la céréale n'offrait plus la même résilience. Plutôt que de regarder la terre souffrir, nous avons choisi de nous adapter. En 2019, nous avons préparé le sol, puis planté nos premiers oliviers, un par un, à la main.</p>
          <p className="pivot">« J'ai choisi l'olivier. Un olivier ne se plante pas pour une saison, il se plante pour des générations. »</p>
        </div>
        <div className="photo-stack reveal">
          <figure className="ps1"><img src="img/fondateur-olivier.jpg" alt="Le fondateur inspecte les branches d'un olivier du domaine" loading="lazy" /><figcaption>Au milieu de nos oliviers</figcaption></figure>
          <figure className="ps2"><img src="img/verger-aujourdhui.jpg" alt="Le verger d'oliviers aujourd'hui" loading="lazy" /><figcaption>Le verger aujourd'hui</figcaption></figure>
        </div>
      </div>

      <div className="wrap lineage reveal">
        <p className="lineage-title"><span>Trois générations sur la même terre</span></p>
        <ol className="gens">
          {GENERATIONS.map(g => (
            <li className={g.now ? 'gen now' : 'gen'} key={g.role}>
              <div className="medallion">
                {g.img ? <img src={`img/${g.img}`} alt={g.alt} loading="lazy" width="640" height="740" /> : <OliveSprig />}
              </div>
              <b>{g.role}</b>
              <small>{g.text}</small>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
