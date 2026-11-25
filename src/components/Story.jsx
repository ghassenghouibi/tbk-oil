import { GENERATION_IMAGES } from '../data.js';
import { useT } from '../i18n';
import { SectionHeading } from './ui';

/* The three generations. The portraits are pencil drawings: they are blended into the paper
   so they read as part of the page, like engravings on the label. */
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
  const { story: s } = useT();
  const [before, em, after] = s.title;
  return (
    <section id="histoire">
      <div className="wrap story-grid">
        <div className="story-text reveal">
          <SectionHeading eyebrow={s.eyebrow} title={<>{before}<em>{em}</em>{after}</>} lead={s.lead} />
          <p>{s.text}</p>
          <p className="pivot">{s.pivot}</p>
        </div>
        <div className="photo-stack reveal">
          <figure className="ps1"><img src="/img/fondateur-olivier.jpg" alt={s.photos[0].alt} loading="lazy" /><figcaption>{s.photos[0].caption}</figcaption></figure>
          <figure className="ps2"><img src="/img/verger-aujourdhui.jpg" alt={s.photos[1].alt} loading="lazy" /><figcaption>{s.photos[1].caption}</figcaption></figure>
        </div>
      </div>

      <div className="wrap lineage reveal">
        <p className="lineage-title"><span>{s.lineage}</span></p>
        <ol className="gens">
          {s.generations.map((g, i) => {
            const img = GENERATION_IMAGES[i];
            return (
              <li className={img ? 'gen' : 'gen now'} key={i}>
                <div className="medallion">
                  {img ? <img src={`/img/${img}`} alt={g.alt} loading="lazy" width="640" height="740" /> : <OliveSprig />}
                </div>
                <b>{g.role}</b>
                <small>{g.text}</small>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
