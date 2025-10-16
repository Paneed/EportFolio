import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import "../styles/Galerie.css";

type Photo = {
  url: string;
  name: string;
};

export default function Galerie() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Chargement des miniatures au montage du composant
  useEffect(() => {
    const fetchThumbs = async () => {
      try {
        const res = await fetch("https://shihongwang.fr.eu.org/api/medias");
        const data = await res.json();
        console.log("Médias reçus :", data);

        if (data.thumbs) {
          setPhotos(
              data.thumbs.map((url: string) => ({
                url: url.startsWith("http") ? url : `https://shihongwang.fr.eu.org${url}`,
                name: url.split("/").pop() || "thumb",
              }))
          );
        }
      } catch (err) {
        console.error("Erreur chargement des miniatures :", err);
      }
    };

    fetchThumbs();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("media", file);

    try {
      const res = await fetch("https://shihongwang.fr.eu.org/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error || "Échec de l’upload");

      setPhotos((prev) => [
        ...prev,
        {
          url: data.thumbnail
              ? `https://shihongwang.fr.eu.org${data.thumbnail}`
              : `https://shihongwang.fr.eu.org${data.path}`,
          name: file.name,
        },
      ]);
    } catch (err) {
      console.error("Erreur d’upload :", err);
      alert("Erreur lors de l’envoi du fichier !");
    }

    e.target.value = "";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Photo ajoutée !");
  };

  return (
      <div className="gallery">
        <div id="gallery">
          {photos.length === 0 && <p>Aucune photo pour le moment</p>}
          {photos.map((photo, i) => (
              <img
                  key={i}
                  src={photo.url}
                  alt={photo.name}
                  className="gallery-thumb"
              />
          ))}
        </div>

        <form id="uploadForm" onSubmit={handleSubmit}>
          <label htmlFor="fileUpload" className="custom-file-upload">
            Choisis une belle photo!
          </label>
          <input
              type="file"
              id="fileUpload"
              name="media"
              accept="image/*"
              onChange={handleFileChange}
              hidden
          />
          <button type="submit">Valider ✔</button>
          <div id="message"></div>
        </form>
      </div>
  );
}
