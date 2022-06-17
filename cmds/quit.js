const RootCmd = require("../cmd-types/rootcmd");

class quit extends RootCmd
{
	call(/* Discord.Message */msg, /* Array <string> */args)
	{
		if(!super.call(msg, args)) return 1;
		msg.channel.send("goodbye :salute2:").then(() => msg.client.destroy());
	}
}

module.exports = quit;