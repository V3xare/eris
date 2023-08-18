
//export interface ClassNameProps{}

import Common from "../utility/common";

const ClassNameObject = ( prefix: string, a: {} ) => {

	let string = "";

	for( let key in a ){

		if( !a[ key ] )
			continue;

		string += " " + prefix + "-" + key;
	};

	return string;
};

export namespace Props{
	export const className = ( a1: string, ...args: any[] ) => {

		let name = a1 ? a1 : "";

		for( const a of args ){

			if( a && typeof a == "object" ){
				name += ClassNameObject( a1, a );
			}else if( a ){
				name = a + " " + name;
			};

		};

		return name;
	};
	export const classNameEx = ( a1: string, ...args: any[] ) => {

		let name = "";

		for( const a of args ){

			if( a && typeof a == "object" ){
				name += ClassNameObject( a1, a );
			}else if( a ){
				name = name ? (a + " " + name) : (a);
			};

		};

		return name.trim();
	};
	export const parseFlex = ( value ) => {

		if( Common.int( value ) == value || typeof value == "number" )
			value = value + " " + value +  " auto";
		else{
			value = (value || "").trim();
	
			if( !value.match( / /g ) ){
				value = "0 0 " + value;
			};
	
		};
	
		return value;
	};
	export const parseGap = ( value ) => {
	
		if( Common.int( value ) == value || typeof value == "number" )
			value = value + "px " + value + "px";
		else if( Array.isArray( value ) ){
			value = ""
				+ (Common.int( value[ 0 ] ) == value[ 0 ] || typeof value[ 0 ] == "number" ? (value[ 0 ] + "px") : value[ 0 ]) 
				+ " " 
				+ (Common.int( value[ 1 ] ) == value[ 1 ] || typeof value[ 1 ] == "number" ? (value[ 1 ] + "px") : value[ 1 ]);
		}else if( typeof value == "string" ){
			value = (value || "").trim();
	
			if( !value.match( / /g ) ){
				value = "0 0 " + value;
			};
	
		}else if( value === true ){
			value = "8px";
		};
	
		return value;
	};	
	export const parseIcon = ( value, params? ) => {

		if( !params )
			params = {
				direction: -1
			};

		if( !value )
			value = {
				element: null,
				direction: params.direction
			};
		
		if( value.$$typeof )
			value = {
				element: value,
				direction: params.direction
			};
		else{
			value.direction = value.direction == 1 || value.direction == "right" ? 1 : -1;
		};
	
		return value;
	};
};