/* ---------- 3D : DU FRUIT À LA BOUTEILLE ---------- */
import * as T from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Builds the mill scene on `canvas` and drives the camera from the scroll position of `stepsEls`.
// Returns a cleanup function, or null when WebGL is unavailable.
export function createMillScene({ canvas, stage, stepsEls, hud, onActive, reduce }) {
let renderer;
try { renderer = new T.WebGLRenderer({canvas, antialias:true, powerPreference:'high-performance'}); }
catch { return null; }

const SP = 16; // distance entre les postes
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = .95;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
const scene = new T.Scene();
const BG = new T.Color('#11170d');
scene.background = BG; scene.fog = new T.Fog(BG, 15, 34);
const pmrem = new T.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), .04).texture;
const camera = new T.PerspectiveCamera(32, 1, .1, 120);
const aniso = renderer.capabilities.getMaxAnisotropy();

/* lumière : soleil de fin d'après-midi + contre-jour doré */
scene.add(new T.HemisphereLight('#ffe9c4', '#1a2114', .55));
const key = new T.DirectionalLight('#ffd49a', 3.4);
key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -.0004; key.shadow.normalBias = .02;
Object.assign(key.shadow.camera, {left:-7, right:7, top:7, bottom:-7, near:1, far:40});
const fill = new T.DirectionalLight('#a9bce0', .45);
const rim = new T.SpotLight('#ffc768', 90, 30, .55, .7, 1.6);
scene.add(key, key.target, fill, fill.target, rim, rim.target);

/* ---------- textures procédurales ---------- */
const rnd = (a = 0, b = 1) => a + Math.random() * (b - a);
function tex(w, h, draw, {srgb = true, repeat = [1, 1]} = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new T.CanvasTexture(c); if (srgb) t.colorSpace = T.SRGBColorSpace;
  t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(...repeat); t.anisotropy = aniso; return t;
}
function dots(x, w, h, n, colors, r0, r1, a) {
  for (let i = 0; i < n; i++) { x.globalAlpha = a * rnd(.35, 1); x.fillStyle = colors[i % colors.length]; x.beginPath(); x.arc(rnd(0, w), rnd(0, h), rnd(r0, r1), 0, 7); x.fill(); }
  x.globalAlpha = 1;
}
const granite = (base, rep) => tex(512, 512, (x, w, h) => {
  x.fillStyle = base; x.fillRect(0, 0, w, h);
  dots(x, w, h, 90, ['#6d665b', '#cfc7b8'], 20, 60, .08);
  dots(x, w, h, 9000, ['#4e4840', '#d9d2c4', '#2b2723', '#8f877a'], .6, 2.4, .55);
}, {repeat: rep});
const graniteT = granite('#a49c8c', [6, 2]), graniteBump = granite('#888', [6, 2]); graniteBump.colorSpace = T.NoColorSpace;
const millT = granite('#b3ab9b', [3, 1]);
const woodT = tex(512, 512, (x, w, h) => {
  x.fillStyle = '#8b5d38'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 160; i++) {
    const y = rnd(0, h), a = rnd(.04, .18); x.strokeStyle = Math.random() < .6 ? `rgba(60,35,18,${a})` : `rgba(190,140,90,${a})`; x.lineWidth = rnd(.6, 3);
    x.beginPath(); x.moveTo(0, y); for (let X = 0; X <= w; X += 32) x.lineTo(X, y + Math.sin(X * .02 + i) * rnd(1, 4)); x.stroke();
  }
  dots(x, w, h, 14, ['#3d2412'], 3, 7, .5);
}, {repeat: [1, 1]});
const barkT = tex(256, 512, (x, w, h) => {
  x.fillStyle = '#5b4b3b'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 260; i++) { x.strokeStyle = `rgba(${Math.random() < .5 ? '35,28,20' : '140,125,105'},${rnd(.1, .35)})`; x.lineWidth = rnd(1, 4); const X = rnd(0, w); x.beginPath(); x.moveTo(X, rnd(0, h)); x.lineTo(X + rnd(-6, 6), rnd(0, h)); x.stroke(); }
}, {repeat: [6, 1]});
const brushed = tex(512, 512, (x, w, h) => {
  x.fillStyle = '#b9bec2'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 2600; i++) { x.fillStyle = Math.random() < .5 ? 'rgba(255,255,255,.07)' : 'rgba(40,45,50,.06)'; x.fillRect(rnd(-w, w), rnd(0, h), rnd(80, 500), rnd(.5, 1.5)); }
}, {repeat: [3, 1]});
const brushedR = brushed.clone(); brushedR.colorSpace = T.NoColorSpace;
const pasteT = tex(512, 512, (x, w, h) => {
  x.fillStyle = '#4b4220'; x.fillRect(0, 0, w, h);
  dots(x, w, h, 260, ['#3a3115', '#5f5a2a'], 8, 26, .3);
  dots(x, w, h, 7000, ['#241c0c', '#6e6430', '#7d7038', '#33290f'], .8, 2.8, .7);
}, {repeat: [3, 3]});
const pasteBump = pasteT.clone(); pasteBump.colorSpace = T.NoColorSpace;
const skinT = tex(256, 256, (x, w, h) => {
  x.fillStyle = '#dcdcdc'; x.fillRect(0, 0, w, h);
  dots(x, w, h, 40, ['#b8b8b8', '#f2f2f2'], 10, 30, .25);
  dots(x, w, h, 500, ['#ffffff'], .5, 1.3, .55);
});
const floorT = tex(1024, 1024, (x, w, h) => {
  x.fillStyle = '#2a3022'; x.fillRect(0, 0, w, h);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) { const v = rnd(-3, 3); x.fillStyle = `rgb(${40 + v},${46 + v},${34 + v})`; x.fillRect(c * 512 + 2, r * 512 + 2, 508, 508); }
  dots(x, w, h, 120, ['#20261a', '#3a4230'], 30, 90, .12);
  dots(x, w, h, 14000, ['#1b2016', '#4a5240', '#363d2d'], .6, 2, .45);
}, {repeat: [10, 10]});

