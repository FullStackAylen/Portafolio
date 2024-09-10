import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

function About() {
  return (
    <motion.section
      id="about"
      className="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>About Me</h2>
      <p>
        I am Aylén Rodríguez, a passionate software developer with experience in 
        C#, .NET, ASP.NET, React, and more. I focus on creating clean, efficient, and 
        scalable code.
      </p>
    </motion.section>
  );
}

export default About;