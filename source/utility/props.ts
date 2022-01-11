
//export interface ClassNameProps{}

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
	export const className = ( a1: string, a2?: string | {}, a3?: string | {} ) => {

		let name = a1 ? a1 : "";

		if( a2 && typeof a2 == "object" ){
			name += ClassNameObject( a1, a2 );
		}else if( a2 ){
			name += " " + a2;
		};
		if( a3 && typeof a3 == "object" ){
			name += ClassNameObject( a1, a3 );
		}else if( a3 ){
			name += " " + a3;
		};

//		name += (a1 ? (" " + a1) : "");
//
//		if( name && name[ 0 ] == " " )
//			name = name.substr( 1 );

		return name;
	}
};