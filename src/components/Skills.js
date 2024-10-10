import React from 'react';
import '../styles/Skills.css';
import { useTranslation } from 'react-i18next';

function Skills() {
  const { t } = useTranslation(); 
  const skills = [
    'C#', 'JavaScript', '.NET', 'ASP.NET MVC Core', '.NET MAUI', 'React JS', 'Git', 
    'SQL Server', 'Python', 'PHP', 'Laravel 8', 'WPF', 
    'Windows Forms', 'Web API', 'Blazor'
  ];

  return (
    <section id="skills" className="skills">
      <h2>{t('skills')}</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
