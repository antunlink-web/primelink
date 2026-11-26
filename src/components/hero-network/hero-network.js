/*!
 * PrimeLink hero network: a wireframe of linked points that redraws itself into
 * a website, a webshop, a CRM dashboard, a bank card and an AI chip.
 * No dependencies. Canvas 2D. Pauses off-screen; gentle mode under reduced motion.
 *
 * Usage:
 *   import { mountHeroNetwork } from './hero-network.js';
 *   const destroy = mountHeroNetwork(document.getElementById('hero-visual'));
 *   // later, if the element is removed: destroy();
 *
 * Options: { labels: [5 strings, in shape order], theme: 'auto' | 'light' | 'dark' }
 */
export function mountHeroNetwork(container, {
  labels = ['Web stranice', 'Web trgovine', 'CRM sustavi', 'Kartično plaćanje', 'AI rješenja'],
  theme = 'auto'
} = {}) {

/* ---------- shape geometry (unit space, about -0.9..0.9) ---------- */
const TAU = Math.PI * 2;
const arc = (cx, cy, r, a0, a1, n = 28) => Array.from({length: n + 1}, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; });
const circ = (cx, cy, r) => arc(cx, cy, r, 0, TAU, 36);
const ln = (x0, y0, x1, y1) => [[x0, y0], [x1, y1]];
const rr = (x, y, w, h, r) => {
  const p = [];
  p.push(...arc(x + w - r, y + r, r, -Math.PI / 2, 0, 6));
  p.push(...arc(x + w - r, y + h - r, r, 0, Math.PI / 2, 6));
  p.push(...arc(x + r, y + h - r, r, Math.PI / 2, Math.PI, 6));
  p.push(...arc(x + r, y + r, r, Math.PI, Math.PI * 1.5, 6));
  p.push(p[0]); return p;
};

