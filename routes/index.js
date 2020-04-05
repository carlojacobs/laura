var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {title: "Laura Achterberg"});
});

router.get('/zoen', (req, res, next) => {
	res.render('zoen');
});

module.exports = router;
