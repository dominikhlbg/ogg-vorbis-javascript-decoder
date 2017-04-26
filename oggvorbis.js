(function(){

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

var buffer_time;
var player_type_audio;
var player_type_embed;
var player_type;
// JavaScript Document

var _iobuf = function(){
        this._ptr=char_;//*
        this._ptr_off=0;//*
        this._cnt=int_;
        this._base=char_;//*
        this._base_off=0;//*
        this._flag=int_;
        this._file=int_;
        this._charbuf=int_;
        this._bufsiz=int_;
        this._tmpfname=char_;//*
        this._tmpfname_off=0;//*
        };
var FILE=_iobuf;

var EOF     = (-1);

//FILE * fopen ( const char * filename, const char * mode );
function fopen ( filename, mode ) {
	var f = new FILE();
	f._ptr=filename;
	return f;
}

//int fgetc ( FILE * stream );
function fgetc ( stream ) {
	if(stream._ptr.length<=stream._ptr_off) return EOF;
	return stream._ptr[stream._ptr_off++];
}

//fread
//size_t fread ( void * ptr, size_t size, size_t count, FILE * stream );
function fread ( ptr, size, count, stream ) {
	//ptr.val=new Array();
	//todo: size include
	
	if(stream._ptr.length<count+stream._ptr_off) {stream._ptr_off += count; return EOF; }//0
	for(var i=0;i<size*count;++i)
		ptr[i]=(stream._ptr[stream._ptr_off++]);
	return 1;
}

/* Seek method constants */

var SEEK_CUR    = 1;
var SEEK_END    = 2;
var SEEK_SET    = 0;


//int fseek ( FILE * stream, long int offset, int origin );
function fseek ( stream, offset, origin ) {
switch (origin) {
  case SEEK_CUR:
    
    break;
  case SEEK_END:
    
    break;
  case SEEK_SET:
    stream._ptr_off = offset;
    break;
  default:
    assert(0);
    break;
}
}

//ftell
//long int ftell ( FILE * stream );
function ftell(stream) {
	return stream._ptr_off;
}

//int memcmp ( const void * ptr1, const void * ptr2, size_t num );
function memcmp ( ptr1, ptr2, num ) {
	var i;
	for(i=0;i<num;i++)
		if(ptr1[i]!=ptr2[i])
			return 1;
	return 0;
}

var char_=0, short_=0, int_=0, long_=0, void_=0;

var int8=char_;
var uint8=char_;
var int16=short_;
var uint16=short_;
var int32=int_;
var uint32=int_;
var uint64=long_;
var int64=long_;

var float_=0.00;

function memcpy(dst, dst_off, src, src_off, num) {
	var i;
	for(i=0;i<num;++i)
		dst[dst_off + i] = src[src_off + i];
}

function memset(ptr, ptr_off, value, num) {
	var i=0;
		for(i=0; i<num; ++i) 
			ptr[ptr_off + i]=value;
}

function Arr(len,val) {
	var i;
	var result = new Array(); for (i = 0; i < len; ++i) result.push(val);
	return result;
}

function Arr_new(len,val) {
	var i;
	var result = new Array(); for (i = 0; i < len; ++i) result.push(new val);
	return result;
}

function assert(bCondition) {
	if (!bCondition) {
		throw new Error('assert :P');
	}
}

// JavaScript Document

//readfile("");

//10
// stb_vorbis_decode_filename: decode an entire file to interleaved shorts
function test_decode_filename(g, filename)
{
   var decoded=[short_];//*
   var channels=[int_], len=int_;
   len = stb_vorbis_decode_filename(filename, channels, decoded);
   /*if (len) {//decoded[0].length=1024*1024;//alert('test');
	   var dataURI = "data:audio/wav;base64,"+escape(btoa(uint8ToString(decoded[0])));
    var player = document.createElement("embed");
    player.setAttribute("src", dataURI);
    player.setAttribute("width", 400);
    player.setAttribute("height", 100);
    player.setAttribute("autostart", true);
    document.getElementById('player-container').appendChild(player);
   }*/
//   if (len)
//      fwrite(decoded, 2, len*channels[0], g);
//   else
//      stb_fatal("Couldn't open {%s}", filename);
}
function oggvorbisdata(filename) {
   buffer_time = document.getElementById('buffer_time').value; //seconds
   player_type_audio = document.getElementById('player_type_audio');
   player_type_embed = document.getElementById('player_type_embed');
   player_type = player_type_audio.checked?"audio":player_type_embed.checked?"embed":"flash";
   test_decode_filename(null, filename);
}
window['oggvorbisdata'] = oggvorbisdata;
function playbackSound(dataURI) {
    if (player_type=="audio" || player_type=="embed") {
    var player = document.createElement(player_type);
    player.setAttribute("src", dataURI);
    player.setAttribute("width", 400);
    player.setAttribute("height", 100);
    player.setAttribute("autostart", true);
    player.setAttribute("autoplay", true);
    player.setAttribute("controls", true);
	} else
	if (player_type=="flash") {
	var player = document.createElement("span");//<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="100" height="50" id="WaveBase64_Player" align="middle">	<param name="allowScriptAccess" value="sameDomain" /><param name="FlashVars" value="base64='+dataURI+'" />	<param name="allowFullScreen" value="false" />	<param name="movie" value="WaveBase64_Player.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" />		</object>
	player.innerHTML ='<embed src="WaveBase64_Player.swf" quality="high" bgcolor="#ffffff" width="100" height="50" name="WaveBase64_Player" FlashVars="base64='+dataURI+'" align="middle" allowScriptAccess="sameDomain" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_de" />';
	}
    document.getElementById('player-container').appendChild(player);
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
	
// JavaScript Document

//312
////////   ERROR CODES

//enum STBVorbisError
//{
var 
   VORBIS__no_error=0,

   VORBIS_need_more_data=1,             // not a real error

   VORBIS_invalid_api_mixing=2,           // can't mix API modes
   VORBIS_outofmem=3,                     // not enough memory
   VORBIS_feature_not_supported=4,        // uses floor 0
   VORBIS_too_many_channels=5,            // STB_VORBIS_MAX_CHANNELS is too small
   VORBIS_file_open_failure=6,            // fopen() failed
   VORBIS_seek_without_length=7,          // can't seek in unknown-length file

   VORBIS_unexpected_eof=10,            // file is truncated?
   VORBIS_seek_invalid=11,                 // seek past EOF

   // decoding errors (corrupt/invalid stream) -- you probably
   // don't care about the exact details of these

   // vorbis errors:
   VORBIS_invalid_setup=20,
   VORBIS_invalid_stream=21,

   // ogg errors:
   VORBIS_missing_capture_pattern=30,
   VORBIS_invalid_stream_structure_version=31,
   VORBIS_continued_packet_flag_invalid=32,
   VORBIS_incorrect_stream_serial_number=33,
   VORBIS_invalid_first_page=34,
   VORBIS_bad_packet_type=35,
   VORBIS_cant_find_last_page=36,
   VORBIS_seek_failed=37
//}
;


//391
// STB_VORBIS_MAX_CHANNELS [number]
//     globally define this to the maximum number of channels you need.
//     The spec does not put a restriction on channels except that
//     the count is stored in a byte, so 255 is the hard limit.
//     Reducing this saves about 16 bytes per value, so using 16 saves
//     (255-16)*16 or around 4KB. Plus anything other memory usage
//     I forgot to account for. Can probably go as low as 8 (7.1 audio),
//     6 (5.1 audio), or 2 (stereo only).
//#ifndef STB_VORBIS_MAX_CHANNELS
var STB_VORBIS_MAX_CHANNELS    = 16;  // enough for anyone?
//#endif

//403
// STB_VORBIS_PUSHDATA_CRC_COUNT [number]
//     after a flush_pushdata(), stb_vorbis begins scanning for the
//     next valid page, without backtracking. when it finds something
//     that looks like a page, it streams through it and verifies its
//     CRC32. Should that validation fail, it keeps scanning. But it's
//     possible that _while_ streaming through to check the CRC32 of
//     one candidate page, it sees another candidate page. This #define
//     determines how many "overlapping" candidate pages it can search
//     at once. Note that "real" pages are typically ~4KB to ~8KB, whereas
//     garbage pages could be as big as 64KB, but probably average ~16KB.
//     So don't hose ourselves by scanning an apparent 64KB page and
//     missing a ton of real ones in the interim; so minimum of 2
//#ifndef STB_VORBIS_PUSHDATA_CRC_COUNT
var STB_VORBIS_PUSHDATA_CRC_COUNT  = 4;
//#endif

//419
// STB_VORBIS_FAST_HUFFMAN_LENGTH [number]
//     sets the log size of the huffman-acceleration table.  Maximum
//     supported value is 24. with larger numbers, more decodings are O(1),
//     but the table size is larger so worse cache missing, so you'll have
//     to probe (and try multiple ogg vorbis files) to find the sweet spot.
//#ifndef STB_VORBIS_FAST_HUFFMAN_LENGTH
var STB_VORBIS_FAST_HUFFMAN_LENGTH   = 10;
//#endif

//571
//#ifdef STB_VORBIS_CODEBOOK_FLOATS
var codetype=float_;
//#else
//typedef uint16 codetype;
//#endif

// @NOTE
//
// Some arrays below are tagged "//varies", which means it's actually
// a variable-sized piece of data, but rather than malloc I assume it's
// small enough it's better to just allocate it all together with the
// main thing
//
// Most of the variables are specified with the smallest size I could pack
// them into. It might give better performance to make them all full-sized
// integers. It should be safe to freely rearrange the structures or change
// the sizes larger--nothing relies on silently truncating etc., nor the
// order of variables.

var FAST_HUFFMAN_TABLE_SIZE   = (1 << STB_VORBIS_FAST_HUFFMAN_LENGTH);
var FAST_HUFFMAN_TABLE_MASK   = (FAST_HUFFMAN_TABLE_SIZE - 1);

//593
var Codebook = function()
{
   this.dimensions=int_, this.entries=int_;
   this.codeword_lengths=uint8;//*
   this.minimum_value=float_;
   this.delta_value=float_;
   this.value_bits=uint8;
   this.lookup_type=uint8;
   this.sequence_p=uint8;
   this.sparse=uint8;
   this.lookup_values=uint32;
   this.multiplicands=codetype;//*
   this.codewords=uint32;//*
//   #ifdef STB_VORBIS_FAST_HUFFMAN_SHORT
   this.fast_huffman=new Array(FAST_HUFFMAN_TABLE_SIZE);//int16
//   #else
//    int32  fast_huffman[FAST_HUFFMAN_TABLE_SIZE];
//   #endif
   this.sorted_codewords=uint32;//*
   this.sorted_values=int_;//*
   this.sorted_values_off=0;//*
   this.sorted_entries=int_;
};

//616
var Floor0 = function()
{
   this.order=uint8;
   this.rate=uint16;
   this.bark_map_size=uint16;
   this.amplitude_bits=uint8;
   this.amplitude_offset=uint8;
   this.number_of_books=uint8;
   this.book_list=new Array(16);//uint8 // varies
};

//627
var Floor1 = function()
{
   this.partitions=uint8;
   this.partition_class_list=new Array(32);//uint8 // varies
   this.class_dimensions=new Array(16);//uint8 // varies
   this.class_subclasses=new Array(16);//uint8 // varies
   this.class_masterbooks=new Array(16);//uint8 // varies
   this.subclass_books=new Array(16);for(var i=0;i<16;i++)this.subclass_books[i]=new Array(8);//int16 // varies
   this.Xlist=new Array(31*8+2);//uint16 // varies
   this.sorted_order=new Array(31*8+2);//uint8
   this.neighbors=new Array(31*8+2);for(var i=0;i<31*8+2;i++)this.neighbors[i]=new Array(2);//uint8
   this.floor1_multiplier=uint8;
   this.rangebits=uint8;
   this.values=int_;
};

//643
var Floor = function() //union
{
   this.floor0=new Floor0();
   this.floor1=new Floor1();
};

//649
var Residue = function()
{
   this.begin=uint32, this.end=uint32;
   this.part_size=uint32;
   this.classifications=uint8;
   this.classbook=uint8;
   this.classdata=uint8;//**
   this.residue_books=new Array(8);//int16 //(*)
};

//659
var MappingChannel = function()
{
   this.magnitude=uint8;
   this.angle=uint8;
   this.mux=uint8;
};

//666
var Mapping = function()
{
   this.coupling_steps=uint16;
   this.chan='MappingChannel';//*
   this.submaps=uint8;
   this.submap_floor=new Array(15);//uint8 // varies
   this.submap_residue=new Array(15);//uint8 // varies
};

//675
var Mode = function()
{
   this.blockflag=uint8;
   this.mapping=uint8;
   this.windowtype=uint16;
   this.transformtype=uint16;
};

//692
var ProbedPage = function()
{
   this.page_start, this.page_end=uint32;
   this.after_previous_page_start=uint32;
   this.first_decoded_sample=uint32;
   this.last_decoded_sample=uint32;
};

//700
var stb_vorbis = function()
{
  // user-accessible info
   this.sample_rate=int_;//unsigned
   this.channels=int_;

   this.setup_memory_required=int_;//unsigned
   this.temp_memory_required=int_;//unsigned
   this.setup_temp_memory_required=int_;//unsigned

  // input config
//#ifndef STB_VORBIS_NO_STDIO
   this.f='FILE';//*
   this.f_start=uint32;
   this.close_on_free=int_;
//#endif

   this.stream=uint8;//*
   this.stream_off=0;//*
   this.stream_start=uint8;//*
   this.stream_start_off=0;//*
   this.stream_end=uint8;//*
   this.stream_end_off=0;//*

   this.stream_len=uint32;

   this.push_mode=uint8;

   this.first_audio_page_offset=uint32;

   this.p_first='ProbedPage', this.p_last='ProbedPage';

  // memory management
   this.alloc='stb_vorbis_alloc';
   this.setup_offset=int_;
   this.temp_offset=int_;

  // run-time results
   this.eof=int_;
   this.error='enum STBVorbisError';

  // user-useful data

  // header info
   this.blocksize=new Array(2);//int
   this.blocksize_0=int_, this.blocksize_1=int_;
   this.codebook_count=int_;
   this.codebooks='Codebook';//*
   this.floor_count=int_;
   this.floor_types=new Array(64);//uint16 // varies
   this.floor_config='Floor';//*
   this.residue_count=int_;
   this.residue_types=new Array(64);//uint16 // varies
   this.residue_config='Residue';//*
   this.mapping_count=int_;
   this.mapping='Mapping';//*
   this.mode_count=int_;
   this.mode_config=Arr_new(64,Mode);  // varies

   this.total_samples=uint32;

  // decode buffer
   this.channel_buffers=new Array(STB_VORBIS_MAX_CHANNELS);//float *
   this.outputs        =new Array(STB_VORBIS_MAX_CHANNELS);//float *

   this.previous_window=new Array(STB_VORBIS_MAX_CHANNELS);//float *
   this.previous_length=int_;

   //#ifndef STB_VORBIS_NO_DEFER_FLOOR
   this.finalY=new Array(STB_VORBIS_MAX_CHANNELS);//int16 *
   //#else
   //float *floor_buffers[STB_VORBIS_MAX_CHANNELS];
   //#endif

   this.current_loc=uint32; // sample location of next frame to decode
       this.current_loc_valid=int_;

  // per-blocksize precomputed data
   
   // twiddle factors
   this.A=new Array(2),this.B=new Array(2),this.C=new Array(2);//float *,*,*
   this.window_=new Array(2);//float *
   this.bit_reverse=new Array(2);//uint16 *

  // current page/packet/segment streaming info
   this.serial=uint32; // stream serial number for verification
   this.last_page=int_;
   this.segment_count=int_;
   this.segments=Arr(255,uint8);//
   this.page_flag=uint8;
   this.bytes_in_seg=uint8;
   this.first_decode=uint8;
   this.next_seg=int_;
   this.last_seg=int_;  // flag that we're on the last segment
   this.last_seg_which=int_; // what was the segment number of the last seg?
   this.acc=uint32;
   this.valid_bits=int_;
   this.packet_bytes=int_;
   this.end_seg_with_known_loc=int_;
   this.known_loc_for_packet=uint32;
   this.discard_samples_deferred=int_;
   this.samples_output=uint32;

  // push mode scanning
   this.page_crc_tests=int_; // only in push_mode: number of tests active; -1 if not searching
//#ifndef STB_VORBIS_NO_PUSHDATA_API
   this.scan=new Array(STB_VORBIS_PUSHDATA_CRC_COUNT);//CRCscan
//#endif

  // sample-access
   this.channel_buffer_start=int_;
   this.channel_buffer_end=int_;
};

//818
//extern int my_prof(int slot);
////#define stb_prof my_prof
//
//#ifndef stb_prof
function stb_prof(x)  { return 0 }
//#endif

//818
//#if defined(STB_VORBIS_NO_PUSHDATA_API)
//   #define IS_PUSH_MODE(f)   FALSE
//#elif defined(STB_VORBIS_NO_PULLDATA_API)
//   #define IS_PUSH_MODE(f)   TRUE
//#else
   function IS_PUSH_MODE(f)   { return ((f).push_mode) }
//#endif

//851
function temp_alloc_save(f)             { return ((f).temp_offset) }
function temp_alloc_restore(f,p)         { return ((f).temp_offset = (p)) }

var CRC32_POLY    = 0x04c11db7;   // from spec

var crc_table=new Array(256);//static uint32
//911
function crc32_init()//void
{
   var i=int_,j=int_;
   var s=uint32;
   for(i=0; i < 256; i++) {
      for (s=(i<<24)>>>0, j=0; j < 8; ++j)
         s = ((s << 1) ^ (s >= ((1<<31)>>>0) ? CRC32_POLY : 0))>>>0;
      crc_table[i] = s;
   }
}

// used in setup, and for huffman that doesn't go fast path
//929
function bit_reverse(n)
{
  n = (((n & 0xAAAAAAAA) >>>  1) | ((n & 0x55555555) << 1))>>>0;
  n = (((n & 0xCCCCCCCC) >>>  2) | ((n & 0x33333333) << 2))>>>0;
  n = (((n & 0xF0F0F0F0) >>>  4) | ((n & 0x0F0F0F0F) << 4))>>>0;
  n = (((n & 0xFF00FF00) >>>  8) | ((n & 0x00FF00FF) << 8))>>>0;
  return ((n >>> 16) | (n << 16))>>>0;
}

//938
function square(x)
{
   return x*x;
}

// this is a weird definition of log2() for which log2(1) = 1, log2(2) = 2, log2(4) = 3
// as required by the specification. fast(?) implementation from stb.h
// @OPTIMIZE: called multiple times per-packet with "constants"; move to setup
//946
function ilog(n)
{
   var log2_4 = new Array( 0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4 );//static signed char_

   // 2 compares if n < 16, 3 compares otherwise (4 if signed or n > 1<<29)
   if (n < (1 << 14))//U
        if (n < (1 <<  4))        return     0 + log2_4[n      ];//U
        else if (n < (1 <<  9))      return  5 + log2_4[n >>>  5];//U
             else                     return 10 + log2_4[n >>> 10];
   else if (n < (1 << 24))//U
             if (n < (1 << 19))      return 15 + log2_4[n >>> 15];//U
             else                     return 20 + log2_4[n >>> 20];
        else if (n < (1 << 29))      return 25 + log2_4[n >>> 25];//U
             else if (n < (1 << 31)>>>0) return 30 + log2_4[n >>> 30];//U
                  else                return 0; // signed n returns 0
}

//#ifndef M_PI
//964
  var M_PI  = 3.14159265358979323846264;//f  // from CRC
//#endif

//967
// code length assigned to a value with no huffman encoding
var NO_CODE   = 255;

/////////////////////// LEAF SETUP FUNCTIONS //////////////////////////
//
// these functions are only called at setup, and only a few times
// per file

//975
function float32_unpack(x)
{
   // from the specification
   var mantissa = (x & 0x1fffff)>>>0;//uint32
   var sign = (x & 0x80000000)>>>0;//uint32
   var exp_ = (x & 0x7fe00000) >>> 21;//uint32
   var res = sign ? -mantissa : mantissa;//double (double):(double)
   return res*Math.pow(2,exp_-788);//(float) ldexp((float), )
}


// zlib & jpeg huffman tables assume that the output symbols
// can either be arbitrarily arranged, or have monotonically
// increasing frequencies--they rely on the lengths being sorted;
// this makes for a very simple generation algorithm.
// vorbis allows a huffman table with non-sorted lengths. This
// requires a more sophisticated construction, since symbols in
// order do not map to huffman codes "in order".
//993
function add_entry(c, huff_code, symbol, count, len, values)
{
   if (!c.sparse) {
      c.codewords      [symbol] = huff_code;
   } else {
      c.codewords       [count] = huff_code;
      c.codeword_lengths[count] = len;
      values             [count] = symbol;
   }
}

//1004
function compute_codewords(c, len, n, values)
{
   var i=int_,k=int_,m=0;//int_
   var available=new Array(32);//uint32

   memset(available, 0, 0, 32);//sizeof(available)
   // find the first entry
   for (k=0; k < n; ++k) if (len[k] < NO_CODE) break;
   if (k == n) { assert(c.sorted_entries == 0); return true; }
   // add to the list
   add_entry(c, 0, k, m++, len[k], values);
   // add all available leaves
   for (i=1; i <= len[k]; ++i)
      available[i] = (1 << (32-i))>>>0;
   // note that the above code treats the first case specially,
   // but it's really the same as the following code, so they
   // could probably be combined (except the initial code is 0,
   // and I use 0 in available[] to mean 'empty')
   for (i=k+1; i < n; ++i) {
      var res=uint32;
      var z = len[i], y=int_;//int_
      if (z == NO_CODE) continue;
      // find lowest available leaf (should always be earliest,
      // which is what the specification calls for)
      // note that this property, and the fact we can never have
      // more than one free leaf at a given level, isn't totally
      // trivial to prove, but it seems true and the assert never
      // fires, so!
      while (z > 0 && !available[z]) --z;
      if (z == 0) { assert(0); return false; }
      res = available[z];
      available[z] = 0;
      add_entry(c, bit_reverse(res), i, m++, len[i], values);
      // propogate availability up the tree
      if (z != len[i]) {
         for (y=len[i]; y > z; --y) {
            assert(available[y] == 0);
            available[y] = res + ((1 << (32-y)))>>>0;
         }
      }
   }
   return true;
}

// accelerated huffman table allows fast O(1) match of all symbols
// of length <= STB_VORBIS_FAST_HUFFMAN_LENGTH
//1050
function compute_accelerated_huffman(c)
{
   var i=int_, len=int_;
   for (i=0; i < FAST_HUFFMAN_TABLE_SIZE; ++i)
      c.fast_huffman[i] = -1;

   len = c.sparse ? c.sorted_entries : c.entries;
   //#ifdef STB_VORBIS_FAST_HUFFMAN_SHORT
   if (len > 32767) len = 32767; // largest possible value we can encode!
   //#endif
   for (i=0; i < len; ++i) {
      if (c.codeword_lengths[i] <= STB_VORBIS_FAST_HUFFMAN_LENGTH) {
         var z = c.sparse ? bit_reverse(c.sorted_codewords[i]) : c.codewords[i];//uint32
         // set table entries for all bit combinations in the higher bits
         while (z < FAST_HUFFMAN_TABLE_SIZE) {
             c.fast_huffman[z] = i;
             z += (1 << c.codeword_lengths[i])>>>0;
         }
      }
   }
}

//1072
function uint32_compare(p, q)
{
   var x = p;//uint32 = * (uint32 *)
   var y = q;//uint32 = * (uint32 *)
   return x < y ? -1 : x > y;
}

//1079
function include_in_sort(c, len)
{
   if (c.sparse) { assert(len != NO_CODE); return true; }
   if (len == NO_CODE) return false;
   if (len > STB_VORBIS_FAST_HUFFMAN_LENGTH) return true;
   return false;
}

// if the fast table above doesn't work, we want to binary
// search them... need to reverse the bits
//1089
function compute_sorted_huffman(c, lengths, values)
{
   var i=int_, len=int_;
   // build a list of all the entries
   // OPTIMIZATION: don't include the short ones, since they'll be caught by FAST_HUFFMAN.
   // this is kind of a frivolous optimization--I don't see any performance improvement,
   // but it's like 4 extra lines of code, so.
   if (!c.sparse) {
      var k = 0;//int_
      for (i=0; i < c.entries; ++i)
         if (include_in_sort(c, lengths[i])) 
            c.sorted_codewords[k++] = bit_reverse(c.codewords[i]);
      assert(k == c.sorted_entries);
   } else {
      for (i=0; i < c.sorted_entries; ++i)
         c.sorted_codewords[i] = bit_reverse(c.codewords[i]);
   }

   c.sorted_codewords.sort(uint32_compare);//qsort(c->sorted_codewords, c->sorted_entries, sizeof(c->sorted_codewords[0]), uint32_compare);
   c.sorted_codewords[c.sorted_entries] = 0xffffffff;

   len = c.sparse ? c.sorted_entries : c.entries;
   // now we need to indicate how they correspond; we could either
   //   #1: sort a different data structure that says who they correspond to
   //   #2: for each sorted entry, search the original list to find who corresponds
   //   #3: for each original entry, find the sorted entry
   // #1 requires extra storage, #2 is slow, #3 can use binary search!
   for (i=0; i < len; ++i) {
      var huff_len = c.sparse ? lengths[values[i]] : lengths[i];//int_
      if (include_in_sort(c,huff_len)) {
         var code = bit_reverse(c.codewords[i]);//uint32
         var x=0, n=c.sorted_entries;//int_
         while (n > 1) {
            // invariant: sc[x] <= code < sc[x+n]
            var m = x + (n >>> 1);//int_
            if (c.sorted_codewords[m] <= code) {
               x = m;
               n -= (n>>>1);
            } else {
               n >>>= 1;
            }
         }
         assert(c.sorted_codewords[x] == code);
         if (c.sparse) {
            c.sorted_values[x] = values[i];
            c.codeword_lengths[x] = huff_len;
         } else {
            c.sorted_values[x] = i;
         }
      }
   }
}

//1142
// only run while parsing the header (3 times)
function vorbis_validate(data)
{
   var vorbis = new Array( 118, 111, 114, 98, 105, 115 );//new Array( 'v', 'o', 'r', 'b', 'i', 's' );//static uint8
   return memcmp(data, vorbis, 6) == 0;
}

// called from setup only, once per code book
// (formula implied by specification)
//1151
function lookup1_values(entries, dim)
{
   var r = Math.floor(Math.exp(Math.log(entries) / dim));//int_ = (int_) (float_) (float_) 
   if (Math.floor(Math.pow(r+1, dim)) <= entries)   //(int_) (float_)  // (int) cast for MinGW warning;
      ++r;                                              // floor() to avoid _ftol() when non-CRT
   assert(Math.pow( r+1, dim) > entries);//(float_)
   assert(Math.floor(Math.pow(r, dim)) <= entries); //(int_) (float)  // (int),floor() as above
   return r;
}

// called twice per file
//1162
function compute_twiddle_factors(n, A, B, C)
{
   var n4 = n >>> 2, n8 = n >>> 3;//int_
   var k=int_,k2=int_;

   for (k=k2=0; k < n4; ++k,k2+=2) {
      A[k2  ] =  Math.cos(4*k*M_PI/n);//(float_) 
      A[k2+1] = -Math.sin(4*k*M_PI/n);//(float_) 
      B[k2  ] =  Math.cos((k2+1)*M_PI/n/2) * 0.5;//f //(float_) 
      B[k2+1] =  Math.sin((k2+1)*M_PI/n/2) * 0.5;//f //(float_) 
   }
   for (k=k2=0; k < n8; ++k,k2+=2) {
      C[k2  ] =  Math.cos(2*(k2+1)*M_PI/n);//(float_) 
      C[k2+1] = -Math.sin(2*(k2+1)*M_PI/n);//(float_) 
   }
}

//1179
function compute_window(n, window_)
{
   var n2 = n >> 1, i=int_;//int_
   for (i=0; i < n2; ++i)
      window_[i] = Math.sin(0.5 * M_PI * square(Math.sin((i - 0 + 0.5) / n2 * 0.5 * M_PI)));//(float) (float) 
}

//1186
function compute_bitreverse(n, rev)
{
   var ld = ilog(n) - 1;//int_ // ilog is off-by-one from normal definitions
   var i=int_, n8 = n >>> 3;//int_
   for (i=0; i < n8; ++i)
      rev[i] = (bit_reverse(i) >>> (32-ld+3)) << 2;
}

//1194
function init_blocksize(f, b, n)
{
   var n2 = n >>> 1, n4 = n >>> 2, n8 = n >>> 3;//int_
   f.A[b] = new Array(n2);//(float *) setup_malloc(f, sizeof(float) * n2);
   f.B[b] = new Array(n2);//(float *) setup_malloc(f, sizeof(float) * n2);
   f.C[b] = new Array(n4);//(float *) setup_malloc(f, sizeof(float) * n4);
   if (!f.A[b] || !f.B[b] || !f.C[b]) return error(f, VORBIS_outofmem);
   compute_twiddle_factors(n, f.A[b], f.B[b], f.C[b]);
   f.window_[b] = new Array(n2);//(float *) setup_malloc(f, sizeof(float) * n2);
   if (!f.window_[b]) return error(f, VORBIS_outofmem);
   compute_window(n, f.window_[b]);
   f.bit_reverse[b] = new Array(n8);//(uint16 *) setup_malloc(f, sizeof(uint16) * n8);
   if (!f.bit_reverse[b]) return error(f, VORBIS_outofmem);
   compute_bitreverse(n, f.bit_reverse[b]);
   return true;
}

//1211
function neighbors(x, n, plow, phigh)
{
   var low = -1;//int_
   var high = 65536;//int_
   var i;//int_
   for (i=0; i < n; ++i) {
      if (x[i] > low  && x[i] < x[n]) { plow[0]  = i; low = x[i]; }
      if (x[i] < high && x[i] > x[n]) { phigh[0] = i; high = x[i]; }
   }
}

// this has been repurposed so y is now the original index instead of y
//1223
var Point = function()
{
   this.x=52428,this.y=52428;//uint16,uint16
};

//1228
function point_compare(p, q)
{
   var a = p;//Point * = (Point *) 
   var b = q;//Point * = (Point *) 
   return a.x < b.x ? -1 : a.x > b.x;
}

//
/////////////////////// END LEAF SETUP FUNCTIONS //////////////////////////


//#if defined(STB_VORBIS_NO_STDIO)
//   #define USE_MEMORY(z)    TRUE
//#else
   function USE_MEMORY(z)    { return ((z).stream) }
//#endif

//1245
function get8(z)
{
   if (USE_MEMORY(z)) {
      if (z.stream_off >= z.stream_end_off) { z.eof = true; return 0; }
      return z.stream_off++;//*
   }

   //#ifndef STB_VORBIS_NO_STDIO
   {
   var c = fgetc(z.f);//int_
   if (c == EOF) { z.eof = true; return 0; }
   return c;
   }
   //#endif
}

//1261
function get32(f)
{
   var x=uint32;
   x = get8(f);
   x += get8(f) << 8;
   x += get8(f) << 16;
   x += get8(f) << 24;
   return x;
}

//1271
function getn(z, data, n)
{
   if (USE_MEMORY(z)) {
      if (z.stream_off+n > z.stream_end_off) { z.eof = 1; return 0; }
      memcpy(data, 0, z.stream, z.stream_off, n);
      z.stream_off += n;
      return 1;
   }

   //#ifndef STB_VORBIS_NO_STDIO   
   if (fread(data, n, 1, z.f) == 1)
      return 1;
   else {
      z.eof = 1;
      return 0;
   }
   //#endif
}

//1290
function skip(z, n)
{
   if (USE_MEMORY(z)) {
      z.stream_off += n;
      if (z.stream_off >= z.stream_end_off) z.eof = 1;
      return;
   }
   //#ifndef STB_VORBIS_NO_STDIO
   {
      var x = ftell(z.f);//long
      fseek(z.f, x+n, SEEK_SET);
   }
   //#endif
}

//1339
function capture_pattern(f)
{
   if (0x4f != get8(f)) return false;
   if (0x67 != get8(f)) return false;
   if (0x67 != get8(f)) return false;
   if (0x53 != get8(f)) return false;
   return true;
}

var PAGEFLAG_continued_packet   = 1;
var PAGEFLAG_first_page         = 2;
var PAGEFLAG_last_page          = 4;

//1352
function start_page_no_capturepattern(f)
{
   var loc0=uint32,loc1=uint32,n=uint32,i=uint32;
   // stream structure version
   if (0 != get8(f)) return error(f, VORBIS_invalid_stream_structure_version);
   // header flag
   f.page_flag = get8(f);
   // absolute granule position
   loc0 = get32(f); 
   loc1 = get32(f);
   // @TODO: validate loc0,loc1 as valid positions?
   // stream serial number -- vorbis doesn't interleave, so discard
   get32(f);
   //if (f->serial != get32(f)) return error(f, VORBIS_incorrect_stream_serial_number);
   // page sequence number
   n = get32(f);
   f.last_page = n;
   // CRC32
   get32(f);
   // page_segments
   f.segment_count = get8(f);
   if (!getn(f, f.segments, f.segment_count))
      return error(f, VORBIS_unexpected_eof);
   // assume we _don't_ know any the sample position of any segments
   f.end_seg_with_known_loc = -2;
   if (loc0 != ~0 || loc1 != ~0) {
      // determine which packet is the last one that will complete
      for (i=f.segment_count-1; i >= 0; --i)
         if (f.segments[i] < 255)
            break;
      // 'i' is now the index of the _last_ segment of a packet that ends
      if (i >= 0) {
         f.end_seg_with_known_loc = i;
         f.known_loc_for_packet   = loc0;
      }
   }
   if (f.first_decode) {
      var i=int_,len=int_;
      var p=new ProbedPage();
      len = 0;
      for (i=0; i < f.segment_count; ++i)
         len += f.segments[i];
      len += 27 + f.segment_count;
      p.page_start = f.first_audio_page_offset;
      p.page_end = p.page_start + len;
      p.after_previous_page_start = p.page_start;
      p.first_decoded_sample = 0;
      p.last_decoded_sample = loc0;
      f.p_first = p;
   }
   f.next_seg = 0;
   return true;
}

//1406
function start_page(f)
{
   if (!capture_pattern(f)) return error(f, VORBIS_missing_capture_pattern);
   return start_page_no_capturepattern(f);
}

//1412
function start_packet(f)
{
   while (f.next_seg == -1) {
      if (!start_page(f)) return false;
      if (f.page_flag & PAGEFLAG_continued_packet)
         return error(f, VORBIS_continued_packet_flag_invalid);
   }
   f.last_seg = false;
   f.valid_bits = 0;
   f.packet_bytes = 0;
   f.bytes_in_seg = 0;
   // f->next_seg is now valid
   return true;
}

//1427
function maybe_start_packet(f)
{
   if (f.next_seg == -1) {
      var x = get8(f);//int_
      if (f.eof) return false; // EOF at page boundary is not an error!
      if (0x4f != x      ) return error(f, VORBIS_missing_capture_pattern);
      if (0x67 != get8(f)) return error(f, VORBIS_missing_capture_pattern);
      if (0x67 != get8(f)) return error(f, VORBIS_missing_capture_pattern);
      if (0x53 != get8(f)) return error(f, VORBIS_missing_capture_pattern);
      if (!start_page_no_capturepattern(f)) return false;
      if (f.page_flag & PAGEFLAG_continued_packet) {
         // set up enough state that we can read this packet if we want,
         // e.g. during recovery
         f.last_seg = false;
         f.bytes_in_seg = 0;
         return error(f, VORBIS_continued_packet_flag_invalid);
      }
   }
   return start_packet(f);
}

//1448
function next_segment(f)
{
   var len=int_;
   if (f.last_seg) return 0;
   if (f.next_seg == -1) {
      f.last_seg_which = f.segment_count-1; // in case start_page fails
      if (!start_page(f)) { f.last_seg = 1; return 0; }
      if (!(f.page_flag & PAGEFLAG_continued_packet)) return error(f, VORBIS_continued_packet_flag_invalid);
   }
   len = f.segments[f.next_seg++];
   if (len < 255) {
      f.last_seg = true;
      f.last_seg_which = f.next_seg-1;
   }
   if (f.next_seg >= f.segment_count)
      f.next_seg = -1;
   assert(f.bytes_in_seg == 0);
   f.bytes_in_seg = len;
   return len;
}

var EOP    = (-1);
var INVALID_BITS  = (-1);

//1472
function get8_packet_raw(f)
{
   if (!f.bytes_in_seg)
      if (f.last_seg) return EOP;
      else if (!next_segment(f)) return EOP;
   assert(f.bytes_in_seg > 0);
   --f.bytes_in_seg;
   ++f.packet_bytes;
   return get8(f);
}

//1483
function get8_packet(f)
{
   var x = get8_packet_raw(f);//int_
   f.valid_bits = 0;
   return x;
}

//1490
function flush_packet(f)
{
   while (get8_packet_raw(f) != EOP);
}

// @OPTIMIZE: this is the secondary bit decoder, so it's probably not as important
// as the huffman decoder?
//1497
function get_bits(f, n)
{
   var z=uint32;

   if (f.valid_bits < 0) return 0;
   if (f.valid_bits < n) {
      if (n > 24) {
         // the accumulator technique below would not work correctly in this case
         z = get_bits(f, 24);
         z += (get_bits(f, n-24) << 24)>>>0;
         return z;
      }
      if (f.valid_bits == 0) f.acc = 0;
      while (f.valid_bits < n) {
         var z = get8_packet_raw(f);//int_
         if (z == EOP) {
            f.valid_bits = INVALID_BITS;
            return 0;
         }
         f.acc += (z << f.valid_bits)>>>0;
         f.valid_bits += 8;
      }
   }
   if (f.valid_bits < 0) return 0;
   z = f.acc & (((1 << n)>>>0)-1);
   f.acc >>>= n;
   f.valid_bits -= n;
   return z;
}

// @OPTIMIZE: primary accumulator for huffman
// expand the buffer to as many bits as possible without reading off end of packet
// it might be nice to allow f->valid_bits and f->acc to be stored in registers,
// e.g. cache them locally and decode locally
//1539
function prep_huffman(f)
{
   if (f.valid_bits <= 24) {
      if (f.valid_bits == 0) f.acc = 0;
      do {
         var z=int_;
         if (f.last_seg && !f.bytes_in_seg) return;
         z = get8_packet_raw(f);
         if (z == EOP) return;
         f.acc += (z << f.valid_bits)>>>0;
         f.valid_bits += 8;
      } while (f.valid_bits <= 24);
   }
}

//1554
//enum
//{
var
   VORBIS_packet_id = 1,
   VORBIS_packet_comment = 3,
   VORBIS_packet_setup = 5//,
//}
;

//1561
function codebook_decode_scalar_raw(f, c)
{
   var i=int_;
   prep_huffman(f);

   assert(c.sorted_codewords || c.codewords);
   // cases to use binary search: sorted_codewords && !c->codewords
   //                             sorted_codewords && c->entries > 8
   if (c.entries > 8 ? c.sorted_codewords!=null : !c.codewords) {
      // binary search
      var code = bit_reverse(f.acc);//uint32
      var x=0, n=c.sorted_entries, len=int_;//int_

      while (n > 1) {
         // invariant: sc[x] <= code < sc[x+n]
         var m = x + (n >>> 1);//int_
         if (c.sorted_codewords[m] <= code) {
            x = m;
            n -= (n>>>1);
         } else {
            n >>>= 1;
         }
      }
      // x is now the sorted index
      if (!c.sparse) x = c.sorted_values[x];
      // x is now sorted index if sparse, or symbol otherwise
      len = c.codeword_lengths[x];
      if (f.valid_bits >= len) {
         f.acc >>>= len;
         f.valid_bits -= len;
         return x;
      }

      f.valid_bits = 0;
      return -1;
   }

   // if small, linear search
   assert(!c.sparse);
   for (i=0; i < c.entries; ++i) {
      if (c.codeword_lengths[i] == NO_CODE) continue;
      if (c.codewords[i] == (f.acc & (((1 << c.codeword_lengths[i])>>>0)-1))) {
         if (f.valid_bits >= c.codeword_lengths[i]) {
            f.acc >>>= c.codeword_lengths[i];
            f.valid_bits -= c.codeword_lengths[i];
            return i;
         }
         f.valid_bits = 0;
         return -1;
      }
   }

   error(f, VORBIS_invalid_stream);
   f.valid_bits = 0;
   return -1;
}

//1635
//#ifndef STB_VORBIS_NO_INLINE_DECODE

//1637
function DECODE_RAW(var_, f,c) {                              
   if (f.valid_bits < STB_VORBIS_FAST_HUFFMAN_LENGTH)         
      prep_huffman(f);                                        
   var_[0] = f.acc & FAST_HUFFMAN_TABLE_MASK;                 
   var_[0] = c.fast_huffman[var_[0]];                         
   if (var_[0] >= 0) {                                        
      var n = c.codeword_lengths[var_[0]];//int_              
      f.acc >>>= n;                                           
      f.valid_bits -= n;                                      
      if (f.valid_bits < 0) { f.valid_bits = 0; var_[0] = -1; }
   } else {                                                   
      var_[0] = codebook_decode_scalar_raw(f,c);              
   }
}

//#else
//
//#define DECODE_RAW(var,f,c)    var = codebook_decode_scalar(f,c);
//
//#endif

//1657
function DECODE(var_,f,c) {                                    
   DECODE_RAW(var_,f,c);                                        
   if (c.sparse) var_[0] = c.sorted_values[var_[0]];
}

//1661
//#ifndef STB_VORBIS_DIVIDES_IN_CODEBOOK
  function DECODE_VQ(var_,f,c)   { DECODE_RAW(var_,f,c) }
//#else
//  #define DECODE_VQ(var,f,c)   DECODE(var,f,c)
//#endif






//1672
// CODEBOOK_ELEMENT_FAST is an optimization for the CODEBOOK_FLOATS case
// where we avoid one addition
//#ifndef STB_VORBIS_CODEBOOK_FLOATS
//   #define CODEBOOK_ELEMENT(c,off)          (c->multiplicands[off] * c->delta_value + c->minimum_value)
//   #define CODEBOOK_ELEMENT_FAST(c,off)     (c->multiplicands[off] * c->delta_value)
//   #define CODEBOOK_ELEMENT_BASE(c)         (c->minimum_value)
//#else
   function CODEBOOK_ELEMENT(c,off)          { return (c.multiplicands[off]) }
   function CODEBOOK_ELEMENT_FAST(c,off)     { return (c.multiplicands[off]) }
   function CODEBOOK_ELEMENT_BASE(c)         { return (0) }
//#endif

//1684
function codebook_decode_start(f, c, len)
{
   var z = [-1];//int_

   // type 0 is only legal in a scalar context
   if (c.lookup_type == 0)
      error(f, VORBIS_invalid_stream);
   else {
      DECODE_VQ(z,f,c);
      if (c.sparse) assert(z < c.sorted_entries);
      if (z[0] < 0) {  // check for EOP
         if (!f.bytes_in_seg)
            if (f.last_seg)
               return z[0];
         error(f, VORBIS_invalid_stream);
      }
   }
   return z[0];
}

//1704
function codebook_decode(f, c, output, output_off, len)
{
   var i=int_,z = codebook_decode_start(f,c,len);//int_
   if (z < 0) return false;
   if (len > c.dimensions) len = c.dimensions;

//#ifdef STB_VORBIS_DIVIDES_IN_CODEBOOK
//   if (c->lookup_type == 1) {
//      float last = CODEBOOK_ELEMENT_BASE(c);
//      int div = 1;
//      for (i=0; i < len; ++i) {
//         int off = (z / div) % c->lookup_values;
//         float val = CODEBOOK_ELEMENT_FAST(c,off) + last;
//         output[i] += val;
//         if (c->sequence_p) last = val + c->minimum_value;
//         div *= c->lookup_values;
//      }
//      return TRUE;
//   }
//#endif

   z *= c.dimensions;
   if (c.sequence_p) {
      var last = CODEBOOK_ELEMENT_BASE(c);//float_
      for (i=0; i < len; ++i) {
         var val = CODEBOOK_ELEMENT_FAST(c,z+i) + last;//float_
         output[output_off+ i] += val;
         last = val + c.minimum_value;
      }
   } else {
      var last = CODEBOOK_ELEMENT_BASE(c);//float_
      for (i=0; i < len; ++i) {
         output[output_off+ i] += CODEBOOK_ELEMENT_FAST(c,z+i) + last;
      }
   }

   return true;
}

//1743
function codebook_decode_step(f, c, output, output_off, len, step)
{
   var i=int_,z = codebook_decode_start(f,c,len);//int_
   var last = CODEBOOK_ELEMENT_BASE(c);//float_
   if (z < 0) return false;
   if (len > c.dimensions) len = c.dimensions;

//#ifdef STB_VORBIS_DIVIDES_IN_CODEBOOK
//   if (c->lookup_type == 1) {
//      int div = 1;
//      for (i=0; i < len; ++i) {
//         int off = (z / div) % c->lookup_values;
//         float val = CODEBOOK_ELEMENT_FAST(c,off) + last;
//         output[i*step] += val;
//         if (c->sequence_p) last = val;
//         div *= c->lookup_values;
//      }
//      return TRUE;
//   }
//#endif

   z *= c.dimensions;
   for (i=0; i < len; ++i) {
      var val = CODEBOOK_ELEMENT_FAST(c,z+i) + last;//float_
      output[output_off+ i*step] += val;
      if (c.sequence_p) last = val;
   }

   return true;
}

//1774
function codebook_decode_deinterleave_repeat(f, c, outputs, ch, c_inter_p, p_inter_p, len, total_decode)
{
   var c_inter = c_inter_p[0];//int_ = *
   var p_inter = p_inter_p[0];//int_ = *
   var i=int_,z=[int_], effective = c.dimensions;//int_

   // type 0 is only legal in a scalar context
   if (c.lookup_type == 0)   return error(f, VORBIS_invalid_stream);

   while (total_decode > 0) {
      var last = CODEBOOK_ELEMENT_BASE(c);//float_
      DECODE_VQ(z,f,c);
//      #ifndef STB_VORBIS_DIVIDES_IN_CODEBOOK
      assert(!c.sparse || z[0] < c.sorted_entries);
//      #endif
      if (z[0] < 0) {
         if (!f.bytes_in_seg)
            if (f.last_seg) return false;
         return error(f, VORBIS_invalid_stream);
      }

      // if this will take us off the end of the buffers, stop short!
      // we check by computing the length of the virtual interleaved
      // buffer (len*ch), our current offset within it (p_inter*ch)+(c_inter),
      // and the length we'll be using (effective)
      if (c_inter + p_inter*ch + effective > len * ch) {
         effective = len*ch - (p_inter*ch - c_inter);
      }

//   #ifdef STB_VORBIS_DIVIDES_IN_CODEBOOK
//      if (c->lookup_type == 1) {
//         int div = 1;
//         for (i=0; i < effective; ++i) {
//            int off = (z / div) % c->lookup_values;
//            float val = CODEBOOK_ELEMENT_FAST(c,off) + last;
//            outputs[c_inter][p_inter] += val;
//            if (++c_inter == ch) { c_inter = 0; ++p_inter; }
//            if (c->sequence_p) last = val;
//            div *= c->lookup_values;
//         }
//      } else
//   #endif
      {
         z[0] *= c.dimensions;
         if (c.sequence_p) {
            for (i=0; i < effective; ++i) {
               var val = CODEBOOK_ELEMENT_FAST(c,z[0]+i) + last;//float_
               outputs[c_inter][p_inter] += val;
               if (++c_inter == ch) { c_inter = 0; ++p_inter; }
               last = val;
            }
         } else {
            for (i=0; i < effective; ++i) {
               var val = CODEBOOK_ELEMENT_FAST(c,z[0]+i) + last;//float_
               outputs[c_inter][p_inter] += val;
               if (++c_inter == ch) { c_inter = 0; ++p_inter; }
            }
         }
      }

      total_decode -= effective;
   }
   c_inter_p[0] = c_inter;//*
   p_inter_p[0] = p_inter;//*
   return true;
}

//#ifndef STB_VORBIS_DIVIDES_IN_CODEBOOK
//1842
function codebook_decode_deinterleave_repeat_2(f, c, outputs, c_inter_p, p_inter_p, len, total_decode)
{
   var c_inter = c_inter_p[0];//int_ = *
   var p_inter = p_inter_p[0];//int_ = *
   var i=int_,z=[int_], effective = c.dimensions;//int_

   // type 0 is only legal in a scalar context
   if (c.lookup_type == 0)   return error(f, VORBIS_invalid_stream);

   while (total_decode > 0) {
      var last = CODEBOOK_ELEMENT_BASE(c);//float_
      DECODE_VQ(z,f,c);

      if (z[0] < 0) {
         if (!f.bytes_in_seg)
            if (f.last_seg) return false;
         return error(f, VORBIS_invalid_stream);
      }

      // if this will take us off the end of the buffers, stop short!
      // we check by computing the length of the virtual interleaved
      // buffer (len*ch), our current offset within it (p_inter*ch)+(c_inter),
      // and the length we'll be using (effective)
      if (c_inter + p_inter*2 + effective > len * 2) {
         effective = len*2 - (p_inter*2 - c_inter);
      }

      {
         z[0] *= c.dimensions;
         stb_prof(11);
         if (c.sequence_p) {
            // haven't optimized this case because I don't have any examples
            for (i=0; i < effective; ++i) {
               var val = CODEBOOK_ELEMENT_FAST(c,z[0]+i) + last;//float_
               outputs[c_inter][p_inter] += val;
               if (++c_inter == 2) { c_inter = 0; ++p_inter; }
               last = val;
            }
         } else {
            i=0;
            if (c_inter == 1) {
               var val = CODEBOOK_ELEMENT_FAST(c,z[0]+i) + last;//float_
               outputs[c_inter][p_inter] += val;
               c_inter = 0; ++p_inter;
               ++i;
            }
            {
               var z0 = outputs[0];//float_ *
               var z1 = outputs[1];//float_ *
               for (; i+1 < effective;) {
                  z0[p_inter] += CODEBOOK_ELEMENT_FAST(c,z[0]+i) + last;
                  z1[p_inter] += CODEBOOK_ELEMENT_FAST(c,z[0]+i+1) + last;
                  ++p_inter;
                  i += 2;
               }
            }
            if (i < effective) {
               var val = CODEBOOK_ELEMENT_FAST(c,z[0]+i) + last;//float_
               outputs[c_inter][p_inter] += val;
               if (++c_inter == 2) { c_inter = 0; ++p_inter; }
            }
         }
      }

      total_decode -= effective;
   }
   c_inter_p[0] = c_inter;//*
   p_inter_p[0] = p_inter;//*
   return true;
}
//#endif

//1914
function predict_point(x, x0, x1, y0, y1)
{
   var dy = y1 - y0;//int_
   var adx = x1 - x0;//int_
   // @OPTIMIZE: force int division to round in the right direction... is this necessary on x86?
   var err = Math.abs(dy) * (x - x0);//int_
   var off = parseInt(err / adx,10);//int_
   return dy < 0 ? y0 - off : y0 + off;
}

//1924
// the following table is block-copied from the specification
var inverse_db_table =//static float_
new Array(
  1.0649863e-07, 1.1341951e-07, 1.2079015e-07, 1.2863978e-07, 
  1.3699951e-07, 1.4590251e-07, 1.5538408e-07, 1.6548181e-07, 
  1.7623575e-07, 1.8768855e-07, 1.9988561e-07, 2.1287530e-07, 
  2.2670913e-07, 2.4144197e-07, 2.5713223e-07, 2.7384213e-07, 
  2.9163793e-07, 3.1059021e-07, 3.3077411e-07, 3.5226968e-07, 
  3.7516214e-07, 3.9954229e-07, 4.2550680e-07, 4.5315863e-07, 
  4.8260743e-07, 5.1396998e-07, 5.4737065e-07, 5.8294187e-07, 
  6.2082472e-07, 6.6116941e-07, 7.0413592e-07, 7.4989464e-07, 
  7.9862701e-07, 8.5052630e-07, 9.0579828e-07, 9.6466216e-07, 
  1.0273513e-06, 1.0941144e-06, 1.1652161e-06, 1.2409384e-06, 
  1.3215816e-06, 1.4074654e-06, 1.4989305e-06, 1.5963394e-06, 
  1.7000785e-06, 1.8105592e-06, 1.9282195e-06, 2.0535261e-06, 
  2.1869758e-06, 2.3290978e-06, 2.4804557e-06, 2.6416497e-06, 
  2.8133190e-06, 2.9961443e-06, 3.1908506e-06, 3.3982101e-06, 
  3.6190449e-06, 3.8542308e-06, 4.1047004e-06, 4.3714470e-06, 
  4.6555282e-06, 4.9580707e-06, 5.2802740e-06, 5.6234160e-06, 
  5.9888572e-06, 6.3780469e-06, 6.7925283e-06, 7.2339451e-06, 
  7.7040476e-06, 8.2047000e-06, 8.7378876e-06, 9.3057248e-06, 
  9.9104632e-06, 1.0554501e-05, 1.1240392e-05, 1.1970856e-05, 
  1.2748789e-05, 1.3577278e-05, 1.4459606e-05, 1.5399272e-05, 
  1.6400004e-05, 1.7465768e-05, 1.8600792e-05, 1.9809576e-05, 
  2.1096914e-05, 2.2467911e-05, 2.3928002e-05, 2.5482978e-05, 
  2.7139006e-05, 2.8902651e-05, 3.0780908e-05, 3.2781225e-05, 
  3.4911534e-05, 3.7180282e-05, 3.9596466e-05, 4.2169667e-05, 
  4.4910090e-05, 4.7828601e-05, 5.0936773e-05, 5.4246931e-05, 
  5.7772202e-05, 6.1526565e-05, 6.5524908e-05, 6.9783085e-05, 
  7.4317983e-05, 7.9147585e-05, 8.4291040e-05, 8.9768747e-05, 
  9.5602426e-05, 0.00010181521, 0.00010843174, 0.00011547824, 
  0.00012298267, 0.00013097477, 0.00013948625, 0.00014855085, 
  0.00015820453, 0.00016848555, 0.00017943469, 0.00019109536, 
  0.00020351382, 0.00021673929, 0.00023082423, 0.00024582449, 
  0.00026179955, 0.00027881276, 0.00029693158, 0.00031622787, 
  0.00033677814, 0.00035866388, 0.00038197188, 0.00040679456, 
  0.00043323036, 0.00046138411, 0.00049136745, 0.00052329927, 
  0.00055730621, 0.00059352311, 0.00063209358, 0.00067317058, 
  0.00071691700, 0.00076350630, 0.00081312324, 0.00086596457, 
  0.00092223983, 0.00098217216, 0.0010459992,  0.0011139742, 
  0.0011863665,  0.0012634633,  0.0013455702,  0.0014330129, 
  0.0015261382,  0.0016253153,  0.0017309374,  0.0018434235, 
  0.0019632195,  0.0020908006,  0.0022266726,  0.0023713743, 
  0.0025254795,  0.0026895994,  0.0028643847,  0.0030505286, 
  0.0032487691,  0.0034598925,  0.0036847358,  0.0039241906, 
  0.0041792066,  0.0044507950,  0.0047400328,  0.0050480668, 
  0.0053761186,  0.0057254891,  0.0060975636,  0.0064938176, 
  0.0069158225,  0.0073652516,  0.0078438871,  0.0083536271, 
  0.0088964928,  0.009474637,   0.010090352,   0.010746080, 
  0.011444421,   0.012188144,   0.012980198,   0.013823725, 
  0.014722068,   0.015678791,   0.016697687,   0.017782797, 
  0.018938423,   0.020169149,   0.021479854,   0.022875735, 
  0.024362330,   0.025945531,   0.027631618,   0.029427276, 
  0.031339626,   0.033376252,   0.035545228,   0.037855157, 
  0.040315199,   0.042935108,   0.045725273,   0.048696758, 
  0.051861348,   0.055231591,   0.058820850,   0.062643361, 
  0.066714279,   0.071049749,   0.075666962,   0.080584227, 
  0.085821044,   0.091398179,   0.097337747,   0.10366330, 
  0.11039993,    0.11757434,    0.12521498,    0.13335215, 
  0.14201813,    0.15124727,    0.16107617,    0.17154380, 
  0.18269168,    0.19456402,    0.20720788,    0.22067342, 
  0.23501402,    0.25028656,    0.26655159,    0.28387361, 
  0.30232132,    0.32196786,    0.34289114,    0.36517414, 
  0.38890521,    0.41417847,    0.44109412,    0.46975890, 
  0.50028648,    0.53279791,    0.56742212,    0.60429640, 
  0.64356699,    0.68538959,    0.72993007,    0.77736504, 
  0.82788260,    0.88168307,    0.9389798,     1.0
);


//2013
function draw_line(output, x0, y0, x1, y1, n)
{
   var dy = y1 - y0;//int_
   var adx = x1 - x0;//int_
   var ady = Math.abs(dy);//int_
   var base=int_;
   var x=x0,y=y0;//int_
   var err = 0;//int_
   var sy=int_;

//#ifdef STB_VORBIS_DIVIDE_TABLE
//   if (adx < DIVTAB_DENOM && ady < DIVTAB_NUMER) {
//      if (dy < 0) {
//         base = -integer_divide_table[ady][adx];
//         sy = base-1;
//      } else {
//         base =  integer_divide_table[ady][adx];
//         sy = base+1;
//      }
//   } else {
//      base = dy / adx;
//      if (dy < 0)
//         sy = base - 1;
//      else
//         sy = base+1;
//   }
//#else
   base = parseInt(dy / adx,10);
   if (dy < 0)
      sy = base - 1;
   else
      sy = base+1;
//#endif
   ady -= Math.abs(base) * adx;
   if (x1 > n) x1 = n;
   output[x] *= inverse_db_table[y];//LINE_OP(output[x], inverse_db_table[y]);
   for (++x; x < x1; ++x) {
      err += ady;
      if (err >= adx) {
         err -= adx;
         y += sy;
      } else
         y += base;
      output[x] *= inverse_db_table[y];//LINE_OP(output[x], inverse_db_table[y]);
   }
}

//2060
function residue_decode(f, book, target, offset, n, rtype)
{
   var k=int_;
   if (rtype == 0) {
      var step = parseInt(n / book.dimensions);//int_
      for (k=0; k < step; ++k)
         if (!codebook_decode_step(f, book, target,+offset+k, n-offset-k, step))
            return false;
   } else {
      for (k=0; k < n; ) {
         if (!codebook_decode(f, book, target,+offset, n-k))
            return false;
         k += book.dimensions;
         offset += book.dimensions;
      }
   }
   return true;
}

//2079
function decode_residue(f, residue_buffers, ch, n, rn, do_not_decode)
{
   var i=int_,j=int_,pass=int_;
   var r = f.residue_config[ + rn];//Residue *
   var rtype = f.residue_types[rn];//int_
   var c = r.classbook;//int_
   var classwords = f.codebooks[c].dimensions;//int_
   var n_read = r.end - r.begin;//int_
   var part_read = parseInt(n_read / r.part_size,10);//int_
   var temp_alloc_point = temp_alloc_save(f);//int_
//   #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
   var part_classdata=new Array();for(i=0;i<f.channels;i++)part_classdata[i]=new Array();//uint8 ***part_classdata = (uint8 ***) temp_block_array(f,f->channels, part_read * sizeof(**part_classdata));
//   #else
//   int **classifications = (int **) temp_block_array(f,f->channels, part_read * sizeof(**classifications));
//   #endif

   stb_prof(2);
   for (i=0; i < ch; ++i)
      if (!do_not_decode[i])
         memset(residue_buffers[i], 0, 0, n);//sizeof(float) * 

   if (rtype == 2 && ch != 1) {
      var len = ch * n;//int_
      for (j=0; j < ch; ++j)
         if (!do_not_decode[j])
            break;
      if (j == ch) {
         //goto done;
         stb_prof(0);
         temp_alloc_restore(f,temp_alloc_point);
		 return;
	  }

      stb_prof(3);
      for (pass=0; pass < 8; ++pass) {
         var pcount = 0, class_set = 0;//int_
         if (ch == 2) {
            stb_prof(13);
            while (pcount < part_read) {
               var z = r.begin + pcount*r.part_size;//int_
               var c_inter = [(z & 1)], p_inter = [z>>>1];//int_
               if (pass == 0) {
                  var c = f.codebooks[+r.classbook];//Codebook *
                  var q=[int_];
                  DECODE(q,f,c);q=q[0];
                  if (q == EOP) {//goto done;
                     stb_prof(0);
                     temp_alloc_restore(f,temp_alloc_point);
					 return;
				  }
//                  #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
                  part_classdata[0][class_set] = r.classdata[q];
//                  #else
//                  for (i=classwords-1; i >= 0; --i) {
//                     classifications[0][i+pcount] = q % r->classifications;
//                     q /= r->classifications;
//                  }
//                  #endif
               }
               stb_prof(5);
               for (i=0; i < classwords && pcount < part_read; ++i, ++pcount) {
                  var z = r.begin + pcount*r.part_size;//int_
//                  #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
                  var c = part_classdata[0][class_set][i];//int_
//                  #else
//                  int c = classifications[0][pcount];
//                  #endif
                  var b = r.residue_books[c][pass];//int_
                  if (b >= 0) {
                     var book = f.codebooks[ + b];//Codebook *
                     stb_prof(20);  // accounts for X time
//                     #ifdef STB_VORBIS_DIVIDES_IN_CODEBOOK
//                     if (!codebook_decode_deinterleave_repeat(f, book, residue_buffers, ch, &c_inter, &p_inter, n, r->part_size))
//                        goto done;
//                     #else
                     // saves 1%
                     if (!codebook_decode_deinterleave_repeat_2(f, book, residue_buffers, c_inter, p_inter, n, r.part_size)) {
                        //goto done;
                        stb_prof(0);
                        temp_alloc_restore(f,temp_alloc_point);
						return;
					 }
//                     #endif
                     stb_prof(7);
                  } else {
                     z += r.part_size;
                     c_inter[0] = z & 1;
                     p_inter[0] = z >>> 1;
                  }
               }
               stb_prof(8);
//               #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
               ++class_set;
//               #endif
            }
         } else if (ch == 1) {
            while (pcount < part_read) {
               var z = r.begin + pcount*r.part_size;//int_
               var c_inter = [0], p_inter = [z];//int_
               if (pass == 0) {
                  var c = f.codebooks[+r.classbook];//Codebook *
                  var q=[int_];
                  DECODE(q,f,c);q=q[0];
                  if (q == EOP) { //goto done;
                     stb_prof(0);
                     temp_alloc_restore(f,temp_alloc_point);
					 return;
				  }
//                  #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
                  part_classdata[0][class_set] = r.classdata[q];
//                  #else
//                  for (i=classwords-1; i >= 0; --i) {
//                     classifications[0][i+pcount] = q % r->classifications;
//                     q /= r->classifications;
//                  }
//                  #endif
               }
               for (i=0; i < classwords && pcount < part_read; ++i, ++pcount) {
                  var z = r.begin + pcount*r.part_size;//int_
//                  #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
                  var c = part_classdata[0][class_set][i];//int_
//                  #else
//                  int c = classifications[0][pcount];
//                  #endif
                  var b = r.residue_books[c][pass];//int_
                  if (b >= 0) {
                     var book = f.codebooks[ + b];//Codebook *
                     stb_prof(22);
                     if (!codebook_decode_deinterleave_repeat(f, book, residue_buffers, ch, c_inter, p_inter, n, r.part_size)) {
                        //goto done;
                        stb_prof(0);
                        temp_alloc_restore(f,temp_alloc_point);
						return;
					 }
                     stb_prof(3);
                  } else {
                     z += r.part_size;
                     c_inter[0] = 0;
                     p_inter[0] = z;
                  }
               }
//               #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
               ++class_set;
//               #endif
            }
         } else {
            while (pcount < part_read) {
               var z = r.begin + pcount*r.part_size;//int_
               var c_inter = [z % ch], p_inter = [parseInt(z/ch,10)];//int_
               if (pass == 0) {
                  var c = f.codebooks[+r.classbook];//Codebook *
                  var q=[int_];
                  DECODE(q,f,c);q=q[0];
                  if (q == EOP) { //goto done;
                     stb_prof(0);
                     temp_alloc_restore(f,temp_alloc_point);
					 return;
				  }
//                  #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
                  part_classdata[0][class_set] = r.classdata[q];
//                  #else
//                  for (i=classwords-1; i >= 0; --i) {
//                     classifications[0][i+pcount] = q % r->classifications;
//                     q /= r->classifications;
//                  }
//                  #endif
               }
               for (i=0; i < classwords && pcount < part_read; ++i, ++pcount) {
                  var z = r.begin + pcount*r.part_size;//int_
//                  #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
                  var c = part_classdata[0][class_set][i];//int_
//                  #else
//                  int c = classifications[0][pcount];
//                  #endif
                  var b = r.residue_books[c][pass];//int_
                  if (b >= 0) {
                     var book = f.codebooks[ + b];//Codebook *
                     stb_prof(22);
                     if (!codebook_decode_deinterleave_repeat(f, book, residue_buffers, ch, c_inter, p_inter, n, r.part_size)) {
                        //goto done;
                        stb_prof(0);
                        temp_alloc_restore(f,temp_alloc_point);
						return;
					 }
                     stb_prof(3);
                  } else {
                     z += r.part_size;
                     c_inter[0] = z % ch;
                     p_inter[0] = parseInt(z / ch,10);
                  }
               }
//               #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
               ++class_set;
//               #endif
            }
         }
      }
      //goto done;
      stb_prof(0);
      temp_alloc_restore(f,temp_alloc_point);
	  return;
   }
   stb_prof(9);

   for (pass=0; pass < 8; ++pass) {
      var pcount = 0, class_set=0;//int_
      while (pcount < part_read) {
         if (pass == 0) {
            for (j=0; j < ch; ++j) {
               if (!do_not_decode[j]) {
                  var c = f.codebooks[+r.classbook];//Codebook *
                  var temp=[int_];
                  DECODE(temp,f,c);temp=temp[0];
                  if (temp == EOP) { //goto done;
                     stb_prof(0);
                     temp_alloc_restore(f,temp_alloc_point);
					 return;
				  }
//                  #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
                  part_classdata[j][class_set] = r.classdata[temp];
//                  #else
//                  for (i=classwords-1; i >= 0; --i) {
//                     classifications[j][i+pcount] = temp % r->classifications;
//                     temp /= r->classifications;
//                  }
//                  #endif
               }
            }
         }
         for (i=0; i < classwords && pcount < part_read; ++i, ++pcount) {
            for (j=0; j < ch; ++j) {
               if (!do_not_decode[j]) {
//                  #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
                  var c = part_classdata[j][class_set][i];//int_
//                  #else
//                  int c = classifications[j][pcount];
//                  #endif
                  var b = r.residue_books[c][pass];//int_
                  if (b >= 0) {
                     var target = residue_buffers[j];//float_ *
                     var offset = r.begin + pcount * r.part_size;//int_
                     var n = r.part_size;//int_
                     var book = f.codebooks[ + b];//Codebook *
                     if (!residue_decode(f, book, target, offset, n, rtype)) {
                        //goto done;
                        stb_prof(0);
                        temp_alloc_restore(f,temp_alloc_point);
						return;
					 }
                  }
               }
            }
         }
//         #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
         ++class_set;
//         #endif
      }
   }
//  done:
   stb_prof(0);
   temp_alloc_restore(f,temp_alloc_point);
}


// the following were split out into separate functions while optimizing;
// they could be pushed back up but eh. __forceinline showed no change;
// they're probably already being inlined.
//2427
function imdct_step3_iter0_loop(n, e, i_off, k_off, A)
{
   var ee0 = e; var ee0_off = + i_off;//float_ *
   var ee2 = ee0; var ee2_off = ee0_off + k_off;//float_ *
   var i=int_;var A_off=0; 

   assert((n & 3) == 0);
   for (i=(n>>>2); i > 0; --i) {
      var k00_20=float_, k01_21=float_;
      k00_20  = ee0[ee0_off+ 0] - ee2[ee2_off+ 0];
      k01_21  = ee0[ee0_off -1] - ee2[ee2_off -1];
      ee0[ee0_off+ 0] += ee2[ee2_off+ 0];//ee0[ 0] = ee0[ 0] + ee2[ 0];
      ee0[ee0_off -1] += ee2[ee2_off -1];//ee0[-1] = ee0[-1] + ee2[-1];
      ee2[ee2_off+ 0] = k00_20 * A[A_off+ 0] - k01_21 * A[A_off+ 1];
      ee2[ee2_off -1] = k01_21 * A[A_off+ 0] + k00_20 * A[A_off+ 1];
      A_off += 8;

      k00_20  = ee0[ee0_off -2] - ee2[ee2_off -2];
      k01_21  = ee0[ee0_off -3] - ee2[ee2_off -3];
      ee0[ee0_off -2] += ee2[ee2_off -2];//ee0[-2] = ee0[-2] + ee2[-2];
      ee0[ee0_off -3] += ee2[ee2_off -3];//ee0[-3] = ee0[-3] + ee2[-3];
      ee2[ee2_off -2] = k00_20 * A[A_off+ 0] - k01_21 * A[A_off+ 1];
      ee2[ee2_off -3] = k01_21 * A[A_off+ 0] + k00_20 * A[A_off+ 1];
      A_off += 8;

      k00_20  = ee0[ee0_off -4] - ee2[ee2_off -4];
      k01_21  = ee0[ee0_off -5] - ee2[ee2_off -5];
      ee0[ee0_off -4] += ee2[ee2_off -4];//ee0[-4] = ee0[-4] + ee2[-4];
      ee0[ee0_off -5] += ee2[ee2_off -5];//ee0[-5] = ee0[-5] + ee2[-5];
      ee2[ee2_off -4] = k00_20 * A[A_off+ 0] - k01_21 * A[A_off+ 1];
      ee2[ee2_off -5] = k01_21 * A[A_off+ 0] + k00_20 * A[A_off+ 1];
      A_off += 8;

      k00_20  = ee0[ee0_off -6] - ee2[ee2_off -6];
      k01_21  = ee0[ee0_off -7] - ee2[ee2_off -7];
      ee0[ee0_off -6] += ee2[ee2_off -6];//ee0[-6] = ee0[-6] + ee2[-6];
      ee0[ee0_off -7] += ee2[ee2_off -7];//ee0[-7] = ee0[-7] + ee2[-7];
      ee2[ee2_off -6] = k00_20 * A[A_off+ 0] - k01_21 * A[A_off+ 1];
      ee2[ee2_off -7] = k01_21 * A[A_off+ 0] + k00_20 * A[A_off+ 1];
      A_off += 8;
      ee0_off -= 8;
      ee2_off -= 8;
   }
}

//2472
function imdct_step3_inner_r_loop(lim, e, d0, k_off, A, k1)
{
   var i=int_;var A_off=0;
   var k00_20=float_, k01_21=float_;

   var e0 = e; var e0_off = + d0;//float_ *
   var e2 = e0; var e2_off = e0_off + k_off;//float_ *

   for (i=lim >>> 2; i > 0; --i) {
      k00_20 = e0[e0_off -0] - e2[e2_off -0];
      k01_21 = e0[e0_off -1] - e2[e2_off -1];
      e0[e0_off -0] += e2[e2_off -0];//e0[-0] = e0[-0] + e2[-0];
      e0[e0_off -1] += e2[e2_off -1];//e0[-1] = e0[-1] + e2[-1];
      e2[e2_off -0] = (k00_20)*A[A_off+ 0] - (k01_21) * A[A_off+ 1];
      e2[e2_off -1] = (k01_21)*A[A_off+ 0] + (k00_20) * A[A_off+ 1];

      A_off += k1;

      k00_20 = e0[e0_off -2] - e2[e2_off -2];
      k01_21 = e0[e0_off -3] - e2[e2_off -3];
      e0[e0_off -2] += e2[e2_off -2];//e0[-2] = e0[-2] + e2[-2];
      e0[e0_off -3] += e2[e2_off -3];//e0[-3] = e0[-3] + e2[-3];
      e2[e2_off -2] = (k00_20)*A[A_off+ 0] - (k01_21) * A[A_off+ 1];
      e2[e2_off -3] = (k01_21)*A[A_off+ 0] + (k00_20) * A[A_off+ 1];

      A_off += k1;

      k00_20 = e0[e0_off -4] - e2[e2_off -4];
      k01_21 = e0[e0_off -5] - e2[e2_off -5];
      e0[e0_off -4] += e2[e2_off -4];//e0[-4] = e0[-4] + e2[-4];
      e0[e0_off -5] += e2[e2_off -5];//e0[-5] = e0[-5] + e2[-5];
      e2[e2_off -4] = (k00_20)*A[A_off+ 0] - (k01_21) * A[A_off+ 1];
      e2[e2_off -5] = (k01_21)*A[A_off+ 0] + (k00_20) * A[A_off+ 1];

      A_off += k1;

      k00_20 = e0[e0_off -6] - e2[e2_off -6];
      k01_21 = e0[e0_off -7] - e2[e2_off -7];
      e0[e0_off -6] += e2[e2_off -6];//e0[-6] = e0[-6] + e2[-6];
      e0[e0_off -7] += e2[e2_off -7];//e0[-7] = e0[-7] + e2[-7];
      e2[e2_off -6] = (k00_20)*A[A_off+ 0] - (k01_21) * A[A_off+ 1];
      e2[e2_off -7] = (k01_21)*A[A_off+ 0] + (k00_20) * A[A_off+ 1];

      e0_off -= 8;
      e2_off -= 8;

      A_off += k1;
   }
}

//2522
function imdct_step3_inner_s_loop(n, e, i_off, k_off, A, A_off, a_off, k0)
{
   var i=int_;
   var A0 = A[A_off+ 0];//float_
   var A1 = A[A_off+ 0+1];//float_
   var A2 = A[A_off+ 0+a_off];//float_
   var A3 = A[A_off+ 0+a_off+1];//float_
   var A4 = A[A_off+ 0+a_off*2+0];//float_
   var A5 = A[A_off+ 0+a_off*2+1];//float_
   var A6 = A[A_off+ 0+a_off*3+0];//float_
   var A7 = A[A_off+ 0+a_off*3+1];//float_

   var k00=float_,k11=float_;

   var ee0 = e; var ee0_off =  +i_off;//float_ *
   var ee2 = ee0;var ee2_off = ee0_off+k_off;//float_ *

   for (i=n; i > 0; --i) {
      k00     = ee0[ee0_off+ 0] - ee2[ee2_off+ 0];
      k11     = ee0[ee0_off -1] - ee2[ee2_off -1];
      ee0[ee0_off+ 0] =  ee0[ee0_off+ 0] + ee2[ee2_off+ 0];
      ee0[ee0_off -1] =  ee0[ee0_off -1] + ee2[ee2_off -1];
      ee2[ee2_off+ 0] = (k00) * A0 - (k11) * A1;
      ee2[ee2_off -1] = (k11) * A0 + (k00) * A1;

      k00     = ee0[ee0_off -2] - ee2[ee2_off -2];
      k11     = ee0[ee0_off -3] - ee2[ee2_off -3];
      ee0[ee0_off -2] =  ee0[ee0_off -2] + ee2[ee2_off -2];
      ee0[ee0_off -3] =  ee0[ee0_off -3] + ee2[ee2_off -3];
      ee2[ee2_off -2] = (k00) * A2 - (k11) * A3;
      ee2[ee2_off -3] = (k11) * A2 + (k00) * A3;

      k00     = ee0[ee0_off -4] - ee2[ee2_off -4];
      k11     = ee0[ee0_off -5] - ee2[ee2_off -5];
      ee0[ee0_off -4] =  ee0[ee0_off -4] + ee2[ee2_off -4];
      ee0[ee0_off -5] =  ee0[ee0_off -5] + ee2[ee2_off -5];
      ee2[ee2_off -4] = (k00) * A4 - (k11) * A5;
      ee2[ee2_off -5] = (k11) * A4 + (k00) * A5;

      k00     = ee0[ee0_off -6] - ee2[ee2_off -6];
      k11     = ee0[ee0_off -7] - ee2[ee2_off -7];
      ee0[ee0_off -6] =  ee0[ee0_off -6] + ee2[ee2_off -6];
      ee0[ee0_off -7] =  ee0[ee0_off -7] + ee2[ee2_off -7];
      ee2[ee2_off -6] = (k00) * A6 - (k11) * A7;
      ee2[ee2_off -7] = (k11) * A6 + (k00) * A7;

      ee0_off -= k0;
      ee2_off -= k0;
   }
}

//2573
function iter_54(z,z_off)
{
   var k00=float_,k11=float_,k22=float_,k33=float_;
   var y0=float_,y1=float_,y2=float_,y3=float_;

   k00  = z[z_off+ 0] - z[z_off -4];
   y0   = z[z_off+ 0] + z[z_off -4];
   y2   = z[z_off -2] + z[z_off -6];
   k22  = z[z_off -2] - z[z_off -6];

   z[z_off -0] = y0 + y2;      // z0 + z4 + z2 + z6
   z[z_off -2] = y0 - y2;      // z0 + z4 - z2 - z6

   // done with y0,y2

   k33  = z[z_off -3] - z[z_off -7];

   z[z_off -4] = k00 + k33;    // z0 - z4 + z3 - z7
   z[z_off -6] = k00 - k33;    // z0 - z4 - z3 + z7

   // done with k33

   k11  = z[z_off -1] - z[z_off -5];
   y1   = z[z_off -1] + z[z_off -5];
   y3   = z[z_off -3] + z[z_off -7];

   z[z_off -1] = y1 + y3;      // z1 + z5 + z3 + z7
   z[z_off -3] = y1 - y3;      // z1 + z5 - z3 - z7
   z[z_off -5] = k11 - k22;    // z1 - z5 + z2 - z6
   z[z_off -7] = k11 + k22;    // z1 - z5 - z2 + z6
}

//2605
function imdct_step3_inner_s_loop_ld654(n, e, i_off, A, base_n)
{
   var k_off = -8;//int_
   var a_off = base_n >>> 3;//int_
   var A2 = A[0+a_off];//float_
   var z = e; var z_off = + i_off;//float_ *
   var base = z; var base_off = z_off - 16 * n;//float_ *

   while (z_off > base_off) {
      var k00=float_,k11=float_;

      k00   = z[z_off -0] - z[z_off -8];
      k11   = z[z_off -1] - z[z_off -9];
      z[z_off -0] = z[z_off -0] + z[z_off -8];
      z[z_off -1] = z[z_off -1] + z[z_off -9];
      z[z_off -8] =  k00;
      z[z_off -9] =  k11 ;

      k00    = z[z_off  -2] - z[z_off -10];
      k11    = z[z_off  -3] - z[z_off -11];
      z[z_off  -2] = z[z_off  -2] + z[z_off -10];
      z[z_off  -3] = z[z_off  -3] + z[z_off -11];
      z[z_off -10] = (k00+k11) * A2;
      z[z_off -11] = (k11-k00) * A2;

      k00    = z[z_off -12] - z[z_off  -4];  // reverse to avoid a unary negation
      k11    = z[z_off  -5] - z[z_off -13];
      z[z_off  -4] = z[z_off  -4] + z[z_off -12];
      z[z_off  -5] = z[z_off  -5] + z[z_off -13];
      z[z_off -12] = k11;
      z[z_off -13] = k00;

      k00    = z[z_off -14] - z[z_off  -6];  // reverse to avoid a unary negation
      k11    = z[z_off  -7] - z[z_off -15];
      z[z_off  -6] = z[z_off  -6] + z[z_off -14];
      z[z_off  -7] = z[z_off  -7] + z[z_off -15];
      z[z_off -14] = (k00+k11) * A2;
      z[z_off -15] = (k00-k11) * A2;

      iter_54(z,z_off);
      iter_54(z,z_off-8);
      z_off -= 16;
   }
}

//2650
function inverse_mdct(buffer, n, f, blocktype)
{
   var n2 = n >>> 1, n4 = n >>> 2, n8 = n >>> 3, l=int_;//int_
   var n3_4 = n - n4, ld=int_;//int_
   // @OPTIMIZE: reduce register pressure by using fewer variables?
   var save_point = temp_alloc_save(f);//int_
   var buf2 = new Array(n2);var buf2_off = 0;//(float *) temp_alloc(f, n2 * sizeof(*buf2));//float_ *
   var u=null,v=null;//float_ //*,*
   var u_off=0,v_off=0;//float_ //*,*
   // twiddle factors
   var A = f.A[blocktype];//float_ *
   var A_off = 0;//float_ *

   // IMDCT algorithm from "The use of multirate filter banks for coding of high quality digital audio"
   // See notes about bugs in that paper in less-optimal implementation 'inverse_mdct_old' after this function.

   // kernel from paper


   // merged:
   //   copy and reflect spectral data
   //   step 0

   // note that it turns out that the items added together during
   // this step are, in fact, being added to themselves (as reflected
   // by step 0). inexplicable inefficiency! this became obvious
   // once I combined the passes.

   // so there's a missing 'times 2' here (for adding X to itself).
   // this propogates through linearly to the end, where the numbers
   // are 1/2 too small, and need to be compensated for.

   {
      var d=float_,e=float_, AA=float_, e_stop=float_;//*d,*e, *AA, *e_stop
      var d_off=0,e_off=0, AA_off=0, e_stop_off=0;//*d,*e, *AA, *e_stop
      d = buf2;d_off = (n2-2);//&
      AA = A;AA_off = A_off;
      e = buffer;e_off=(0);//&
      e_stop = buffer;e_stop_off = (n2);//&
      while (e_off != e_stop_off) {
         d[d_off+ 1] = (e[e_off+ 0] * AA[AA_off+ 0] - e[e_off+ 2]*AA[AA_off+ 1]);
         d[d_off+ 0] = (e[e_off+ 0] * AA[AA_off+ 1] + e[e_off+ 2]*AA[AA_off+ 0]);
         d_off -= 2;
         AA_off += 2;
         e_off += 4;
      }

      e = buffer;e_off=(n2-3);//&
      while (d_off >= buf2_off) {
         d[d_off+ 1] = (-e[e_off+ 2] * AA[AA_off+ 0] - -e[e_off+ 0]*AA[AA_off+ 1]);
         d[d_off+ 0] = (-e[e_off+ 2] * AA[AA_off+ 1] + -e[e_off+ 0]*AA[AA_off+ 0]);
         d_off -= 2;
         AA_off += 2;
         e_off -= 4;
      }
   }

   // now we use symbolic names for these, so that we can
   // possibly swap their meaning as we change which operations
   // are in place

   u = buffer;u_off = 0;
   v = buf2;v_off = buf2_off;

   // step 2    (paper output is w, now u)
   // this could be in place, but the data ends up in the wrong
   // place... _somebody_'s got to swap it, so this is nominated
   {
      var AA = A;var AA_off = (n2-8);//float_ * = &
      var d0=float_,d1=float_, e0=float_, e1=float_;//*d0,*d1, *e0, *e1
      var d0_off=0,d1_off=0, e0_off=0, e1_off=0;//*d0,*d1, *e0, *e1

      e0 = v;e0_off = (n4);//&
      e1 = v;e1_off = (0);//&

      d0 = u;d0_off = (n4);//&
      d1 = u;d1_off = (0);//&

      while (AA_off >= A_off) {
         var v40_20=float_, v41_21=float_;

         v41_21 = e0[e0_off+ 1] - e1[e1_off+ 1];
         v40_20 = e0[e0_off+ 0] - e1[e1_off+ 0];
         d0[d0_off+ 1]  = e0[e0_off+ 1] + e1[e1_off+ 1];
         d0[d0_off+ 0]  = e0[e0_off+ 0] + e1[e1_off+ 0];
         d1[d1_off+ 1]  = v41_21*AA[AA_off+ 4] - v40_20*AA[AA_off+ 5];
         d1[d1_off+ 0]  = v40_20*AA[AA_off+ 4] + v41_21*AA[AA_off+ 5];

         v41_21 = e0[e0_off+ 3] - e1[e1_off+ 3];
         v40_20 = e0[e0_off+ 2] - e1[e1_off+ 2];
         d0[d0_off+ 3]  = e0[e0_off+ 3] + e1[e1_off+ 3];
         d0[d0_off+ 2]  = e0[e0_off+ 2] + e1[e1_off+ 2];
         d1[d1_off+ 3]  = v41_21*AA[AA_off+ 0] - v40_20*AA[AA_off+ 1];
         d1[d1_off+ 2]  = v40_20*AA[AA_off+ 0] + v41_21*AA[AA_off+ 1];

         AA_off -= 8;

         d0_off += 4;
         d1_off += 4;
         e0_off += 4;
         e1_off += 4;
      }
   }

   // step 3
   ld = ilog(n) - 1; // ilog is off-by-one from normal definitions

   // optimized step 3:

   // the original step3 loop can be nested r inside s or s inside r;
   // it's written originally as s inside r, but this is dumb when r
   // iterates many times, and s few. So I have two copies of it and
   // switch between them halfway.

   // this is iteration 0 of step 3
   imdct_step3_iter0_loop(n >>> 4, u, n2-1-n4*0, -(n >>> 3), A);
   imdct_step3_iter0_loop(n >>> 4, u, n2-1-n4*1, -(n >>> 3), A);

   // this is iteration 1 of step 3
   imdct_step3_inner_r_loop(n >>> 5, u, n2-1 - n8*0, -(n >>> 4), A, 16);
   imdct_step3_inner_r_loop(n >>> 5, u, n2-1 - n8*1, -(n >>> 4), A, 16);
   imdct_step3_inner_r_loop(n >>> 5, u, n2-1 - n8*2, -(n >>> 4), A, 16);
   imdct_step3_inner_r_loop(n >>> 5, u, n2-1 - n8*3, -(n >>> 4), A, 16);

   l=2;
   for (; l < (ld-3)>>>1; ++l) {
      var k0 = n >>> (l+2), k0_2 = k0>>>1;//int_
      var lim = (1 << (l+1))>>>0;//int_
      var i=int_;
      for (i=0; i < lim; ++i)
         imdct_step3_inner_r_loop(n >>> (l+4), u, n2-1 - k0*i, -k0_2, A, (1 << (l+3))>>>0);
   }

   for (; l < ld-6; ++l) {
      var k0 = n >>> (l+2), k1 = (1 << (l+3))>>>0, k0_2 = k0>>>1;//int_
      var rlim = n >>> (l+6), r=int_;//int_
      var lim = (1 << (l+1))>>>0;//int_
      var i_off=int_;
      var A0 = A;var A0_off = A_off;//float_ *
      i_off = n2-1;
      for (r=rlim; r > 0; --r) {
         imdct_step3_inner_s_loop(lim, u, i_off, -k0_2, A0, A0_off, k1, k0);
         A0_off += k1*4;
         i_off -= 8;
      }
   }

   // iterations with count:
   //   ld-6,-5,-4 all interleaved together
   //       the big win comes from getting rid of needless flops
   //         due to the constants on pass 5 & 4 being all 1 and 0;
   //       combining them to be simultaneous to improve cache made little difference
   imdct_step3_inner_s_loop_ld654(n >>> 5, u, n2-1, A, n);

   // output is u

   // step 4, 5, and 6
   // cannot be in-place because of step 5
   {
      var bitrev = f.bit_reverse[blocktype];var bitrev_off = 0;//uint16 *
      // weirdly, I'd have thought reading sequentially and writing
      // erratically would have been better than vice-versa, but in
      // fact that's not what my testing showed. (That is, with
      // j = bitreverse(i), do you read i and write j, or read j and write i.)

      var d0 = v;var d0_off = (n4-4);//float_ * = &
      var d1 = v;var d1_off = (n2-4);//float_ * = &
      while (d0_off >= v_off) {
         var k4=int_;

         k4 = bitrev[bitrev_off+ 0];
         d1[d1_off+ 3] = u[k4+0];
         d1[d1_off+ 2] = u[k4+1];
         d0[d0_off+ 3] = u[k4+2];
         d0[d0_off+ 2] = u[k4+3];

         k4 = bitrev[bitrev_off+ 1];
         d1[d1_off+ 1] = u[k4+0];
         d1[d1_off+ 0] = u[k4+1];
         d0[d0_off+ 1] = u[k4+2];
         d0[d0_off+ 0] = u[k4+3];
         
         d0_off -= 4;
         d1_off -= 4;
         bitrev_off += 2;
      }
   }
   // (paper output is u, now v)


   // data must be in buf2
   assert(v_off == buf2_off);

   // step 7   (paper output is v, now v)
   // this is now in place
   {
      var C = f.C[blocktype];var C_off = 0;//float *
      var d=float_, e=float_;//*d, *e
      var d_off=0, e_off=0;//*d, *e

      d = v;d_off = v_off;
      e = v;e_off = v_off + n2 - 4;

      while (d_off < e_off) {
         var a02=float_,a11=float_,b0=float_,b1=float_,b2=float_,b3=float_;

         a02 = d[d_off+ 0] - e[e_off+ 2];
         a11 = d[d_off+ 1] + e[e_off+ 3];

         b0 = C[C_off+ 1]*a02 + C[C_off+ 0]*a11;
         b1 = C[C_off+ 1]*a11 - C[C_off+ 0]*a02;

         b2 = d[d_off+ 0] + e[e_off+ 2];
         b3 = d[d_off+ 1] - e[e_off+ 3];

         d[d_off+ 0] = b2 + b0;
         d[d_off+ 1] = b3 + b1;
         e[e_off+ 2] = b2 - b0;
         e[e_off+ 3] = b1 - b3;

         a02 = d[d_off+ 2] - e[e_off+ 0];
         a11 = d[d_off+ 3] + e[e_off+ 1];

         b0 = C[C_off+ 3]*a02 + C[C_off+ 2]*a11;
         b1 = C[C_off+ 3]*a11 - C[C_off+ 2]*a02;

         b2 = d[d_off+ 2] + e[e_off+  0];
         b3 = d[d_off+ 3] - e[e_off+  1];

         d[d_off+ 2] = b2 + b0;
         d[d_off+ 3] = b3 + b1;
         e[e_off+ 0] = b2 - b0;
         e[e_off+ 1] = b1 - b3;

         C_off += 4;
         d_off += 4;
         e_off -= 4;
      }
   }

   // data must be in buf2


   // step 8+decode   (paper output is X, now buffer)
   // this generates pairs of data a la 8 and pushes them directly through
   // the decode kernel (pushing rather than pulling) to avoid having
   // to make another pass later

   // this cannot POSSIBLY be in place, so we refer to the buffers directly

   {
      var d0=float_,d1=float_,d2=float_,d3=float_;//*d0,*d1,*d2,*d3
      var d0_off=0,d1_off=0,d2_off=0,d3_off=0;//*d0,*d1,*d2,*d3

      var B = f.B[blocktype];var B_off =  + n2 - 8;//float *
      var e = buf2;var e_off = buf2_off + n2 - 8;//float *
      d0 = buffer;d0_off = (0);//&
      d1 = buffer;d1_off = (n2-4);//&
      d2 = buffer;d2_off = (n2);//&
      d3 = buffer;d3_off = (n-4);//&
      while (e_off >= v_off) {
         var p0=float_,p1=float_,p2=float_,p3=float_;

         p3 =  e[e_off+ 6]*B[B_off+ 7] - e[e_off+ 7]*B[B_off+ 6];
         p2 = -e[e_off+ 6]*B[B_off+ 6] - e[e_off+ 7]*B[B_off+ 7]; 

         d0[d0_off+ 0] =   p3;
         d1[d1_off+ 3] = - p3;
         d2[d2_off+ 0] =   p2;
         d3[d3_off+ 3] =   p2;

         p1 =  e[e_off+ 4]*B[B_off+ 5] - e[e_off+ 5]*B[B_off+ 4];
         p0 = -e[e_off+ 4]*B[B_off+ 4] - e[e_off+ 5]*B[B_off+ 5]; 

         d0[d0_off+ 1] =   p1;
         d1[d1_off+ 2] = - p1;
         d2[d2_off+ 1] =   p0;
         d3[d3_off+ 2] =   p0;

         p3 =  e[e_off+ 2]*B[B_off+ 3] - e[e_off+ 3]*B[B_off+ 2];
         p2 = -e[e_off+ 2]*B[B_off+ 2] - e[e_off+ 3]*B[B_off+ 3]; 

         d0[d0_off+ 2] =   p3;
         d1[d1_off+ 1] = - p3;
         d2[d2_off+ 2] =   p2;
         d3[d3_off+ 1] =   p2;

         p1 =  e[e_off+ 0]*B[B_off+ 1] - e[e_off+ 1]*B[B_off+ 0];
         p0 = -e[e_off+ 0]*B[B_off+ 0] - e[e_off+ 1]*B[B_off+ 1]; 

         d0[d0_off+ 3] =   p1;
         d1[d1_off+ 0] = - p1;
         d2[d2_off+ 3] =   p0;
         d3[d3_off+ 0] =   p0;

         B_off -= 8;
         e_off -= 8;
         d0_off += 4;
         d2_off += 4;
         d1_off -= 4;
         d3_off -= 4;
      }
   }

   temp_alloc_restore(f,save_point);
}

//3079
function get_window(f, len)
{
   len <<= 1;
   if (len == f.blocksize_0) return f.window_[0];
   if (len == f.blocksize_1) return f.window_[1];
   assert(0);
   return null;
}

//3093
function do_floor(f, map, i, n, target, finalY, step2_flag)
{
   var n2 = n >>> 1;//int_
   var s = map.chan[i].mux, floor1=int_;//int_
   floor1 = map.submap_floor[s];
   if (f.floor_types[floor1] == 0) {
      return error(f, VORBIS_invalid_stream);
   } else {
      var g = f.floor_config[floor1].floor1;//Floor1 * = &
      var j=int_,q=int_;
      var lx = 0, ly = finalY[0] * g.floor1_multiplier;//int_
      for (q=1; q < g.values; ++q) {
         j = g.sorted_order[q];
//         #ifndef STB_VORBIS_NO_DEFER_FLOOR
         if (finalY[j] >= 0)
//         #else
//         if (step2_flag[j])
//         #endif
         {
            var hy = finalY[j] * g.floor1_multiplier;//int_
            var hx = g.Xlist[j];//int_
            draw_line(target, lx,ly, hx,hy, n2);
            lx = hx, ly = hy;
         }
      }
      if (lx < n2)
         // optimization of: draw_line(target, lx,ly, n,ly, n2);
         for (j=lx; j < n2; ++j)
            target[j] *= inverse_db_table[ly];//LINE_OP(target[j], inverse_db_table[ly]);
   }
   return true;
}

//3126
function vorbis_decode_initial(f, p_left_start, p_left_end, p_right_start, p_right_end, mode)
{
   var m=new Mode();//*
   var i=int_, n=int_, prev=int_, next=int_, window_center=int_;
   f.channel_buffer_start = f.channel_buffer_end = 0;

  var goto_retry=true;//retry:
  while(goto_retry) {
   goto_retry=false;
   if (f.eof) return false;
   if (!maybe_start_packet(f))
      return false;
   // check packet type
   if (get_bits(f,1) != 0) {
      if (IS_PUSH_MODE(f))
         return error(f,VORBIS_bad_packet_type);
      while (EOP != get8_packet(f));
      goto_retry=true;
   }
  }

   if (f.alloc.alloc_buffer)
      assert(f.alloc.alloc_buffer_length_in_bytes == f.temp_offset);

   i = get_bits(f, ilog(f.mode_count-1));
   if (i == EOP) return false;
   if (i >= f.mode_count) return false;
   mode[0] = i;//*
   m = f.mode_config[ + i];
   if (m.blockflag) {
      n = f.blocksize_1;
      prev = get_bits(f,1);
      next = get_bits(f,1);
   } else {
      prev = next = 0;
      n = f.blocksize_0;
   }

// WINDOWING

   window_center = n >>> 1;
   if (m.blockflag && !prev) {
      p_left_start[0] = (n - f.blocksize_0) >>> 2;//*
      p_left_end[0]   = (n + f.blocksize_0) >>> 2;//*
   } else {
      p_left_start[0] = 0;//*
      p_left_end[0]   = window_center;//*
   }
   if (m.blockflag && !next) {
      p_right_start[0] = (n*3 - f.blocksize_0) >>> 2;//*
      p_right_end[0]   = (n*3 + f.blocksize_0) >>> 2;//*
   } else {
      p_right_start[0] = window_center;//*
      p_right_end[0]   = n;//*
   }
   return true;
}

//3181
function vorbis_decode_packet_rest(f, len, m, left_start, left_end, right_start, right_end, p_left)
{
   var map=new Mapping();//*
   var i=int_,j=int_,k=int_,n=int_,n2=int_;
   var zero_channel=new Array(256);//int_
   var really_zero_channel=new Array(256);//int_
   var window_center=int_;

// WINDOWING

   n = f.blocksize[m.blockflag];
   window_center = n >>> 1;

   map = f.mapping[m.mapping];//&

// FLOORS
   n2 = n >>> 1;

   stb_prof(1);
   goto_channels:for (i=0; i < f.channels; ++i) {
      var s = map.chan[i].mux, floor1=int_;//int_
      zero_channel[i] = false;
      floor1 = map.submap_floor[s];
      if (f.floor_types[floor1] == 0) {
         return error(f, VORBIS_invalid_stream);
      } else {
         var g = f.floor_config[floor1].floor1;//Floor1 * = &
         if (get_bits(f, 1)) {
            var finalY=short_;//*
            var step2_flag=new Array(256);//uint8
            var range_list = new Array( 256, 128, 86, 64 );//static int_
            var range = range_list[g.floor1_multiplier-1];//int_
            var offset = 2;//int_
            finalY = f.finalY[i];
            finalY[0] = get_bits(f, ilog(range)-1);
            finalY[1] = get_bits(f, ilog(range)-1);
            for (j=0; j < g.partitions; ++j) {
               var pclass = g.partition_class_list[j];//int_
               var cdim = g.class_dimensions[pclass];//int_
               var cbits = g.class_subclasses[pclass];//int_
               var csub = ((1 << cbits)>>>0)-1;//int_
               var cval = [0];//int_
               if (cbits) {
                  var c = f.codebooks[ + g.class_masterbooks[pclass]];//Codebook *
                  DECODE(cval,f,c);cval=cval[0];
               }
               for (k=0; k < cdim; ++k) {
                  var book = g.subclass_books[pclass][cval & csub];//int_
                  cval = cval >>> cbits;
                  if (book >= 0) {
                     var temp=[int_];
                     var c = f.codebooks[ + book];//Codebook *
                     DECODE(temp,f,c);
                     finalY[offset++] = temp[0];
                  } else
                     finalY[offset++] = 0;
               }
            }
            if (f.valid_bits == INVALID_BITS) { zero_channel[i] = true; continue goto_channels;/*goto error*/}; // behavior according to spec
            step2_flag[0] = step2_flag[1] = 1;
            for (j=2; j < g.values; ++j) {
               var low=int_, high=int_, pred=int_, highroom=int_, lowroom=int_, room=int_, val=int_;
               low = g.neighbors[j][0];
               high = g.neighbors[j][1];
               //neighbors(g->Xlist, j, &low, &high);
               pred = predict_point(g.Xlist[j], g.Xlist[low], g.Xlist[high], finalY[low], finalY[high]);
               val = finalY[j];
               highroom = range - pred;
               lowroom = pred;
               if (highroom < lowroom)
                  room = highroom * 2;
               else
                  room = lowroom * 2;
               if (val) {
                  step2_flag[low] = step2_flag[high] = 1;
                  step2_flag[j] = 1;
                  if (val >= room)
                     if (highroom > lowroom)
                        finalY[j] = val - lowroom + pred;
                     else
                        finalY[j] = pred - val + highroom - 1;
                  else
                     if (val & 1)
                        finalY[j] = pred - ((val+1)>>>1);
                     else
                        finalY[j] = pred + (val>>>1);
               } else {
                  step2_flag[j] = 0;
                  finalY[j] = pred;
               }
            }

//#ifdef STB_VORBIS_NO_DEFER_FLOOR
//            do_floor(f, map, i, n, f->floor_buffers[i], finalY, step2_flag);
//#else
            // defer final floor computation until _after_ residue
            for (j=0; j < g.values; ++j) {
               if (!step2_flag[j])
                  finalY[j] = -1;
            }
//#endif
         } else {
//           error:
            zero_channel[i] = true;
         }
         // So we just defer everything else to later

         // at this point we've decoded the floor into buffer
      }
   }
   stb_prof(0);
   // at this point we've decoded all floors

   if (f.alloc.alloc_buffer)
      assert(f.alloc.alloc_buffer_length_in_bytes == f.temp_offset);

   // re-enable coupled channels if necessary
   memcpy(really_zero_channel, 0, zero_channel, 0, f.channels);//sizeof(really_zero_channel[0]) * 
   for (i=0; i < map.coupling_steps; ++i)
      if (!zero_channel[map.chan[i].magnitude] || !zero_channel[map.chan[i].angle]) {
         zero_channel[map.chan[i].magnitude] = zero_channel[map.chan[i].angle] = false;
      }

// RESIDUE DECODE
   for (i=0; i < map.submaps; ++i) {
      var residue_buffers=new Array(STB_VORBIS_MAX_CHANNELS);//float *
      var r=int_,t=int_;
      var do_not_decode=new Array(256);//uint8
      var ch = 0;//int_
      for (j=0; j < f.channels; ++j) {
         if (map.chan[j].mux == i) {
            if (zero_channel[j]) {
               do_not_decode[ch] = true;
               residue_buffers[ch] = null;
            } else {
               do_not_decode[ch] = false;
               residue_buffers[ch] = f.channel_buffers[j];
            }
            ++ch;
         }
      }
      r = map.submap_residue[i];
      t = f.residue_types[r];
      decode_residue(f, residue_buffers, ch, n2, r, do_not_decode);
   }

   if (f.alloc.alloc_buffer)
      assert(f.alloc.alloc_buffer_length_in_bytes == f.temp_offset);

// INVERSE COUPLING
   stb_prof(14);
   for (i = map.coupling_steps-1; i >= 0; --i) {
      var n2 = n >>> 1;//int_
      var m_ = f.channel_buffers[map.chan[i].magnitude];//float_ *
      var a_ = f.channel_buffers[map.chan[i].angle    ];//float_ *
      for (j=0; j < n2; ++j) {
         var a2=float_,m2=float_;
         if (m_[j] > 0)
            if (a_[j] > 0)
               m2 = m_[j], a2 = m_[j] - a_[j];
            else
               a2 = m_[j], m2 = m_[j] + a_[j];
         else
            if (a_[j] > 0)
               m2 = m_[j], a2 = m_[j] + a_[j];
            else
               a2 = m_[j], m2 = m_[j] - a_[j];
         m_[j] = m2;
         a_[j] = a2;
      }
   }

   // finish decoding the floors
//#ifndef STB_VORBIS_NO_DEFER_FLOOR
   stb_prof(15);
   for (i=0; i < f.channels; ++i) {
      if (really_zero_channel[i]) {
         memset(f.channel_buffers[i], 0, 0, n2);//sizeof(*f->channel_buffers[i]) * 
      } else {
         do_floor(f, map, i, n, f.channel_buffers[i], f.finalY[i], null);
      }
   }
//#else
//   for (i=0; i < f->channels; ++i) {
//      if (really_zero_channel[i]) {
//         memset(f->channel_buffers[i], 0, sizeof(*f->channel_buffers[i]) * n2);
//      } else {
//         for (j=0; j < n2; ++j)
//            f->channel_buffers[i][j] *= f->floor_buffers[i][j];
//      }
//   }
//#endif

// INVERSE MDCT
   stb_prof(16);
   for (i=0; i < f.channels; ++i)
      inverse_mdct(f.channel_buffers[i], n, f, m.blockflag);
   stb_prof(0);

   // this shouldn't be necessary, unless we exited on an error
   // and want to flush to get to the next packet
   flush_packet(f);

   if (f.first_decode) {
      // assume we start so first non-discarded sample is sample 0
      // this isn't to spec, but spec would require us to read ahead
      // and decode the size of all current frames--could be done,
      // but presumably it's not a commonly used feature
      f.current_loc = -n2; // start of first frame is positioned for discard
      // we might have to discard samples "from" the next frame too,
      // if we're lapping a large block then a small at the start?
      f.discard_samples_deferred = n - right_end;
      f.current_loc_valid = true;
      f.first_decode = false;
   } else if (f.discard_samples_deferred) {
      left_start += f.discard_samples_deferred;
      p_left[0] = left_start;//*
      f.discard_samples_deferred = 0;
   } else if (f.previous_length == 0 && f.current_loc_valid) {
      // we're recovering from a seek... that means we're going to discard
      // the samples from this packet even though we know our position from
      // the last page header, so we need to update the position based on
      // the discarded samples here
      // but wait, the code below is going to add this in itself even
      // on a discard, so we don't need to do it here...
   }

   // check if we have ogg information about the sample # for this packet
   if (f.last_seg_which == f.end_seg_with_known_loc) {
      // if we have a valid current loc, and this is final:
      if (f.current_loc_valid && (f.page_flag & PAGEFLAG_last_page)) {
         var current_end = f.known_loc_for_packet - (n-right_end);//uint32
         // then let's infer the size of the (probably) short final frame
         if (current_end < f.current_loc + right_end) {
            if (current_end < f.current_loc) {
               // negative truncation, that's impossible!
               len[0] = 0;//*
            } else {
               len[0] = current_end - f.current_loc;//*
            }
            len[0] += left_start;//*
            f.current_loc += len[0];//*
            return true;
         }
      }
      // otherwise, just set our sample loc
      // guess that the ogg granule pos refers to the _middle_ of the
      // last frame?
      // set f->current_loc to the position of left_start
      f.current_loc = f.known_loc_for_packet - (n2-left_start);
      f.current_loc_valid = true;
   }
   if (f.current_loc_valid)
      f.current_loc += (right_start - left_start);

   if (f.alloc.alloc_buffer)
      assert(f.alloc.alloc_buffer_length_in_bytes == f.temp_offset);
   len[0] = right_end;//*  // ignore samples after the window goes to 0
   return true;
}

//3442
function vorbis_decode_packet(f, len, p_left, p_right)
{
   var mode=[int_], left_end=[int_], right_end=[int_];
   if (!vorbis_decode_initial(f, p_left, left_end, p_right, right_end, mode)) return 0;
   return vorbis_decode_packet_rest(f, len, f.mode_config[ + mode], p_left[0], left_end[0], p_right[0], right_end[0], p_left);// *p_left, left_end, *p_right, right_end, p_left);
}

//3449
function vorbis_finish_frame(f, len, left, right)
{
   var prev=int_,i=int_,j=int_;
   // we use right&left (the start of the right- and left-window sin()-regions)
   // to determine how much to return, rather than inferring from the rules
   // (same result, clearer code); 'left' indicates where our sin() window
   // starts, therefore where the previous window's right edge starts, and
   // therefore where to start mixing from the previous buffer. 'right'
   // indicates where our sin() ending-window starts, therefore that's where
   // we start saving, and where our returned-data ends.

   // mixin from previous window
   if (f.previous_length) {
      var i=int_,j=int_, n = f.previous_length;//int_
      var w = get_window(f, n);//float_ *
      for (i=0; i < f.channels; ++i) {
         for (j=0; j < n; ++j)
            f.channel_buffers[i][left+j] =
               f.channel_buffers[i][left+j]*w[    j] +
               f.previous_window[i][     j]*w[n-1-j];
      }
   }

   prev = f.previous_length;

   // last half of this data becomes previous window
   f.previous_length = len - right;

   // @OPTIMIZE: could avoid this copy by double-buffering the
   // output (flipping previous_window with channel_buffers), but
   // then previous_window would have to be 2x as large, and
   // channel_buffers couldn't be temp mem (although they're NOT
   // currently temp mem, they could be (unless we want to level
   // performance by spreading out the computation))
   for (i=0; i < f.channels; ++i)
      for (j=0; right+j < len; ++j)
         f.previous_window[i][j] = f.channel_buffers[i][right+j];

   if (!prev)
      // there was no previous packet, so this data isn't valid...
      // this isn't entirely true, only the would-have-overlapped data
      // isn't valid, but this seems to be what the spec requires
      return 0;

   // truncate a short frame
   if (len < right) right = len;

   f.samples_output += right-left;

   return right - left;
}

//3501
function vorbis_pump_first_frame(f)
{
   var len=[int_], right=[int_], left=[int_];
   if (vorbis_decode_packet(f, len, left, right))
      vorbis_finish_frame(f, len[0], left[0], right[0]);
}

//3574
function start_decoder(f)
{
   var header=new Array(6), x=uint8,y=uint8;//uint8
   var len=int_,i=int_,j=int_,k=int_, max_submaps = 0;
   var longest_floorlist=0;//int_

   // first page, first packet

   if (!start_page(f))                              return false;
   // validate page flag
   if (!(f.page_flag & PAGEFLAG_first_page))       return error(f, VORBIS_invalid_first_page);
   if (f.page_flag & PAGEFLAG_last_page)           return error(f, VORBIS_invalid_first_page);
   if (f.page_flag & PAGEFLAG_continued_packet)    return error(f, VORBIS_invalid_first_page);
   // check for expected packet length
   if (f.segment_count != 1)                       return error(f, VORBIS_invalid_first_page);
   if (f.segments[0] != 30)                        return error(f, VORBIS_invalid_first_page);
   // read packet
   // check packet header
   if (get8(f) != VORBIS_packet_id)                 return error(f, VORBIS_invalid_first_page);
   if (!getn(f, header, 6))                         return error(f, VORBIS_unexpected_eof);
   if (!vorbis_validate(header))                    return error(f, VORBIS_invalid_first_page);
   // vorbis_version
   if (get32(f) != 0)                               return error(f, VORBIS_invalid_first_page);
   f.channels = get8(f); if (!f.channels)         return error(f, VORBIS_invalid_first_page);
   if (f.channels > STB_VORBIS_MAX_CHANNELS)       return error(f, VORBIS_too_many_channels);
   f.sample_rate = get32(f); if (!f.sample_rate)  return error(f, VORBIS_invalid_first_page);
   get32(f); // bitrate_maximum
   get32(f); // bitrate_nominal
   get32(f); // bitrate_minimum
   x = get8(f);
   { var log0=int_,log1=int_;
   log0 = x & 15;
   log1 = x >> 4;
   f.blocksize_0 = 1 << log0;
   f.blocksize_1 = 1 << log1;
   if (log0 < 6 || log0 > 13)                       return error(f, VORBIS_invalid_setup);
   if (log1 < 6 || log1 > 13)                       return error(f, VORBIS_invalid_setup);
   if (log0 > log1)                                 return error(f, VORBIS_invalid_setup);
   }

   // framing_flag
   x = get8(f);
   if (!(x & 1))                                    return error(f, VORBIS_invalid_first_page);

   // second packet!
   if (!start_page(f))                              return false;

   if (!start_packet(f))                            return false;
   do {
      len = next_segment(f);
      skip(f, len);
      f.bytes_in_seg = 0;
   } while (len);

   // third packet!
   if (!start_packet(f))                            return false;

   //#ifndef STB_VORBIS_NO_PUSHDATA_API
   if (IS_PUSH_MODE(f)) {
      if (!is_whole_packet_present(f, TRUE)) {
         // convert error in ogg header to write type
         if (f.error == VORBIS_invalid_stream)
            f.error = VORBIS_invalid_setup;
         return false;
      }
   }
   //#endif

   crc32_init(); // always init it, to avoid multithread race conditions

   if (get8_packet(f) != VORBIS_packet_setup)       return error(f, VORBIS_invalid_setup);
   for (i=0; i < 6; ++i) header[i] = get8_packet(f);
   if (!vorbis_validate(header))                    return error(f, VORBIS_invalid_setup);

   // codebooks

   f.codebook_count = get_bits(f,8) + 1;
   f.codebooks = Arr_new(f.codebook_count,Codebook);//(Codebook *) setup_malloc(f, sizeof(*f->codebooks) * f->codebook_count);
   if (f.codebooks == null)                        return error(f, VORBIS_outofmem);
   //memset(f->codebooks, 0, sizeof(*f->codebooks) * f->codebook_count);
   for (i=0; i < f.codebook_count; ++i) {
      var values=uint32;//*
      var ordered=int_, sorted_count=int_;
      var total=0;//int_
      var lengths=uint8;//*
      var c = f.codebooks[+i];//Codebook *
      x = get_bits(f, 8); if (x != 0x42)            return error(f, VORBIS_invalid_setup);
      x = get_bits(f, 8); if (x != 0x43)            return error(f, VORBIS_invalid_setup);
      x = get_bits(f, 8); if (x != 0x56)            return error(f, VORBIS_invalid_setup);
      x = get_bits(f, 8);
      c.dimensions = (get_bits(f, 8)<<8) + x;
      x = get_bits(f, 8);
      y = get_bits(f, 8);
      c.entries = (get_bits(f, 8)<<16) + (y<<8) + x;
      ordered = get_bits(f,1);
      c.sparse = ordered ? 0 : get_bits(f,1);

      if (c.sparse)
         lengths = new Array(c.entries);//(uint8 *) setup_temp_malloc(f, c->entries);
      else
         lengths = c.codeword_lengths = new Array(c.entries);//(uint8 *) setup_malloc(f, c->entries);

      if (!lengths) return error(f, VORBIS_outofmem);

      if (ordered) {
         var current_entry = 0;//int_
         var current_length = get_bits(f,5) + 1;//int_
         while (current_entry < c.entries) {
            var limit = c.entries - current_entry;//int_
            var n = get_bits(f, ilog(limit));//int_
            if (current_entry + n > c.entries) { return error(f, VORBIS_invalid_setup); }//(int) 
            memset(lengths, + current_entry, current_length, n);
            current_entry += n;
            ++current_length;
         }
      } else {
         for (j=0; j < c.entries; ++j) {
            var present = c.sparse ? get_bits(f,1) : 1;//int_
            if (present) {
               lengths[j] = get_bits(f, 5) + 1;
               ++total;
            } else {
               lengths[j] = NO_CODE;
            }
         }
      }

      if (c.sparse && total >= c.entries >> 2) {
         // convert sparse items to non-sparse!
         if (c.entries > f.setup_temp_memory_required)//(int) 
            f.setup_temp_memory_required = c.entries;

         c.codeword_lengths = new Array(c.entries);//(uint8 *) setup_malloc(f, c->entries);
         memcpy(c.codeword_lengths, 0, lengths, 0, c.entries);
         //setup_temp_free(f, lengths, c->entries); // note this is only safe if there have been no intervening temp mallocs!
         lengths = c.codeword_lengths;
         c.sparse = 0;
      }

      // compute the size of the sorted tables
      if (c.sparse) {
         sorted_count = total;
         //assert(total != 0);
      } else {
         sorted_count = 0;
         //#ifndef STB_VORBIS_NO_HUFFMAN_BINARY_SEARCH
         for (j=0; j < c.entries; ++j)
            if (lengths[j] > STB_VORBIS_FAST_HUFFMAN_LENGTH && lengths[j] != NO_CODE)
               ++sorted_count;
         //#endif
      }

      c.sorted_entries = sorted_count;
      values = null;

      if (!c.sparse) {
         c.codewords = new Array(c.entries);//(uint32 *) setup_malloc(f, sizeof(c->codewords[0]) * c->entries);
         if (!c.codewords)                  return error(f, VORBIS_outofmem);
      } else {
         var size=int_;//unsigned
         if (c.sorted_entries) {
            c.codeword_lengths = new Array(c.sorted_entries);//(uint8 *) setup_malloc(f, c->sorted_entries);
            if (!c.codeword_lengths)           return error(f, VORBIS_outofmem);
            c.codewords = new Array(c.sorted_entries);//(uint32 *) setup_temp_malloc(f, sizeof(*c->codewords) * c->sorted_entries);
            if (!c.codewords)                  return error(f, VORBIS_outofmem);
            values = new Array(c.sorted_entries);//(uint32 *) setup_temp_malloc(f, sizeof(*values) * c->sorted_entries);
            if (!values)                        return error(f, VORBIS_outofmem);
         }
         size = c.entries + /*(sizeof(*c->codewords) + sizeof(*values)) * */c.sorted_entries;
         if (size > f.setup_temp_memory_required)
            f.setup_temp_memory_required = size;
      }

      if (!compute_codewords(c, lengths, c.entries, values)) {
         if (c.sparse) setup_temp_free(f, values, 0);
         return error(f, VORBIS_invalid_setup);
      }

      if (c.sorted_entries) {
         // allocate an extra slot for sentinels
         c.sorted_codewords = new Array(c.sorted_entries+1);//(uint32 *) setup_malloc(f, sizeof(*c->sorted_codewords) * (c->sorted_entries+1));
         // allocate an extra slot at the front so that c->sorted_values[-1] is defined
         // so that we can catch that case without an extra if
         c.sorted_values    = new Array(c.sorted_entries+1);//( int   *) setup_malloc(f, sizeof(*c->sorted_values   ) * (c->sorted_entries+1));
         if (c.sorted_values) { ++c.sorted_values_off; c.sorted_values[c.sorted_values_off -1] = -1; }
         compute_sorted_huffman(c, lengths, values);
      }

      if (c.sparse) {
         //setup_temp_free(f, values, sizeof(*values)*c->sorted_entries);
         //setup_temp_free(f, c->codewords, sizeof(*c->codewords)*c->sorted_entries);
         //setup_temp_free(f, lengths, c->entries);
         c.codewords = null;
      }

      compute_accelerated_huffman(c);

      c.lookup_type = get_bits(f, 4);
      if (c.lookup_type > 2) return error(f, VORBIS_invalid_setup);
      if (c.lookup_type > 0) {
         var mults=uint16;//*
         c.minimum_value = float32_unpack(get_bits(f, 32));
         c.delta_value = float32_unpack(get_bits(f, 32));
         c.value_bits = get_bits(f, 4)+1;
         c.sequence_p = get_bits(f,1);
         if (c.lookup_type == 1) {
            c.lookup_values = lookup1_values(c.entries, c.dimensions);
         } else {
            c.lookup_values = c.entries * c.dimensions;
         }
         mults = new Array(c.lookup_values);//(uint16 *) setup_temp_malloc(f, sizeof(mults[0]) * c->lookup_values);
         if (mults == null) return error(f, VORBIS_outofmem);
         for (j=0; j < c.lookup_values; ++j) {//(int_) 
            var q = get_bits(f, c.value_bits);//int_
            if (q == EOP) { /*setup_temp_free(f,mults,sizeof(mults[0])*c->lookup_values);*/ return error(f, VORBIS_invalid_setup); }
            mults[j] = q;
         }

//#ifndef STB_VORBIS_DIVIDES_IN_CODEBOOK
         if (c.lookup_type == 1) {
            var len=int_, sparse = c.sparse;//int_
			var goto_skip = false;
            // pre-expand the lookup1-style multiplicands, to avoid a divide in the inner loop
            if (sparse) {
               if (c.sorted_entries == 0) goto_skip=true; else
               c.multiplicands = new Array(c.sorted_entries * c.dimensions);//(codetype *) setup_malloc(f, sizeof(c->multiplicands[0]) * c->sorted_entries * c->dimensions);
            } else
               c.multiplicands = new Array(c.entries        * c.dimensions);//(codetype *) setup_malloc(f, sizeof(c->multiplicands[0]) * c->entries        * c->dimensions);
            if (!goto_skip) {
            if (c.multiplicands == null) { /*setup_temp_free(f,mults,sizeof(mults[0])*c->lookup_values);*/ return error(f, VORBIS_outofmem); }
            len = sparse ? c.sorted_entries : c.entries;
            for (j=0; j < len; ++j) {
               var z = sparse ? c.sorted_values[j] : j, div=1;//int_
               for (k=0; k < c.dimensions; ++k) {
                  var off = parseInt(z / div,10) % c.lookup_values;//int_
                  c.multiplicands[j*c.dimensions + k] =
//                         #ifndef STB_VORBIS_CODEBOOK_FLOATS
//                            mults[off];
//                         #else
                            mults[off]*c.delta_value + c.minimum_value;
                            // in this case (and this case only) we could pre-expand c->sequence_p,
                            // and throw away the decode logic for it; have to ALSO do
                            // it in the case below, but it can only be done if
                            //    STB_VORBIS_CODEBOOK_FLOATS
                            //   !STB_VORBIS_DIVIDES_IN_CODEBOOK
//                         #endif
                  div *= c.lookup_values;
               }
            }
            //setup_temp_free(f, mults,sizeof(mults[0])*c->lookup_values);
            c.lookup_type = 2;
			}
         }
         else
//#endif
         {
            c.multiplicands = new Array(c.lookup_values);//(codetype *) setup_malloc(f, sizeof(c->multiplicands[0]) * c->lookup_values);
//            #ifndef STB_VORBIS_CODEBOOK_FLOATS
//            memcpy(c->multiplicands, mults, sizeof(c->multiplicands[0]) * c->lookup_values);
//            #else
            for (j=0; j < c.lookup_values; ++j)//(int_) 
               c.multiplicands[j] = mults[j] * c.delta_value + c.minimum_value;
            //setup_temp_free(f, mults,sizeof(mults[0])*c->lookup_values);
//            #endif
         }
//        skip:;

         //#ifdef STB_VORBIS_CODEBOOK_FLOATS
         if (c.lookup_type == 2 && c.sequence_p) {
            for (j=1; j < c.lookup_values; ++j)//(int_) 
               c.multiplicands[j] = c.multiplicands[j-1];
            c.sequence_p = 0;
         }
         //#endif
      }
   }

   // time domain transfers (notused)

   x = get_bits(f, 6) + 1;
   for (i=0; i < x; ++i) {
      var z = get_bits(f, 16);//uint32
      if (z != 0) return error(f, VORBIS_invalid_setup);
   }

   // Floors
   f.floor_count = get_bits(f, 6)+1;
   f.floor_config = Arr_new(f.floor_count,Floor);//(Floor *)  setup_malloc(f, f->floor_count * sizeof(*f->floor_config));
   for (i=0; i < f.floor_count; ++i) {
      f.floor_types[i] = get_bits(f, 16);
      if (f.floor_types[i] > 1) return error(f, VORBIS_invalid_setup);
      if (f.floor_types[i] == 0) {
         var g = f.floor_config[i].floor0;//Floor0 * = &
         g.order = get_bits(f,8);
         g.rate = get_bits(f,16);
         g.bark_map_size = get_bits(f,16);
         g.amplitude_bits = get_bits(f,6);
         g.amplitude_offset = get_bits(f,8);
         g.number_of_books = get_bits(f,4) + 1;
         for (j=0; j < g.number_of_books; ++j)
            g.book_list[j] = get_bits(f,8);
         return error(f, VORBIS_feature_not_supported);
      } else {
         var p=Arr_new(31*8+2,Point);
         var g = f.floor_config[i].floor1;//Floor1 * = &
         var max_class = -1; //int_
         g.partitions = get_bits(f, 5);
         for (j=0; j < g.partitions; ++j) {
            g.partition_class_list[j] = get_bits(f, 4);
            if (g.partition_class_list[j] > max_class)
               max_class = g.partition_class_list[j];
         }
         for (j=0; j <= max_class; ++j) {
            g.class_dimensions[j] = get_bits(f, 3)+1;
            g.class_subclasses[j] = get_bits(f, 2);
            if (g.class_subclasses[j]) {
               g.class_masterbooks[j] = get_bits(f, 8);
               if (g.class_masterbooks[j] >= f.codebook_count) return error(f, VORBIS_invalid_setup);
            }
            for (k=0; k < (1 << g.class_subclasses[j])>>>0; ++k) {
               g.subclass_books[j][k] = get_bits(f,8)-1;
               if (g.subclass_books[j][k] >= f.codebook_count) return error(f, VORBIS_invalid_setup);
            }
         }
         g.floor1_multiplier = get_bits(f,2)+1;
         g.rangebits = get_bits(f,4);
         g.Xlist[0] = 0;
         g.Xlist[1] = (1 << g.rangebits)>>>0;
         g.values = 2;
         for (j=0; j < g.partitions; ++j) {
            var c = g.partition_class_list[j];//int_
            for (k=0; k < g.class_dimensions[c]; ++k) {
               g.Xlist[g.values] = get_bits(f, g.rangebits);
               ++g.values;
            }
         }
         // precompute the sorting
         for (j=0; j < g.values; ++j) {
            p[j].x = g.Xlist[j];
            p[j].y = j;
         }
         p.sort(point_compare);//qsort(p, g->values, sizeof(p[0]), point_compare);
         for (j=0; j < g.values; ++j)
            g.sorted_order[j] = p[j].y;//(uint8) 
         // precompute the neighbors
         for (j=2; j < g.values; ++j) {
            var low=[int_],hi=[int_];
            neighbors(g.Xlist, j, low,hi);
            g.neighbors[j][0] = low[0];
            g.neighbors[j][1] = hi[0];
         }

         if (g.values > longest_floorlist)
            longest_floorlist = g.values;
      }
   }

   // Residue
   f.residue_count = get_bits(f, 6)+1;
   f.residue_config = Arr_new(f.residue_count,Residue);//(Residue *) setup_malloc(f, f->residue_count * sizeof(*f->residue_config));
   for (i=0; i < f.residue_count; ++i) {
      var residue_cascade=new Array(64);//uint8
      var r = f.residue_config[+i];//Residue *
      f.residue_types[i] = get_bits(f, 16);
      if (f.residue_types[i] > 2) return error(f, VORBIS_invalid_setup);
      r.begin = get_bits(f, 24);
      r.end = get_bits(f, 24);
      r.part_size = get_bits(f,24)+1;
      r.classifications = get_bits(f,6)+1;
      r.classbook = get_bits(f,8);
      for (j=0; j < r.classifications; ++j) {
         var high_bits=0;//uint8
         var low_bits=get_bits(f,3);//uint8
         if (get_bits(f,1))
            high_bits = get_bits(f,5);
         residue_cascade[j] = high_bits*8 + low_bits;
      }
      r.residue_books = new Array(r.classifications);for(var a=0;a<r.classifications;a++)r.residue_books[a]=new Array(8);//(short (*)[8]) setup_malloc(f, sizeof(r->residue_books[0]) * r->classifications);
      for (j=0; j < r.classifications; ++j) {
         for (k=0; k < 8; ++k) {
            if (residue_cascade[j] & (1 << k)) {
               r.residue_books[j][k] = get_bits(f, 8);
               if (r.residue_books[j][k] >= f.codebook_count) return error(f, VORBIS_invalid_setup);
            } else {
               r.residue_books[j][k] = -1;
            }
         }
      }
      // precompute the classifications[] array to avoid inner-loop mod/divide
      // call it 'classdata' since we already have r->classifications
      r.classdata = new Array(f.codebooks[r.classbook].entries);//(uint8 **) setup_malloc(f, sizeof(*r->classdata) * f->codebooks[r->classbook].entries);
      if (!r.classdata) return error(f, VORBIS_outofmem);
      memset(r.classdata, 0, 0, f.codebooks[r.classbook].entries);//sizeof(*r->classdata) * 
      for (j=0; j < f.codebooks[r.classbook].entries; ++j) {
         var classwords = f.codebooks[r.classbook].dimensions;//int_
         var temp = j;//int_
         r.classdata[j] = new Array(classwords);//(uint8 *) setup_malloc(f, sizeof(r->classdata[j][0]) * classwords);
         for (k=classwords-1; k >= 0; --k) {
            r.classdata[j][k] = temp % r.classifications;
            temp /= r.classifications; temp=parseInt(temp,10);
         }
      }
   }

   f.mapping_count = get_bits(f,6)+1;
   f.mapping = Arr_new(f.mapping_count,Mapping);//(Mapping *) setup_malloc(f, f->mapping_count * sizeof(*f->mapping));
   for (i=0; i < f.mapping_count; ++i) {
      var m = f.mapping[ + i]; //Mapping *     
      var mapping_type = get_bits(f,16);//int_
      if (mapping_type != 0) return error(f, VORBIS_invalid_setup);
      m.chan = Arr_new(f.channels,MappingChannel);//(MappingChannel *) setup_malloc(f, f->channels * sizeof(*m->chan));
      if (get_bits(f,1))
         m.submaps = get_bits(f,4);
      else
         m.submaps = 1;
      if (m.submaps > max_submaps)
         max_submaps = m.submaps;
      if (get_bits(f,1)) {
         m.coupling_steps = get_bits(f,8)+1;
         for (k=0; k < m.coupling_steps; ++k) {
            m.chan[k].magnitude = get_bits(f, ilog(f.channels)-1);
            m.chan[k].angle = get_bits(f, ilog(f.channels)-1);
            if (m.chan[k].magnitude >= f.channels)        return error(f, VORBIS_invalid_setup);
            if (m.chan[k].angle     >= f.channels)        return error(f, VORBIS_invalid_setup);
            if (m.chan[k].magnitude == m.chan[k].angle)   return error(f, VORBIS_invalid_setup);
         }
      } else
         m.coupling_steps = 0;

      // reserved field
      if (get_bits(f,2)) return error(f, VORBIS_invalid_setup);
      if (m.submaps > 1) {
         for (j=0; j < f.channels; ++j) {
            m.chan[j].mux = get_bits(f, 4);
            if (m.chan[j].mux >= m.submaps)                return error(f, VORBIS_invalid_setup);
         }
      } else
         // @SPECIFICATION: this case is missing from the spec
         for (j=0; j < f.channels; ++j)
            m.chan[j].mux = 0;

      for (j=0; j < m.submaps; ++j) {
         get_bits(f,8); // discard
         m.submap_floor[j] = get_bits(f,8);
         m.submap_residue[j] = get_bits(f,8);
         if (m.submap_floor[j] >= f.floor_count)      return error(f, VORBIS_invalid_setup);
         if (m.submap_residue[j] >= f.residue_count)  return error(f, VORBIS_invalid_setup);
      }
   }

   // Modes
   f.mode_count = get_bits(f, 6)+1;
   for (i=0; i < f.mode_count; ++i) {
      var m = f.mode_config[+i];//Mode *
      m.blockflag = get_bits(f,1);
      m.windowtype = get_bits(f,16);
      m.transformtype = get_bits(f,16);
      m.mapping = get_bits(f,8);
      if (m.windowtype != 0)                 return error(f, VORBIS_invalid_setup);
      if (m.transformtype != 0)              return error(f, VORBIS_invalid_setup);
      if (m.mapping >= f.mapping_count)     return error(f, VORBIS_invalid_setup);
   }

   flush_packet(f);

   f.previous_length = 0;

   for (i=0; i < f.channels; ++i) {
      f.channel_buffers[i] = new Array(f.blocksize_1);//(float *) setup_malloc(f, sizeof(float) * f->blocksize_1);
      f.previous_window[i] = new Array(parseInt(f.blocksize_1/2,10));//(float *) setup_malloc(f, sizeof(float) * f->blocksize_1/2);
      f.finalY[i]          = new Array(longest_floorlist);//(int16 *) setup_malloc(f, sizeof(int16) * longest_floorlist);
//      #ifdef STB_VORBIS_NO_DEFER_FLOOR
//      f->floor_buffers[i]   = (float *) setup_malloc(f, sizeof(float) * f->blocksize_1/2);
//      #endif
   }

   if (!init_blocksize(f, 0, f.blocksize_0)) return false;
   if (!init_blocksize(f, 1, f.blocksize_1)) return false;
   f.blocksize[0] = f.blocksize_0;
   f.blocksize[1] = f.blocksize_1;

//#ifdef STB_VORBIS_DIVIDE_TABLE
//   if (integer_divide_table[1][1]==0)
//      for (i=0; i < DIVTAB_NUMER; ++i)
//         for (j=1; j < DIVTAB_DENOM; ++j)
//            integer_divide_table[i][j] = i / j;
//#endif

   // compute how much temporary memory is needed

   // 1.
   {
      var imdct_mem = (f.blocksize_1 >>> 1);//uint32 // * sizeof(float)
      var classify_mem=uint32;
      var i=int_,max_part_read=0;//int_
      for (i=0; i < f.residue_count; ++i) {
         var r = f.residue_config[ + i];//Residue *
         var n_read = r.end - r.begin;//int_
         var part_read = parseInt(n_read / r.part_size,10);//int_
         if (part_read > max_part_read)
            max_part_read = part_read;
      }
//      #ifndef STB_VORBIS_DIVIDES_IN_RESIDUE
      classify_mem = f.channels + max_part_read;// * (sizeof(void*) * sizeof(uint8 *))
//      #else
//      classify_mem = f->channels * (sizeof(void*) + max_part_read * sizeof(int *));
//      #endif

      f.temp_memory_required = classify_mem;
      if (imdct_mem > f.temp_memory_required)
         f.temp_memory_required = imdct_mem;
   }

   f.first_decode = true;

   if (f.alloc.alloc_buffer) {
      assert(f.temp_offset == f.alloc.alloc_buffer_length_in_bytes);
      // check if there's enough temp memory so we don't error later
      if (f.setup_offset + f.temp_memory_required > f.temp_offset)//sizeof(*f) +  > (unsigned) 
         return error(f, VORBIS_outofmem);
   }

   f.first_audio_page_offset = stb_vorbis_get_file_offset(f);

   return true;
}

//4154
function vorbis_init(p, z)
{
   //memset(p, 0, sizeof(*p)); // NULL out all malloc'd pointers to start
   if (z) {
      p.alloc = z;//*
      p.alloc.alloc_buffer_length_in_bytes = (p.alloc.alloc_buffer_length_in_bytes+3) & ~3;
      p.temp_offset = p.alloc.alloc_buffer_length_in_bytes;
   }
   p.eof = 0;
   p.error = VORBIS__no_error;
   p.stream = null;
   p.codebooks = null;
   p.page_crc_tests = -1;
   //#ifndef STB_VORBIS_NO_STDIO
   p.close_on_free = false;
   p.f = null;
   //#endif
}

//4200
function vorbis_alloc(f)
{
   var p = new stb_vorbis();//(stb_vorbis *) setup_malloc(f, sizeof(*p));//stb_vorbis *
   return p;
}

//4411
function stb_vorbis_get_file_offset(f)
{
   //#ifndef STB_VORBIS_NO_PUSHDATA_API
   if (f.push_mode) return 0;
   //#endif
   if (USE_MEMORY(f)) return f.stream - f.stream_start;
   //#ifndef STB_VORBIS_NO_STDIO
   return ftell(f.f) - f.f_start;
   //#endif
}

//4935
function stb_vorbis_get_frame_float(f, channels, output)
{
   var len=[int_], right=[int_],left=[int_],i=int_;
   if (IS_PUSH_MODE(f)) return error(f, VORBIS_invalid_api_mixing);

   if (!vorbis_decode_packet(f, len, left, right)) {//,&,&,&
      f.channel_buffer_start = f.channel_buffer_end = 0;
      return 0;
   }

   len = vorbis_finish_frame(f, len[0], left[0], right[0]);
   for (i=0; i < f.channels; ++i)
      f.outputs[i] = f.channel_buffers[i].slice( + left);

   f.channel_buffer_start = left;
   f.channel_buffer_end   = left+len;

   if (channels) channels[0] = f.channels;//*
   if (output)   output[0] = f.outputs;//*
   return len;
}

//#ifndef STB_VORBIS_NO_STDIO

//4959
function stb_vorbis_open_file_section(file, close_on_free, error, alloc, length)
{
   var f=new stb_vorbis(), p=new stb_vorbis();//*
   vorbis_init(p, alloc);
   p.f = file;
   p.f_start = ftell(file);
   p.stream_len   = length;
   p.close_on_free = close_on_free;
   if (start_decoder(p)) {
      f = vorbis_alloc(p);
      if (f) {
         f = p;//* = 
         vorbis_pump_first_frame(f);
         return f;
      }
   }
   if (error) error[0] = p.error;//*
   //vorbis_deinit(p);//&
   return null;
}

//4980
function stb_vorbis_open_file(file, close_on_free, error, alloc)
{
   var len=int_, start=int_;//unsigned
   //start = ftell(file);
   //fseek(file, 0, SEEK_END);
   len = file._ptr.length;//ftell(file) - start;
   //fseek(file, start, SEEK_SET);
   return stb_vorbis_open_file_section(file, close_on_free, error, alloc, len);
}

//4990
function stb_vorbis_open_filename(filename, error, alloc)
{
   var f = fopen(filename, "rb");//FILE *
   if (f) 
      return stb_vorbis_open_file(f, true, error, alloc);
   if (error) error[0] = VORBIS_file_open_failure;//*
   return null;
}
//#endif // STB_VORBIS_NO_STDIO

//5062
function copy_samples(dest, dest_off, src, len)
{
   var i=int_;
   //check_endianness();
   for (i=0; i < len; ++i) {
      //FASTDEF(temp);
      var v = Math.round(src[i]*32768);//int_ //FAST_SCALED_FLOAT_TO_INT(temp, src[i],15);
      if ((v + 32768) > 65535)//(unsigned int_) 
         v = v < 0 ? -32768 : 32767;
      dest[dest_off++] = v&0xff;//+i
      dest[dest_off++] = v>>>8&0xff;//+i
   }
}

//5075
/*static void compute_samples(int mask, short *output, int num_c, float **data, int d_offset, int len)
{
   #define BUFFER_SIZE  32
   float buffer[BUFFER_SIZE];
   int i,j,o,n = BUFFER_SIZE;
   check_endianness();
   for (o = 0; o < len; o += BUFFER_SIZE) {
      memset(buffer, 0, sizeof(buffer));
      if (o + n > len) n = len - o;
      for (j=0; j < num_c; ++j) {
         if (channel_position[num_c][j] & mask) {
            for (i=0; i < n; ++i)
               buffer[i] += data[j][d_offset+o+i];
         }
      }
      for (i=0; i < n; ++i) {
         FASTDEF(temp);
         int v = FAST_SCALED_FLOAT_TO_INT(temp,buffer[i],15);
         if ((unsigned int) (v + 32768) > 65535)
            v = v < 0 ? -32768 : 32767;
         output[o+i] = v;
      }
   }
}*/

//5100
/*static int channel_selector[3][2] = { {0}, {PLAYBACK_MONO}, {PLAYBACK_LEFT, PLAYBACK_RIGHT} };*/
//5101
/*static void compute_stereo_samples(short *output, int num_c, float **data, int d_offset, int len)
{
   #define BUFFER_SIZE  32
   float buffer[BUFFER_SIZE];
   int i,j,o,n = BUFFER_SIZE >> 1;
   // o is the offset in the source data
   check_endianness();
   for (o = 0; o < len; o += BUFFER_SIZE >> 1) {
      // o2 is the offset in the output data
      int o2 = o << 1;
      memset(buffer, 0, sizeof(buffer));
      if (o + n > len) n = len - o;
      for (j=0; j < num_c; ++j) {
         int m = channel_position[num_c][j] & (PLAYBACK_LEFT | PLAYBACK_RIGHT);
         if (m == (PLAYBACK_LEFT | PLAYBACK_RIGHT)) {
            for (i=0; i < n; ++i) {
               buffer[i*2+0] += data[j][d_offset+o+i];
               buffer[i*2+1] += data[j][d_offset+o+i];
            }
         } else if (m == PLAYBACK_LEFT) {
            for (i=0; i < n; ++i) {
               buffer[i*2+0] += data[j][d_offset+o+i];
            }
         } else if (m == PLAYBACK_RIGHT) {
            for (i=0; i < n; ++i) {
               buffer[i*2+1] += data[j][d_offset+o+i];
            }
         }
      }
      for (i=0; i < (n<<1); ++i) {
         FASTDEF(temp);
         int v = FAST_SCALED_FLOAT_TO_INT(temp,buffer[i],15);
         if ((unsigned int) (v + 32768) > 65535)
            v = v < 0 ? -32768 : 32767;
         output[o2+i] = v;
      }
   }
}*/

//5140
function convert_samples_short(buf_c, buffer, buffer_off, b_offset, data_c, data, d_offset, samples)
{
   var i=int_;
   if (buf_c != data_c && buf_c <= 2 && data_c <= 6) {alert('Not implemented #1');
//      static int channel_selector[3][2] = { {0}, {PLAYBACK_MONO}, {PLAYBACK_LEFT, PLAYBACK_RIGHT} };
//      for (i=0; i < buf_c; ++i)
//         compute_samples(channel_selector[buf_c][i], buffer[i]+b_offset, data_c, data, d_offset, samples);
   } else {
      var limit = buf_c < data_c ? buf_c : data_c;//int_
      for (i=0; i < limit; ++i)
         copy_samples(buffer,buffer_off+(i)+b_offset, data[i], samples);
      for (   ; i < buf_c; ++i)
         memset(buffer,buffer_off+(i)+b_offset, 0, samples);//sizeof(short_) * 
   }
}

//5156
function stb_vorbis_get_frame_short(f, num_c, buffer, buffer_off, num_samples)
{

   var output=[float_];//**
   var len = stb_vorbis_get_frame_float(f, null, output);//int_,&
   if (len > num_samples) len = num_samples;
   if (len)
      convert_samples_short(num_c, buffer, buffer_off, 0, f.channels, output[0], 0, len);
   return len;
}

//5166
function convert_channels_short_interleaved(buf_c, buffer, buffer_off, data_c, data, d_offset, len)
{
   var i=int_;
   //check_endianness();
   if (buf_c != data_c && buf_c <= 2 && data_c <= 6) {alert('Not implemented #2');
//      assert(buf_c == 2);
//      for (i=0; i < buf_c; ++i)
//         compute_stereo_samples(buffer, data_c, data, d_offset, len);
   } else {
      var limit = buf_c < data_c ? buf_c : data_c;//int_
      var j=int_;
      for (j=0; j < len; ++j) {
         for (i=0; i < limit; ++i) {
            //FASTDEF(temp);
            var f = data[i][d_offset+j];//float_
            var v = Math.round(f*32768);//int_ //FAST_SCALED_FLOAT_TO_INT(temp, f,15);//data[i][d_offset+j],15);
            if ((v + 32768) > 65535)//(unsigned int_) 
               v = v < 0 ? -32768 : 32767;
            buffer[buffer_off++] = v&0xff;//*
            buffer[buffer_off++] = v>>>8&0xff;//*
         }
         for (   ; i < buf_c; ++i) {
            buffer[buffer_off++] = 0;//*
            buffer[buffer_off++] = 0;//*
		 }
      }
   }
}

//5192
function stb_vorbis_get_frame_short_interleaved(f, num_c, buffer, buffer_off, num_shorts)
{
   var output=[float_];//**
   var len=int_;
   if (num_c == 1) return stb_vorbis_get_frame_short(f,num_c,buffer,buffer_off, num_shorts);//&
   len = stb_vorbis_get_frame_float(f, null, output);
   if (len) {
      if (len*num_c > num_shorts) len = parseInt(num_shorts / num_c, 10);
      convert_channels_short_interleaved(num_c, buffer, buffer_off, f.channels, output[0], 0, len);
   }
   return len;
}

//5245
//#ifndef STB_VORBIS_NO_STDIO
function stb_vorbis_decode_filename(filename, channels, output)
{
   var data_len=int_, offset=int_, total=int_, limit=int_, error=[int_];
   var data=short_;//*
   var v = stb_vorbis_open_filename(filename, error, null);//stb_vorbis *
   if (v == null) return -1;
   //var buffer_time = 4; //seconds
   limit = v.channels * 4096;
   channels[0] = v.channels;//*
   function sound_Chunk(rest, data) {
   if (data)
      var dataURI = "data:audio/wav;base64,"+(btoa(uint8ToString(data)));//escape
   offset = data_len = 0;
   data_len = rest.length/v.channels/2;//0;
   offset = 44+rest.length; //add by d (WAVE-HEADER)
   total = limit;
   data = (new Array(44)).concat(rest);//new Array(total);//(short *) malloc(total * sizeof(*data));
   if (data == null) {
      //stb_vorbis_close(v);
      return -2;
   }
   for (;;) {
      var n = stb_vorbis_get_frame_short_interleaved(v, v.channels, data,+offset, total-offset);//int_
	  //document.writeln(n+"\n");
      if (n == 0) break;
      data_len += n;
      offset += n * v.channels*2;
	  if (data_len>v.sample_rate*buffer_time) break;
      if (offset + limit > total) {
         var data2=short_;//*
         total *= 2*2;
         data2 = data;data.length=total;//(short *) realloc(data, total * sizeof(*data));
         if (data2 == null) {
            free(data);
            stb_vorbis_close(v);
            return -2;
         }
         data = data2;
      }
   }
   data.length = offset;
   var rest = data.splice(v.channels*2 * v.sample_rate*buffer_time+44); data_len = data_len<v.sample_rate*buffer_time?data_len:v.sample_rate*buffer_time;
   write_prelim_header(v, data, data_len);
   dataURI && playbackSound(dataURI);
   n>0 && setTimeout(function(){
   sound_Chunk(rest, data);},dataURI?buffer_time*1000:0);
   }
   sound_Chunk([]);
   output[0] = data;//*
   return data_len;
}
//#endif // NO_STDIO

var bits = 16;//static int_
function WRITE_U32(buf, buf_off, x) { buf[buf_off]     = x&0xff;
                          buf[buf_off+1] = x>>>8&0xff;
                          buf[buf_off+2] = x>>>16&0xff;
                          buf[buf_off+3] = x>>>24&0xff;
}

function WRITE_U16(buf, buf_off, x) { buf[buf_off]     = x&0xff;
                          buf[buf_off+1] = x>>>8&0xff;
}

/* Some of this based on ao/src/ao_wav.c */
function write_prelim_header(v, headbuf, knownlength) {
    var size = 0x7fffffff;//unsigned int_
    var channels = v.channels;//ov_info(vf,0)->channels;//int_
    var samplerate = v.sample_rate;//ov_info(vf,0)->rate;//int_
    var bytespersec = channels*samplerate*bits/8;//int_
    var align = channels*bits/8;//int_
    var samplesize = bits;//int_

    if(knownlength && knownlength*bits/8*channels < size)
        size = (knownlength*bits/8*channels+44) ;//(unsigned int_)

    memcpy(headbuf, 0, new Array(82,73,70,70), 0, 4);//"RIFF"
    WRITE_U32(headbuf,+4, size-8);
    memcpy(headbuf,+8, new Array(87,65,86,69), 0, 4);//"WAVE"
    memcpy(headbuf,+12, new Array(102,109,116,32), 0, 4);//"fmt "
    WRITE_U32(headbuf,+16, 16);
    WRITE_U16(headbuf,+20, 1); /* format */
    WRITE_U16(headbuf,+22, channels);
    WRITE_U32(headbuf,+24, samplerate);
    WRITE_U32(headbuf,+28, bytespersec);
    WRITE_U16(headbuf,+32, align);
    WRITE_U16(headbuf,+34, samplesize);
    memcpy(headbuf,+36, new Array(100,97,116,97), 0, 4);//"data"
    WRITE_U32(headbuf,+40, size - 44);
	headbuf.length=size;

//    if(fwrite(headbuf, 1, 44, out) != 44) {
//        fprintf(stderr, _("ERROR: Failed to write Wave header: %s\n"), strerror(errno));
//        return 1;
//    }

    return 0;
}

})();