//LANGUAGE DATA
//DATAFOLDER
//WORDLIST
//LEGALWORDS
//LOCALIZED TEXT
const fs = require('fs');
const ModeCmd = require('../../cmd-types/modecmd');
var activeUsers = {};

class wordle extends ModeCmd
{
	constructor(baseArgs, loc)
	{
		super(baseArgs);
		this.loc = loc;
		
	}
	

	call(/* Discord.Message */msg, /* Array <string> */args)
	{
		console.log(fs.readFileSync(`${__dirname}/${this.loc}/wordlist.json`, {encoding:'utf8'}));
	}
	
	
	loadUser(id)
	{
		activeUsers[id] = JSON.parse(fs.readFileSync(this.datapath + '/userdata/' + id + '.json', 'utf8'));
	}

	unloadUser(id)
	{
		fs.writeFileSync(this.datapath + '/userdata/' + id + '.json', JSON.stringify(activeUsers[id]))
		delete activeUsers[id];
		console.log(activeUsers);
	}
}

module.exports = wordle;


//LOGIC TO GET PLAYER? MAYBE DO BEFORE ENTERING SCRIPT

//LOAD SPECIFIC LANGUAGE DATA
