var express = require('express');
var router = express.Router();

const mysql = require('mysql')

var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "Dittoenbram1234"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

con.query("USE laura;", (err, result) => {
	if (err) throw err;
	console.log("Result: ", result);
})

const getAllMessages = (req, res, next) => {
	const sql = "SELECT * FROM Messages;";
	con.query(sql, (err, result) => {
	    if (err) throw err;
	    req.body.result = result;
	    next();
	  });
}

const validate = (req, res, next) => {
	const name = req.body.name;
	const message = req.body.message;
	if (name == "" || message == "") {
		res.send("Invalid");
	} else {
		next();
	}
}

const addMessage = (req, res, next) => {
	const name = req.body.name;
	const message = req.body.message;
	const sql = `INSERT INTO Messages (full_name, message) VALUES ("${name}", "${message}");`
	console.log(sql);
	con.query(sql, (err, result) => {
		if (err) throw err;
		req.body.result = result;
		next();
	});
}

router.post('/submit', validate, addMessage, (req, res, next) => {
	res.send(req.result)
});

/* GET home page. */
router.get('/', getAllMessages, (req, res, next) => {
	var messages = req.body.result;
	for (var i = messages.length - 1; i >= 0; i--) {
		var dateTime = messages[i]["date_added"].toString();
		var dateArray = dateTime.split(/[- :]/);
		console.log(dateArray, dateTime);
		var dateString = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]} ${dateArray[4]}:${dateArray[5]}`;
		messages[i]["date_added"] = dateString;
	}
	res.render('messages', {messages: req.body.result});
});



module.exports = router;