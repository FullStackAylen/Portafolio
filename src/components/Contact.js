import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Contact Me</h2>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Your Name" />
        
        <label>Email:</label>
        <input type="email" placeholder="Your Email" />
        
        <label>Message:</label>
        <textarea placeholder="Your Message" className="textarea"></textarea>
        
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default Contact;
