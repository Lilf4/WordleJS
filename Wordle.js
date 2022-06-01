const { Client, Intents, MessageEmbed } = require('discord.js');
var Game = require('./data/gamedata.json');
var configData = require('./data/configdata.json')


const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES
	]
})

client.on('ready', () => {
	console.log('The bot is ready');
})

client.on('messageCreate', (message) => {
	if(message.content.startsWith(configData.PREFIX)){
		CommandHandler(message);
	}
})

client.login(configData.TOKEN);
updateDay();
function updateDay(){
	Game.WordleNum = Math.floor(new Date().getTime() / 8.64e+7) % Game.wordlist.length;
	let d = new Date();
 	d.setUTCHours(24,0,0,0);
	setTimeout(updateDay, d.getTime() - new Date().getTime());
}

function GetPlayer(){

}

function UnloadPlayer(){

}


function CommandHandler(message){
	args = message.content.split(' ');
	switch (args[0].substring(configData.PREFIX.length,args[0].length).toLowerCase()) {
		case 'day':
			message.channel.send(Game.WordleNum.toString());
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