/* ---------- matériaux ---------- */
const std = (o) => new T.MeshStandardMaterial(Object.assign({envMapIntensity:.6}, o));
const phy = (o) => new T.MeshPhysicalMaterial(Object.assign({envMapIntensity:.7}, o));
const M = {
  granite: std({map:graniteT, bumpMap:graniteBump, bumpScale:2.2, roughness:.88}),
  mill: std({map:millT, bumpMap:graniteBump, bumpScale:3, roughness:.9}),
  wood: std({map:woodT, color:'#b9a084', roughness:.8}),
  bark: std({map:barkT, bumpMap:barkT, bumpScale:3, roughness:.95}),
  steel: phy({map:brushed, roughnessMap:brushedR, color:'#e6e9eb', metalness:1, roughness:.38, envMapIntensity:1.1}),
  ironDark: std({color:'#2d2b28', metalness:.8, roughness:.5}),
  paste: phy({map:pasteT, bumpMap:pasteBump, bumpScale:2.5, roughness:.7, clearcoat:.45, clearcoatRoughness:.35, envMapIntensity:.35}),
  oil: phy({color:'#d39b1c', roughness:.04, clearcoat:1, clearcoatRoughness:.02, emissive:'#4a2c00', emissiveIntensity:.5, envMapIntensity:1.2}),
  brass: phy({color:'#c9a050', metalness:1, roughness:.24, envMapIntensity:1.2}),
  paint: phy({color:'#2f3d25', roughness:.4, clearcoat:.8, clearcoatRoughness:.2}),
  cork: std({map:tex(128, 128, (x, w, h) => { x.fillStyle = '#b48a5c'; x.fillRect(0, 0, w, h); dots(x, w, h, 900, ['#7d5a36', '#d8b88c'], .6, 2, .7); }), roughness:.95}),
  glass: phy({color:'#ffffff', transmission:1, thickness:.25, ior:1.5, roughness:.03, attenuationColor:'#cfe6ff', attenuationDistance:3, envMapIntensity:1, specularIntensity:1}),
  greenGlass: phy({color:'#e8f2df', transmission:1, thickness:.35, ior:1.52, roughness:.04, attenuationColor:'#2d5a1f', attenuationDistance:.45, envMapIntensity:1.3, clearcoat:1, clearcoatRoughness:.02}),
  leafTop: std({color:'#4c5c33', roughness:.45, side:T.FrontSide}),
  leafBot: std({color:'#a9b29b', roughness:.8, side:T.BackSide})
};
const OLIVES = ['#4f5d1d', '#6a7a29', '#7d8a33', '#7a3a52', '#562640', '#2c1622', '#1f1018'].map(c => new T.Color(c));
const oliveMat = phy({map:skinT, roughness:.3, clearcoat:.65, clearcoatRoughness:.22});
const oliveMats = OLIVES.map(c => { const m = oliveMat.clone(); m.color = c; return m; });

