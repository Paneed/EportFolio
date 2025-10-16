import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Galerie from "./pages/Galerie";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

function App() {
  return (
    <div>
      <Header />
      <ScrollToHash />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </>
          } />
          <Route path="/galerie" element={<Galerie />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