const range = (n, f) => Array.from({length: n}, (_, i) => f(i));
const poly = (...p) => p;
const SHAPES = [
  /* web stranice: browser with a real page layout */
  [rr(-.9,-.62,1.8,1.24,.07), ln(-.9,-.46,.9,-.46), circ(-.81,-.54,.024), circ(-.73,-.54,.024), circ(-.65,-.54,.024),
   rr(-.44,-.575,.9,.07,.035), ln(-.37,-.54,-.04,-.54),
   rr(-.79,-.405,.13,.05,.012), ln(.12,-.38,.22,-.38), ln(.28,-.38,.38,-.38), ln(.44,-.38,.54,-.38), rr(.62,-.405,.17,.05,.025),
   ln(-.79,-.22,-.1,-.22), ln(-.79,-.145,-.24,-.145), ln(-.79,-.06,-.14,-.06), ln(-.79,-.01,-.22,-.01),
   rr(-.79,.06,.25,.075,.037), rr(-.5,.06,.2,.075,.037),
   rr(.02,-.27,.77,.42,.03), poly([.05,.13],[.24,-.05],[.36,.05],[.5,-.12],[.76,.13]), circ(.62,-.16,.04),
   ...[-.79,-.265,.26].flatMap(x => [rr(x,.24,.51,.3,.025), rr(x+.03,.27,.45,.13,.015), ln(x+.03,.45,x+.36,.45), ln(x+.03,.5,x+.26,.5)])],
  /* web trgovine: paper shopping bag with gusset, rope handles and a label */
  [poly([-.5,-.3],[.5,-.3],[.58,.68],[-.58,.68],[-.5,-.3]), poly([.5,-.3],[.7,-.23],[.76,.6],[.58,.68]),
   ln(-.5,-.17,.5,-.17), ln(.5,-.17,.71,-.1), poly([.6,-.265],[.64,.64]),
   arc(0,-.27,.31,Math.PI,TAU,34), arc(0,-.27,.27,Math.PI,TAU,30), circ(-.29,-.22,.028), circ(.29,-.22,.028),
   rr(-.24,.08,.48,.32,.03), ln(-.16,.17,.16,.17), ln(-.11,.25,.11,.25), ln(-.07,.31,.07,.31),
   ln(-.56,.58,.56,.58)],
  /* CRM sustavi: dashboard with sidebar, KPIs, charts and records */
  [rr(-.9,-.6,1.8,1.2,.07), ln(-.56,-.6,-.56,.6), rr(-.81,-.52,.15,.06,.015),
   ...[-.36,-.26,-.16,-.06,.04].flatMap(y => [rr(-.81,y,.04,.04,.008), ln(-.73,y+.02,-.63,y+.02)]),
   circ(-.78,.5,.035), ln(-.72,.5,-.62,.5),
   ln(-.56,-.44,.9,-.44), ln(-.48,-.52,-.26,-.52), rr(.3,-.555,.32,.07,.035), circ(.79,-.52,.035),
   ...[-.48,-.02,.44].flatMap((x, i) => [rr(x,-.38,.4,.22,.025), ln(x+.04,-.33,x+.15,-.33), ln(x+.04,-.26,x+.2,-.26),
      poly([x+.25,-.22],[x+.29,-.27],[x+.32,-.25],[x+.36,-.32])]),
   rr(-.48,-.1,.86,.44,.025), ln(-.44,-.05,-.28,-.05), ln(-.44,.28,.34,.28),
   poly([-.44,.24],[-.32,.14],[-.2,.18],[-.06,.04],[.08,.09],[.2,-.02],[.34,0]), circ(.2,-.02,.018),
   rr(.42,-.1,.42,.44,.025), ...[0,1,2,3,4].map(i => rr(.47+i*.075,.28-[.12,.2,.15,.27,.22][i],.04,[.12,.2,.15,.27,.22][i],.008)),
   rr(-.48,.38,1.32,.17,.025), ...[.43,.5].flatMap(y => [circ(-.43,y,.018), ln(-.39,y,-.18,y), ln(-.02,y,.12,y), rr(.5,y-.016,.12,.032,.016)])],
  /* kartično plaćanje: bank card with chip pads and embossed digits */
  [rr(-.86,-.54,1.72,1.08,.09), ln(-.66,-.4,-.42,-.4), ln(.5,-.4,.7,-.4), ln(.56,-.35,.7,-.35),
   rr(-.66,-.25,.27,.21,.04), ln(-.66,-.18,-.39,-.18), ln(-.66,-.11,-.39,-.11), ln(-.525,-.25,-.525,-.18), ln(-.525,-.11,-.525,-.04), rr(-.58,-.18,.11,.07,.01),
   arc(-.25,-.145,.055,-.8,.8,8), arc(-.25,-.145,.1,-.8,.8,10), arc(-.25,-.145,.145,-.8,.8,12),
   ...range(16, i => rr(-.66 + Math.floor(i/4)*.33 + (i%4)*.065, .05, .045, .085, .012)),
   ln(-.66,.25,-.54,.25), ln(-.46,.25,-.3,.25), ln(-.66,.37,-.18,.37),
   circ(.46,.3,.12), circ(.62,.3,.12)],
  /* AI rješenja: processor with pins and a spark at its core */
  [rr(-.5,-.5,1,1,.08), rr(-.33,-.33,.66,.66,.05), circ(-.25,-.25,.018),
   ...range(7, i => { const v = -.36 + i*.12; return [ln(v,-.5,v,-.66), ln(v,.5,v,.66), ln(-.5,v,-.66,v), ln(.5,v,.66,v)]; }).flat(),
   ...range(4, i => { const v = -.18 + i*.12; return [ln(v,-.33,v,-.42), ln(v,.33,v,.42)]; }).flat(),
   poly([0,-.2],[.05,-.05],[.2,0],[.05,.05],[0,.2],[-.05,.05],[-.2,0],[-.05,-.05],[0,-.2]),
   poly([.17,-.24],[.19,-.19],[.24,-.17],[.19,-.15],[.17,-.1],[.15,-.15],[.1,-.17],[.15,-.19],[.17,-.24])]
];

/* sample each shape into exactly M points spread evenly along its outlines */
const M = 900, LAYERS = [0, .14];
function sample(polys) {
  const segs = [];
  polys.forEach((p, pi) => { for (let i = 0; i < p.length - 1; i++) { const [a, b] = [p[i], p[i+1]]; segs.push({a, b, pi, len: Math.hypot(b[0]-a[0], b[1]-a[1])}); } });
  const total = segs.reduce((s, g) => s + g.len, 0), step = total / M, pts = [], conn = [];
  let si = 0, acc = 0;
  for (let k = 0; k < M; k++) {
    let d = k * step;
    while (si < segs.length - 1 && acc + segs[si].len < d) { acc += segs[si].len; si++; }
    const g = segs[si], t = g.len ? Math.min(1, (d - acc) / g.len) : 0;
    pts.push([g.a[0] + (g.b[0]-g.a[0]) * t, g.a[1] + (g.b[1]-g.a[1]) * t]);
    conn.push(g.pi);
  }
  /* link k -> k+1 only inside the same outline */
  return {pts, link: conn.map((c, k) => k < M - 1 && conn[k+1] === c)};
}
const S = SHAPES.map(sample);

