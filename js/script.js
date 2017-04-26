// JavaScript Document// JavaScript Document
function EventListener(obj,evt,fnc,useCapture){
	if (!useCapture) useCapture=false;
	if (obj.addEventListener){
		obj.addEventListener(evt,fnc,useCapture);
		return true;
	} else if (obj.attachEvent) return obj.attachEvent("on"+evt,fnc);
} 

window.onload = function(){
	disabledbuttons(false);
	try {
	var canvas 	= document.getElementById("oggvorbis_file_field");
	var context	= canvas.getContext("2d");
	context.fillText("Choose one OGG - file from above", 52, 72);
	if (typeof FileReader !== "undefined")
	context.fillText("or drop a *.ogg file into this field", 55, 82);
	} catch(err) {}
	EventListener(canvas, "dragenter", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}, false);

	EventListener(canvas, "dragover", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}, false);

	EventListener(canvas, "drop", function (evt) {
		var files = evt.dataTransfer.files;
		if (files.length > 0) {
			evt.preventDefault();
			evt.stopPropagation();
			var file = files[0];
			if (typeof FileReader !== "undefined") {
				if(!isActive) {
				var freader = new FileReader();
				freader.onload = function (evt) {
					isActive=true;
					disabledbuttons(true);
					oggvorbisdata(evt.target.result.split('').map(function(e){return e.charCodeAt(0) & 0xff}));
				};
				freader.readAsBinaryString(file);
				} else alert('refresh your browser to add a new file');
			} else {
				alert('Your Browser don\'t support the Filereader API');
			}
		}
	}, false);
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
	c1 = str.charCodeAt(i++) & 0xff;
	if(i == len)
	{
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
	    out += "==";
	    break;
	}
	c2 = str.charCodeAt(i++);
	if(i == len)
	{
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
	    out += "=";
	    break;
	}
	c3 = str.charCodeAt(i++);
	out += base64EncodeChars.charAt(c1 >> 2);
	out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
	out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

if (!window.btoa) window.btoa = base64encode;

