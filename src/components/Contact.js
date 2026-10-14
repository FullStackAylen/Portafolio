import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';
import { useTranslation } from 'react-i18next';
import SectionHeading from './SectionHeading';
import Button from './Button';
import Reveal from './Reveal';

/**
 * Contact — formulario con estados idle/sending/success/error (DESIGN_SYSTEM.md
 * §6.5). Feedback por aria-live —nunca alert() (AGENTS.md §7)—, labels
 * asociados con htmlFor/id y honeypot antispam (AGENTS.md §6.6).
 * El formulario solo se limpia con envío exitoso.
 */
function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot: debe quedar vacío
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const sendEmail = (event) => {
    event.preventDefault();
    if (formData.company) return; // bots: no se envía nada

    setStatus('sending');
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      )
      .then(
        () => {
          setStatus('success');
          setFormData({ name: '', email: '', message: '', company: '' });
        },
        () => setStatus('error')
      );
  };

  return (
    <section id="contact" className="contact">
      <SectionHeading kickerKey="kicker_contact" titleKey="contact" />
      <Reveal as="form" onSubmit={sendEmail}>
        <label htmlFor="contact-name">{t('name')}</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder={t('yname')}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact-email">{t('mail')}</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder={t('ymail')}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact-message">{t('msj')}</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder={t('ymsj')}
          className="textarea"
          value={formData.message}
          onChange={handleChange}
          required
        />

        {/* Honeypot antispam: oculto a personas y lectores de pantalla */}
        <div className="contact__hp" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t('form_sending') : t('send')}
        </Button>

        <p
          className={`contact__status contact__status--${status}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {status === 'success' && t('form_success')}
          {status === 'error' && t('form_error')}
        </p>
      </Reveal>
    </section>
  );
}

export default Contact;
