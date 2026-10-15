import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTranslation } from 'react-i18next';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import '../styles/ScrollProgress.css';

/**
 * Rail de progreso lateral (feedback del propietario, 2026-10-14): línea roja
 * que avanza con el scroll + puntos por sección que se encienden al entrar en
 * viewport. La barra usa MotionValues (useScroll + useSpring sobre scaleY) —
 * nunca setState por frame (AGENTS.md §8.4) — y con prefers-reduced-motion
 * queda como indicador estático de posición sin resorte (informativo, no
 * decorativo). Solo ≥1280px: en viewports chicos taparía contenido.
 */
const SECTIONS = [
  { id: 'about', labelKey: 'about' },
  { id: 'experience', labelKey: 'experience_title' },
  { id: 'skills', labelKey: 'skills' },
  { id: 'projects', labelKey: 'proyect' },
  { id: 'contact', labelKey: 'contact' },
];

function ScrollProgress() {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [active, setActive] = useState(null);

  // Sección activa: IntersectionObserver cambia el estado solo al cruzar
  // secciones (raras veces), nunca por frame.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="scroll-rail" aria-label={t('scroll_nav_label')}>
      <span className="scroll-rail__track" aria-hidden="true">
        <motion.span
          className="scroll-rail__fill"
          style={{ scaleY: reduced ? scrollYProgress : spring }}
        />
      </span>
      <ul className="scroll-rail__dots">
        {SECTIONS.map(({ id, labelKey }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={
                active === id ? 'scroll-rail__dot scroll-rail__dot--active' : 'scroll-rail__dot'
              }
            >
              <span className="visually-hidden">{t(labelKey)}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ScrollProgress;
