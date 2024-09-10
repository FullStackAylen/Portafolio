import React from 'react';
import '../styles/Header.css';
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <div className="container">
        <h1 className="logo">Aylén Rodríguez</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;