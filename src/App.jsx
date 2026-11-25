import { useEffect, useRef, useState } from 'react';
import { reduceMotion } from './data.js';
import { DICTS, I18nProvider } from './i18n';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Story from './components/Story.jsx';
import Place from './components/Place.jsx';
import Orchard from './components/Orchard.jsx';
import Mill from './components/Mill.jsx';
import Range from './components/Range.jsx';
import Letter from './components/Letter.jsx';
import Order from './components/Order.jsx';
import Footer from './components/Footer.jsx';

/* Reveal: content stays visible if the observer is missing; only blocks below the fold animate in. */
function useReveal() {
  useEffect(() => {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const els = [...document.querySelectorAll('.reveal')].filter(el => el.getBoundingClientRect().top > innerHeight);
    els.forEach(el => el.classList.add('pre'));
    const ro = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.remove('pre'); ro.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => ro.observe(el));
    return () => { ro.disconnect(); els.forEach(el => el.classList.remove('pre')); };
  }, []);
}

export default function App({ lang }) {
  const [format, setFormat] = useState(1);
  const nameRef = useRef(null);
  useReveal();

  const pickFormat = (i) => {
    setFormat(i);
    document.getElementById('commander').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
  };

  return (
    <I18nProvider value={DICTS[lang]}>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Place />
        <Orchard />
        <Mill />
        <Range onPick={pickFormat} />
        <Letter />
        <Order format={format} setFormat={setFormat} nameRef={nameRef} />
      </main>
      <Footer />
    </I18nProvider>
  );
}
