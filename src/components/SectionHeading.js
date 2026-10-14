import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/SectionHeading.css';

/**
 * Firma del sistema (DESIGN_SYSTEM.md §6.1): kicker mono + h2 + regla de 1px
 * con tick inicial. Aparece en todas las secciones, sin excepción.
 */
function SectionHeading({ kickerKey, titleKey }) {
  const { t } = useTranslation();

  return (
    <div className="section-heading">
      <p className="section-heading__kicker">{t(kickerKey)}</p>
      <h2 className="section-heading__title">{t(titleKey)}</h2>
      <span className="section-heading__rule" aria-hidden="true" />
    </div>
  );
}

export default SectionHeading;
