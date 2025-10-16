const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const sharp = require('sharp');

const app = express();
const PORT = 3000;

console.log('Serveur démarré !');

// CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://shihongwang.fr.eu.org']
}));


// Parse JSON
app.use(express.json());

// Dossiers
const PUBLIC_DIR = '/var/www/shihongwang';
const UPLOAD_IMG_DIR = path.join(PUBLIC_DIR, 'uploads', 'images');
const UPLOAD_VIDEO_DIR = path.join(PUBLIC_DIR, 'uploads', 'videos');
const UPLOAD_THUMBS_DIR = path.join(UPLOAD_IMG_DIR, 'thumbs');

// Création dossiers si n'existent pas
[UPLOAD_IMG_DIR, UPLOAD_VIDEO_DIR, UPLOAD_THUMBS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Dossier créé : ${dir}`);
  }
});

// Servir fichiers statiques uploadés
app.use('/uploads', express.static(path.join(PUBLIC_DIR, 'uploads')));

// SQLite DB
const db = new sqlite3.Database('./mapdata.sqlite', err => {
  if (err) return console.error('Erreur DB:', err);
  console.log('Base SQLite connectée');
});

// Création table spots
db.run(`
  CREATE TABLE IF NOT EXISTS spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    photo TEXT NOT NULL,
    date TEXT NOT NULL,
    note TEXT
  )
`);

// Multer config avec destination selon type fichier
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, UPLOAD_IMG_DIR);
    else if (file.mimetype.startsWith('video/')) cb(null, UPLOAD_VIDEO_DIR);
    else cb(new Error('Type de fichier non supporté'));
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    cb(null, `${Date.now()}-${safeName}`);
  }
});
const upload = multer({ storage });

// --- API ---
// 1) POST /api/spots : ajout d'un spot avec photo + lat, lng, date, note
app.post('/api/spots', upload.single('photo'), (req, res) => {
  const { lat, lng, date, note } = req.body;
  if (!req.file || !lat || !lng || !date) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }
  const photo = `/uploads/images/${req.file.filename}`;

  const stmt = db.prepare('INSERT INTO spots (lat, lng, photo, date, note) VALUES (?, ?, ?, ?, ?)');
  stmt.run(lat, lng, photo, date, note || '', function (err) {
    if (err) {
      console.error('Erreur insertion DB:', err);
      return res.status(500).json({ error: 'Erreur base de données' });
    }
    res.json({ success: true, id: this.lastID });
  });
  stmt.finalize();
});

// 2) POST /api/upload : upload simple média (image ou vidéo) + création miniature si image
app.post('/api/upload', upload.single('media'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Fichier manquant' });

  try {
    let thumbnail = null;
    if (req.file.mimetype.startsWith('image/')) {
      // Création miniature
      const thumbPath = path.join(UPLOAD_THUMBS_DIR, req.file.filename);
      await sharp(req.file.path)
        .resize({ width: 2000})
        .jpeg({ quality: 80 })
        .toFile(thumbPath);
      thumbnail = `/uploads/images/thumbs/${req.file.filename}`;
      console.log('Miniature créée:', req.file.filename);
    }

    res.json({
      success: true,
      filename: req.file.filename,
      path: req.file.mimetype.startsWith('image/') ? `/uploads/images/${req.file.filename}` : `/uploads/videos/${req.file.filename}`,
      thumbnail
    });

  } catch (err) {
    console.error('Erreur création miniature:', err);
    res.status(500).json({ error: 'Erreur création miniature' });
  }
});

// 3) GET /api/medias : liste des médias uploadés (images, vidéos, miniatures)
app.get('/api/medias', (req, res) => {
  try {
    const images = fs.readdirSync(UPLOAD_IMG_DIR).filter(f => !f.startsWith('.'));
    const videos = fs.readdirSync(UPLOAD_VIDEO_DIR).filter(f => !f.startsWith('.'));
    const thumbs = fs.readdirSync(UPLOAD_THUMBS_DIR).filter(f => !f.startsWith('.'));

    res.json({
      images: images.map(f => `/uploads/images/${f}`),
      videos: videos.map(f => `/uploads/videos/${f}`),
      thumbs: thumbs.map(f => `/uploads/images/thumbs/${f}`)
    });
  } catch (err) {
    console.error('Erreur lecture fichiers:', err);
    res.status(500).json({ error: 'Erreur lecture fichiers' });
  }
});

// GET /api/spots - liste des spots (déjà là mais redondant, ok)
app.get('/api/spots', (req, res) => {
  db.all('SELECT * FROM spots', (err, rows) => {
    if (err) {
      console.error('Erreur DB:', err);
      return res.status(500).json({ error: 'Erreur base de données' });
    }
    res.json(rows);
  });
});

app.delete('/api/spots', (req, res) => {
  db.run('DELETE FROM spots', function(err) {
    if (err) {
      console.error('Erreur suppression spots :', err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, deletedRows: this.changes });
  });
});


// Démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
