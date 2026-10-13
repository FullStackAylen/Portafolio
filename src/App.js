import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import { motion } from 'framer-motion';
import './i18n'; 

import './styles/tokens.css';
import './App.css';

  function App() {
    return (
      <div className="App">
        <Header />
        <Hero />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <About />
          <Experience/>
          <Skills />
          <Projects />
          <Contact />
        </motion.main>
      </div>
    );
}

export default App;
