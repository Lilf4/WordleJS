const { Client, Intents} = require('discord.js');
var configData = require('./data/configdata.json')
const Handler = require("./gameHandler");
var handler = new Handler();

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES
	],
	partials: ["CHANNEL"]
});

client.on('ready', () => {
	console.log('bot is ready');
})

client.on('messageCreate', message => handler.onMessage(message))
//client.on('messageCreate', message => {message.channel.send("test");})


client.login(configData.TOKEN);


updateDay();

function updateDay(){
	//Game.WordleNum = Math.floor(new Date().getTime() / 8.64e+7) % Game.wordlist.length;
	let d = new Date();
 	d.setUTCHours(24,0,0,0);
	setTimeout(updateDay, d.getTime() - new Date().getTime());
}

function CommandHandler(message){
	args = message.content.split(' ');
	switch (args[0].substring(configData.PREFIX.length,args[0].length).toLowerCase()) {
		case 'day':
			//message.channel.send(Game.WordleNum.toString());
			break;
		case 'quit':
			message.channel.send("goodbye").then(msg => client.destroy()).then(process.exit())
			break;
		default:
			break;
	}
}

function test(){
	return "SSS";
}

