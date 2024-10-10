import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import Photo from '../Assets/MePhoto.jpeg'
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation(); 
  return (
    <motion.section
      id="about"
      className="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>{t('about')}</h2>
      <div className='content-about'>      
        <div className="profile-container">
          <div className="profile-frame-outer">
            <div className="profile-frame-inner">
              <img className='profile-image' src={Photo} alt="Logo" />
            </div>
          </div>
        </div>
        <div>
        <p>
           {t('presentation')}<br />
           {t('presentation_2')}
  
        </p> 
        <blockquote>
          {t('quote')}
        </blockquote>
        
        </div>
      </div>
    </motion.section>
  );
}

export default About;