import { useEffect, useRef } from 'react';

/**
 * Capa decorativa del hero ("Campo" + detalles de "Órbita"):
 * un campo de puntos que el cursor empuja y que vuelve a su lugar con
 * amortiguación, más tres primitivas geométricas (anillo, arco, regla) con
 * profundidades distintas.
 *
 * Reglas duras (ANIMATION_GUIDELINES.md §6):
 *  - canvas 2D escrito a mano, sin dependencias nuevas;
 *  - 1 solo loop de requestAnimationFrame, con paso fijo a 60 Hz;
 *  - DPR limitado a 2; ≤ 1200 puntos en desktop / ≤ 400 en pantallas chicas;
 *  - pausa fuera del viewport, con la pestaña oculta y con reduced-motion;
 *  - en táctil (sin hover fino) dibuja un cuadro estático y no anima nada;
 *  - cero setState por frame: todo vive en refs y en el propio canvas.
 */
function ReactiveLayer({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !canvas.getContext) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    // Los colores salen de los tokens: el canvas no inventa paleta.
    const css = getComputedStyle(document.documentElement);
    const token = (name, fallback) => (css.getPropertyValue(name) || '').trim() || fallback;
    const colors = {
      // Fallbacks = tokens del tema oscuro (N1) por si :root no está disponible.
      line: token('--color-line', '#333333'),
      ink: token('--color-ink', '#FFFFFF'),
      signal: token('--color-signal', '#E50914'),
    };
    const influence = parseFloat(token('--hero-influence-radius', '140')) || 140;

    const FIXED_STEP = 1000 / 60;
    const MAX_STEPS = 3;

    const state = {
      width: 0,
      height: 0,
      dots: [],
      shapes: [],
      pointer: { x: 0, y: 0, active: false },
      time: 0,
      accumulator: 0,
      last: 0,
      raf: 0,
      running: false,
      inView: true,
    };

    const buildScene = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // presupuesto: DPR ≤ 2
      state.width = Math.max(1, Math.round(rect.width));
      state.height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(state.width * dpr);
      canvas.height = Math.round(state.height * dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densidad del campo según ancho: ~1100 pts en desktop, ~250 en móvil.
      const spacing = state.width < 720 ? 46 : 34;
      const cols = Math.max(2, Math.floor(state.width / spacing));
      const rows = Math.max(2, Math.floor(state.height / spacing));
      const offsetX = (state.width - (cols - 1) * spacing) / 2;
      const offsetY = (state.height - (rows - 1) * spacing) / 2;

      const dots = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const hx = offsetX + c * spacing;
          const hy = offsetY + r * spacing;
          dots.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 });
        }
      }
      state.dots = dots;

      // Geometría flotante: depth menor = más lejos = sigue al cursor más lento.
      const m = Math.min(state.width, state.height);
      state.shapes = [
        { type: 'ring', cx: state.width * 0.82, cy: state.height * 0.3, r: m * 0.24, depth: 0.35, phase: 0.0, amp: 6, ox: 0, oy: 0 },
        { type: 'arc', cx: state.width * 0.14, cy: state.height * 0.72, r: m * 0.17, depth: 0.6, phase: 1.7, amp: 9, ox: 0, oy: 0 },
        { type: 'rule', cx: state.width * 0.5, cy: state.height * 0.9, len: Math.min(state.width * 0.44, 460), depth: 0.8, phase: 3.1, amp: 12, ox: 0, oy: 0 },
      ];
    };

    const step = () => {
      const { x: px, y: py, active } = state.pointer;
      const radius2 = influence * influence;

      for (let i = 0; i < state.dots.length; i += 1) {
        const d = state.dots[i];
        if (active) {
          const dx = d.x - px;
          const dy = d.y - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < radius2 && d2 > 0.01) {
            const dist = Math.sqrt(d2);
            const falloff = 1 - dist / influence;
            const push = falloff * falloff * 0.9; // repulsión con caída cuadrática
            d.vx += (dx / dist) * push;
            d.vy += (dy / dist) * push;
          }
        }
        // Retorno elástico + amortiguación = vuelta orgánica, nunca en línea recta.
        d.vx += (d.hx - d.x) * 0.045;
        d.vy += (d.hy - d.y) * 0.045;
        d.vx *= 0.88;
        d.vy *= 0.88;
        d.x += d.vx;
        d.y += d.vy;
      }

      state.time += FIXED_STEP;
      for (let i = 0; i < state.shapes.length; i += 1) {
        const s = state.shapes[i];
        const driftX = Math.sin(state.time * 0.00035 + s.phase) * s.amp;
        const driftY = Math.cos(state.time * 0.00028 + s.phase) * s.amp;
        const targetX = active ? ((px - s.cx) / state.width) * 24 * s.depth : 0;
        const targetY = active ? ((py - s.cy) / state.height) * 24 * s.depth : 0;
        s.ox += (targetX + driftX - s.ox) * 0.06; // damping por profundidad
        s.oy += (targetY + driftY - s.oy) * 0.06;
      }
    };

    const drawDots = (dots, size) => {
      for (let i = 0; i < dots.length; i += 1) {
        const d = dots[i];
        ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size);
      }
    };

    const drawShapes = () => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      for (let i = 0; i < state.shapes.length; i += 1) {
        const s = state.shapes[i];
        const x = s.cx + s.ox;
        const y = s.cy + s.oy;
        ctx.beginPath();
        if (s.type === 'ring') {
          ctx.arc(x, y, s.r, 0, Math.PI * 2);
        } else if (s.type === 'arc') {
          ctx.arc(x, y, s.r, Math.PI, Math.PI * 2);
        } else {
          // Regla fina con ticks: el tick central es el único acento signal.
          const half = s.len / 2;
          ctx.moveTo(x - half, y);
          ctx.lineTo(x + half, y);
          for (let t = -4; t <= 4; t += 1) {
            if (t === 0) continue;
            const tx = x + (t / 4) * half;
            ctx.moveTo(tx, y);
            ctx.lineTo(tx, y - 5);
          }
        }
        ctx.stroke();
      }

      // Acento escaso: un solo tick en signal (DESIGN_SYSTEM.md §2).
      const rule = state.shapes[2];
      if (rule) {
        ctx.strokeStyle = colors.signal;
        ctx.beginPath();
        ctx.moveTo(rule.cx + rule.ox, rule.cy + rule.oy);
        ctx.lineTo(rule.cx + rule.ox, rule.cy + rule.oy - 10);
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, state.width, state.height);

      // Tres cubetas por desplazamiento => 3 cambios de fillStyle por cuadro.
      const far = [];
      const mid = [];
      const near = [];
      for (let i = 0; i < state.dots.length; i += 1) {
        const d = state.dots[i];
        const disp = Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy);
        if (disp > 26) near.push(d);
        else if (disp > 8) mid.push(d);
        else far.push(d);
      }

      ctx.fillStyle = colors.line;
      ctx.globalAlpha = 0.9;
      drawDots(far, 1.6);
      ctx.fillStyle = colors.ink;
      ctx.globalAlpha = 0.45;
      drawDots(mid, 2.2);
      ctx.fillStyle = colors.signal;
      ctx.globalAlpha = 0.9;
      drawDots(near, 2.6);
      ctx.globalAlpha = 1;

      drawShapes();
    };

    const loop = (ts) => {
      if (!state.running) return;
      const dt = Math.min(ts - (state.last || ts), 100);
      state.last = ts;
      state.accumulator += dt;
      let steps = 0;
      while (state.accumulator >= FIXED_STEP && steps < MAX_STEPS) {
        step();
        state.accumulator -= FIXED_STEP;
        steps += 1;
      }
      draw();
      state.raf = requestAnimationFrame(loop);
    };

    const isStatic = () => reducedQuery.matches || !pointerQuery.matches;

    const stop = () => {
      state.running = false;
      if (state.raf) cancelAnimationFrame(state.raf);
      state.raf = 0;
    };

    const refresh = () => {
      if (isStatic() || !state.inView || document.hidden) {
        stop();
        draw(); // cuadro estático: composición completa, sin movimiento
        return;
      }
      if (!state.running) {
        state.accumulator = 0;
        state.last = 0;
        state.running = true;
        state.raf = requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      state.pointer.x = event.clientX - rect.left;
      state.pointer.y = event.clientY - rect.top;
      state.pointer.active = true;
    };

    const onPointerLeave = () => {
      state.pointer.active = false;
    };

    const observer = new IntersectionObserver((entries) => {
      state.inView = entries[0].isIntersecting;
      refresh();
    });
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      buildScene();
      draw();
    });
    resizeObserver.observe(container);

    const onVisibility = () => refresh();

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);
    reducedQuery.addEventListener('change', refresh);
    pointerQuery.addEventListener('change', refresh);

    // Init diferido 2 rAF: la capa es decorativa (§5.2-7) y no compite con el
    // primer paint del contenido en CPUs con throttle (presupuesto LCP, AGENTS §8).
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        buildScene();
        refresh();
      });
    });

    return () => {
      stop();
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedQuery.removeEventListener('change', refresh);
      pointerQuery.removeEventListener('change', refresh);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="hero__layer" aria-hidden="true" />;
}

export default ReactiveLayer;
