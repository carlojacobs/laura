var express = require('express');
var router = express.Router();

const con = require('../db');

const getAllMessages = (req, res, next) => {
	const sql = "SELECT * FROM Messages;";
	con.query(sql, (err, result) => {
		if (err) throw err;
		var messages = result;
		for (var i = messages.length - 1; i >= 0; i--) {
			var dateTime = messages[i]["date_added"].toString();
			var dateArray = dateTime.split(/[- :]/);
			console.log(dateArray, dateTime);
			var dateString = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]} ${dateArray[4]}:${dateArray[5]}`;
			messages[i]["date_added"] = dateString;
		}
		messages.reverse();
		req.body.messages = messages;
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
	console.log("add");
	const name = req.body.name;
	const message = req.body.message;
	const sql = `INSERT INTO Messages (full_name, message) VALUES ("${name}", "${message}");`
	con.query(sql, (err, result) => {
		if (err) throw err;
		next();
	});
}

const showMessages = (req, res, next) => {
	var messages = req.body.messages;
	res.render('messages', {messages: messages});
}

router.post('/submit', validate, addMessage, getAllMessages, showMessages);

/* GET home page. */
router.get('/', getAllMessages, showMessages);



module.exports = router;