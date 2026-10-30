import { useEffect, useRef, useState } from 'react';
import { STEPS, reduceMotion } from '../data.js';

export default function Mill() {
  const canvas = useRef(null), stage = useRef(null), steps = useRef([]), hud = useRef([]);
  const [active, setActive] = useState(0);
  const [noWebgl, setNoWebgl] = useState(false);

  useEffect(() => {
    /* Three.js is loaded on demand so it stays out of the main bundle. */
    let cleanup, cancelled = false;
    import('../mill/scene.js').then(({ createMillScene }) => {
      if (cancelled) return;
      cleanup = createMillScene({
        canvas: canvas.current, stage: stage.current,
        stepsEls: steps.current, hud: hud.current,
        onActive: setActive, reduce: reduceMotion
      });
      if (!cleanup) setNoWebgl(true);
    }).catch(() => setNoWebgl(true));
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section className={noWebgl ? 'mill no-webgl' : 'mill'} id="pressage">
      <div className="mill-stage" ref={stage}>
        <div className="canvas-box">
          <canvas id="scene" ref={canvas} aria-label="Animation 3D des étapes de fabrication de l'huile d'olive"></canvas>
          <div className="grain" aria-hidden="true"></div>
          <div className="scene-fallback"><p>L'animation 3D n'est pas disponible sur cet appareil.<br />Les cinq étapes sont décrites ci-dessous.</p></div>
          <div className="hud" aria-hidden="true">
            {STEPS.map((_, i) => <span key={i}><i ref={el => { hud.current[i] = el; }}></i></span>)}
          </div>
        </div>
        <div className="steps">
          <div className="mill-intro">
            <span className="eyebrow">Du fruit à la bouteille</span>
            <h2>Cinq étapes pour une huile extra vierge</h2>
            <p className="lead">Suivez le voyage d'une olive de notre verger jusqu'à la bouteille. Une extraction mécanique, à froid, sans aucun ajout.</p>
            <span className="hint">Faites défiler</span>
          </div>
          {STEPS.map((s, i) => (
            <div className={i === active ? 'step on' : 'step'} key={s.title} ref={el => { steps.current[i] = el; }}>
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
