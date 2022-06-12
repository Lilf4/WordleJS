//LANGUAGE DATA
//DATAFOLDER
//WORDLIST
//LEGALWORDS
//LOCALIZED TEXT
const fs = require('fs');
var activeUsers = {};

class wordle 
{
	constructor(datapath)
	{
		this.datapath = datapath;
		this.wordlist = JSON.parse(fs.readFileSync(datapath + '\\wordlist.json', 'utf8'));
		this.loc = JSON.parse(fs.readFileSync(datapath + '\\loc.json', 'utf8'));
		
	}

	call(msg, args)
	{

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
