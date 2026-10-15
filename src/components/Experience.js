import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Experience.css';
import { experience } from '../data/experience';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/**
 * Experience — N5 (dirección Netflix): timeline de experiencia profesional.
 * El contenido es exclusivo del propietario (src/data/experience.js); mientras
 * la lista esté vacía se muestra el estado draft honesto (AGENTS.md §3) —
 * nunca una experiencia inventada.
 */
function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="experience">
      <SectionHeading kickerKey="kicker_experience" titleKey="experience_title" />

      {experience.length === 0 && (
        <Reveal>
          <p className="experience__draft">{t('experience_draft')}</p>
        </Reveal>
      )}

      {experience.length > 0 && (
        <ol className="experience__list">
          {experience.map((item) => (
            <Reveal as="li" key={item.id} className="experience__item">
              <p className="experience__period">{t(item.periodKey)}</p>
              <h3 className="experience__role">{t(item.roleKey)}</h3>
              <p className="experience__company">{item.company}</p>
              {/* El propietario separa párrafos con \n\n: se preservan. */}
              {t(item.summaryKey) &&
                t(item.summaryKey)
                  .split('\n\n')
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p className="experience__summary" key={`${item.id}-p${i}`}>
                      {paragraph}
                    </p>
                  ))}
            </Reveal>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Experience;
