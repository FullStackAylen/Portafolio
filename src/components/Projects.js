import React from 'react';
import '../styles/Projects.css';

function Projects() {
  const projectList = [
    {
      name: 'Project 1',
      description: 'This is an awesome project that solves real problems.',
      link: 'https://github.com/yourusername/project1'
    },
    {
      name: 'Project 2',
      description: 'Another cool project with exciting features.',
      link: 'https://github.com/yourusername/project2'
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projectList.map((project, index) => (
          <div key={index} className="project">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
