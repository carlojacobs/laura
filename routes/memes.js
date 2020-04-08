var express = require('express');
var router = express.Router();
var multer  = require('multer');

const con = require('../db');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/var/www/data/memes')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname); // modified here  or user file.mimetype
	}
})

var upload = multer({ storage: storage })

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

const insertMemeIntoDB = (req, res, next) => {
	const name = req.file.originalname;
	const dir = "/var/www/data/memes/" + name;
	const sql = `INSERT INTO Memes (name, img_dir) VALUES ("${name}", "${dir}");`
	con.query(sql, (err, result) => {
		if (err) throw err;
		next();
	});
}

const showMemes = (req, res, next) => {
	var memes = req.body.memes;
	console.log(memes);
	res.render('memes', {memes});
}

router.post('/upload', upload.single('meme'), insertMemeIntoDB, getAllMemes, showMemes);

/* GET home page. */
router.get('/', getAllMemes, showMemes);


module.exports = router;