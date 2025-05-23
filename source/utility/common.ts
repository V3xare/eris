import QueryString from "qs";
import { Location } from "react-router-dom";

export default class Common{

	static  _chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	static _uchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	static _charchars = "abcdefghijklmnopqrstuvwxyz";
	static _hexchars = "ABCDEF0123456789";

	static Random( a: any, b: any ) : number{
		return (0.5 - Math.random());
	};
	static Ascending( a: any, b: any ) : number{
		return a - b;
	};
	static Descending = function( a: any, b: any ) : number{
		return b - a;
	};
	static NaturalInt = /(\d+)/;
	static NaturalAscending = function( a: any, b: any ) : number{

		if( !a || !b )
			return a - b;

		a = (typeof a == "string" ? a : a.toString()).toLowerCase().split( Common.NaturalInt );
		b = (typeof b == "string" ? b : b.toString()).toLowerCase().split( Common.NaturalInt );

		if( a[ 0 ] == "" )
			a.shift();

		if( b[ 0 ] == "" )
			b.shift();

		let n = 0;
		let length = a.length < b.length ? b.length : a.length;
		let result = -1;
		let a1;
		let b1;

		while( n < length ){

			if( a[ n ] != b[ n ] ){

				a1 = parseInt( a[ n ] );
				b1 = parseInt( b[ n ] );

				result = (!isNaN( a1 ) && !isNaN( b1 )) ?
					(a1 - b1)
					:
					(!isNaN( a1 ) && isNaN( b1 ) ?
							(-1)
							:
							(isNaN( a1 ) && !isNaN( b1 ) ?
									(1)
									:
									(b[ n ] < a[ n ] ? 1 : 0)
							)
					);

				break;

			}

			n++;
		};

		return result || -1;
	};
	static NaturalDescending( b: any, a: any ) : number{
		return Common.NaturalAscending( a, b );
	};
	static DeepAscending( a: any, b: any ) : number{
		return a[ 0 ] == b[ 0 ] ?
			(typeof a == "string" ? ((b[ 1 ] < a[ 1 ]) ? 1 : 0) : (a[ 1 ] - b[ 1 ]))
			:
			(typeof a == "string" ? ((b[ 0 ] < a[ 0 ]) ? 1 : 0) : (a[ 0 ] - b[ 0 ]));
	};
	static DeepDescending( a: any, b: any ) : number{
		return a[ 0 ] == b[ 0 ] ?
			(typeof a == "string" ? (a[ 1 ] < b[ 1 ] ? 1 : 0) : (b[ 1 ] - a[ 1 ]))
			:
			(typeof a == "string" ? (a[ 0 ] < b[ 0 ] ? 1 : 0) : (b[ 0 ] - a[ 0 ]));
	};
	static DeepNaturalAscending( a: any, b: any ) : number{
		return a[ 0 ] == b[ 0 ] ?
			Common.NaturalAscending( a[ 1 ], b[ 1 ] )
			:
			Common.NaturalAscending( a[ 0 ], b[ 0 ] );
	};
	static DeepNaturalDescending( a: any, b: any ) : number{
		return a[ 0 ] == b[ 0 ] ?
			Common.NaturalDescending( a[ 1 ], b[ 1 ] )
			:
			Common.NaturalDescending( a[ 0 ], b[ 0 ] );
	};

	public static sort( object: Array<any>, method?: (a: any, b: any) => number ) : Array<any>{
		return object.sort( method || Common.Ascending );
	};
	public static nsort( object: Array<any>, desc: boolean ) : Array<any>{
		return object.sort( desc ? Common.NaturalDescending : Common.NaturalAscending );
	};
	public static dsort( object: Array<any>, desc: boolean ) : Array<any>{
		return object.sort( desc ? Common.DeepDescending : Common.DeepAscending );
	};
	public static dnsort( object: Array<any>, desc: boolean ) : Array<any>{
		return object.sort( desc ? Common.DeepNaturalDescending : Common.DeepNaturalAscending );
	};