/* ---------- canvas ---------- */
const viz = container;
viz.classList.add('pl-net');
const cv = document.createElement('canvas'), cx = cv.getContext('2d');
const tagWrap = document.createElement('div'); tagWrap.className = 'pl-net-tags';
const POS = ['left:2%;top:7%','right:2%;top:10%','right:0;top:58%','left:4%;bottom:6%','left:0;top:44%'];
labels.forEach((l, i) => { const t = document.createElement('span'); t.className = 'pl-net-tag'; t.style.cssText = POS[i] || ''; t.textContent = l; tagWrap.appendChild(t); });
viz.append(cv, tagWrap);
const tags = [...tagWrap.children];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let W = 0, H = 0, DPR = 1;
const resize = () => { const r = viz.getBoundingClientRect(); DPR = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * DPR; cv.height = H * DPR; cx.setTransform(DPR, 0, 0, DPR, 0, 0); frame(performance.now()); };
const ro = new ResizeObserver(resize); ro.observe(viz);

const dark = () => { if (theme !== 'auto') return theme === 'dark'; const r = document.documentElement, t = r.dataset.theme || r.dataset.bsTheme; return t ? t === 'dark' : r.classList.contains('dark') || matchMedia('(prefers-color-scheme: dark)').matches; };

/* per-point jitter so the drawing feels alive, not mechanical */
const N = M * LAYERS.length;
const seed = Array.from({length: N}, (_, i) => [Math.sin(i * 12.9898) * 43758.5453 % 1, Math.sin(i * 78.233) * 12345.678 % 1]);

/* ambient points live in a ring around the object */
const AMB = Array.from({length: 46}, (_, i) => { const a = i / 46 * TAU + seed[i][0], r = .98 + Math.abs(seed[i][1]) * .2; return [Math.cos(a) * r, Math.sin(a) * r * .85, .2 + Math.abs(seed[i][0]) * .3, i]; });

/* signals travelling along the outlines */
const SIG = Array.from({length: 20}, () => ({l: 0, i: Math.random() * M | 0, f: 0, v: .35 + Math.random() * .4}));

let cur = 0, nxt = 1, phase = 0, t0 = performance.now(), mouse = {x: 0, y: 0, in: false}, tilt = {x: 0, y: 0};
const HOLD = 3800, MORPH = 1500;
const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
const onMove = e => { const r = viz.getBoundingClientRect(); mouse.x = (e.clientX - r.left) / r.width - .5; mouse.y = (e.clientY - r.top) / r.height - .5; mouse.in = true; };
const onLeave = () => mouse.in = false;
viz.addEventListener('pointermove', onMove); viz.addEventListener('pointerleave', onLeave);

