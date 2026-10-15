import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ProjectCard.css';
import ProjectCover from './ProjectCover';

/**
 * Card de proyecto estilo Netflix (N4): cover SVG generado, título, descripción
 * localizada y —si el snapshot de GitHub tiene el repo— meta real (lenguaje,
 * stars, último push). El case study completo está colapsado tras un botón
 * "Ver más" (aria-expanded) para que la card no quede larga (feedback del
 * propietario, 2026-10-14). Mientras `caseStudy` esté vacío se muestra el
 * estado draft honesto y jamás texto inventado (AGENTS.md §3).
 *
 * Toda la card es clickeable vía pseudo-elemento del link (stretched link):
 * un solo destino accesible al deploy. El botón "Ver más" se eleva por encima
 * del pseudo para poder expandir sin navegar.
 *
 * El nombre del repo se deriva del `repository` del proyecto (dato real) para
 * cruzarlo con src/data/github.json. Los repos del propietario son privados:
 * sin match, la card solo omite la meta.
 */
function ProjectCard({ project, ghRepo }) {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const cs = project.caseStudy || {};
  const hasStudy = Boolean(
    cs.problem || cs.role || (cs.stack && cs.stack.length) || cs.decisions || cs.outcome
  );

  const pushedLabel = ghRepo
    ? new Intl.DateTimeFormat(i18n.language, { month: 'short', year: 'numeric' }).format(
        new Date(ghRepo.pushedAt)
      )
    : null;

  return (
    <article className={hasStudy ? 'project-card' : 'project-card project-card--draft'}>
      <ProjectCover project={project} language={ghRepo && ghRepo.language} />

      <div className="project-card__body">
        <h3 className="project-card__title">{project.name}</h3>
        <p className="project-card__desc">{t(project.descriptionKey)}</p>

        {ghRepo && (
          <p className="project-card__meta">
            {ghRepo.language}
            {ghRepo.stars > 0 && ` · ★ ${ghRepo.stars}`}
            {pushedLabel && ` · ${t('project_pushed', { date: pushedLabel })}`}
          </p>
        )}

        {!hasStudy && <p className="project-card__note">{t('case_in_progress')}</p>}

        {hasStudy && (
          <dl className="project-card__fields" id={`case-${project.id}`} hidden={!expanded}>
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
            {cs.decisions && (
              <>
                <dt>{t('case_decisions')}</dt>
                <dd>{cs.decisions}</dd>
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

        {/* Links = deploy de la app (decisión del propietario: los repos son
            privados; el GitHub público se menciona en la sección Skills). */}
        <div className="project-card__actions">
          {hasStudy && (
            <button
              type="button"
              className="project-card__more"
              aria-expanded={expanded}
              aria-controls={`case-${project.id}`}
              onClick={() => setExpanded((open) => !open)}
            >
              {expanded ? t('case_less') : t('case_more')}
            </button>
          )}
          <a
            className="project-card__link button button--quiet"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('viewProj')}
            <span className="visually-hidden">
              {` — ${project.name} (${t('opens_new_tab')})`}
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