/* ---------- géométries ---------- */
const oliveGeo = (() => {
  const g = new T.SphereGeometry(.16, 40, 28), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const k = 1 - .1 * p.getY(i) / .16; p.setX(i, p.getX(i) * k); p.setZ(i, p.getZ(i) * k); }
  g.scale(1, 1.32, 1); g.computeVertexNormals(); return g;
})();
const leafGeo = (() => {
  const s = new T.Shape(); s.moveTo(0, 0); s.quadraticCurveTo(.075, .3, 0, .82); s.quadraticCurveTo(-.075, .3, 0, 0);
  const g = new T.ShapeGeometry(s, 12), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const y = p.getY(i), x = p.getX(i); p.setZ(i, -y * y * .22 - Math.abs(x) * .45); }
  g.computeVertexNormals(); return g;
})();
const shadowAll = o => { o.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } }); return o; };
const dummy = new T.Object3D();
const stations = [];

const floor = new T.Mesh(new T.PlaneGeometry(160, 160), std({map:floorT, bumpMap:floorT, bumpScale:1.5, roughness:.82}));
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

/* ===== 1 · Récolte ===== */
{
  const g = new T.Group(); scene.add(g);
  const main = new T.CatmullRomCurve3([[-4, 4.6, -.8], [-2.2, 4.35, -.2], [-.4, 4.05, .1], [1.4, 4.2, -.1], [3.4, 4.5, -.6]].map(p => new T.Vector3(...p)));
  const tube = new T.Mesh(new T.TubeGeometry(main, 80, .085, 12), M.bark); g.add(tube);
  const twigs = [], leaves = [];
  for (let i = 0; i < 9; i++) {
    const a = main.getPoint(.08 + i * .1), side = i % 2 ? 1 : -1;
    const tw = new T.CatmullRomCurve3([a, a.clone().add(new T.Vector3(rnd(-.2, .3), -.25, side * .3)), a.clone().add(new T.Vector3(rnd(-.1, .5), -.6, side * rnd(.4, .7)))]);
    g.add(new T.Mesh(new T.TubeGeometry(tw, 16, .028, 6), M.bark)); twigs.push(tw);
  }
  const addLeaf = (p, out) => leaves.push({p, rx:rnd(-.8, .8) + out, ry:rnd(0, 6.28), rz:rnd(1.2, 2.2) * (Math.random() < .5 ? 1 : -1)});
  for (let i = 0; i < 110; i++) addLeaf(main.getPoint(rnd(0, 1)), 0);
  twigs.forEach(tw => { for (let i = 0; i < 9; i++) addLeaf(tw.getPoint(rnd(.2, 1)), .4); });
  const lt = new T.InstancedMesh(leafGeo, M.leafTop, leaves.length), lb = new T.InstancedMesh(leafGeo, M.leafBot, leaves.length);
  leaves.forEach((l, i) => { dummy.position.copy(l.p); dummy.rotation.set(l.rx, l.ry, l.rz); dummy.scale.setScalar(rnd(.75, 1.15)); dummy.updateMatrix(); lt.setMatrixAt(i, dummy.matrix); lb.setMatrixAt(i, dummy.matrix); });
  g.add(lt, lb);
  const hang = [];
  twigs.forEach((tw, i) => {
    const end = tw.getPoint(1);
    for (let k = 0; k < (i % 3 ? 2 : 3); k++) {
      const piv = new T.Group(); piv.position.copy(end).add(new T.Vector3(rnd(-.15, .15), 0, rnd(-.15, .15)));
      const stem = new T.Mesh(new T.CylinderGeometry(.008, .012, .14, 6), M.bark); stem.position.y = -.07; piv.add(stem);
      const o = new T.Mesh(oliveGeo, oliveMats[(i + k) % OLIVES.length]); o.position.y = -.33; piv.add(o);
      g.add(piv); hang.push(piv);
    }
  });
  const crate = new T.Group(); crate.position.set(-.2, 0, .3); crate.rotation.y = -.18; g.add(crate);
  const plank = (w, h, d) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), M.wood); return m; };
  for (let s = 0; s < 4; s++) {
    const y = .16 + s * .25;
    [[0, y, .88, 2.7, .17, .06], [0, y, -.88, 2.7, .17, .06], [1.32, y, 0, .06, .17, 1.7], [-1.32, y, 0, .06, .17, 1.7]].forEach(([x, yy, z, w, h, d]) => { const p = plank(w, h, d); p.position.set(x, yy, z); p.rotation.z = rnd(-.01, .01); crate.add(p); });
  }
  [[-1.3, -.86], [1.3, -.86], [-1.3, .86], [1.3, .86]].forEach(([x, z]) => { const p = plank(.12, 1.05, .12); p.position.set(x, .52, z); crate.add(p); });
  const base = plank(2.7, .06, 1.8); base.position.y = .05; crate.add(base);
  const N = 190, pile = new T.InstancedMesh(oliveGeo, oliveMat, N);
  for (let i = 0; i < N; i++) {
    const x = rnd(-1.18, 1.18), z = rnd(-.76, .76), mound = .55 * (1 - (x * x) / 1.6) * (1 - (z * z) / .7);
    dummy.position.set(x, .2 + rnd(0, .45) + Math.max(mound, 0), z); dummy.rotation.set(rnd(0, 6), rnd(0, 6), rnd(0, 6)); dummy.scale.setScalar(rnd(.9, 1.08)); dummy.updateMatrix();
    pile.setMatrixAt(i, dummy.matrix); pile.setColorAt(i, OLIVES[i % OLIVES.length]);
  }
  crate.add(pile);
  const fall = [];
  for (let i = 0; i < 6; i++) { const o = new T.Mesh(oliveGeo, oliveMats[(i * 2) % OLIVES.length]); g.add(o); fall.push({o, x:rnd(-1, .7), z:rnd(-.1, .6), off:i / 6}); }
  shadowAll(g);
  stations.push({g, look:new T.Vector3(-.2, 2.1, 0), cam:new T.Vector3(1.6, 3.3, 10.5), tick(t) {
    hang.forEach((p, i) => { p.rotation.z = Math.sin(t * 1.3 + i) * .08; p.rotation.x = Math.cos(t * 1.1 + i * .7) * .06; });
    lt.rotation.z = lb.rotation.z = Math.sin(t * .9) * .006;
    fall.forEach(f => { const k = (t * .4 + f.off) % 1, y = 3.6 - 3.2 * k * k; f.o.position.set(f.x, Math.max(y, .95), f.z + .3); f.o.rotation.x = k * 9; f.o.visible = k < .96; });
  }});
}

