import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/NetflixIntro.css';

/**
 * Intro tipo "ta-dum" (N2, dirección Netflix): barras rojas que barren la
 * pantalla y el kicker "Portfolio" en Bebas Neue rojo, con salida en cámara
 * hacia el hero.
 *
 * Reglas duras cumplidas (AGENTS.md §9, ANIMATION_GUIDELINES.md §5.2):
 *  - no bloquea scroll, teclado ni clics: `pointer-events: none` y escucha
 *    window; cualquier gesto (clic, tecla, rueda, touch) la saltea;
 *  - legible a ~200 ms; total ≤ 2000 ms (< 2600 ms del presupuesto);
 *  - solo `transform` y `opacity` (más letter-spacing acotado al propio
 *    texto, sin afectar layout de terceros);
 *  - con `prefers-reduced-motion` no se monta (App.js la omite);
 *  - `aria-hidden`: el contenido real vive en el hero.
 */
const INTRO_MS = 2000;

function NetflixIntro({ onDone }) {
  const { t } = useTranslation();

  useEffect(() => {
    const finish = () => onDone();
    const timer = setTimeout(finish, INTRO_MS);
    const opts = { passive: true };
    window.addEventListener('pointerdown', finish, opts);
    window.addEventListener('keydown', finish);
    window.addEventListener('wheel', finish, opts);
    window.addEventListener('touchstart', finish, opts);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchstart', finish);
    };
  }, [onDone]);

  return (
    <div className="netflix-intro" aria-hidden="true">
      <span className="netflix-intro__bar netflix-intro__bar--left" />
      <span className="netflix-intro__bar netflix-intro__bar--right" />
      <p className="netflix-intro__text">{t('hero_kicker')}</p>
    </div>
  );
}

export default NetflixIntro;
