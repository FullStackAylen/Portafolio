import React from 'react';
import '../styles/Projects.css';
import { projects } from '../data/projects';
import githubData from '../data/github.json';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import ProjectCard from './ProjectCard';

/**
 * Projects — N4 (dirección Netflix): fila de cards con cover SVG generado y
 * meta real del snapshot de GitHub. El nombre del repo se deriva del link de
 * cada proyecto para cruzarlo con src/data/github.json; si no hay match la
 * card igual funciona (solo se omite la meta).
 */
function Projects() {
  const reposByName = React.useMemo(() => {
    const map = {};
    const list = (githubData && githubData.repos) || [];
    for (const repo of list) map[repo.name.toLowerCase()] = repo;
    return map;
  }, []);

  const repoNameFromLink = (link) => {
    const match = /\/([^/]+?)(?:\.git)?$/.exec(link);
    return match ? match[1].toLowerCase() : '';
  };

  return (
    <section id="projects" className="projects">
      <SectionHeading kickerKey="kicker_projects" titleKey="proyect" />
      <div className="project-row">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.07} className="project-row__item">
            <ProjectCard project={project} ghRepo={reposByName[repoNameFromLink(project.link)]} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Projects;
