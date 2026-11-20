import { useEffect, useRef } from 'react';
import { CHAPTERS } from '../data.js';
import { IconButton, SectionHeading } from './ui';

export default function Orchard() {
  const track = useRef(null), bar = useRef(null);

  /* The progress bar is driven straight from the scroll position (once per frame, transform only),
     so scrolling the carousel never re-renders the twelve chapters. */
  useEffect(() => {
    const t = track.current;
    let raf = 0;
    const paint = () => { raf = 0; const m = t.scrollWidth - t.clientWidth; bar.current.style.transform = `scaleX(${.1 + .9 * (m ? t.scrollLeft / m : 1)})`; };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    t.addEventListener('scroll', onScroll, { passive: true }); paint();
    return () => { t.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const scroll = (dir) => {
    const t = track.current;
    t.scrollBy({ left: dir * (t.querySelector('.chapter').offsetWidth + 22), behavior: 'smooth' });
  };

  return (
    <section id="verger" style={{ paddingBottom: 70 }}>
      <div className="wrap journey-head">
        <SectionHeading className="reveal" eyebrow="Le verger, de 2019 à aujourd'hui" title={<>De la terre nue<br />aux premières branches</>} />
        <div className="arrows">
          <IconButton label="Chapitre précédent" onClick={() => scroll(-1)}>←</IconButton>
          <IconButton label="Chapitre suivant" onClick={() => scroll(1)}>→</IconButton>
        </div>
      </div>
      <div className="track" ref={track} tabIndex={0} aria-label="Les étapes du verger en photos">
        {CHAPTERS.map(c => (
          <article className="chapter" key={c.n}>
            <div className="ph"><img src={`img/${c.img}`} alt={c.alt} loading="lazy" decoding="async" /></div>
            <span className="n">{c.n}</span><h3>{c.title}</h3><p>{c.text}</p>
          </article>
        ))}
      </div>
      <div className="timeline-bar" aria-hidden="true"><i ref={bar}></i></div>
    </section>
  );
}
