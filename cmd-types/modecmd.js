const BaseCommand = require("./basecmd");


//not used atm
class ModeCmd extends BaseCommand
{
	call(/* Discord.Message */msg, /* Array <string> */args)
	{
		if(!super.call(msg, args)) return 1;
		return 0;
	}
}
module.exports = ModeCmd;