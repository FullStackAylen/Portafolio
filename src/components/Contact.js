import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs.send(
      'service_ug4lhek',  // Reemplaza con tu Service ID
      'template_jodgm5i', // Reemplaza con tu Template ID
      templateParams,
      'EjAZE172DzkvLZmue'   // Reemplaza con tu Public Key
    )
    .then((result) => {
        alert('Mensaje enviado con éxito a tu correo!');
    }, (error) => {
        alert('Hubo un error al enviar el mensaje.');
    });

    // Limpiar el formulario
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact">
      <h2>{t('contact')}</h2>
      <form onSubmit={sendEmail}>
        <label>{t('name')}</label>
        <input 
          type="text" 
          name="name" 
          placeholder={t('yname')} 
          value={formData.name} 
          onChange={handleChange}
          required 
        />
        
        <label>{t('mail')}</label>
        <input 
          type="email" 
          name="email" 
          placeholder={t('ymail')} 
          value={formData.email} 
          onChange={handleChange}
          required 
        />
        
        <label>{t('msj')}</label>
        <textarea 
          name="message" 
          placeholder={t('ymsj')}
          className="textarea"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        
        <button type="submit">{t('send')}</button>
      </form>
    </section>
  );
}

export default Contact;
