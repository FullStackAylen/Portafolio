import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import '../styles/About.css';
import Photo from '../Assets/MePhoto.jpeg';
import { useTranslation } from 'react-i18next';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

function About() {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef(null);

  // Parallax contenido (§4.2): ±12 px sobre el marco — ≤10% del elemento,
  // solo transform, y desactivado por completo con reduce-motion.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const frameY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section id="about" className="about">
      <SectionHeading kickerKey="kicker_about" titleKey="about" />
      <Reveal className="content-about">
        <div className="profile-container" ref={frameRef}>
          <motion.div
            className="profile-frame-outer"
            style={reduced ? undefined : { y: frameY }}
          >
            <div className="profile-frame-inner">
              <img
                className="profile-image"
                src={Photo}
                alt="Retrato de Aylén Rodríguez"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
        <div className="about__text">
          <p>
            {t('presentation')}<br />
            {t('presentation_2')}
          </p>
          <blockquote>
            {t('quote')}
          </blockquote>
        </div>
      </Reveal>
    </section>
  );
}

export default About;
