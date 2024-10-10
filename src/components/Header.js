import React, { useState } from 'react';
import '../styles/Header.css';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa'; // Importa el ícono de globe
import i18n from '../i18n'; // Asegúrate de importar i18n
import { useTranslation } from 'react-i18next';

function Header() {
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar el menú
  const { t } = useTranslation(); 

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowMenu(false); // Oculta el menú después de seleccionar un idioma
  };

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
            <li><a href="#about">{t('about')}</a></li>
            <li><a href="#skills">{t('skills')}</a></li>
            <li><a href="#projects">{t('proyect')}</a></li>
            <li><a href="#contact">{t('contact')}</a></li>
            <li className="language-icon"> 
              <FaGlobe 
                onClick={() => setShowMenu(!showMenu)} 
                style={{ cursor: 'pointer' }} 
                title="Select Language" 
              />
              {showMenu && (
                <div className="language-menu">
                  <button onClick={() => changeLanguage('en')}>{t('en')}</button>
                  <button onClick={() => changeLanguage('es')}>{t('es')}</button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;
