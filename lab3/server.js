const net = require('net');
const port = 7070;
const host = 'localhost';
const server = net.createServer();
let fs = require('fs');

server.listen(port, host, () => {
    console.log('TCP Server: ' + server.address().family + ' ' + host + ':' + port);
});

let chunks = '';

server.on('connection', function(connection) {
    console.log('New connection from: ' + connection.remoteAddress + ':' + connection.remotePort);
    connection.on('data', function(data) {
    	chunks += data.toString();
    	if(data.toString().length != 65536)
    	{
    		chunks = chunks.split('+');
    		let adr = chunks.splice(-1,1);
    		chunks = chunks[0].toString();
    		writeFile('test'+adr, chunks.split(','));
    	}
    });
});

function writeFile(url, data)
{
	fs.open(url, 'w', function(err, fd) {
		if (err)
			throw err;
		var buffer = new Buffer(1);
		for(let i = 0; i < data.length; i++)
		{   
			buffer[0] = +data[i];
			var num = fs.writeSync(fd, buffer, 0, 1, null);
			if (num === 0)
				break;
		}
	});
	chunks = '';
}