/* ===== 2 · Broyage ===== */
{
  const g = new T.Group(); g.position.x = SP; scene.add(g);
  const prof = [[0, .38], [2.1, .38], [2.18, .42], [2.2, .88], [2.3, .96], [2.58, .95], [2.66, .86], [2.7, .05], [2.62, 0], [0, 0]].map(p => new T.Vector2(...p));
  const basin = new T.Mesh(new T.LatheGeometry(prof, 120), M.granite.clone()); basin.material.side = T.DoubleSide; g.add(basin);
  const paste = new T.Mesh(new T.CylinderGeometry(2.14, 2.14, .1, 96), M.paste); paste.position.y = .42; g.add(paste);
  const N = 130, ol = new T.InstancedMesh(oliveGeo, oliveMat, N), base = [];
  for (let i = 0; i < N; i++) { const a = rnd(0, 6.28), r = rnd(.45, 1.95); base.push({x:Math.cos(a) * r, z:Math.sin(a) * r, rx:rnd(0, 6), ry:rnd(0, 6), s:rnd(.9, 1.1), ph:rnd(0, 1)}); ol.setColorAt(i, OLIVES[i % OLIVES.length]); }
  g.add(ol);
  const axle = new T.Mesh(new T.CylinderGeometry(.13, .13, 3.6, 20), M.wood); axle.position.y = 2; g.add(axle);
  [.9, 3.4].forEach(y => { const b = new T.Mesh(new T.TorusGeometry(.14, .025, 8, 24), M.ironDark); b.rotation.x = Math.PI / 2; b.position.y = y; g.add(b); });
  const arm = new T.Group(); arm.position.y = 1.32; g.add(arm);
  const beam = new T.Mesh(new T.BoxGeometry(4.4, .2, .2), M.wood); beam.position.y = .05; arm.add(beam);
  const wheels = [];
  [-1, 1].forEach(sx => {
    const w = new T.Group(); w.position.set(sx * 1.1, -.05, 0); arm.add(w);
    const stone = new T.Mesh(new T.CylinderGeometry(.85, .85, .5, 72), M.mill); stone.rotation.z = Math.PI / 2; w.add(stone);
    const hub = new T.Mesh(new T.CylinderGeometry(.22, .22, .54, 24), M.ironDark); hub.rotation.z = Math.PI / 2; w.add(hub);
    wheels.push(w);
  });
  shadowAll(g);
  stations.push({g, look:new T.Vector3(SP, .9, 0), cam:new T.Vector3(SP + 1.4, 5.2, 8.6), tick(t) {
    arm.rotation.y = t * .5;
    wheels.forEach(w => { w.rotation.x = t * 1.6; });
    const cyc = (t * .1) % 1;
    for (let i = 0; i < N; i++) {
      const b = base[i], k = Math.max(0, Math.min(1, (cyc - b.ph * .6) * 2.5)), s = b.s * (1 - k * .95);
      dummy.position.set(b.x, .5 - k * .12, b.z); dummy.rotation.set(b.rx, b.ry, 0); dummy.scale.set(s * (1 + k * .6), s * (1 - k * .5), s * (1 + k * .6)); dummy.updateMatrix(); ol.setMatrixAt(i, dummy.matrix);
    }
    ol.instanceMatrix.needsUpdate = true;
    paste.scale.y = 1 + cyc * 2.6; paste.position.y = .38 + paste.scale.y * .05;
  }});
}

