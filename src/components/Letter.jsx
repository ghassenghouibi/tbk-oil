import { useT } from '../i18n';

export default function Letter() {
  const { letter: l } = useT();
  return (
    <section className="letter" id="lettre">
      <div className="wrap letter-grid">
        <aside className="letter-side reveal">
          <img src="/img/branche-main.jpg" alt={l.sideAlt} loading="lazy" />
          <blockquote>{l.quote}</blockquote>
        </aside>
        <div className="letter-body reveal">
          <span className="eyebrow">{l.eyebrow}</span>
          <h2>{l.title}</h2>
          {l.paragraphs.map((p, i) => <p key={i} className={i === 0 ? 'first' : undefined}>{p}</p>)}
          <div className="sign"><div><div className="name">{l.name}</div><small>{l.role}</small><small className="cert" lang="en" dir="ltr">Master Miller Certified – University of California, Davis</small><small className="cert" lang="en" dir="ltr">Agriculture &amp; Natural Resources | Food Science &amp; Technology | Olive Center</small></div></div>
        </div>
      </div>
    </section>
  );
}
