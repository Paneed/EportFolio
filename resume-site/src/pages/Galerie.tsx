import { useState, useEffect } from "react";
import "../styles/Galerie.css";

type Photo = {
    url: string;
    name: string;
};

export default function Galerie() {
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await fetch("https://shihongwang.fr.eu.org/api/photos");
            const data: string[] = await res.json();
            setPhotos(data.map(url => ({
                url: `https://shihongwang.fr.eu.org${url}`,
                name: url.split("/").pop() || "photo"
            })));
        };
        fetchPhotos();
    }, []);


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
                        loading="lazy"
                    />
                ))}
            </div>
        </div>
    );
}
