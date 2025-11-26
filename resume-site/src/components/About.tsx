import photo from '../assets/images/photo.jpg';

export default function About() {
  return (
    <section id="about" className="about">
      
<img src={photo} alt="Shihong Wang" />
      <div className="about-text">
        <h3>À propos de moi</h3>
        <p>
          Je suis étudiant en 3ᵉ année de BUT Informatique.
          <br></br>
J’aime concevoir et développer des logiciels ainsi que des pages web !
        </p>
        <br></br>
        <ul>
          <li>Développement d'application</li>
          <li>Développement Web</li>
          <li>React / React-native</li>
          <li>TypeScript / JavaScript</li>
          <li>Figma</li>
        </ul>
<a href="/ShihongWangCV.pdf" download="ShihongWangCV.pdf">
  <button>Télécharger mon CV</button>
</a>


      </div>
    </section>
  );
}
