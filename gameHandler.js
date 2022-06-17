const cmdinfo = require("./modes/modes.json");
const cmds = new Map();
const aliases = new Map();
const config = require("./data/configdata.json");

//LOOK INTO REFACTORING.... EVERYTHING BASICALLY
class gameHandler
{
	constructor(client)
	{
		this.client = client;
		for(let cmd of cmdinfo)
		{
			let tmp = require(cmd.path);
			cmd.baseArgs = [this.client, cmd.orig];

			
			switch(cmd.langs)
			{
				case undefined:
					let addcmd = (...args) => cmds.set(cmd.orig, new tmp(cmd.baseArgs, ...args));
					if (cmd.ctorArgs instanceof Array) addcmd(...cmd.ctorArgs);
					break;
				default:
					for(let lang of cmd.langs){
						let addcmd = (...args) => cmds.set(`${cmd.orig}.${lang}`, new tmp(cmd.baseArgs, lang, ...args));
						if (cmd.ctorArgs instanceof Array) addcmd(...cmd.ctorArgs);
					}
				break;
			}
			

			for(let alias of cmd.aliases){
				aliases.set(alias, cmd.orig);
			}
		}

	}

	
	//  1: Internal error
	//  0: command was called
	// -1: unknown command 
	async onMessage(message){
		if( 
			message.channel.type != "DM" && !message.content.startsWith(config.PREFIX)
			|| message.author.bot 
		) return;
		
		let cmdstr = message.content;
		if(cmdstr.startsWith(config.PREFIX)){cmdstr = cmdstr.substr(config.PREFIX.length)}
		let parsed = this.parse(cmdstr);

		this.callCmd(message, parsed);
	}

	async callCmd(message, parsedCmd){
		if(cmds.get(`${parsedCmd.cmd}.${parsedCmd.lang}`))
		{
			cmds.get(`${parsedCmd.cmd}.${parsedCmd.lang}`).call(message, parsedCmd.args);
		}
		if(cmds.get(`${parsedCmd.cmd}`))
		{
			cmds.get(`${parsedCmd.cmd}`).call(message, parsedCmd.args);
		}
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

		let args = cmdstr.split([' ']);
		
		//get and remove cmd string from arguments list
		output.cmd = args[0];
		args.shift();

		//set output arguments
		output.args = args;

		//split cmd into cmd and lang
		args = output.cmd.split(['.']);
		output.cmd = args[0];
		output.lang = args[1];

		//replace cmd alias if there is any
		if(aliases.get(output.cmd)){output.cmd = aliases.get(output.cmd);}	
		
		return output;


		//maybe look into doing mode/language differently
	} 

}

module.exports = gameHandler;