/* ===== 3 · Malaxage ===== */
{
  const g = new T.Group(); g.position.x = SP * 2; scene.add(g);
  const R = 1.75, th0 = Math.PI * .2, arc = Math.PI * 1.6, H = 2.2, Y = 1.55;
  const shell = new T.Mesh(new T.CylinderGeometry(R, R, H, 120, 1, true, th0, arc), M.steel.clone()); shell.material.side = T.DoubleSide; shell.position.y = Y; g.add(shell);
  [Y - H / 2, Y + H / 2].forEach(y => { const w = new T.Group(); w.rotation.y = th0 - Math.PI / 2; w.position.y = y; const r = new T.Mesh(new T.TorusGeometry(R, .045, 12, 120, arc), M.steel); r.rotation.x = -Math.PI / 2; w.add(r); g.add(w); });
  [th0, th0 + arc].forEach(a => { const e = new T.Mesh(new T.CylinderGeometry(.045, .045, H, 12), M.steel); e.position.set(Math.sin(a) * R, Y, Math.cos(a) * R); g.add(e); });
  const bottom = new T.Mesh(new T.CylinderGeometry(R, R * .92, .25, 96), M.steel); bottom.position.y = Y - H / 2 - .12; g.add(bottom);
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + .6, l = new T.Mesh(new T.CylinderGeometry(.07, .07, Y - H / 2, 12), M.steel); l.position.set(Math.sin(a) * R * .85, (Y - H / 2) / 2, Math.cos(a) * R * .85); g.add(l); }
  const body = new T.Mesh(new T.CylinderGeometry(R - .04, R - .04, 1.55, 96), M.paste); body.position.y = Y - H / 2 + .78; g.add(body);
  const sg = new T.CircleGeometry(R - .04, 96, 0), surf = new T.Mesh(sg, M.paste); surf.rotation.x = -Math.PI / 2; surf.position.y = Y - H / 2 + 1.56; g.add(surf);
  const pos = sg.attributes.position, base = pos.array.slice();
  const shaft = new T.Group(); shaft.position.y = Y; g.add(shaft);
  shaft.add(new T.Mesh(new T.CylinderGeometry(.08, .08, 3.4, 16), M.steel));
  for (let i = 0; i < 7; i++) { const b = new T.Mesh(new T.BoxGeometry(3, .06, .32), M.steel); b.position.y = -.85 + i * .22; b.rotation.set(.45, i * .62, 0); shaft.add(b); }
  const drive = new T.Mesh(new T.BoxGeometry(.9, .6, .7), M.paint); drive.position.y = Y + H / 2 + .55; g.add(drive);
  const drops = [];
  for (let i = 0; i < 40; i++) { const d = new T.Mesh(new T.SphereGeometry(rnd(.03, .07), 16, 12), M.oil); d.scale.y = .45; d.userData = {a:rnd(0, 6.28), s:rnd(.15, .35), r:rnd(.25, 1.55)}; g.add(d); drops.push(d); }
  shadowAll(g);
  const sy = surf.position.y;
  stations.push({g, look:new T.Vector3(SP * 2, 1.5, 0), cam:new T.Vector3(SP * 2 + .9, 5, 8.4), tick(t) {
    shaft.rotation.y = t * .6;
    for (let i = 0; i < pos.count; i++) { const x = base[i * 3], y = base[i * 3 + 1], r = Math.hypot(x, y), a = Math.atan2(y, x); pos.array[i * 3 + 2] = (Math.sin(a * 3 - t * 1.2 + r * 2.2) * .045 + Math.sin(r * 5 - t) * .015) * r; }
    pos.needsUpdate = true; sg.computeVertexNormals();
    drops.forEach(d => { const u = d.userData; u.a += .006 + u.s * .01; const r = u.r + Math.sin(t * u.s * 3) * .1; d.position.set(Math.cos(u.a) * r, sy + .05, Math.sin(u.a) * r); });
  }});
}

