import { useT } from '../i18n';
import { SectionHeading } from './ui';

const NUMERALS = ['I', 'II', 'III'];

export default function Place() {
  const { place: p } = useT();
  return (
    <section className="place" id="thibica">
      <div className="wrap place-grid">
        <div className="place-art reveal">
          <img src="/img/etiquette.jpg" alt={p.artAlt} loading="lazy" />
        </div>
        <div className="reveal">
          <SectionHeading eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
          <div className="place-list">
            {p.items.map(([title, text], i) => (
              <div className="place-item" key={NUMERALS[i]}><span className="k latin">{NUMERALS[i]}</span><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
