const net = require('net');
const client = new net.Socket();
const port = 7070;
const host = 'localhost';

let fs = require('fs');
const readline = require('readline');
let file = false;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  	send(input);
});

client.connect(port, host, function() {
    console.log('Connected with: ' + host + ':' + port);
});

client.on('close', function() {
    console.log('Connection closed');
});


function send(input)
{
	loadFile(input, function(data)
	{
		client.write(data + '+' + input);
	});
}

function loadFile(url, next)
{
	fs.open(url, 'r', function(err, fd) {
		let data = [];
		if (err)
			throw err;
		var buffer = new Buffer(1);
		while (true)
		{   
			var num = fs.readSync(fd, buffer, 0, 1, null);
			if (num === 0)
				break;
			data.push(buffer[0]);
		}
		next(data.join(','));
	});
}
