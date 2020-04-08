const mysql = require('mysql')

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Dittoenbram1234!"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

con.query("USE laura;", (err, result) => {
	if (err) throw err;
	console.log("Result: ", result);
})

module.exports = con;