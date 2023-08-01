import React, { useEffect, useRef, useReducer } from "react";
import { CreateMutable, useSubscription, useAsync } from "../../utility/mutable";
import { Storage } from "../../utility/storage";

function LangReducer( state, [ type, data, data2 ] ){

	if( type == "table" ){
		return {
			...state,
			[ "loaded" ]: true,
			[ "table" ]: { ...state.table, ...{ [data.toLowerCase()]: data2 } }
		};
	}else if( type == "visible" ){
		return {
			...state,
			[ "visible" ]: !!data
		};
	}else if( type == "select" ){
		return {
			...state,
			[ "current" ]: (data || "en").toLowerCase(),
			[ "selected" ]: data2 ? (data2 || "").toLowerCase() : state.selected
		};
	};

	return state;
};

export const LangMutable = CreateMutable( LangReducer, {
	current: Storage.get( "lang" ) || "en",
	selected: Storage.get( "lang" ) || "en",
	table: {},
	loaded: false,
	visible: false,
	get: ( state ) => {
		return ( name ) => {
			return state.table[ state.current ] ? (state.table[ state.current ][ name ] || "") : "";
		};
	}
});
