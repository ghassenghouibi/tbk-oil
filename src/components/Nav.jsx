import { useEffect, useState } from 'react';
import { DICTS, useT } from '../i18n';

/* An explicit choice overrides the browser-language redirect in index.html (same storage key). */
const rememberLang = (lang) => { try { localStorage.setItem('thibica-lang', lang); } catch { /* storage blocked */ } };

export default function Nav() {
  const t = useT();
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
        <a className="brand" href="#accueil" aria-label={t.nav.home}>
          <img src="/img/logo-96.png" alt="" width="44" height="44" />
          <span className="latin">THIBICA</span>
        </a>
        <ul className={open ? 'menu open' : 'menu'} id="menu">
          {t.nav.links.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className={active === id ? 'active' : undefined} onClick={close}>{label}</a></li>
          ))}
          <li><a href="#commander" className={active === 'commander' ? 'cta active' : 'cta'} onClick={close}>{t.nav.order}</a></li>
        </ul>
        {/* Plain links (not a JS toggle): each language is its own crawlable page. */}
        <nav className="langs" aria-label={t.nav.languages}>
          {Object.values(DICTS).map(d => (
            <a key={d.lang} href={d.path} hrefLang={d.lang} lang={d.lang} title={d.langName}
              aria-current={d.lang === t.lang ? 'page' : undefined} onClick={() => rememberLang(d.lang)}>{d.langShort}</a>
          ))}
        </nav>
        <button className="burger" aria-label={t.nav.openMenu} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
