import React from 'react';
import { motion } from 'motion/react';

/**
 * Reveal — patrón único de aparición por scroll (ANIMATION_GUIDELINES.md §4.1):
 * opacity 0→1 + y 20→0 a 420 ms, ease-out, `once: true` (nunca re-animar al
 * subir). Con `MotionConfig reducedMotion="user"` (App.js) el contenido aparece
 * sin desplazamiento cuando el usuario lo pide.
 */
function Reveal({ children, className = '', delay = 0, as = 'div', ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.42, ease: [0, 0, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
