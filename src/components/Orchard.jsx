import { useEffect, useRef } from 'react';
import { CHAPTER_IMAGES } from '../data.js';
import { useT } from '../i18n';
import { IconButton, SectionHeading } from './ui';

export default function Orchard() {
  const t = useT();
  const o = t.orchard;
  const rtl = t.dir === 'rtl';
  const track = useRef(null), bar = useRef(null);

  /* The progress bar is driven straight from the scroll position (once per frame, transform only),
     so scrolling the carousel never re-renders the twelve chapters. */
  useEffect(() => {
    const t = track.current;
    let raf = 0;
    const paint = () => { raf = 0; const m = t.scrollWidth - t.clientWidth; bar.current.style.transform = `scaleX(${.1 + .9 * (m ? Math.abs(t.scrollLeft) / m : 1)})`; };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    t.addEventListener('scroll', onScroll, { passive: true }); paint();
    return () => { t.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const scroll = (dir) => {
    const t = track.current;
    t.scrollBy({ left: (rtl ? -dir : dir) * (t.querySelector('.chapter').offsetWidth + 22), behavior: 'smooth' });
  };

  return (
    <section id="verger" style={{ paddingBottom: 70 }}>
      <div className="wrap journey-head">
        <SectionHeading className="reveal" eyebrow={o.eyebrow} title={<>{o.title[0]}<br />{o.title[1]}</>} />
        <div className="arrows">
          <IconButton label={o.prev} onClick={() => scroll(-1)}>{rtl ? '→' : '←'}</IconButton>
          <IconButton label={o.next} onClick={() => scroll(1)}>{rtl ? '←' : '→'}</IconButton>
        </div>
      </div>
      <div className="track" ref={track} tabIndex={0} aria-label={o.track}>
        {o.chapters.map((c, i) => (
          <article className="chapter" key={CHAPTER_IMAGES[i]}>
            <div className="ph"><img src={`/img/${CHAPTER_IMAGES[i]}`} alt={c.alt} loading="lazy" decoding="async" /></div>
            <span className="n">{c.n}</span><h3>{c.title}</h3><p>{c.text}</p>
          </article>
        ))}
      </div>
      <div className="timeline-bar" aria-hidden="true"><i ref={bar}></i></div>
    </section>
  );
}
