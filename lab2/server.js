const net = require('net');
const port = 7070;
const host = 'localhost';

const ipv = require('fs').readFileSync('ipv4.txt', 'utf-8')
            .split('\n')
            .filter(Boolean);

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server: ' + server.address().family + ' ' + host + ':' + port);
});

let encode = 10;
let sockets = [];

server.on('connection', function(connection) {
    console.log('New connection from: ' + connection.remoteAddress + ':' + connection.remotePort);
    sockets.push(connection);
    connection.on('data', function(data) {
        if (data == 'bin')
            encode = 2;
        else if (data == 'hex')
            encode = 16;
        else if (data == 'dec')
            encode = 10;
        else if (data == 'file')
        {
            let res = '';
            for (i of ipv)
                res += i + '\n';
            connection.write(res);
        }
        else
        {
            let ip = ipv[data].split('.');
            let res = '';
            for (i of ip)
                res += parseInt(i, 10).toString(encode) + '.';
            res = res.substring(0, res.length - 1);
            connection.write(res);
        }
    });

    connection.on('close', function(index) {
        if (index !== -1) sockets.splice(index, 1);
        console.log('Connection closed: ' + connection.remoteAddress + ':' + connection.remotePort);
    });
});