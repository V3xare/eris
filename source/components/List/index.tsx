import React, { useContext, useEffect, useReducer, useState, useRef , useMemo} from "react";

import { Props } from "../../utility/props";

import "./index.scss"
import Common from "../../utility/common";
import { Text } from "../Typography";
import { Icons } from "../Icons";
import { ListLeaf } from "./leaf";

export const ListContext = React.createContext({});

const ListCreateItem = ( data: any ) => {

	let children: any[] = [];

	if( Array.isArray( data.children ) ){

		for( const item of data.children ){
			children.push( ListCreateItem( item ) );
		};

	};

	let result = (<List.Item 
		key={ data.value }
		icon={ data.icon } 
		value={ data.value } 
		title={ data.title }
		content={ data.content }
	>
		{ children }
	</List.Item>);

	return result;
};

const ListReducer = ( state, [ type, params ] ) => {

	if( type == "select" ){
		return {
			...state,
			selection: {
				chain: params.chain,
				value: params.value,
				token: params.token,
				seek: params.seek || false,
				it: params.preventEvent ? (state.selection.it) : (state.selection.it + 1)
			}
		};
	}else if( type == "children" ){
		return {
			...state,
			list: params
		};	
	}else if( type == "data" ){

		if( !Array.isArray( params ) )
			return state;

		let list: any[] = [];

		for( const item of params ){
			list.push( ListCreateItem( item ) );
		};

		return {
			...state,
			list: list
		};		
	};

	return state;
};

export const ListPadding = [ 3, 6, 3, 8 ];
export const List = ( props ) => {
	let { className, children, style, load, data, value, padding, onChange, singleType, ...rest } = props;
	let inlineStyle = { ...style };
	let [ state, dispatch ] = useReducer( ListReducer, {
		list: [],
		padding: Props.parseVec4( padding || ListPadding ),
		selection: {
			it: 0,
			chain: [],
			value: value 
		}
	});

	useEffect(() => {
		dispatch([ "children", children ]);
	}, [ children ]);	
	useEffect(() => {
		dispatch([ "data", data ]);
	}, [ data ]);		
	useEffect(() => {
		dispatch([ "select", { chain: [], value: value, token: "", preventEvent: true, seek: true } ]);
	}, [ value ]);		
	useEffect(() => {

			if( !onChange || state.selection.it == 0 )
				return;

			onChange({ value: state.selection.value });	
		
	}, [ state.selection.it ]);	

	return useMemo(() =>
	<div
		className={
			Props.className( "list", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		<ListContext.Provider
			value={{ state: state, dispatch: dispatch, level: -1, parent: 0, chain: [], singleType: singleType }}
		>
			{
				<ListLeaf expandable={ false }>{ state.list }</ListLeaf>
			}
		</ListContext.Provider>
	}</div>, [ state.selection, state.selection.chain, state.list ]);
};
List.Item = ListLeaf;