import asso from '../assets/images/projetAsso.png';
import assoMobile from '../assets/images/ProjetAssoMobile.png';
import Stage from '../assets/images/ProjetStage.png';

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h3>Mes projets réalisés</h3>
      <div className="project-list">
        {/* Projet 1 */}
        <div className="project-card">
          <img src={asso} alt="Projet1" />
          <div className="content">
            <h4>Projet 1: Refonte d'un site pour une association de santé</h4>
            <p className="tags">HTML, CSS, JS, PHP, MariaDB<br />UI Design / Figma</p>
            <a href='https://docs.google.com/document/d/1BhuR0LD0sIg_MMJnblact99cgbltvI_BGNNY-56V4G4/edit?usp=sharing'>
            <button>Voir le rapport de projet</button>
            </a>
          </div>
        </div>

        {/* Projet 2 */}
        <div className="project-card">
           <img src={assoMobile} alt="Projet2" />
          <div className="content">
            <h4>Projet 2: Développement d'une application pour la même association de santé</h4>
            <p className="tags">Reac-native, Expo Go, Node, JS, HTML, CSS, MariaDB<br />UI Design / Figma</p>
            <a href='https://docs.google.com/document/d/1Gi8c_O7Z95FPgk98tf0q-SPHb2I-tsQuV5pq_KX6KlI/edit?usp=sharing'>
            <button>Voir le rapport de projet</button>
            </a>
          </div>
        </div>

        {/* Projet 3 */}
        <div className="project-card">
          <img src={Stage} alt="Projet3" />
          <div className="content">
            <h4>Projet 3: Stage chez Socializus, développement d'une application</h4>
            <p className="tags">React-native CLI, TypeScript, HTML, CSS, MongoDB<br />Application / UI Design</p>
            <a href='https://docs.google.com/document/d/1j292JlxJATXjHHxZCsGy3y-Y8Zg7rRgcDff8JgcsJuY/edit?tab=t.0'>
            <button>Voir le rapport de projet</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
