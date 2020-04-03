var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('quiz');
});

router.post('/submit', (req, res, next) => {
	const lauras_results = {
		"quiz1": "eens",
		"quiz2": "eens",
		"quiz3": "eens",
		"quiz4": "oneens",
		"quiz5": "oneens",
		"quiz6": "oneens",
		"quiz7": "oneens",
		"quiz8": "eens",
		"quiz9": "heg",
		"quiz10": "starbucks"
	}
	var results = req.body;
	var points = 0;
	for (var key in results) {
		if (results[key] == lauras_results[key]) {
			points += 1;
		}
	}
	var percentage = points/10 * 100;
	var result = "";
	var email = false;
	var gif = "laura2.gif";
	if (percentage < 30) {
		result = "Helaas! Je past niet goed bij Laura...";
	} else if (percentage >= 30 && percentage < 60) {
		result = "Muah, een beetje werken aan jezelf en dan loop je kans bij Laura!";
	} else if (percentage >= 60 && percentage < 80) {
		gif = "laura1.gif";
		result = "Gefeliciteerd! Jij past erg goed bij Laura!";
	} else if (percentage >= 80) {
		gif = "laura1.gif";
		email = true;
		result = "OMG! Soulmates!";
	}
	res.render('quizresult', {result, percentage, gif, email});
});

module.exports = router;
