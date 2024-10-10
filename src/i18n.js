// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
          about: "About Me",
          presentation: "I am Aylén Rodríguez, a passionate software developer with experience in C#, .NET, ASP.NET, React, and more. I focus on creating clean, efficient, and scalable code.",
          presentation_2: "I am constantly learning, allowing me to adapt to the needs of my environment.",
          quote: '"The only way to do great work is to love what you do." - Steve Jobs',
          skills: "Skills",
          proyect: "Projects",
          proyect_1: "This proyect use ADO.NET with MVC pattern in windows forms.",
          proyect_2: "This proyect is the backend and frontend of ecommerce",
          viewProj: "View Project",
          contact: "Contact Me",
          name: "Name",
          mail: "Email",
          msj: "Message",
          yname: "Your Name",
          ymail: "Your Email",
          ymsj: "Your Message",
          send: "Send",
          en: "English",
          es: "Spanish"
        },
      },
      es: {
        translation: {
            about: "Acerca de mí",
            presentation: "Soy Aylén Rodríguez, una apasionada desarrolladora de software con experiencia en C#, .NET, ASP.NET, React y más. Me enfoco en crear código limpio, eficiente y escalable.",
            presentation_2: "Estoy en constantem aprendizaje, lo que me permite adaptarme a las necesidades de mi entorno.",
            quote: '"La única forma de hacer un gran trabajo es amar lo que haces." - Steve Jobs',
            skills: "Habilidades",
            proyect: "Proyectos",
            proyect_1: "Este proyecto utiliza ADO.NET con un patrón de diseño MVC en Windows Forms.",
            proyect_2: "Este proyecto es el backend y frontend de un ecommerce de maquillaje.",
            viewProj: "Ver Proyecto",
            contact: "Contáctame",
            name: "Nombre",
            mail: "Correo electrónico",
            msj: "Mensaje",
            yname: "Tu Nombre",
            ymail: "Tu Correo Electrónico",
            ymsj: "Tu Mensaje",
            send: "Enviar",
            en: "Inglés",
            es: "Español"
        },
      },
    },
    lng: "en", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
