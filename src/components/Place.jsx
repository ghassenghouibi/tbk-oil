const ITEMS = [
  ['I', 'Un site antique', 'Thibica est un site archéologique d\'époque romaine, à quelques kilomètres de Thuburbo Majus, l\'une des plus remarquables cités romaines d\'Afrique du Nord. Sur les colonnes de ses temples, des branches d\'olivier sont sculptées dans la pierre.'],
  ['II', 'La vallée de l\'oued Miliane', 'À l\'est d\'El Fahs, la plaine de Thibica appartient à la riche vallée de l\'oued Miliane. Les mosaïques romaines retrouvées dans les environs témoignent de plus de 2 000 ans de céréales et d\'oliviers.'],
  ['III', 'L\'ancienne gare', 'La halte ferroviaire de la ligne El Fahs–Bouarada, aujourd\'hui en ruines, est le repère le plus connu du lieu. C\'est elle que l\'on retrouve gravée sur notre étiquette.']
];

export default function Place() {
  return (
    <section className="place" id="thibica">
      <div className="wrap place-grid">
        <div className="place-art reveal">
          <img src="img/etiquette.jpg" alt="Étiquette Thibica représentant l'ancienne gare de Thibica, gravure" loading="lazy" />
        </div>
        <div className="reveal">
          <span className="eyebrow">Pourquoi Thibica</span>
          <h2>Un nom romain, une terre d'oliviers depuis 2 000 ans</h2>
          <p className="lead" style={{ marginTop: 18 }}>Thibica (Tībīkā) est une localité du gouvernorat de Zaghouan, dans la délégation d'El Fahs, près de Bir Magra. C'est là que pousse notre huile.</p>
          <div className="place-list">
            {ITEMS.map(([k, title, text]) => (
              <div className="place-item" key={k}><span className="k">{k}</span><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
