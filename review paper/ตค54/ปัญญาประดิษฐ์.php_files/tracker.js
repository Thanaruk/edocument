function DomainCompare(domain1,domain2){
if(domain1==domain2)return true
else if(domain1.length>domain2.length)return(domain1.substring(domain1.length-domain2.length-1)==("."+domain2))
return false}
function CheckFlash(){
var f="false",n=navigator
if(n.plugins&&n.plugins.length){
for(var ii=0;ii<n.plugins.length;ii++){
if(n.plugins[ii].name.indexOf('Shockwave Flash')!=-1){
f=n.plugins[ii].description.split('Shockwave Flash ')[1]
break}}}
else if(window.ActiveXObject){
for(var ii=10;ii>=2;ii--){
try{
var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');")
if(fl){f=ii+'.0';break;}}
catch(e){}}}
return f}
var cookie="false",jsactive,flaver="false",jsver=1.1,sc_solution,sc_color,now_url_top,now_url,referrer,parameter=''
try{
jsactive=(navigator.javaEnabled()==true)? "true":"false"
flaver=CheckFlash()
if(document.cookie){
document.cookie="testcookie=enabled;expire="+(new Date()).toGMTString()
cookie=(document.cookie.length>0)? "true":"false"}
document.write("<script language=javascript1.2>jsver=1.2;sc_solution=screen.width+'x'+screen.height;sc_color=(navigator.appName.indexOf('Microsoft')!=-1)?screen.colorDepth:screen.pixelDepth;if(sc_color=='undefined'){sc_color='undefined';}</script>")
document.write("<script language=javascript1.3>jsver=1.3;</script>")
now_url_top=top.window.document.domain
now_url=parent.document.URL
if(DomainCompare(document.domain,stats_domain)&&DomainCompare(now_url_top,stats_domain)){
referrer=escape(top.document.referrer)
if(referrer=="undefined" || referrer==""){
referrer="direct"}
now_url=now_url.replace(/&/g,"%26").replace(/\"/g,"%22").replace(/\'/g,"%27").replace(/\</g,"%3c").replace(/\>/g,"%3e").replace(/\:/g,"%3a")
parameter="referrer="+referrer+"&domain="+stats_domain+"&key="+stats_key+"&uid="+stats_uid+"&cookie="+cookie+"&flaver="+flaver+"&jsver="+jsver+"&jsactive="+jsactive+"&sc_solution="+sc_solution+"&sc_color="+sc_color+"&now_url="+now_url}}
catch(e){
parameter=""}
if(parameter.length>0){
document.write("<a href='http://www.stats.in.th/?cmd=stats&user="+stats_uname+"' target='_blank'>"+"<img src='http://203.150.228.71/counter.php?"+parameter+"' width=18 height=17 "+"alt='www.Stats.in.th' border=0></a>")}
else{
document.write("<a href='http://www.stats.in.th/?cmd=stats&user="+stats_uname+"' target='_blank'>"+"<img src='http://static.stats.in.th/stat_gray.gif' width=18 height=17 "+"alt='www.Stats.in.th' border=0></a>")}