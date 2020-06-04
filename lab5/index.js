const nodemailer = require('nodemailer');
var path = require('path');

let transport = nodemailer.createTransport({
    service: 'gmail',
	auth: {
	    user: 'uselessflower@gmail.com',
	    pass: 'lotusflower99'
	}
});

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let msg = [];
rl.on('line', (input) => {
  	msg.push(input);
  	if (msg.length > 3)
  		send();

});

function send()
{
	const message = {
	    from: 'uselessflower@gmail.com',
	    to: msg[0],
	    subject: msg[1],
	    text: msg[2],
	    attachments: [
	        {
				filename: msg[3],
				path: path.join(__dirname, msg[3])
	      	}
    	]
	};
	transport.sendMail(message, function(err, info) {
	    if (err) {
	    	console.log(err)
	    } else {
	    	console.log(info);
	    }
	});
}