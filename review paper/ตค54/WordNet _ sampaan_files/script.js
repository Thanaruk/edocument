var HighlanderComments=jQuery.extend(HighlanderComments,{autosaveInterval:false,commentList:null,cookies:{facebook:'wpc_fbc',twitter:'wpc_tc'},popups:{facebook:',height=400,width=600',twitter:',height=515,width=600'},currentParent:false,currentParentId:false,currentParentMargins:{},WPLoginIframe:null,init:function(){jQuery('#respond').addClass('js');HighlanderComments.commentList=jQuery('#thecomments, .thecomments, #commentlist, #comment-list, #comments-list, .commentlist, .comment-list, .comments-list, .com-list').last();jQuery('#comment-form-nascar a').click(HighlanderComments.clickService);jQuery('#postas-guest').click(HighlanderComments.clickGuestTab);jQuery('#postas-wordpress').click(HighlanderComments.clickWordPressTab);jQuery('#postas-facebook, #labelto-facebook').click(HighlanderComments.clickExternalTab);jQuery('#postas-twitter, #labelto-twitter').click(HighlanderComments.clickExternalTab);jQuery('#labelto-wordpress').click(HighlanderComments.checkPostToWordPress);jQuery('#comment-form-post-to-edit a').click(HighlanderComments.editShareText);jQuery(window).resize(HighlanderComments.toggleShareLabels);HighlanderComments.toggleShareLabels();HighlanderComments.restoreComment();jQuery.each(jQuery('.comment-form-field input, textarea#comment'),function(){if(jQuery(this).val()!==''){HighlanderComments.hideLabels(jQuery(this));}});HighlanderComments.WPLoginIframe=jQuery('iframe#wordpress-login-iframe');jQuery('div.comment-form-fields input').change(function(){HighlanderComments.toggleLabel(jQuery(this));}).focus(function(){HighlanderComments.hideLabels(jQuery(this));}).blur(function(){HighlanderComments.showLabels(jQuery(this));});jQuery('div.comment-form-fields label').click(function(){HighlanderComments.hideLabels(jQuery(this).parent().children('.comment-form-input input'));});jQuery('#email').blur(function(){HighlanderComments.updateAvatarWithGravatar('#email');if(!jQuery('#author').val()){Gravatar.autofill(jQuery(this).val(),{'displayName':'author','profileUrl':'url','url':'link'});var afd=Gravatar.autofill_data;Gravatar.autofill_data=function(hash){afd.call(Gravatar,hash);jQuery('input#url').change();jQuery('input#author').change().click();};}});jQuery('textarea#comment')
.autoResize({animate:false})
.trigger('change.dynSiz')
.focus(function(){HighlanderComments.hideLabels(jQuery(this));})
.blur(function(){HighlanderComments.showLabels(jQuery(this));})
.keyup(function(){HighlanderComments.fillShareText(jQuery(this));});jQuery('#commentform').submit(function(){var verified=true,email,author;if(''===jQuery('textarea#comment').val()){jQuery('label[for="comment"]').fadeOut('fast',function(){jQuery(this).text(HighlanderComments.enterACommentError).fadeIn('fast').addClass('error');});jQuery('#comment-form-comment').addClass('error');jQuery('textarea#comment').focus(function(){jQuery(this).parent('#comment-form-comment').removeClass('error');});verified=false;}
if('guest'==jQuery('#hc_post_as').val()&&jQuery('#comment-form-guest label span[class="required"]').size()){email=jQuery('#email').val();if(''===email||!email.match(/^.*@.*\..*$/)){jQuery('label[for="email"]').fadeOut('fast',function(){var error;if(''==email){error=HighlanderComments.enterEmailError;}else{error='<span class="nopublish">'+HighlanderComments.invalidEmailError+'</span>';}
jQuery(this).html(error).css('opacity',1).fadeIn('fast').addClass('error');});jQuery('div.comment-form-email .comment-form-input').addClass('error');jQuery('input#email').focus(function(){jQuery(this).parent().removeClass('error');});verified=false;}
author=jQuery('#author').val();if(''===author){jQuery('label[for="author"]').fadeOut('fast',function(){jQuery(this).text(HighlanderComments.enterAuthorError).fadeIn('fast').addClass('error');});jQuery('div.comment-form-author .comment-form-input').addClass('error');jQuery('input#author').focus(function(){jQuery(this).parent().removeClass('error');});verified=false;}}
if(!verified){return false;}
HighlanderComments.clickSubmit();return true;});if('undefined'!==typeof addComment){HighlanderComments._moveForm=addComment.moveForm;addComment.moveForm=HighlanderComments.moveForm;}
HighlanderComments.updateTabLabels();if(jQuery('#comment-form-wordpress.selected').size()){HighlanderComments.clickWordPressTab(false);}},_moveForm:null,moveForm:function(commId,parentId,respondId,postId){if(null===HighlanderComments._moveForm){return;}
var t=this,r=false,respond=jQuery('#'+respondId).css({marginLeft:0,marginRight:0}),w,wTop,commElement,rHeight,cTop,rTop;if(HighlanderComments.currentParent){if(parentId===HighlanderComments.currentParentId){return false;}
w=jQuery(window);wTop=w.scrollTop();commElement=jQuery('#'+commId);cTop=commElement.offset().top;rTop=respond.offset().top;if(rTop<=cTop){rHeight=respond.outerHeight(true);respond.before(jQuery('<div id="highlander-placeholder" />').css({margin:0,padding:0,border:0,height:rHeight,visibility:'hidden',position:respond.css('position')}));}
r=HighlanderComments._moveForm.call(t,commId,parentId,respondId,postId);if(false!==r){return r;}
HighlanderComments.currentParent.stop(true,true).css(HighlanderComments.currentParentMargins);jQuery('#highlander-placeholder').remove();if(rTop<=cTop){jQuery(window).scrollTop(wTop-rHeight);}
HighlanderComments.moveFormNow.call(t,commId,parentId,respondId);}else{r=HighlanderComments._moveForm.call(t,commId,parentId,respondId,postId);if(false===r){HighlanderComments.moveFormNow.call(t,commId,parentId,respondId);}}
return r;},moveFormNow:function(commId,parentId,respondId){HighlanderComments.currentParent=jQuery('#comment-'+parentId).parents('.highlander-comment').andSelf().filter('.highlander-comment').last();if(!HighlanderComments.currentParent.size()){HighlanderComments.currentParent=jQuery('#comment-'+parentId).parents('.comment').andSelf().filter('.comment').last();}
HighlanderComments.currentParentId=parentId;var respond=jQuery('#'+respondId);if(!HighlanderComments.currentParent.find(respond).size()){var betterParent=HighlanderComments.currentParent.parents('.children:first');if(!betterParent.size()){betterParent=HighlanderComments.currentParent.parents('.highlander-comment:first');if(!betterParent.size()){betterParent=HighlanderComments.currentParent.parents('.comment:first');}}
if(betterParent.size()){HighlanderComments.currentParent=betterParent;}}
HighlanderComments.currentParentMargins={backgroundColor:HighlanderComments.currentParent.css('backgroundColor'),marginLeft:HighlanderComments.currentParent.css('marginLeft'),marginRight:HighlanderComments.currentParent.css('marginRight')};var oldOff,newOff,offOrder,autoWidth=false;if('ltr'===HighlanderComments.currentParent.css('direction')){offOrder=['Right','Left'];}else{offOrder=['Left','Right'];}
jQuery.each(offOrder,function(i,v){if('0px'===HighlanderComments.currentParentMargins['margin'+v]){oldOff=HighlanderComments.currentParent.offset().left;if('Right'===v){oldOff+=HighlanderComments.currentParent.outerWidth();}
HighlanderComments.currentParent.css('margin'+v,0);newOff=HighlanderComments.currentParent.offset().left;if('Right'===v){newOff+=HighlanderComments.currentParent.outerWidth();}
if(oldOff!==newOff){newOff='Right'===v?newOff-oldOff:oldOff-newOff;HighlanderComments.currentParent.css('margin'+v,newOff);HighlanderComments.currentParentMargins['margin'+v]=newOff;autoWidth=true;}}});if(autoWidth){HighlanderComments.currentParent.css('width','auto');HighlanderComments.currentParentMargins.width='auto';}
var rgbaTransparent=/rgba.*,\s*0\s*\)/,cp,bg,bgi;if('transparent'===HighlanderComments.currentParentMargins.backgroundColor||HighlanderComments.currentParentMargins.backgroundColor.match(rgbaTransparent)){cp=HighlanderComments.currentParent.get(0);bg='transparent';bgi=HighlanderComments.currentParent.css('backgroundImage');while('none'===bgi&&cp.parentNode&&cp.parentNode!=document&&('transparent'===bg||bg.match(rgbaTransparent))){cp=cp.parentNode;bg=jQuery(cp);bgi=bg.css('backgroundImage');bg=bg.css('backgroundColor');}
HighlanderComments.currentParent.css('backgroundColor',bg);}
var cancel=document.getElementById('cancel-comment-reply-link'),listOffsetSource=HighlanderComments.commentList,listOffset,parentOffset=HighlanderComments.currentParent.offset(),currentParentMargins=HighlanderComments.currentParentMargins,redoMargins=false,grandWidth;cp=HighlanderComments.currentParent;while(!cp.is(HighlanderComments.commentList)&&!cp.is(document)){if('hidden'===cp.css('overflow')||'hidden'===cp.css('overflow-x')){listOffsetSource=cp;break;}
cp=cp.parent();}
listOffset=listOffsetSource.offset();HighlanderComments._unmoveForm=cancel.onclick;cancel.onclick=function(){return HighlanderComments.unmoveForm.call(this);};if(-1<currentParentMargins.marginLeft.toString().indexOf('%')){grandWidth=HighlanderComments.currentParent.parent().width();currentParentMargins.marginLeft=parseFloat(currentParentMargins.marginLeft)/100*grandWidth;redoMargins=true;}
if(-1<currentParentMargins.marginRight.toString().indexOf('%')){grandWidth=HighlanderComments.currentParent.parent().width();currentParentMargins.marginRight=parseFloat(currentParentMargins.marginRight)/100*grandWidth;redoMargins=true;}
if(redoMargins){HighlanderComments.currentParent.css(currentParentMargins);}
listOffset.right=listOffset.left+listOffsetSource.outerWidth();parentOffset.left-=parseInt(HighlanderComments.currentParent.css('margin-left'),10);parentOffset.right=parentOffset.left+HighlanderComments.currentParent.outerWidth(true);respond.hide();HighlanderComments.currentParent.animate({marginLeft:'-='+(parentOffset.left-listOffset.left).toString(),marginRight:'-='+(listOffset.right-parentOffset.right).toString()},350,function(){respond.slideDown(350,function(){HighlanderComments.updateTabLabels();jQuery('#'+commId+' .comment-reply-link:first').focus();jQuery('#comment').focus();});respond.children('form').after('<div class="clear" id="threaded-clear"></div>');});},_unmoveForm:null,unmoveForm:function(){var r=HighlanderComments._unmoveForm.call(this);if(false!==r){return r;}
HighlanderComments.updateTabLabels();HighlanderComments.currentParent.stop(true,true).animate(HighlanderComments.currentParentMargins,350,function(){HighlanderComments.currentParent.css(HighlanderComments.currentParentMargins);HighlanderComments.currentParent=HighlanderComments.currentParentId=false;});jQuery('#respond').stop(true,true).show();jQuery('#respond div#threaded-clear').remove();return r;},HTMLToText:function(string){return jQuery('<span />').html(string).text();},autosaveComment:function(){var oneDay=new Date();oneDay.setTime(oneDay.getTime()+86400000);document.cookie='comment-'+HighlanderComments.postID+'='+encodeURIComponent(jQuery('#comment').val())+'; expires='+oneDay.toGMTString()+'; path=/';},unsaveComment:function(){var oneDay=new Date();oneDay.setTime(oneDay.getTime()-86400000);document.cookie='comment-'+HighlanderComments.postID+'= ; expires='+oneDay.toGMTString()+'; path=/';},restoreComment:function(){var parts=document.cookie.split(';'),part;jQuery.each(parts,function(i){part=parts[i].split('=');if('comment-'+HighlanderComments.postID===jQuery.trim(part[0])){if('undefined'!==typeof part[1]&&'undefined'!==part[1]&&''!==decodeURIComponent(part[1])){jQuery('#comment').val(decodeURIComponent(part[1]));}
return;}});},updateTabLabels:function(){var char_width=10,per_tab=60,total_width=jQuery('#comment-form-nascar').width(),first_tab=14,num_tabs,char_limit,wordpress,facebook,twitter;if(jQuery('#postas-guest').size()){first_tab+=jQuery('#comment-form-nascar ul li:first').width();num_tabs=jQuery('#comment-form-nascar ul li').size()-1;}else{num_tabs=jQuery('#comment-form-nascar ul li').size();}
char_limit=(total_width-first_tab-(num_tabs*per_tab))/num_tabs/char_width;char_limit=Math.round(char_limit)-1;wordpress=jQuery('#comment-form-wordpress .comment-form-fields strong').text();if(wordpress.length){if(wordpress.length>char_limit){wordpress=wordpress.substring(0,char_limit)+'&hellip;';}
jQuery('#postas-wordpress span').html(wordpress);}
facebook=HighlanderComments.getServiceData('facebook');if('object'===typeof facebook&&facebook.name.length){if(facebook.name.length>char_limit){facebook.name=facebook.name.substring(0,char_limit)+'&hellip;';}
jQuery('#postas-facebook span').html(facebook.name);}
twitter=HighlanderComments.getServiceData('twitter');if('object'===typeof twitter&&twitter.account.length){if(twitter.account.length>char_limit-1){twitter.account=twitter.account.substring(0,char_limit-1)+'&hellip;';}
jQuery('#postas-twitter span').html('@'+twitter.account);}},clickService:function(e){e.preventDefault();var tab=this.href.replace(/^.*#/,'#').split(':');if('#comment-form-load-service'===tab[0]&&tab[1]){jQuery('#comment-form-load-service p').text(HighlanderComments.connectingToText.replace('%s',tab[1]));}else{jQuery('#hc_post_as').val(tab[0].split('-').pop());}
jQuery('.comment-form-service')
.css('visibility','hidden')
.show()
.removeClass('selected')
.filter(tab[0])
.css('visibility','visible')
.fadeIn('fast')
.end()
.not(tab[0])
.hide()
.css('visibility','visible');jQuery('#comment-form-nascar li.selected').removeClass('selected');jQuery(this).parent().addClass('selected');},clickGuestTab:function(e){if(-1<jQuery('#email').val().indexOf('@twitter.example.com')){jQuery('#email').val('').blur();}
HighlanderComments.updateAvatarWithGravatar('#email');},clickWordPressTab:function(e){jQuery('#wordpress-login-first').hide();var src=HighlanderComments.WPLoginIframe.attr('src');if('undefined'!=typeof src&&-1<src.indexOf('wp-login.php')){return;}
src=HighlanderComments.WPLoginIframe.data('srcurl');if(false===e){src+='&nofocus';}
HighlanderComments.WPLoginIframe.attr('src',src);},checkPostToWordPress:function(e){HighlanderComments.clickWordPressTab();jQuery('#wordpress-login-first').show();},updateAvatarWithGravatar:function(e){var grav_base=('https:'===location.protocol?'https://secure':'http://www')+'.gravatar.com/avatar/';if(jQuery(e).val().length){jQuery('#comment-form-guest .comment-form-avatar img').attr('src',grav_base+Gravatar.md5(jQuery(e).val())+'?s=69&d='+encodeURIComponent(HighlanderComments.gravDefault));}else{jQuery('#comment-form-guest .comment-form-avatar img').attr('src',grav_base+'ad516503a11cd5ca435acc9bb6523536?s=69&d=mm');}},getServiceData:function(service){var data=HighlanderComments.readCookie(HighlanderComments.cookies[service]);if(null===data||'undefined'===typeof data.access_token||!data.access_token){return false;}
return data;},ext_win:false,ext_win_check:false,pollExternalWindow:function(service,from_tab){if(!HighlanderComments.ext_win||HighlanderComments.ext_win.closed){HighlanderComments.doExternalCanceled(service,from_tab);HighlanderComments.ext_win=false;clearInterval(HighlanderComments.ext_win_check);}},clickExternalTab:function(e){if('undefined'==typeof e)
return;clearInterval(HighlanderComments.ext_win_check);var service=e.currentTarget.id.split('-')[1];var from_tab=1;if(e.currentTarget.nodeName!='A')
from_tab=0;if(HighlanderComments.readCookie(HighlanderComments.cookies[service])){if(from_tab)
HighlanderComments.doExternalLoggedIn(service);}else{HighlanderComments.ext_win=window.open(HighlanderComments.connectURL+'&service='+service,'highconn','status=0,toolbar=0,location=1,menubar=0,directories=0,resizable=1,scrollbars=0'+HighlanderComments.popups[service]);HighlanderComments.ext_win_check=setInterval("HighlanderComments.pollExternalWindow( '"+service+"', "+from_tab+" )",100);}},doExternalLoggedIn:function(service){clearInterval(HighlanderComments.ext_win_check);var data=HighlanderComments.getServiceData(service);if('object'!==typeof data){return;}
jQuery('#comment-form-'+service+' .comment-form-avatar img')
.attr('src',('https:'===location.protocol?'https://s-ssl.wordpress.com/':'http://s.wp.com/')+'imgpress?url='+encodeURIComponent(data.avatar)+'&resize=69,69');jQuery('#email').val(data.email).change();jQuery('#author').val(data.name).change();jQuery('#url').val(data.link).change().click();jQuery('#'+service+'-avatar').val(data.avatar);jQuery('#'+service+'-user_id').val(data.uid);jQuery('#'+service+'-access_token').val(data.access_token);if('twitter'==service){jQuery('#author').val(data.name+' (@'+data.account+')').change();}
jQuery('#hc_post_as').val(service);if(service==jQuery('#comment-form-nascar li.selected a').attr('id').replace('postas-','')){jQuery('#comment-form-load-service').hide();jQuery('#comment-form-'+service).show();}
HighlanderComments.updateTabLabels();},doExternalCanceled:function(service,from_tab){if(from_tab){jQuery('#comment-form-'+service+' .comment-form-avatar img').attr('src',('https:'===location.protocol?'https://secure':'http://www')+'.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?d=mm&s=69');jQuery('.comment-meta-'+service).val('');jQuery('#postas-'+service+' span').text(HighlanderComments.loginText);jQuery('#comment-form-'+service).hide();jQuery('#comment-form-nascar a:first').click();}
jQuery('#postto-'+service).prop('checked',false);},doExternalLogout:function(service){var hostname;if(-1!==window.location.hostname.indexOf('.wordpress.com')){hostname='wordpress.com';}else{hostname=window.location.hostname;}
HighlanderComments.writeCookie(HighlanderComments.cookies[service],'',-10,hostname);HighlanderComments.doExternalCanceled(service,true);},clickSubmit:function(e){HighlanderComments.unsaveComment();jQuery('#respond input#comment-submit').val(HighlanderComments.HTMLToText(HighlanderComments.submittingText)).addClass('disabled').wrap('<p id="comment-form-submitting" />');},toggleLabel:function(input){if(!input.val().length){input.parents('div.comment-form-field').children('label').css({opacity:1});}else{input.parents('div.comment-form-field').children('label').css({opacity:0.05});}},hideLabels:function(input){input.parents('div.comment-form-field').children('label').animate({opacity:0},150,function(){jQuery(this).hide();});input.parent().addClass('active');},showLabels:function(input){if(!input.val().length){input.parents('div.comment-form-field').children('label').show().animate({opacity:1},150);}
input.parent().removeClass('active');},editShareText:function(e){e.preventDefault();if(jQuery('#comment-form-edit-share-text').is(':hidden'))
jQuery('#comment-form-edit-share-text').slideDown('fast');else
jQuery('#comment-form-edit-share-text').slideUp('fast');},toggleShareLabels:function(){if(jQuery('#respond').outerWidth()>450)
jQuery('#comment-form-post-to label span').show().parent().css({'padding-right':0});else
jQuery('#comment-form-post-to label span').hide().parent().css({'padding-right':'20px'});},fillShareText:function(textarea){if(!jQuery('#comment-form-share-text-textarea').length)return;var current=jQuery('#comment-form-share-text-textarea').val().split('": ');var shareComment=current[0]+'": '+jQuery(textarea).val();if(shareComment.length>140)
shareComment=shareComment.substr(0,136)+'...';jQuery('#comment-form-share-text-textarea').val(shareComment);},readCookie:function(c){var nameEQ=c+"=",ca=document.cookie.split(';'),i,char,num,chunk,pairs,pair,cookie_data;for(i=0;i<ca.length;i++){char=ca[i];while(char.charAt(0)===' '){char=char.substring(1,char.length);}
if(char.indexOf(nameEQ)===0){chunk=char.substring(nameEQ.length,char.length);pairs=chunk.split('&');cookie_data={};for(num=pairs.length-1;num>=0;num--){pair=pairs[num].split('=');cookie_data[pair[0]]=decodeURIComponent(pair[1]);}
return cookie_data;}}
return null;},writeCookie:function(name,value,days,domain){var expires;if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires="; expires="+date.toGMTString();}else{expires="";}
if(domain){domain="; domain="+domain;}else{domain='';}
document.cookie=name+"="+value+expires+"; path=/"+domain;},finishWPIframeLogin:function(user){jQuery('#wordpress-login-iframe').css({width:'1px',height:'1px',position:'absolute',visibility:'hidden'}).attr('src',HighlanderComments.homeURL);jQuery('.comment-form-fields','#comment-form-wordpress').fadeOut('fast',function(){jQuery(this).html('<p class="comment-form-posting-as">'
+HighlanderComments.commentingAsText
.replace('%1$s','<strong>'+HighlanderComments.HTMLToText(user.display_name)+'</strong>')
.replace('%2$s','WordPress.com')
+' <span class="comment-form-logout">( <a href="/wp-login.php?action=logout&redirect_to='+encodeURIComponent(top.document.location.href)+'">'+HighlanderComments.logoutText+'</a> )</span>'
+'</p>').fadeIn('fast');HighlanderComments.updateTabLabels();});jQuery('.comment-form-avatar img','#comment-form-wordpress').fadeOut('fast',function(){jQuery(this).attr('src',user.avatar[0]).fadeIn('fast');});}});jQuery(HighlanderComments.init);(function(a){a.fn.autoResize=function(j){var b=a.extend({onResize:function(){},animate:true,animateDuration:150,animateCallback:function(){},extraSpace:20,limit:1000},j);this.filter('textarea').each(function(){var c=a(this).css({resize:'none','overflow-y':'hidden'}),k=c.height(),f=(function(){var l=['height','width','lineHeight','textDecoration','letterSpacing'],h={};a.each(l,function(d,e){h[e]=c.css(e)});return c.clone().removeAttr('id').removeAttr('name').css({position:'absolute',top:0,left:-9999}).css(h).attr('tabIndex','-1').insertBefore(c)})(),i=null,g=function(){f.height(0).val(a(this).val()).scrollTop(10000);var d=Math.max(f.scrollTop(),k)+b.extraSpace,e=a(this).add(f);if(i===d){return}i=d;if(d>=b.limit){a(this).css('overflow-y','');return}b.onResize.call(this);b.animate&&c.css('display')==='block'?e.stop().animate({height:d},b.animateDuration,b.animateCallback):e.height(d)};c.unbind('.dynSiz').bind('keyup.dynSiz',g).bind('keydown.dynSiz',g).bind('change.dynSiz',g)});return this}})(jQuery);