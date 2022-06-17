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

client.login(configData.TOKEN);