import { useEffect, useRef } from 'react';
import { reduceMotion } from '../data.js';
import { Button } from './ui';

export default function Hero() {
  const video = useRef(null);

  /* The background video only plays while it is on screen: no decoding cost while reading further down. */
  useEffect(() => {
    const v = video.current;
    if (reduceMotion) { v.pause(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="accueil">
      <video
        ref={video}
        className="hero-bg"
        poster="/img/hero-verger.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/video/hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="wrap">
        <div className="ar" lang="ar">تبيكة</div>
        <h1>Thibica</h1>
        <p className="tag">Huile d'olive extra vierge biologique, née sur la terre de notre famille, à quelques kilomètres de Thuburbo Majus, en Tunisie.</p>
        <div className="hero-row">
          <ul className="facts">
            <li>Agriculture biologique</li>
            <li>Variété Koroneiki</li>
            <li>De notre propre verger</li>
            <li>Zaghouan · Tunisie</li>
          </ul>
          <div className="btns">
            <Button href="#gamme">Découvrir la gamme</Button>
            <Button href="#histoire" variant="ghost">Notre histoire</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
