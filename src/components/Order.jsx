import { useRef, useState } from 'react';
import { CONTACT_EMAIL, FORMATS } from '../data.js';

export default function Order({ format, setFormat, nameRef }) {
  const emailRef = useRef(null);
  const [type, setType] = useState('Particulier');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qty, setQty] = useState('6');
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState(null);
  const [copyLabel, setCopyLabel] = useState('Copier le texte');

  const submit = (e) => {
    e.preventDefault();
    const n = name.trim(), m = email.trim();
    if (!n || !/^\S+@\S+\.\S+$/.test(m)) {
      setResult({ error: true });
      (n ? emailRef : nameRef).current.focus();
      return;
    }
    const fmt = FORMATS[format];
    const body = `Bonjour,\n\nJe souhaite commander l'huile d'olive Thibica.\n\nProfil : ${type}\nFormat : ${fmt}\nQuantité : ${qty}\n\n${msg.trim()}\n\n${n}\n${m}`;
    const subject = `Demande de commande Thibica (${fmt})`;
    setResult({ body, subject });
    setCopyLabel('Copier le texte');
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(result.body); setCopyLabel('Texte copié'); }
    catch { setCopyLabel('Copie impossible, sélectionnez le texte'); }
  };

  return (
    <section id="commander">
      <div className="wrap order-grid">
        <div className="order-info reveal">
          <span className="eyebrow">Commander</span>
          <h2>Goûtez Thibica</h2>
          <p className="lead">Particulier, restaurant, épicerie fine ou importateur : dites-nous ce qu'il vous faut, nous revenons vers vous avec les prix et les délais.</p>
          <p>Les commandes professionnelles et l'export sont gérés par TBK Oil Export SARL.</p>
          <div className="who">
            <img src="img/logo.png" alt="Logo TBK Oil Export" loading="lazy" />
            <div><b>TBK OIL EXPORT SARL</b><div className="ar" lang="ar">ت ب ك لتصدير الزيت</div><small>Tradition · Qualité · Excellence</small></div>
          </div>
        </div>
        <form className="reveal" noValidate onSubmit={submit}>
          <div className="field full">
            <span id="type-l" style={{ fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--ink-soft)' }}>Vous êtes</span>
            <div className="seg" role="radiogroup" aria-labelledby="type-l">
              {['Particulier', 'Professionnel / export'].map(v => (
                <label key={v}><input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} /><span>{v}</span></label>
              ))}
            </div>
          </div>
          <div className="field"><label htmlFor="f-name">Nom</label><input id="f-name" ref={nameRef} required autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="field"><label htmlFor="f-email">E-mail</label><input id="f-email" ref={emailRef} type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="field"><label htmlFor="f-format">Format</label>
            <select id="f-format" value={format} onChange={e => setFormat(+e.target.value)}>
              {FORMATS.map((f, i) => <option key={f} value={i}>{f}</option>)}
            </select>
          </div>
          <div className="field"><label htmlFor="f-qty">Quantité</label><input id="f-qty" type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} /></div>
          <div className="field full"><label htmlFor="f-msg">Message</label><textarea id="f-msg" placeholder="Ville de livraison, occasion, volume annuel pour les professionnels…" value={msg} onChange={e => setMsg(e.target.value)}></textarea></div>
          <button className="btn" type="submit">Préparer ma demande</button>
          <div className={result ? 'result show' : 'result'} role="status" aria-live="polite">
            {result?.error && <p>Merci d'indiquer votre nom et une adresse e-mail valide.</p>}
            {result?.body && <>
              <b>Votre demande est prête.</b>
              {CONTACT_EMAIL && <p>Envoyez-la à <b>{CONTACT_EMAIL}</b>.</p>}
              <pre>{result.body}</pre>
              <div className="row">
                <button type="button" onClick={copy}>{copyLabel}</button>
                {CONTACT_EMAIL && <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(result.subject)}&body=${encodeURIComponent(result.body)}`}>Ouvrir dans ma messagerie</a>}
              </div>
            </>}
          </div>
        </form>
      </div>
    </section>
  );
}
