import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import '../styles/Skills.css';
import { skills } from '../data/skills';
import githubData from '../data/github.json';
import SectionHeading from './SectionHeading';

// Stagger de pills (§4.3): el escalón se calcula para respetar el techo de
// 600 ms totales sin importar cuántas pills haya (hoy 31 → ~19 ms cada una).
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: Math.min(0.035, 0.6 / Math.max(skills.length, 1)),
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0, 0, 0.2, 1] },
  },
};

// Stat-cards (N3): mismo beat que las pills pero con más peso visual.
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0, 0, 0.2, 1] },
  },
};

// Barra de proporción: scaleX (transform puro, §8.1). El ancho del fill es
// dato (% real de bytes), no token de diseño.
const barVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] },
  },
};

/**
 * Skills — N3 (dirección Netflix): stat-cards y barras de lenguaje con datos
 * REALES de la API de GitHub (scripts/fetch-github.js → src/data/github.json),
 * más el stack verificado del propietario en pills. Nunca se muestran "horas":
 * la API de GitHub no las expone (ROADMAP N3). Sin datos (JSON ausente o vacío)
 * se dejan solo las pills y se avisa — estado draft honesto (AGENTS.md §3).
 */
function Skills() {
  const { t, i18n } = useTranslation();
  const gh = githubData && githubData.profile ? githubData : null;

  const stats = gh
    ? [
        { key: 'repos', value: String(gh.profile.publicRepos) },
        { key: 'followers', value: String(gh.profile.followers) },
        // commitsLastYear puede ser null si el search falló: se muestra "—".
        { key: 'commits', value: gh.totals.commitsLastYear != null ? String(gh.totals.commitsLastYear) : '—' },
        {
          key: 'since',
          value: new Intl.DateTimeFormat(i18n.language, { month: 'short', year: 'numeric' }).format(
            new Date(gh.profile.createdAt)
          ),
        },
      ]
    : [];

  const updated = gh
    ? new Intl.DateTimeFormat(i18n.language, { dateStyle: 'medium' }).format(new Date(gh.fetchedAt))
    : null;

  return (
    <section id="skills" className="skills">
      <SectionHeading kickerKey="kicker_skills" titleKey="skills" />

      {gh && (
        <>
          <motion.ul
            className="skills__stats"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat) => (
              <motion.li className="skills__stat" key={stat.key} variants={cardVariants}>
                <span className="skills__stat-value">{stat.value}</span>
                <span className="skills__stat-label">{t(`skills_stat_${stat.key}`)}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.ul
            className="skills__langs"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {gh.languages.map((lang) => (
              <motion.li className="skills__lang" key={lang.name} variants={pillVariants}>
                <span className="skills__lang-head">
                  <span className="skills__lang-name">{lang.name}</span>
                  <span className="skills__lang-share">{Math.round(lang.share * 100)}%</span>
                </span>
                <span className="skills__lang-bar">
                  <motion.span
                    className="skills__lang-fill"
                    style={{ width: `${Math.max(2, Math.round(lang.share * 100))}%` }}
                    variants={barVariants}
                  />
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <p className="skills__source">
            {t('skills_source', { date: updated })} ·{' '}
            <a href={gh.profile.profileUrl} target="_blank" rel="noopener noreferrer">
              {t('skills_view_profile')}
            </a>
          </p>
        </>
      )}

      {!gh && <p className="skills__source">{t('skills_data_unavailable')}</p>}

      <motion.ul
        className="skills__stack"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill) => (
          <motion.li key={skill} variants={pillVariants}>
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

export default Skills;
