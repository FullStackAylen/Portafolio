import React, { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import NetflixIntro from './components/NetflixIntro';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import './i18n';

import './styles/tokens.css';
import './App.css';

function App() {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  // La intro "ta-dum" (N2) solo existe con movimiento permitido: con
  // prefers-reduced-motion el hero se ve directo, sin overlay (AGENTS.md §9).
  const [introActive, setIntroActive] = useState(() => !reduced);
  const endIntro = useCallback(() => setIntroActive(false), []);
  return (
    // reducedMotion="user": toda animación de Motion respeta prefers-reduced-motion
    // (ANIMATION_GUIDELINES.md §8, obligatorio).
    <MotionConfig reducedMotion="user">
      <div className="App">
        {/* Primer foco de la página (AGENTS.md §7): salta la nav repetida. */}
        <a className="skip-link" href="#hero">{t('skip_to_content')}</a>
        {introActive && <NetflixIntro onDone={endIntro} />}
        <Header />
        {/* paused: la cascada del hero espera al final de la intro y arranca
            desde el beat 0 (pausa, no reinicio). */}
        <Hero paused={introActive} />
        <main>
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;
