import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactiveLayer from './ReactiveLayer';
import '../styles/Hero.css';

/**
 * Hero — "Precisión viva": tipografía protagonista sobre papel + una única capa
 * reactiva decorativa (ReactiveLayer). Aprobado en ROADMAP Fase 4a.
 * El contenido se lee completo sin JS y sin animación; la capa viva es aria-hidden.
 * Entrada salteable (ANIMATION_GUIDELINES.md §5.2-2): el primer gesto del usuario
 * (clic, tecla o scroll) lleva la composición a su estado final al instante.
 */
function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const finish = () => setIntroDone(true);
    // Se registra una sola vez y se quita solo: el gesto solo saltea la entrada.
    const opts = { passive: true };
    window.addEventListener('scroll', finish, opts);
    window.addEventListener('keydown', finish);
    window.addEventListener('pointerdown', finish, opts);
    return () => {
      window.removeEventListener('scroll', finish);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
    };
  }, []);

  return (
    <section
      className={introDone ? 'hero hero--intro-done' : 'hero'}
      aria-labelledby="hero-title"
      id="hero"
      ref={sectionRef}
    >
      <ReactiveLayer containerRef={sectionRef} />

      <div className="hero__content">
        <p className="hero__kicker">
          <span className="hero__line">
            <span className="hero__line-inner">{t('hero_kicker')}</span>
          </span>
        </p>

        {/* Único h1 de la página (el logo del header pasó a ser texto). */}
        <h1 className="hero__name" id="hero-title">
          <span className="hero__line">
            <span className="hero__line-inner">{t('hero_name_1')}</span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner">{t('hero_name_2')}</span>
          </span>
        </h1>

        <div className="hero__aside">
          <p className="hero__role">
            <span className="hero__line">
              <span className="hero__line-inner">{t('hero_role')}</span>
            </span>
          </p>
          <p className="hero__desc">
            <span className="hero__line">
              <span className="hero__line-inner">{t('hero_desc')}</span>
            </span>
          </p>
        </div>

        <a className="hero__cta" href="#about">
          <span className="hero__line">
            <span className="hero__line-inner">{t('hero_cta')}</span>
          </span>
          <span className="hero__cta-arrow" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

export default Hero;