/* ===== 4 · Extraction ===== */
{
  const g = new T.Group(); g.position.x = SP * 3; scene.add(g);
  const prof = [[0, -2.3], [.42, -2.3], [.55, -2.1], [.8, -1.2], [.82, 1.3], [.7, 1.9], [.5, 2.15], [0, 2.15]].map(p => new T.Vector2(...p));
  const bowl = new T.Group(); bowl.position.y = 2.15; g.add(bowl);
  const b = new T.Mesh(new T.LatheGeometry(prof, 96), M.steel); b.rotation.z = Math.PI / 2; bowl.add(b);
  for (let i = 0; i < 10; i++) { const r = new T.Mesh(new T.TorusGeometry(.82, .018, 8, 72), M.ironDark); r.rotation.y = Math.PI / 2; r.position.x = -1.1 + i * .26; bowl.add(r); }
  const shaftEnd = new T.Mesh(new T.CylinderGeometry(.18, .18, .6, 24), M.brass); shaftEnd.rotation.z = Math.PI / 2; shaftEnd.position.set(-2.6, 2.15, 0); g.add(shaftEnd);
  [-1.9, 1.9].forEach(x => { const p = new T.Mesh(new T.BoxGeometry(.45, 1.9, 1.3), M.paint); p.position.set(x, .95, 0); g.add(p); const cap = new T.Mesh(new T.CylinderGeometry(.35, .35, .5, 32), M.steel); cap.rotation.z = Math.PI / 2; cap.position.set(x, 2.15, 0); g.add(cap); });
  const motor = new T.Mesh(new T.CylinderGeometry(.5, .5, 1.1, 40), M.paint); motor.rotation.z = Math.PI / 2; motor.position.set(-3.4, .7, 0); g.add(motor);
  const plinth = new T.Mesh(new T.BoxGeometry(5.6, .12, 1.8), M.steel); plinth.position.y = .06; g.add(plinth);
  const spout = new T.Mesh(new T.CylinderGeometry(.09, .13, .55, 20), M.brass); spout.position.set(1.15, 1.2, .55); g.add(spout);
  const stream = new T.Mesh(new T.CylinderGeometry(.035, .045, 1, 16), M.oil); stream.position.set(1.15, .55, .55); g.add(stream);
  const carafe = new T.Mesh(new T.LatheGeometry([[0, 0], [.42, 0], [.48, .05], [.5, .5], [.55, .7], [.53, .72]].map(p => new T.Vector2(...p)), 64), M.glass); carafe.position.set(1.15, .12, .55); g.add(carafe);
  const pool = new T.Mesh(new T.CylinderGeometry(.46, .42, 1, 48), M.oil); pool.position.set(1.15, .12, .55); g.add(pool);
  const water = new T.Mesh(new T.CylinderGeometry(.07, .09, .5, 12), M.ironDark); water.position.set(-.9, 1.25, .5); g.add(water);
  shadowAll(g); carafe.castShadow = false;
  stations.push({g, look:new T.Vector3(SP * 3 - .3, 1.3, 0), cam:new T.Vector3(SP * 3 + 2.4, 3.2, 9.4), tick(t) {
    bowl.rotation.x = t * 7; bowl.position.y = 2.15 + Math.sin(t * 50) * .003;
    stream.scale.x = stream.scale.z = 1 + Math.sin(t * 11) * .12;
    const lvl = .12 + (Math.sin(t * .35) * .5 + .5) * .38; pool.scale.y = lvl; pool.position.y = .14 + lvl / 2;
    stream.scale.y = .95 - lvl; stream.position.y = .14 + lvl + stream.scale.y / 2;
  }});
}

