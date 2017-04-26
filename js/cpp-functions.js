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
	var result = new Array(); for (i = 0; i < len; ++i) result.push(new val);
	return result;
}

function assert(bCondition) {
	if (!bCondition) {
		throw new Error('assert :P');
	}
}

