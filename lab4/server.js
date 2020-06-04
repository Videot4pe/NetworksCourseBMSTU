const express = require('express');
const app = express();
const port = 3000;
var fs = require("fs");

app.get('/index', (req, res) => {
	fs.readFile('index.html', "utf8", function (err, data) {
	    if (err) throw err;
		res.status(200).send(data);
	});
});

app.get('/password', (req, res) => {
	res.sendStatus(403);
});

app.listen(port, () => console.log(`Server on port ${port}!`))