/* ===== 5 · Mise en bouteille ===== */
{
  const g = new T.Group(); g.position.x = SP * 4; scene.add(g);
  const prof = [[0, 0], [.6, 0], [.66, .06], [.66, 2.2], [.62, 2.42], [.32, 2.85], [.2, 3.05], [.2, 3.55], [.24, 3.6], [.24, 3.72], [0, 3.72]].map(p => new T.Vector2(...p));
  const makeBottle = () => {
    const b = new T.Group();
    const glass = new T.Mesh(new T.LatheGeometry(prof, 96), M.greenGlass); glass.castShadow = false; b.add(glass);
    const liquid = new T.Mesh(new T.CylinderGeometry(.6, .6, 1, 64), M.oil); liquid.name = 'liquid'; b.add(liquid);
    const lbl = new T.Mesh(new T.CylinderGeometry(.672, .672, .9, 64, 1, true, -1.05, 2.1), labelMat); lbl.position.y = 1.2; b.add(lbl);
    const cork = new T.Group(); cork.name = 'cork'; b.add(cork);
    const ck = new T.Mesh(new T.CylinderGeometry(.19, .19, .45, 24), M.cork); cork.add(ck);
    const cap = new T.Mesh(new T.CylinderGeometry(.265, .265, .3, 40), M.brass); cap.position.y = .22; cork.add(cap);
    cork.position.y = 3.55;
    return shadowAll(b);
  };
  const labelT = new T.TextureLoader().load('img/etiquette.jpg'); labelT.colorSpace = T.SRGBColorSpace; labelT.anisotropy = aniso;
  const paperB = tex(256, 256, (x, w, h) => { x.fillStyle = '#888'; x.fillRect(0, 0, w, h); dots(x, w, h, 4000, ['#666', '#aaa'], .4, 1.2, .6); }, {srgb:false, repeat:[4, 4]});
  const labelMat = std({map:labelT, bumpMap:paperB, bumpScale:.6, roughness:.75});
  const plinth = new T.Mesh(new T.CylinderGeometry(1.5, 1.6, .28, 96), phy({map:graniteT, color:'#3a4232', roughness:.28, clearcoat:.6})); plinth.position.y = .14; g.add(shadowAll(plinth));
  const hero = makeBottle(); hero.position.y = .28; g.add(hero);
  const liquid = hero.getObjectByName('liquid'), cork = hero.getObjectByName('cork');
  [[-2.1, -1.4, .62], [2.2, -1.1, .78], [-3.6, -2.6, .7]].forEach(([x, z, s]) => { const b = makeBottle(); b.scale.setScalar(s); b.position.set(x, 0, z); const l = b.getObjectByName('liquid'); l.scale.y = 2.1; l.position.y = 1.11; b.rotation.y = rnd(-.4, .4); g.add(b); });
  const nozzle = new T.Mesh(new T.CylinderGeometry(.11, .06, 1, 24), M.steel); g.add(nozzle);
  const pipe = new T.Mesh(new T.CylinderGeometry(.09, .09, 3.6, 16), M.steel); pipe.rotation.z = Math.PI / 2; pipe.position.set(-1.8, 5.95, 0); g.add(pipe);
  const stream = new T.Mesh(new T.CylinderGeometry(.03, .03, 1, 12), M.oil); g.add(stream);
  stations.push({g, look:new T.Vector3(SP * 4, 2.2, 0), cam:new T.Vector3(SP * 4 + .8, 3.1, 11), tick(t) {
    const cyc = (t % 10) / 10, fill = Math.min(cyc / .55, 1), h = .04 + fill * 2.12;
    liquid.scale.y = h; liquid.position.y = .06 + h / 2;
    const pouring = cyc < .55; stream.visible = pouring;
    const top = 5.05, bot = .28 + .06 + h; stream.scale.y = top - bot; stream.position.y = (top + bot) / 2;
    nozzle.position.y = 5.5 + (pouring ? 0 : .5) - (cyc < .02 ? 0 : 0);
    const k = Math.min(Math.max((cyc - .58) / .14, 0), 1), e = 1 - Math.pow(1 - k, 3);
    cork.position.y = 3.55 + (1 - e) * 1.4; cork.visible = cyc > .56;
    hero.rotation.y = cyc > .74 ? -(cyc - .74) / .26 * Math.PI * .35 : 0;
  }});
}

