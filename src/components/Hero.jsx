export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero-bg" role="img" aria-label="Rangées d'oliviers du domaine sous le ciel de Zaghouan"></div>
      <div className="wrap">
        <div className="ar" lang="ar">تبيكة</div>
        <h1>Thibica</h1>
        <p className="tag">Huile d'olive extra vierge biologique, née sur la terre de notre famille, à quelques kilomètres de Thuburbo Majus.</p>
        <div className="hero-row">
          <ul className="facts">
            <li>Agriculture biologique</li>
            <li>Variété Koroneiki</li>
            <li>De notre propre verger</li>
            <li>Zaghouan · Tunisie</li>
          </ul>
          <div className="btns">
            <a className="btn btn-gold" href="#gamme">Découvrir la gamme</a>
            <a className="btn btn-ghost" href="#histoire">Notre histoire</a>
          </div>
        </div>
      </div>
    </section>
  );
}
