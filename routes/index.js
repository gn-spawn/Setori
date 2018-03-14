import express from 'express';
import multer from 'multer';
import plist from 'plist';
import fs from 'fs';

const router = express.Router();
const storage = multer.memoryStorage()

const upload = multer({ dest: 'uploads' })

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.single('playlist'), (req, res) => {
  const playlist = []
  const xml = plist.parse(fs.readFileSync(req.file.path, 'utf8'))
  get_playlist(xml).forEach(song => {
    playlist.push({
      'song': song['Name'],
      'artist': song['Artist'],
    })
  })

  res.render('playlist', { playlist })
  fs.unlink(req.file.path)
})

function get_playlist(xml) {
  const tracks = xml.Tracks
  const playlist = xml.Playlists[0]['Playlist Items']
  const setori = []
  playlist.forEach(track => {
    const id = track['Track ID']
    setori.push(tracks[id])
  });
  return setori
}

module.exports = router;