/* ---------- défilement → caméra ---------- */
let progress = 0, shown = 0, introK = 1, introShown = 1, visible = false, mx = 0, my = 0, active = 0;
const camPos = new T.Vector3(), camLook = new T.Vector3();
const resize = () => {
  const r = canvas.parentElement.getBoundingClientRect(), w = r.width, h = r.height;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = camera.aspect < .9 ? 48 : 32;
  if (w > 860) camera.setViewOffset(w, h, -w * .16, 0, w, h); else camera.setViewOffset(w, h, 0, h * .16, w, h);
  camera.updateProjectionMatrix();
};
addEventListener('resize', resize); resize();
const readScroll = () => {
  const vh = innerHeight, target = innerWidth <= 860 ? vh * .62 : vh / 2;
  const centers = stepsEls.map(el => { const r = el.getBoundingClientRect(); return r.top + r.height / 2; });
  let best = 0, bestD = 1e9;
  centers.forEach((c, i) => { const d = Math.abs(c - target); if (d < bestD) { bestD = d; best = i; } });
  let p = best; const next = centers[best] > target ? best - 1 : best + 1;
  if (next >= 0 && next < centers.length) { const span = Math.abs(centers[next] - centers[best]) || 1; p = best + (next - best) * Math.min(Math.abs(centers[best] - target) / span, 1); }
  progress = Math.max(0, Math.min(stations.length - 1, p));
  introK = Math.max(0, Math.min(1, (centers[0] - target) / vh));
  if (best !== active) { active = best; onActive(active); }
  hud.forEach((h, i) => h.style.transform = `scaleX(${Math.max(0, Math.min(1, progress - i + 1 - introK))})`);
};
addEventListener('scroll', readScroll, {passive:true}); readScroll();
shown = progress; introShown = introK;
const onPointer = e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; };
stage.addEventListener('pointermove', onPointer);

const A = new T.Vector3(), B = new T.Vector3(), clock = new T.Clock();
let running = false, time = 0, first = true, raf = 0;
function frame() {
  if (!visible) { running = false; return; }
  const dt = Math.min(clock.getDelta(), .05);
  time += reduce ? dt * .3 : dt;
  const ease = first || reduce ? 1 : .065; first = false;
  shown += (progress - shown) * ease; introShown += (introK - introShown) * ease;
  const i = Math.min(Math.floor(shown), stations.length - 2), f = shown - i, e = f * f * (3 - 2 * f);
  A.lerpVectors(stations[i].cam, stations[i + 1].cam, e); B.lerpVectors(stations[i].look, stations[i + 1].look, e);
  A.y += Math.sin(f * Math.PI) * 1.4 + introShown * 1.6; A.z += Math.sin(f * Math.PI) * 1.5 + introShown * 4; A.x += introShown * 2.5;
  A.x += mx * 1.1; A.y -= my * .7;
  camPos.lerp(A, ease < 1 ? .15 : 1); camLook.lerp(B, ease < 1 ? .15 : 1);
  camera.position.copy(camPos); camera.lookAt(camLook);
  key.position.set(camLook.x + 6, 10, 7); key.target.position.copy(camLook);
  fill.position.set(camLook.x - 7, 4, 5); fill.target.position.copy(camLook);
  rim.position.set(camLook.x - 2, 7, -6); rim.target.position.copy(camLook);
  stations.forEach((s, k) => { const d = Math.abs(k - shown); s.g.visible = d < 1.5; if (d < 1.2) s.tick(time); });
  renderer.render(scene, camera);
  raf = requestAnimationFrame(frame);
}
const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !running) { running = true; clock.getDelta(); raf = requestAnimationFrame(frame); } }, {rootMargin:'200px'});
io.observe(canvas);

return () => {
  visible = false; cancelAnimationFrame(raf); io.disconnect();
  removeEventListener('resize', resize); removeEventListener('scroll', readScroll);
  stage.removeEventListener('pointermove', onPointer);
  const disposed = new Set(), dispose = r => { if (r && !disposed.has(r)) { disposed.add(r); r.dispose(); } };
  scene.traverse(o => {
    dispose(o.geometry);
    [].concat(o.material || []).forEach(m => { Object.values(m).forEach(v => { if (v?.isTexture) dispose(v); }); dispose(m); });
  });
  dispose(scene.environment); pmrem.dispose(); renderer.dispose();
};
}