const proj = new Float32Array(N * 3);
function frame(now) {
  const el = now - t0;
  let p = 0;
  if (el > HOLD + MORPH) { cur = nxt; nxt = (nxt + 1) % S.length; t0 = now; }
  p = Math.max(0, (el - HOLD) / MORPH);
  const show = p > .5 ? nxt : cur; tags.forEach((g, i) => g.classList.toggle('is-on', i === show));
  /* gentle mode: no travel between shapes, only a crossfade */
  const fade = reduced ? (p === 0 ? 1 : Math.abs(1 - 2 * Math.min(1, p))) : 1;
  const RA = reduced ? (p > .5 ? S[nxt].pts : S[cur].pts) : null;
  const A = RA || S[cur].pts, B = RA || S[nxt].pts;
  const t = now / 1000;
  tilt.x += ((mouse.in ? mouse.x : 0) - tilt.x) * .05; tilt.y += ((mouse.in ? mouse.y : 0) - tilt.y) * .05;
  const yaw = (reduced ? -.32 : Math.sin(t * .22) * .42) + tilt.x * .7, pitch = (reduced ? .12 : Math.sin(t * .17) * .1) - tilt.y * .45;
  const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const sc = Math.min(W, H) * .43, ox = W / 2, oy = H / 2, F = 3.2;

  for (let l = 0; l < LAYERS.length; l++) for (let k = 0; k < M; k++) {
    const n = l * M + k;
    /* staggered morph: the new shape draws itself along the outline */
    const q = reduced ? 0 : ease(Math.min(1, Math.max(0, p * 1.45 - (k / M) * .45)));
    const sw = Math.sin(q * Math.PI) * .12;
    let x = A[k][0] + (B[k][0] - A[k][0]) * q + seed[n][0] * sw;
    let y = A[k][1] + (B[k][1] - A[k][1]) * q + seed[n][1] * sw;
    let z = LAYERS[l] + Math.sin(q * Math.PI) * seed[n][1] * .5;
    if (!reduced) { x += Math.sin(t * .9 + n) * .0015; y += Math.cos(t * .8 + n * 1.3) * .0015; }
    const x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw;
    const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
    const s = F / (F + z2);
    proj[n*3] = ox + x1 * sc * s; proj[n*3+1] = oy + y1 * sc * s; proj[n*3+2] = z2;
  }

  cx.clearRect(0, 0, W, H);
  cx.globalAlpha = 1;
  const dk = dark(), rgb = dk ? '143,186,255' : '34,109,213';
  const la = S[nxt].link, lb = S[cur].link, morphing = p > 0 && p < 1;

  cx.globalAlpha = fade;
  /* links: along outlines per layer, plus rungs between layers */
  for (let l = 0; l < LAYERS.length; l++) {
    const depth = l === 0 ? 1 : .32;
    cx.beginPath();
    for (let k = 0; k < M - 1; k++) {
      if (!(p > .5 ? la[k] : lb[k])) continue;
      const a = (l*M + k) * 3, b = a + 3;
      if (Math.abs(proj[a] - proj[b]) + Math.abs(proj[a+1] - proj[b+1]) > sc * .075) continue;
      cx.moveTo(proj[a], proj[a+1]); cx.lineTo(proj[b], proj[b+1]);
    }
    cx.strokeStyle = `rgba(${rgb},${(dk ? .75 : .7) * depth})`; cx.lineWidth = l === 0 ? 1.25 : .8; cx.stroke();
  }
  cx.beginPath();
  for (let k = 0; k < M; k += 14) for (let l = 0; l < LAYERS.length - 1; l++) {
    const a = (l*M + k) * 3, b = ((l+1)*M + k) * 3;
    cx.moveTo(proj[a], proj[a+1]); cx.lineTo(proj[b], proj[b+1]);
  }
  cx.strokeStyle = `rgba(${rgb},${dk ? .16 : .12})`; cx.lineWidth = .7; cx.stroke();

  /* points, brighter near the cursor */
  const mx = (mouse.x + .5) * W, my = (mouse.y + .5) * H;
  for (let n = 0; n < N; n++) {
    const x = proj[n*3], y = proj[n*3+1], z = proj[n*3+2];
    const near = mouse.in ? Math.max(0, 1 - Math.hypot(x - mx, y - my) / 90) : 0;
    const front = n < M, tw = reduced ? .7 + .3 * Math.sin(t * 1.6 + n * 2.1) : 1, a = (front ? .85 : .3) * (1 - z * .8) * tw + near * .5;
    cx.fillStyle = `rgba(${rgb},${Math.min(1, a)})`;
    const r = (front ? 1.5 : 1) + near * 1.8;
    cx.fillRect(x - r/2, y - r/2, r, r);
  }

  cx.globalAlpha = 1;
  /* ambient constellation: slow drifting points, linked when close */
  const dr = reduced ? 0 : .04;
  const amb = AMB.map(d => [ox + (d[0] + Math.sin(t * d[2] + d[3]) * dr) * sc * 1.05, oy + (d[1] + Math.cos(t * d[2] * .8 + d[3]) * dr) * sc * 1.05]);
  cx.beginPath();
  for (let i = 0; i < amb.length; i++) for (let j = i + 1; j < amb.length; j++) {
    const dd = Math.hypot(amb[i][0] - amb[j][0], amb[i][1] - amb[j][1]);
    if (dd < sc * .28) { cx.moveTo(amb[i][0], amb[i][1]); cx.lineTo(amb[j][0], amb[j][1]); }
  }
  cx.strokeStyle = `rgba(${rgb},${dk ? .12 : .09})`; cx.lineWidth = .7; cx.stroke();
  cx.fillStyle = `rgba(${rgb},${dk ? .45 : .35})`;
  for (const [x, y] of amb) cx.fillRect(x - 1, y - 1, 2, 2);

  /* travelling signals with a short tail */
  if (!reduced) for (const g of SIG) {
    g.f += g.v * 2; while (g.f >= 1) { g.f -= 1; g.i++; }
    const link = S[p >= .5 ? nxt : cur].link;
    if (g.i >= M - 1 || !link[g.i]) { g.i = Math.random() * (M - 20) | 0; g.l = 0; }
    for (let j = 10; j >= 0; j--) {
      const k = Math.max(0, g.i - j), n = (g.l*M + k) * 3;
      const a = (1 - j / 11);
      cx.fillStyle = `rgba(${rgb},${a * .9})`;
      cx.beginPath(); cx.arc(proj[n], proj[n+1], j ? 1.4 : 2.4, 0, TAU); cx.fill();
    }
    const n = (g.l*M + g.i) * 3;
    cx.fillStyle = `rgba(${rgb},.14)`; cx.beginPath(); cx.arc(proj[n], proj[n+1], Math.max(4, sc * .03), 0, TAU); cx.fill();
  }
}

tags[0] && tags[0].classList.add('is-on');
let raf = 0, running = false;
const loop = now => { frame(now); raf = requestAnimationFrame(loop); };
const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) { running = true; t0 = performance.now() - (t0 ? 0 : 0); raf = requestAnimationFrame(loop); }
    else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
  });
io.observe(viz);
return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); viz.removeEventListener('pointermove', onMove); viz.removeEventListener('pointerleave', onLeave); cv.remove(); tagWrap.remove(); viz.classList.remove('pl-net'); };
}