	public static parse( value: string, def: any ) : any{
		try{
			let p = JSON.parse( value );
			return p;
		}catch( e ){
			return def;
		};
	};
	public static path( value: string, detect?: boolean ) : any{

		let file = true;
		let path = decodeURIComponent( value || "" ).replace( /\\/g, "/" );
		let slash = true; 
		let object: any = { 
			original: value, 
			pathname: "/", 
			dir: "/" 
		};		

		if( path[ path.length - 1 ] == "/" ){
			file = false;
		}else
			slash = false;

		if( path[ 0 ] != "/" )
			path = "/" + path;

		let pathArray = path.match( /\/([^\>\<\|\?\*\/\\\:\"\n\r\x00]{0,256}[^\.\/\\])/gi );					
		 
		if( !pathArray || pathArray.length < 1 )
			return object;

		
		let filename = !file ? "" : pathArray[ pathArray.length - 1 ]
						.match( /(?:\/([^\>\<\|\?\*\/\\\:\"\n\r\x00]{1,256})\.([a-zA-Z0-9]{1,12})*?)+$/i );

		object.pathname = pathArray.join( "" );		
		pathArray.splice( pathArray.length - 1, 1 );	
		object.dir = pathArray.join( "" ) + "/";		
					
		if( filename ){
			
			object.filename = filename[ 1 ] + "." + filename[ 2 ];
			object.name = filename[ 1 ];
			object.mime = filename[ 2 ];
			
		}else if( slash )
			object.pathname += "/";
		
		return object;		
	};

	public static equal( array1: any[], array2: any[] ) : boolean{

		if( array1.length != array2.length )
			return false;

		let n: number = 0;
		let length: number = array1.length;

		for( ; n < length; n++ ){

			if( array1[ n ] != array2[ n ] )
				return false;

		};

		return true;
	};

	public static string( object: any ) : string{

		if( object === undefined )
			return "undefined";

		let type = typeof object;

		if( type == "string" )
			return object;

		if( type == "number" )
			return object.toString();

		if( type == "boolean" )
			return object ? "true" : "false";

		if( type == "object" && !object )
			return "null";

		return "";
	};
	public static floatCo: number = 0.00001;
	public static float( value: any ) : number{

		if( typeof value == "number" )
			return value;

		return parseFloat( value ) || 0;
	};
	public static int( value: any ) : number{

		if( typeof value == "number" )
			return Math.floor( value );

		return parseInt( value ) || 0;
	};
	public static uint( value: any ) : number{

		if( typeof value == "number" ){
			value = Math.floor( value );
			return value > 0 ? value : 0;
		};

		value = parseInt( value ) || 0;

		return value > 0 ? value : 0;
	};	
	public static type( value: any ) : string{
		return (Object.prototype.toString.call( value ) || "[object Undefined]").replace( /\[|object|\]| /g, "" ).toLowerCase();
	};
	public static unsigned( value: any ) : number{
		return Common.uint( value );
	};

	public static random( object: number ) : number{

		if( !object )
			object = 1;

		if( object >= 0 )
			return Math.floor( (Math.random() * ((Common.unsigned( object ) + 1) || 9999999)) );

		return 0;
	};
	public static sid( length: number, ucase?: string ) : string{

		let response = "";
		let n = 0;
		length = length || 8;

		if( ucase == "lower" )
			while( n < length ){

				response += (Common._chars.charAt( Common.random( 35 ) )).toString();

				n++;
			}
		if( ucase == "upper" )
			while( n < length ){

				response += (Common._uchars.charAt( Common.random( 35 ) )).toString();

				n++;
			}
		else if( ucase == "hex" )
			while( n < length ){

				response += (Common._hexchars.charAt( Common.random( 15 ) )).toString();

				n++;
			}
		else if( ucase == "chars" )
			while( n < length ){

				response += (Common._charchars.charAt( Common.random( 25 ) )).toString();

				n++;
			}
		else
			while( n < length ){

				response += (Common._chars.charAt( Common.random( 61 ) )).toString();

				n++;
			}

		return response;
	};
	static paddingLeft( value: string, length: number, char: string ) : string{

		value = Common.string( value );

		if( char === undefined )
			char = "0";

		for( let n = value.length; n < length; n++ ){
			value = char + "" + value;
		};

		return value;
	};
	static paddingRight( value: string, length: number, char: string ) : string{

		value = Common.string( value );

		if( char === undefined )
			char = "0";

		for( let n = value.length; n < length; n++ ){
			value = value + "" + char;
		};

		return value;
	};
	static HASHPrime: 0x01000193; //16777619
	static HASHVal: 0x811c9dc5;
	public static prime( buffer: string ) : number{

		if( !buffer )
			return Common.HASHVal;

		let length = buffer.length;
		let hval = Common.HASHVal;

		for( let n = 0; n < length; n++ ){
			hval ^= buffer.charCodeAt( n );
			hval *= Common.HASHPrime;
		};

		return hval & 0x7FFFFFFF;
	};
	public static hash( buffer: string ) : number{

		let hash = 0;
		let char;

		if( !buffer )
			return hash;

		for( let n = 0; n < buffer.length; n++ ){
			char = buffer.charCodeAt( n );
			hash = ((hash << 5) - hash) + char;
			hash |= 0;
		};

		return hash < 0 ? (hash * -1) : hash;
	};
	public static token() : string{
		return Common.sid( 32 );
	};
	public static parseQuery( location: Location<any> ){
		return QueryString.parse( location.search, { ignoreQueryPrefix: true });
	};
	public static setQuery( location: Location<any>, value, clear? ){
	
		let result: string = "";
	
		if( !value )
			return result;
	
		let qs: any = clear ? {} : QueryString.parse( location.search, { ignoreQueryPrefix: true });
	
		for( const key in value ){
			qs[ key ] = value[ key ];
		};
	
		let n = 0;
	
		for( const key in qs ){

			if( qs[ key ] === undefined || qs[ key ] === "" || qs[ key ] === null )
				continue;

			if( n > 0 )
				result += "&"
			else
				result += "?";
	
			result += key + "=" + encodeURIComponent( Common.string( qs[ key ] ) );
			n++;
		};
	
		return result;
	};	
	public static offset( target: HTMLElement ) : { x: number, y: number, width: number, height: number }{

		if( !target )
			return { x: 0, y: 0, width: 0, height: 0 };

		let offset = { x: 0, y: 0, width: 0, height: 0 };
		let aabb = target.getBoundingClientRect();
		offset.x = aabb.x;
		offset.y = aabb.y;		
		offset.width = aabb.width;
		offset.height = aabb.height;

		return offset;
	};
	public static inside( target: HTMLElement, inside: HTMLElement ) : HTMLElement | false{

		if( !target )
			return false;

		let parent: HTMLElement | null = target;

		while( parent && parent.nodeName != "BODY" ){

			if( parent === inside  )
				return parent;

			parent = parent.parentElement;
		};

		return false;
	};
	public static insideClass( target: HTMLElement, inside: string ) : HTMLElement | false{

		if( !target )
			return false;

		let parent: HTMLElement | null = target;

		while( parent && parent.nodeName != "BODY" ){

			if( parent.classList.contains( inside ) )
				return parent;

			parent = parent.parentElement;
		};

		return false;
	};
	public static resize( array: any[], length: number, defVal: any ) : any[]{
		return length < array.length ?
			array.splice( 0, length )
			:
			[ ...array, ...Array( length - array.length ).fill( defVal ) ];
	};
}