import React, { useEffect, useRef, useReducer } from "react";

export const LangContext = React.createContext({
	get: ( arg1: string, arg2?: string ) => { 
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
			get: ( arg1: string, arg2?: string ) => { 
				return arg2 === undefined ? (state.table[ state.current ][ arg1 ] || state.table[ "en" ][ arg1 ] || "") : (state.table[ arg2 ][ arg1 ] || state.table[ "en" ][ arg1 ] || ""); 
			}, 
			dispatch: dispatch
		}}>
			{ props.children }
		</LangContext.Provider>
	);
};