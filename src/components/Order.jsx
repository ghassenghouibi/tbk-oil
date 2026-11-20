import { useRef, useState } from 'react';
import { CONTACT_EMAIL, FORMATS } from '../data.js';
import { Button, Input, RadioGroup, Select, Textarea } from './ui';

const PROFILES = ['Particulier', 'Professionnel / export'];
const FORMAT_OPTIONS = FORMATS.map((f, i) => ({ value: i, label: f }));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Order({ format, setFormat, nameRef }) {
  const emailRef = useRef(null);
  const [form, setForm] = useState({ type: PROFILES[0], name: '', email: '', phone: '', qty: '6', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle · sending · sent · failed

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Indiquez votre nom.';
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Indiquez une adresse e-mail valide.';
    if (!(Number(form.qty) >= 1)) errs.qty = 'Au moins 1.';
    return errs;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.name) return nameRef.current?.focus();
    if (errs.email) return emailRef.current?.focus();
    if (errs.qty) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, format: FORMATS[format] })
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setForm(f => ({ ...f, message: '' }));
    } catch {
      setStatus('failed');
    }
  };

  const mailto = () => {
    const body = `Bonjour,\n\nJe souhaite commander l'huile d'olive Thibica.\n\nProfil : ${form.type}\nFormat : ${FORMATS[format]}\nQuantité : ${form.qty}\n\n${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}\n${form.phone.trim()}`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Demande de commande Thibica (${FORMATS[format]})`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="commander">
      <div className="wrap order-grid">
        <div className="order-info reveal">
          <span className="eyebrow">Commander</span>
          <h2>Goûtez Thibica</h2>
          <p className="lead">Particulier, restaurant, épicerie fine ou importateur : dites-nous ce qu'il vous faut, nous revenons vers vous avec les prix et les délais.</p>
          <p>Les commandes professionnelles et l'export sont gérés par TBK Oil Export SARL.</p>
          <p>Vous pouvez aussi nous écrire directement : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          <div className="who">
            <img src="img/logo-192.png" alt="Logo TBK Oil Export" width="96" height="96" loading="lazy" />
            <div><b>TBK OIL EXPORT SARL</b><div className="ar" lang="ar">ت ب ك لتصدير الزيت</div><small>Tradition · Qualité · Excellence</small></div>
          </div>
        </div>

        <form className="order-form reveal" noValidate onSubmit={submit}>
          <RadioGroup name="type" label="Vous êtes" options={PROFILES} value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))} />
          <Input id="f-name" label="Nom" ref={nameRef} required autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
          <Input id="f-email" label="E-mail" ref={emailRef} type="email" required autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} />
          <Input id="f-phone" label="Téléphone" hint="Facultatif" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
          <Select id="f-format" label="Format" options={FORMAT_OPTIONS} value={format} onChange={e => setFormat(+e.target.value)} />
          <Input id="f-qty" label="Quantité" type="number" min="1" inputMode="numeric" value={form.qty} onChange={set('qty')} error={errors.qty} full />
          <Textarea id="f-msg" label="Message" placeholder="Ville de livraison, occasion, volume annuel pour les professionnels…" value={form.message} onChange={set('message')} />
          {/* Honeypot: hidden from people, bots fill it and the server drops the request. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="f-website">Site web</label>
            <input id="f-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
          </div>

          <Button type="submit" variant="olive" className="submit" loading={status === 'sending'}>
            {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
          </Button>

          <div className={status === 'sent' || status === 'failed' ? 'result show' : 'result'} role="status" aria-live="polite">
            {status === 'sent' && <p><b>Merci, votre demande est bien envoyée.</b> Nous vous répondons rapidement à l'adresse {form.email.trim()}.</p>}
            {status === 'failed' && <>
              <p><b>L'envoi n'a pas abouti.</b> Vous pouvez nous envoyer la même demande depuis votre messagerie.</p>
              <div className="row"><Button href={mailto()} variant="outline" size="sm">Ouvrir dans ma messagerie</Button></div>
            </>}
          </div>
        </form>
      </div>
    </section>
  );
}
