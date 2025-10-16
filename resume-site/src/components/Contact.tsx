import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Toast from './Toast';
import '../styles/Toast.css';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);

  // État pour gérer la notif
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        'service_5huza34',
        'template_j267pd6',
        form.current,
        'lBzQ9CYWEiGAOedjB'
      )
      .then(() => {
        setToast({ message: 'Message envoyé avec succès ! 🎉', type: 'success' });
        form.current?.reset();
      })
      .catch(() => {
        setToast({ message: 'Erreur lors de l’envoi, merci de réessayer.', type: 'error' });
      });
  };

  return (
    <section id="contact" className="contact">
      <h1>Contact</h1>
{/* Réseaux sociaux à gauche */}
      <div className="socials">
        <a href="https://www.linkedin.com/in/shihong-wang-424528306/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>

        <a href="https://github.com/Paneed" aria-label="GitHub">
          <i className="fab fa-github"></i>
        </a>

        <a href="https://www.instagram.com/wsh.photo/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      {/* Email et téléphone avec icônes */}
      <div className="contact-info">
        <p>
          <a href="wangshihong2333@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i> {/* Icône enveloppe */}
            <span className="sr-only">Email :</span> wangshihong2333@gmail.com
          </a>
        </p>
        <p>
          <a href="tel:+33" aria-label="Téléphone">
            <i className="fas fa-phone"></i> {/* Icône téléphone */}
            <span className="sr-only">Téléphone :</span> +33 07.67.18.74.57
          </a>
        </p>
      </div>

      <form ref={form} onSubmit={sendEmail}>
        <input type="text" placeholder="Nom" name="name" required />
        <input type="email" placeholder="Email" name="email" required />
        <textarea placeholder="Message" name="message" required rows={5} />
        <button type="submit">Envoyer</button>
      </form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
