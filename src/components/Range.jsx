import { PRODUCTS } from '../data.js';
import { Button, SectionHeading } from './ui';

function Bottle({ h, id }) {
  const H = 180, bh = H * h, y0 = H - bh, w = 34 + 10 * h, cx = 40;
  const neck = bh * .34, shoulder = bh * .14, labelY = y0 + neck + shoulder + bh * .12;
  return (
    <svg viewBox={`0 0 80 ${H}`} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#1d2a17" /><stop offset=".35" stopColor="#3e5530" /><stop offset=".6" stopColor="#22311b" /><stop offset="1" stopColor="#121a0e" />
        </linearGradient>
      </defs>
      <path d={`M${cx - 6} ${y0 + 6} h12 v${neck - 6} q0 ${shoulder * .4} ${w / 2 - 6} ${shoulder} v${bh - neck - shoulder - 4} q0 4 -4 4 h${-(w - 8)} q-4 0 -4 -4 v${-(bh - neck - shoulder - 4)} q0 ${-shoulder * .6} ${w / 2 - 6} ${-shoulder} z`} fill={`url(#${id})`} />
      <rect x={cx - 7} y={y0} width="14" height="9" rx="2" fill="#b98a2e" />
      <rect x={cx - w / 2 + 3} y={labelY} width={w - 6} height={bh * .34} fill="#f3ecdd" />
      <text x={cx} y={labelY + bh * .17} fontFamily="Cinzel, serif" fontSize={5 + 3 * h} textAnchor="middle" fill="#1f2a1b">THIBICA</text>
      <rect x={cx - w / 2 + 6} y={labelY + bh * .22} width={w - 12} height="1" fill="#b98a2e" />
      <rect x={cx - w / 2 + 4} y={y0 + neck + shoulder + 6} width="3" height={bh * .5} fill="#fff" opacity=".12" />
    </svg>
  );
}

function Tin() {
  return (
    <svg viewBox="0 0 110 180" aria-hidden="true">
      <rect x="10" y="40" width="90" height="136" rx="5" fill="#2f3d25" /><rect x="10" y="40" width="90" height="10" fill="#b98a2e" />
      <rect x="68" y="24" width="20" height="18" rx="3" fill="#b98a2e" /><path d="M24 40 v-12 q0-8 8-8 h26 q8 0 8 8 v12" fill="none" stroke="#1f2a1b" strokeWidth="5" />
      <rect x="20" y="70" width="70" height="76" fill="#f3ecdd" /><text x="55" y="104" fontFamily="Cinzel, serif" fontSize="12" textAnchor="middle" fill="#1f2a1b">THIBICA</text>
      <text x="55" y="122" fontFamily="Mulish, sans-serif" fontSize="7" textAnchor="middle" fill="#b98a2e" letterSpacing="1">EXTRA VIERGE</text><rect x="14" y="54" width="4" height="116" fill="#fff" opacity=".1" />
    </svg>
  );
}

export default function Range({ onPick }) {
  return (
    <section id="gamme">
      <div className="wrap">
        <SectionHeading
          className="reveal"
          eyebrow="La gamme"
          title="Une seule huile, cinq formats"
          lead="Notre huile d'olive extra vierge biologique, de variété Koroneiki, issue exclusivement de notre verger. Choisissez le format qui vous ressemble."
        />
        <div className="range-hero reveal"><img src="img/gamme.jpg" alt="La gamme Thibica : bouteilles de 250 ml à 1 L et bidons" loading="lazy" /></div>

        <div className="range-grid">
          {PRODUCTS.map((p, i) => (
            <article className="prod reveal" key={p.vol}>
              {p.tin ? <Tin /> : p.img ? <img className="bottle" src={`img/${p.img}`} alt={`Bouteille Thibica ${p.vol}`} loading="lazy" /> : <Bottle h={p.h} id={`bottle-g${i}`} />}
              <span className="kind">{p.kind}</span><span className="vol">{p.vol}</span><p>{p.text}</p>
              <Button className="pick" variant="outline" size="sm" onClick={() => onPick(i)}>Demander ce format</Button>
            </article>
          ))}
        </div>

        <div className="promises reveal">
          <div className="promise"><b>Biologique</b><p>Des arbres cultivés sans engrais ni pesticides de synthèse.</p></div>
          <div className="promise"><b>Extra vierge</b><p>Extraite à froid, par des procédés uniquement mécaniques.</p></div>
          <div className="promise"><b>Mono-domaine</b><p>Des olives qui viennent toutes de notre propre verger de Thibica.</p></div>
          <div className="promise"><b>Traçable</b><p>De l'arbre à la bouteille, nous connaissons chaque étape.</p></div>
        </div>
      </div>
    </section>
  );
}
