const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors({
    origin: ["http://localhost:5173", "http://shihongwang.fr.eu.org"]
}));

const PHOTOS_DIR = "/var/www/shihongwang/photos";
app.use("/photos", express.static(PHOTOS_DIR));

app.get("/api/photos", (_, res) => {
    try {
        const files = fs.readdirSync(PHOTOS_DIR)
            .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
        res.json(files.map(f => `/photos/${f}`));
    } catch (err) {
        console.error("Erreur lecture photos :", err);
        res.status(500).json({ error: "Impossible de lire les photos" });
    }
});

app.listen(PORT, () => console.log(`Serveur actif sur http://localhost:${PORT}`));
