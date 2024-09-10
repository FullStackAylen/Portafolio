import React from 'react';
import '../styles/Skills.css';

function Skills() {
  const skills = [
    'C#', '.NET', 'ASP.NET MVC Core', '.NET MAUI', 'React', 'Git', 
    'SQL Server', 'Python', 'PHP', 'Laravel 8', 'WPF', 
    'Windows Forms', 'Web API', 'Blazor'
  ];

  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
