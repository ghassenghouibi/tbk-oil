import { useEffect, useRef, useState } from 'react';
import { CHAPTERS } from '../data.js';

export default function Orchard() {
  const track = useRef(null);
  const [bar, setBar] = useState(10);

  useEffect(() => {
    const t = track.current;
    const onScroll = () => { const m = t.scrollWidth - t.clientWidth; setBar(10 + 90 * (m ? t.scrollLeft / m : 1)); };
    t.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => t.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (dir) => {
    const t = track.current;
    t.scrollBy({ left: dir * (t.querySelector('.chapter').offsetWidth + 22), behavior: 'smooth' });
  };

  return (
    <section id="verger" style={{ paddingBottom: 70 }}>
      <div className="wrap journey-head">
        <div className="reveal">
          <span className="eyebrow">Le verger, de 2019 à aujourd'hui</span>
          <h2 style={{ marginTop: 12 }}>De la terre nue<br />aux premières branches</h2>
        </div>
        <div className="arrows">
          <button aria-label="Chapitre précédent" onClick={() => scroll(-1)}>←</button>
          <button aria-label="Chapitre suivant" onClick={() => scroll(1)}>→</button>
        </div>
      </div>
      <div className="track" ref={track} tabIndex={0} aria-label="Les étapes du verger en photos">
        {CHAPTERS.map(c => (
          <article className="chapter" key={c.n}>
            <div className="ph"><img src={`img/${c.img}`} alt={c.alt} loading="lazy" /></div>
            <span className="n">{c.n}</span><h3>{c.title}</h3><p>{c.text}</p>
          </article>
        ))}
      </div>
      <div className="timeline-bar" aria-hidden="true"><i style={{ width: `${bar}%` }}></i></div>
    </section>
  );
}
