import React, { useEffect, useRef, useReducer } from "react";

export const LangContext = React.createContext({
	get: ( key: string, args?: string[], params?: any ) => { 
		return ""; 
	}, 
});

const LangReducer = ( state, [ type, data, data2 ] ) => {

	if( type == "select" ){
		return {
			...state,
			current: data
		};
	}else if( type == "add" ){
		let table = { ...state.table };
		
		if( !table[ data ] )
			table[ data ] = { ...data2 };
		else
			table[ data ] = { ...table[ data ], ...data2 };

		return {
			...state,
			table: table
		};
	};

	return state;
};

export const Lang = ( props ) => {

	let [ state, dispatch ] = useReducer( LangReducer, {
		current: "en",
		table: {
			en: {},
			ru: {},
		},
	});

	return (
		<LangContext.Provider value={{ 
			current: state.current,
			get: ( key: string, args?: string[], params?: any ) => { 

				let value = params && params.locale ?
					state.table[ params.locale ][ key ]
						:
					(state.table[ state.current ][ key ] === undefined ? (state.table[ "en" ][ key ] || "") : state.table[ state.current ][ key ]);

				if( Array.isArray( args ) ){

					if( params && params.className ){

						for( key in args )
							value = value.replace( /\*/, '<span class="' + (params.className === true ? 'eris-lang-font' :  params.className) + '">' + args[ key ] + '</span>' );			

					}else{

						for( key in args )
							value = value.replace( /\*/, args[ key ] );

					};

				};

				return value;
			}, 
			dispatch: dispatch
		}}>
			{ props.children }
		</LangContext.Provider>
	);
};