import { useRef, useState } from 'react';
import { CONTACT_EMAIL } from '../data.js';
import { FORMATS, PROFILES } from '../i18n/catalog.js';
import { useT } from '../i18n';
import { Button, Input, RadioGroup, Select, Textarea } from './ui';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Order({ format, setFormat, nameRef }) {
  const t = useT();
  const o = t.order;
  const emailRef = useRef(null);
  const [form, setForm] = useState({ type: 0, name: '', email: '', phone: '', qty: '6', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle · sending · sent · failed

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const profileOptions = o.profiles.map((label, i) => ({ value: i, label }));
  const formatOptions = o.formats.map((label, i) => ({ value: i, label }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = o.errors.name;
    if (!EMAIL_RE.test(form.email.trim())) errs.email = o.errors.email;
    if (!(Number(form.qty) >= 1)) errs.qty = o.errors.qty;
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
        // The team reads French; `lang` picks the language of the customer's confirmation e-mail.
        body: JSON.stringify({ ...form, type: PROFILES.fr[form.type], format: FORMATS.fr[format], lang: t.lang })
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setForm(f => ({ ...f, message: '' }));
    } catch {
      setStatus('failed');
    }
  };

  const mailto = () => {
    const m = o.mail;
    const body = `${m.greeting}\n\n${m.intro}\n\n${m.profile} : ${o.profiles[form.type]}\n${m.format} : ${o.formats[format]}\n${m.qty} : ${form.qty}\n\n${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}\n${form.phone.trim()}`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(m.subject(o.formats[format]))}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="commander">
      <div className="wrap order-grid">
        <div className="order-info reveal">
          <span className="eyebrow">{o.eyebrow}</span>
          <h2>{o.title}</h2>
          <p className="lead">{o.lead}</p>
          <p>{o.trade}</p>
          <p>{o.direct}<a href={`mailto:${CONTACT_EMAIL}`} dir="ltr">{CONTACT_EMAIL}</a></p>
          <div className="who">
            <img src="/img/logo-192.png" alt={o.logoAlt} width="96" height="96" loading="lazy" />
            <div><b className="latin">TBK OIL EXPORT SARL</b><div className="ar" lang="ar">ت ب ك لتصدير الزيت</div><small>{o.motto}</small></div>
          </div>
        </div>

        <form className="order-form reveal" noValidate onSubmit={submit}>
          <RadioGroup name="type" label={o.labels.profile} options={profileOptions} value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))} />
          <Input id="f-name" label={o.labels.name} ref={nameRef} required autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
          <Input id="f-email" label={o.labels.email} ref={emailRef} type="email" dir="ltr" required autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} />
          <Input id="f-phone" label={o.labels.phone} hint={o.labels.optional} type="tel" dir="ltr" autoComplete="tel" value={form.phone} onChange={set('phone')} />
          <Select id="f-format" label={o.labels.format} options={formatOptions} value={format} onChange={e => setFormat(+e.target.value)} />
          <Input id="f-qty" label={o.labels.qty} type="number" min="1" inputMode="numeric" value={form.qty} onChange={set('qty')} error={errors.qty} full />
          <Textarea id="f-msg" label={o.labels.message} placeholder={o.placeholder} value={form.message} onChange={set('message')} />
          {/* Honeypot: hidden from people, bots fill it and the server drops the request. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="f-website">{o.labels.website}</label>
            <input id="f-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
          </div>

          <Button type="submit" variant="olive" className="submit" loading={status === 'sending'}>
            {status === 'sending' ? o.sending : o.submit}
          </Button>

          <div className={status === 'sent' || status === 'failed' ? 'result show' : 'result'} role="status" aria-live="polite">
            {status === 'sent' && <p><b>{o.sentTitle}</b> {o.sentText(form.email.trim())}</p>}
            {status === 'failed' && <>
              <p><b>{o.failedTitle}</b> {o.failedText}</p>
              <div className="row"><Button href={mailto()} variant="outline" size="sm">{o.openMail}</Button></div>
            </>}
          </div>
        </form>
      </div>
    </section>
  );
}
