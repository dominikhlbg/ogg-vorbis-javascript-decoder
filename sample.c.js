// JavaScript Document

//readfile("");

//10
// stb_vorbis_decode_filename: decode an entire file to interleaved shorts
function test_decode_filename(g, filename)
{
   var decoded=[short_];//*
   var channels=[int_], len=int_;
   len = stb_vorbis_decode_filename(filename, channels, decoded);
   if (len) {//decoded[0].length=1024*1024;//alert('test');
	   var dataURI = "data:audio/wav;base64,"+escape(btoa(uint8ToString(decoded[0])));
    var player = document.createElement("embed");
    player.setAttribute("src", dataURI);
    player.setAttribute("width", 400);
    player.setAttribute("height", 100);
    player.setAttribute("autostart", true);
    document.getElementById('player-container').appendChild(player);
   }
//   if (len)
//      fwrite(decoded, 2, len*channels[0], g);
//   else
//      stb_fatal("Couldn't open {%s}", filename);
}
function uint8ToString(buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
}

// Base 64 encoding function, for browsers that do not support btoa()
// by Tyler Akins (http://rumkin.com), available in the public domain
    function btoa2(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        do {
            chr1 = input[i++];
            chr2 = input[i++];
            chr3 = input[i++];

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
                     keyStr.charAt(enc3) + keyStr.charAt(enc4);
        } while (i < input.length);

        return output;
    }