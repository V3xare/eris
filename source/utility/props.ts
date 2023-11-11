
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
	export const parseVec2 = ( value ) => {
	
		if( Common.int( value ) == value || typeof value == "number" )
			value = [ value, value ];
		else if( Array.isArray( value ) ){
			value = [
				(Common.int( value[ 0 ] ) == value[ 0 ] || typeof value[ 0 ] == "number" ? (value[ 0 ]) : value[ 0 ]),
				(Common.int( value[ 1 ] ) == value[ 1 ] || typeof value[ 1 ] == "number" ? (value[ 1 ]) : value[ 1 ])
			];
		}else if( typeof value == "string" ){
			value = (value || "").trim().split( / ,/g );
			value = [ value[ 0 ] || 8, value[ 1 ] || 8 ];
		}else if( value === true ){
			value = [ 8, 8 ];
		}else{
			value = [ undefined, undefined ];
		};
	
		return value;
	};
	export const parseVec4 = ( value ) => {
	
		if( Common.int( value ) == value || typeof value == "number" )
			value = [ value, value, value, value ];
		else if( Array.isArray( value ) ){

			if( value.length == 4 ){
				value = [
					(Common.int( value[ 0 ] ) == value[ 0 ] || typeof value[ 0 ] == "number" ? (value[ 0 ]) : value[ 0 ]),
					(Common.int( value[ 1 ] ) == value[ 1 ] || typeof value[ 1 ] == "number" ? (value[ 1 ]) : value[ 1 ]),
					(Common.int( value[ 2 ] ) == value[ 2 ] || typeof value[ 2 ] == "number" ? (value[ 2 ]) : value[ 2 ]),
					(Common.int( value[ 3 ] ) == value[ 3 ] || typeof value[ 3 ] == "number" ? (value[ 3 ]) : value[ 3 ])
				];
			}else if( value.length == 3 ){
				let v0 = (Common.int( value[ 0 ] ) == value[ 0 ] || typeof value[ 0 ] == "number" ? (value[ 0 ]) : value[ 0 ]);
				let v1 = (Common.int( value[ 1 ] ) == value[ 1 ] || typeof value[ 1 ] == "number" ? (value[ 1 ]) : value[ 1 ]);
				let v2 = (Common.int( value[ 2 ] ) == value[ 2 ] || typeof value[ 2 ] == "number" ? (value[ 2 ]) : value[ 2 ]);
				value = [ v0, v1, v2, v1 ];					
			}else if( value.length == 2 ){
				let v0 = (Common.int( value[ 0 ] ) == value[ 0 ] || typeof value[ 0 ] == "number" ? (value[ 0 ]) : value[ 0 ]);
				let v1 = (Common.int( value[ 1 ] ) == value[ 1 ] || typeof value[ 1 ] == "number" ? (value[ 1 ]) : value[ 1 ]);
				value = [ v0, v1, v0, v1 ];				
			}else if( value.length == 1 ){
				let v = (Common.int( value[ 0 ] ) == value[ 0 ] || typeof value[ 0 ] == "number" ? (value[ 0 ]) : value[ 0 ]);
				value = [ v, v, v, v ];
			}
		}else if( typeof value == "string" ){
			value = (value || "").trim().split( / ,/g );
			value = [ value[ 0 ] || 8, value[ 1 ] || 8, value[ 2 ] || 8, value[ 3 ] || 8 ];
		}else if( value === true ){
			value = [ 8, 8, 8, 8 ];
		}else{
			value = [ undefined, undefined, undefined, undefined ];
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