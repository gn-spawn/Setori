import express from 'express';
import multer from 'multer';
const router = express.Router();
const upload = multer({ inMemory: true })

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.single('playlist') ,(req, res) => {
  res.send(req.file.originalname)
})

module.exports = router;
