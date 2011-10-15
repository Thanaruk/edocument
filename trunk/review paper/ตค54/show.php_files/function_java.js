<!--
function ResetForm(){

	if (window.confirm("Are you sure you want to reset the form?")){
		frames.spaw_rEdit.focus();
	 	frames.spaw_rEdit.document.body.innerHTML = ''; 
	 	return true;
	 } 
	 return false;		
}

// ฟังชั่นในการ print
  	function printform() {
		//window.print();
		document.execCommand('print', false, null);
	}
// ฟังชั่นในการ save
	function saveAsMe (filename)
{
	document.execCommand('SaveAs',null,filename);
}

// ฟังชั่นสำหรับ เปิดหน้าต่าง popup
function winopen(theURL,winName,width,height,scollbar) { //v2.0
var setfocus;
  setfocus = window.open(theURL,winName,'resizable=no,scrollbars='+ scollbar +',width='+ width +',height='+ height +',top=0,left=0');
  setfocus.focus();
}
// ฟังชั่นสำหรับ เปิดหน้าต่าง dialog
function opendialog(url,width,height)
{
	window.showModelessDialog(url,window,"dialogWidth:"+width+"px;dialogHeight:"+height+"px;edge:Raised;center:1;help:0;resizable:1;");
}

// ฟังชั่นสำหรับ Reload หน้าจอ ของ window.opener โดยการกำหนด เวลา 
function reload_view(t) {
//   window.opener.location.reload();
   setTimeout("self.close()",(t * 1000));
}

// ฟังชั่นสำหรับ Reload หน้าจอ ของ window.opener โดยการกำหนด เวลา 
function reload_redirect(t,url) {

   setTimeout("window.location.href='"+url+"'",(t * 1000));
}

function reload_windowclose() {
   window.opener.location.reload();
   window.close();
}

function Add_A_Favorite(title) 
{ 
	external.AddFavorite(location.href, title)
// Add the document location and title to the AddFavorite window
}

// ฟังชั่นสำหรับ เช็คฟอร์ม
function Conf(object) {
  if (confirm("คุณแน่ใจว่าต้องการ ลบ?") == true)  {
  return true;
  }
  return false;
  }
// ฟังชั่นที่ใช้ในการปิดหน้าต่าง
	function exitVC(txt){
		if (confirm(txt)){	//Exit from class room ?
			this.close();
		}
	}
  // ฟังชั่นสำหรับ confirm ข้อมูล
function Confbuttom(object,txtval) {
  if (confirm(txtval) == true)  {
  return true;
  }
  return false;
  }
//----------------------------------------------------------------------------------------------------------------------------------------

function DisplayMenu(item) {
   var obj=document.getElementById(item);

   var img=document.getElementById(item+"_arrow");
   if (obj.style.display!="none") {
     obj.style.display="none";
     img.src="../images/icon_down.jpg";
   } else {
      obj.style.display="block";
      img.src="../images/icon_up.jpg";
   }
}
//  resize iframe
	function autoIframe(frameId){
		try{
		frame = document.getElementById(frameId);
		innerDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;
		objToResize = (frame.style) ? frame.style : frame;
		objToResize.height = innerDoc.body.scrollHeight + 10;
		}
		catch(err){
		window.status = err.message;
		}
	}
//  onload="if (window.parent && window.parent.autoIframe) {window.parent.autoIframe('ชื่อ iframe ');}"

// ======= link menu =====================

function addmanage(i){
	if (i) {
		Layershow("Layer1","","hidden");
		Layershow("Layer2","","show");
	}else{
		Layershow("Layer1","","show");
		Layershow("Layer2","","hidden");
	}
}
function addnetwork(i){
	if (i) {
		Layershow("Layer1","","hidden");
		Layershow("Layer3","","show");
	}else{
		Layershow("Layer1","","show");
		Layershow("Layer3","","hidden");
	}
}
function adddatabase(i){
	if (i) {
		Layershow("Layer1","","hidden");
		Layershow("Layer4","","show");
	}else{
		Layershow("Layer1","","show");
		Layershow("Layer4","","hidden");
	}
}
function addweb(i){
	if (i) {
		Layershow("Layer1","","hidden");
		Layershow("Layer5","","show");
	}else{
		Layershow("Layer1","","show");
		Layershow("Layer5","","hidden");
	}
}


// =====================================
function regisform1(i){
	if (i) {
		Layershow("Layer1","","show");
		Layershow("Layer2","","hidden");
		Layershow("Layer3","","hidden");
		Layershow("Layer4","","hidden");
		Layershow("Layer5","","hidden");
	}
}

function regisform2(i){
	if (i) {
		Layershow("Layer1","","hidden");
		Layershow("Layer2","","show");
		Layershow("Layer3","","hidden");
		Layershow("Layer4","","hidden");
		Layershow("Layer5","","hidden");
	}
}

function regisform3(i){
	if (i) {
		Layershow("Layer1","","hidden");
		Layershow("Layer2","","hidden");
		Layershow("Layer3","","show");
		Layershow("Layer4","","hidden");
		Layershow("Layer5","","hidden");
	}
}

function regisform4(i){
	if (i) {
		Layershow("Layer1","","hidden");
		Layershow("Layer2","","hidden");
		Layershow("Layer3","","hidden");
		Layershow("Layer4","","show");
		Layershow("Layer5","","hidden");
	}
}

function regisform5(i){
	if (i) {
		Layershow("Layer1","","hidden");
		Layershow("Layer2","","hidden");
		Layershow("Layer3","","hidden");
		Layershow("Layer4","","hidden");
		Layershow("Layer5","","show");
	}
}
// =====================================



//----------------------------------------------------------------------------------------------------------------------------------------

//-------------------------- function สำหรับดึงข่าวจากเว็บ thaisarn 
function getMSXMLVersion() {
	var xml = "<?xml version='1.0' encoding='UTF-16'?><cjb></cjb>";
	var x = null;
    var versions = new Array("Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument", "Msxml.DOMDocument");

    for (i = 0; i < versions.length; i++) {
	    try {
		    objectName = versions[i];
	        x = new ActiveXObject(objectName);
	        x.loadXML(xml);
	        return objectName;
	    } catch(e) {

	    }
    };

    return "Not supported";
}

var MSXMLVersion = getMSXMLVersion();

function checkValidVersion() {
	switch(MSXMLVersion) {
		case "Not supported":
		return false;
		case "Msxml.DOMDocument":
		return false;
	    default:
	    return true;
    }
}

function showNews(newsLocation, xslLocation) {
	if (checkValidVersion()) {
		var xmlNews = new ActiveXObject(MSXMLVersion);
		var xslNews = new ActiveXObject(MSXMLVersion);

		// Load news
        xmlNews.async = false;
        xmlNews.load(newsLocation);

        // Load the XSL
        xslNews.async = false;
        xslNews.load(xslLocation);

        // Transform
        return xmlNews.transformNode(xslNews);
    } else {
	    if (MSXMLVersion != "Not supported") {
		    return "This browser does not support MSXML Object or ActiveX has been disabled.";
	    } else {
	        return "This browser only support older version of MSXML Object (< 3.0).";
        }
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-->