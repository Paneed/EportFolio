import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '/wsh_logo.svg';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <h1>
          <img src={logo} alt="Logo" className="logo" />
          Shihong Wang
        </h1>

        <button className="burger" onClick={() => setMenuOpen(true)}>☰</button>

        <nav className="nav-desktop">
          <Link to="/#hero">Accueil</Link>
          <Link to="/galerie">Galerie photos</Link>
          <Link to="/#projects">Projets</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
      </header>

      <div
        className={`overlay ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close" onClick={() => setMenuOpen(false)}>×</button>
        <Link to="/#hero" onClick={() => setMenuOpen(false)}>Accueil</Link>
        <Link to="/galerie" onClick={() => setMenuOpen(false)}>Galerie photos</Link>
        <Link to="/#about" onClick={() => setMenuOpen(false)}>À propos</Link>
        <Link to="/#projects" onClick={() => setMenuOpen(false)}>Projets</Link>
        <Link to="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </nav>
    </>
  );
}
