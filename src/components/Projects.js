import React from 'react';
import '../styles/Projects.css';
import { projects } from '../data/projects';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import CaseStudyCard from './CaseStudyCard';

function Projects() {
  return (
    <section id="projects" className="projects">
      <SectionHeading kickerKey="kicker_projects" titleKey="proyect" />
      <div className="project-list">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.07}>
            <CaseStudyCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Projects;
