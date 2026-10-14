import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/CaseStudyCard.css';

/**
 * Tarjeta de caso de estudio (ROADMAP Fase 6). Toda la tarjeta es clickeable
 * vía el pseudo-elemento del link (patrón stretched link): un solo destino
 * accesible, sin envolver todo en <a>. Mientras `caseStudy` esté vacío se
 * muestra el estado draft honeste —borde punteado + nota "en preparación"—
 * y nunca texto inventado (AGENTS.md §3).
 */
function CaseStudyCard({ project }) {
  const { t } = useTranslation();
  const cs = project.caseStudy || {};
  const hasStudy = Boolean(
    cs.problem || cs.role || (cs.stack && cs.stack.length) || cs.decisions || cs.outcome
  );

  return (
    <article className={hasStudy ? 'case-card' : 'case-card case-card--draft'}>
      <p className="case-card__kicker">{t('case_study')}</p>
      <h3 className="case-card__title">{project.name}</h3>
      <p className="case-card__desc">{t(project.descriptionKey)}</p>

      {!hasStudy && (
        <p className="case-card__note">{t('case_in_progress')}</p>
      )}

      {hasStudy && (
        <dl className="case-card__fields">
          {cs.role && (
            <>
              <dt>{t('case_role')}</dt>
              <dd>{cs.role}</dd>
            </>
          )}
          {cs.stack && cs.stack.length > 0 && (
            <>
              <dt>{t('case_stack')}</dt>
              <dd>{cs.stack.join(' · ')}</dd>
            </>
          )}
          {cs.problem && (
            <>
              <dt>{t('case_problem')}</dt>
              <dd>{cs.problem}</dd>
            </>
          )}
          {cs.outcome && (
            <>
              <dt>{t('case_outcome')}</dt>
              <dd>{cs.outcome}</dd>
            </>
          )}
        </dl>
      )}

      <a
        className="case-card__link button button--quiet"
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('viewProj')}
        <span className="visually-hidden">
          {` — ${project.name} (${t('opens_new_tab')})`}
        </span>
      </a>
    </article>
  );
}

export default CaseStudyCard;
