import { useT } from '../i18n';

export default function Footer() {
  const { footer: f } = useT();
  return (
    <footer>
      <div className="wrap">
        <div className="f-brand"><img src="/img/logo-192.png" alt="" width="60" height="60" loading="lazy" /><div><b className="latin">DOMAINE THIBICA</b><br />{f.tagline}<br /><span dir="ltr">TBK Oil Export SARL</span></div></div>
        <nav aria-label={f.navLabel}>
          {f.links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </div>
    </footer>
  );
}
