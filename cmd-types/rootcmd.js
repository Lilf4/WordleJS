const BaseCommand = require("./basecmd");

class RootCmd extends BaseCommand{
	

	call(/* Discord.Message */msg, /* Array <string> */args)
	{
		if(!super.call(msg, args)) return 1;
		return 0;
	}
}
module.exports = RootCmd;