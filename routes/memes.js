var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: '~/var/www/data/memes' });
const con = require('../db');

const getAllMemes = (req, res, next) => {
	const sql = "SELECT * FROM Memes;";
	con.query(sql, (err, result) => {
		if (err) throw err;
		var memes = result;
		memes.reverse();
		req.body.memes = memes;
		next();
	});
}

const uploadMeme = (req, res, next) => {
	console.log(req.file);
}

router.post('/upload', upload.single('meme'), uploadMeme);

/* GET home page. */
router.get('/', getAllMemes, (req, res, next) => {
  res.render('memes', {memes: req.body.memes});
});


module.exports = router;