import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data.js';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
    return () => { removeEventListener('scroll', onScroll); spy.disconnect(); };
  }, []);

  const close = () => setOpen(false);
  const cls = ['nav', solid && 'solid', open && 'menu-open'].filter(Boolean).join(' ');

  return (
    <header className={cls} id="nav">
      <div className="wrap">
        <a className="brand" href="#accueil" aria-label="Domaine Thibica, accueil">
          <img src="img/logo.png" alt="" />
          <span>THIBICA</span>
        </a>
        <button className="burger" aria-label="Ouvrir le menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={open ? 'menu open' : 'menu'} id="menu">
          {NAV_LINKS.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className={active === id ? 'active' : undefined} onClick={close}>{label}</a></li>
          ))}
          <li><a href="#commander" className={active === 'commander' ? 'cta active' : 'cta'} onClick={close}>Commander</a></li>
        </ul>
      </div>
    </header>
  );
}
