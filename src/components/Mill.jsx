import { useEffect, useRef, useState } from 'react';
import { reduceMotion } from '../data.js';
import { useT } from '../i18n';
import { SectionHeading } from './ui';

export default function Mill() {
  const { mill: m } = useT();
  const canvas = useRef(null), stage = useRef(null), steps = useRef([]), hud = useRef([]);
  const [active, setActive] = useState(0);
  const [noWebgl, setNoWebgl] = useState(false);

  useEffect(() => {
    /* Three.js stays out of the main bundle. The scene is built once the page is idle, or as soon as
       the section comes near, whichever happens first, so it never competes with the first screen. */
    let cleanup, cancelled = false, started = false;
    const start = () => {
      if (started) return;
      started = true; io.disconnect(); cancelIdle();
      import('../mill/scene.js')
        .then(({ createMillScene }) => cancelled ? null : createMillScene({
          canvas: canvas.current, stage: stage.current,
          stepsEls: steps.current, hud: hud.current,
          onActive: setActive, reduce: reduceMotion
        }))
        .then(c => {
          if (cancelled) return c?.();
          if (!c) return setNoWebgl(true);
          cleanup = c;
        })
        .catch(() => { if (!cancelled) setNoWebgl(true); });
    };
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) start(); }, { rootMargin: '150% 0px' });
    io.observe(stage.current);
    const onLoad = () => { idle = window.requestIdleCallback ? requestIdleCallback(start, { timeout: 5000 }) : setTimeout(start, 2500); };
    let idle = 0;
    const cancelIdle = () => { removeEventListener('load', onLoad); window.cancelIdleCallback ? cancelIdleCallback(idle) : clearTimeout(idle); };
    if (document.readyState === 'complete') onLoad(); else addEventListener('load', onLoad);
    return () => { cancelled = true; io.disconnect(); cancelIdle(); cleanup?.(); };
  }, []);

  return (
    <section className={noWebgl ? 'mill no-webgl' : 'mill'} id="pressage">
      <div className="mill-stage" ref={stage}>
        <div className="canvas-box">
          <canvas id="scene" ref={canvas} aria-label={m.canvas}></canvas>
          <div className="grain" aria-hidden="true"></div>
          <div className="scene-fallback"><p>{m.fallback[0]}<br />{m.fallback[1]}</p></div>
          <div className="hud" aria-hidden="true">
            {m.steps.map((_, i) => <span key={i}><i ref={el => { hud.current[i] = el; }}></i></span>)}
          </div>
        </div>
        <div className="steps">
          <SectionHeading
            className="mill-intro"
            eyebrow={m.eyebrow}
            title={m.title}
            lead={m.lead}
          >
            <span className="hint">{m.hint}</span>
          </SectionHeading>
          {m.steps.map((s, i) => (
            <div className={i === active ? 'step on' : 'step'} key={i} ref={el => { steps.current[i] = el; }}>
              <div className="step-card">
                <div className="num">{String(i + 1).padStart(2, '0')}</div><h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="spec">{s.spec.map(b => <b key={b}>{b}</b>)}</div>
              </div>
            </div>
          ))}
          <div className="tail" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
