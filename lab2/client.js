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
	if (input == 'file')
		file = true;
  	client.write(input);
});

client.connect(port, host, function() {
    console.log('Connected with: ' + host + ':' + port);
});

client.on('data', function(data) {
	if (file)
	{
		const buf = new Uint8Array(Buffer.from(data));
		require('fs').writeFile('ipv4copy.txt', buf, (err) => {
		  	if (err) throw err;
		  	console.log('The file has been saved!');
		});
		file = false;
	}
	else
    	console.log('Message from server: ' + data);
});

client.on('close', function() {
    console.log('Connection closed');
});
