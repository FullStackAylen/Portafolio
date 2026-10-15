import React from 'react';
import '../styles/ProjectCover.css';

/**
 * Cover de proyecto (N4): arte SVG generado en código, determinístico por
 * proyecto —el ángulo de las franjas y la inicial salen del nombre—. Cero kB
 * de raster (presupuesto AGENTS.md §8) y estilo 100% tokenizado. Decorativo:
 * el título accesible lo aporta el encabezado de la card.
 */
function ProjectCover({ project, language }) {
  const angle = [0, 45, 135][project.name.charCodeAt(0) % 3];
  const initial = project.name.trim().charAt(0).toUpperCase();

  return (
    <svg
      className="project-cover"
      viewBox="0 0 320 180"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`rotate(${angle} 160 90)`}>
        <rect className="project-cover__stripe" x="40" y="-80" width="26" height="340" />
        <rect className="project-cover__stripe" x="140" y="-80" width="26" height="340" />
        <rect className="project-cover__stripe" x="240" y="-80" width="26" height="340" />
      </g>
      <text className="project-cover__initial" x="160" y="132" textAnchor="middle">
        {initial}
      </text>
      {/* Sin nombre en el cover: el título ya está en el encabezado de la card
          (el propietario pidió no repetirlo). */}
      {language && (
        <text className="project-cover__lang" x="304" y="26" textAnchor="end">
          {language}
        </text>
      )}
    </svg>
  );
}

export default ProjectCover;
