import React from 'react';
import '../styles/Projects.css';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation(); 
  const projectList = [
    {
      name: 'Farmacia',
      description: 'This proyect use ADO.NET with MVC pattern in windows forms. ',
      link: 'https://github.com/FullStackAylen/Farmacia_EF.git'
    },
    {
      name: 'The crow makeup',
      description: 'This proyect is the backend and frontend of ecommerce',
      link: 'https://github.com/FullStackAylen/TheCrowMakeup.git'
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2>{t('proyect')}</h2>
      <div className="project-list">
        {projectList.map((project, index) => (
          <div key={index} className="project">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">{t('viewProj')}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
