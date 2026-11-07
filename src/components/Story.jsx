export default function Story() {
  return (
    <section id="histoire">
      <div className="wrap story-grid">
        <div className="story-text reveal">
          <span className="eyebrow">Notre histoire</span>
          <h2>Une terre de famille, <em>replantée</em> pour les générations suivantes</h2>
          <p className="lead">Cette terre appartient à notre famille depuis des générations. Pendant des décennies, elle a donné du blé, comme partout dans la plaine d'El Fahs.</p>
          <p>Puis les pluies sont devenues imprévisibles et la céréale n'offrait plus la même résilience. Plutôt que de regarder la terre souffrir, nous avons choisi de nous adapter. En 2019, nous avons préparé le sol, puis planté nos premiers oliviers, un par un, à la main.</p>
          <p className="pivot">« J'ai choisi l'olivier. Un olivier ne se plante pas pour une saison, il se plante pour des générations. »</p>
          <div className="gens" aria-label="Trois générations sur la même terre">
            <div className="gen"><b>Le grand-oncle</b><small>Premier gardien de la terre, cultivée en blé</small></div>
            <div className="gen"><b>L'oncle</b><small>La terre passe de main en main, toujours en céréales</small></div>
            <div className="gen now"><b>Aujourd'hui</b><small>Depuis 2019, un verger d'oliviers biologique</small></div>
          </div>
        </div>
        <div className="photo-stack reveal">
          <figure className="ps1"><img src="img/fondateur-olivier.jpg" alt="Le fondateur inspecte les branches d'un olivier du domaine" loading="lazy" /><figcaption>Au milieu de nos oliviers</figcaption></figure>
          <figure className="ps2"><img src="img/verger-aujourdhui.jpg" alt="Le verger d'oliviers aujourd'hui" loading="lazy" /><figcaption>Le verger aujourd'hui</figcaption></figure>
        </div>
      </div>
    </section>
  );
}
