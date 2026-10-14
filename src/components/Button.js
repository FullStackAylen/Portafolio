import React from 'react';
import '../styles/Button.css';

/**
 * Botón del sistema (DESIGN_SYSTEM.md §6.2).
 * variant: primary (fondo signal-ink, 5.94:1 con blanco) | ghost | quiet.
 * focus-visible, hover y disabled definidos en Button.css.
 */
function Button({ variant = 'primary', className = '', children, ...props }) {
  const classes = `button button--${variant}${className ? ` ${className}` : ''}`;
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
