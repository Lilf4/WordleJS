class BaseCommand
{
	constructor([
		/*Discord.Client*/ client,
		/*String*/         orig
	])
	{
		this.client = client;
		this.orig = orig;
	}

	call(/* Discord.Message */msg, /* Array <string> */args)
	{
		return 0;
	}
}

module.exports = BaseCommand;