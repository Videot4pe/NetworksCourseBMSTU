const axios = require('axios');

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

function send(input)
{
	axios.get('http://localhost:3000/'+input)
	.then(response => {
		//console.log(response);
		console.log(response.status + ' ' + response.statusText);
		console.log(response.headers);
		console.log(response.data);
	})
	.catch(error => {
		console.log(error.response.status + ' ' + error.response.statusText);
		console.log(error.response.headers);
		console.log(error.response.data);
	});
}
