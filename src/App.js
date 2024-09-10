import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import { motion } from 'framer-motion';

import './App.css';

  function App() {
    return (
      <div className="App">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <About />
          <Skills />
          <Projects />
          <Contact />
        </motion.main>
      </div>
    );
}

export default App;
