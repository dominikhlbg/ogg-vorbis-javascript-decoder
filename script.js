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