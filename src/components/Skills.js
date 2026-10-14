import React from 'react';
import { motion } from 'motion/react';
import '../styles/Skills.css';
import { skills } from '../data/skills';
import SectionHeading from './SectionHeading';

// Stagger de pills (§4.3): 15 hijos obligan a comprimir el escalón a 35 ms
// para respetar el tope de 600 ms totales (15 × 35 = 525 ms).
const listVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.05, staggerChildren: 0.035 } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0, 0, 0.2, 1] },
  },
};

function Skills() {
  return (
    <section id="skills" className="skills">
      <SectionHeading kickerKey="kicker_skills" titleKey="skills" />
      <motion.ul
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {skills.map((skill) => (
          <motion.li key={skill} variants={pillVariants}>
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

export default Skills;
