import React from 'react';
import { MotionConfig } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import './i18n';

import './styles/tokens.css';
import './App.css';

function App() {
  const { t } = useTranslation();
  return (
    // reducedMotion="user": toda animación de Motion respeta prefers-reduced-motion
    // (ANIMATION_GUIDELINES.md §8, obligatorio).
    <MotionConfig reducedMotion="user">
      <div className="App">
        {/* Primer foco de la página (AGENTS.md §7): salta la nav repetida. */}
        <a className="skip-link" href="#hero">{t('skip_to_content')}</a>
        <Header />
        <Hero />
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
