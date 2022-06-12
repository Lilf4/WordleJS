const cmdinfo = require("./modes/modes.json");
const modes = new Map();
const activeModes = new Map();
const cmds = new Map();
const aliases = new Map();
const config = require("./data/configdata.json");

//var activeGames = {};

class gameHandler
{
	constructor()
	{
		for(let cmd of cmdinfo)
		{
			switch(cmd.type)
			{
				case 'CMD':
					let tmp = require(cmd.path);
					cmds.set(cmd.orig, new tmp());
					break;
				case 'MODE':
					modes.set(cmd.orig, cmd);
					break;
			}
			
			for(let alias of cmd.aliases){
				aliases.set(alias, cmd.orig);
			}
		}

	}

	async onMessage(message){
		if( 
			message.channel.type != "DM" && !message.content.startsWith(config.PREFIX)
			|| message.author.bot 
		) return;
		
		let cmdstr = message.content;
		if(cmdstr.startsWith(config.PREFIX)){cmdstr = cmdstr.substr(config.PREFIX.length)}
		let parsed = this.parse(cmdstr);
		console.log(parsed.cmd);
		console.log(parsed.lang);

	}
	
	//expected input:
	//<cmd/mode>.<language?> <args?...>
	parse(cmdstr)
	{
		/*output
		{
			cmd: "command",
			lang: "lang",
			args: [arg1, arg2....]
		}*/
		let output = {
			cmd: '',
			lang: '',
			args: []
		}

		let args = cmdstr.split([' ', '.']);
		
		//split the zero index (command) into cmd and lang
		//CHANGE TO USE SPLIT INSTEAD OF IF STATEMENT
		output.cmd = args[0];
		if(aliases[output.cmd]){output.cmd = aliases[output.cmd];}	
		args.shift();




		let index = args[0].indexOf('.', 0);
		if(index != -1){
			output.cmd = args[0].substring(0, index)
			output.lang = args[0].substring(index + 1)
		}
		else{
			output.cmd = args[0];
		}
		
		//replace cmd alias if there is any
		

		//remove command from arguments
		
		output.args = args;

		return output;
	}

}

module.exports = gameHandler;