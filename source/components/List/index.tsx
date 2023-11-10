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
				it: state.selection.it + 1
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

export const List = ( props ) => {
	let { className, children, style, load, data, value, padding, ...rest } = props;
	let inlineStyle = { ...style };
	let [ state, dispatch ] = useReducer( ListReducer, {
		list: [],
		padding: padding === undefined ? 20 : Common.uint( padding ),
		selection: {
			chain: [],
			value: value 
		},
	});

	useEffect(() => {
		dispatch([ "children", children ]);
	}, [ children ]);	
	useEffect(() => {
		dispatch([ "data", data ]);
	}, [ data ]);	

	return useMemo(() =>
	<div
		className={
			Props.className( "list", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		<ListContext.Provider
			value={{ state: state, dispatch: dispatch, level: -1, parent: 0, chain: [] }}
		>
			{
				<ListLeaf expandable={ false }>{ state.list }</ListLeaf>
			}
		</ListContext.Provider>
	}</div>, [ state.selection, state.list ]);
};
List.Item = ListLeaf;