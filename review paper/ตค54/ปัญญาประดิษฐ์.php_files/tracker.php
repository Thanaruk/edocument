var stats_key="3651286082";
var stats_domain='212cafe.com';
var stats_uid='21611';
var stats_uname='21611';
if(typeof(parent.document) != 'undefined')
{
	if(typeof(parent.stats_init) == 'undefined')
	{
		parent.stats_init = true;
		document.write("<script src='http://static.stats.in.th/tracker.js'></script>");
	}
}
else if(typeof(stats_init) == 'undefined')
{
	var stats_init = true;
	document.write("<script src='http://static.stats.in.th/tracker.js'></script>");
}