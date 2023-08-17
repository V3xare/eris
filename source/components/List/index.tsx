import React, { useContext, useEffect, useReducer, useState, useRef , useMemo} from "react";

import { Props } from "../../utility/props";

import "./index.scss"
import Common from "../../utility/common";
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";
import { ListLeaf } from "../../components/List/leaf";

export const ListContext = React.createContext({});

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
	}else if( type == "build" ){
		let list = ListParser( params.children, -1, "", [] );
		let selection : any= ListFindSelected( list, params.selected );
		return {
			...state,
			selection: {
				chain: selection ? selection.chain : [],
				value: selection ? selection.value : [],
				token: selection ? selection.token : [],
				it: 0
			},
			list: list
		}
	};

	return state;
};

const ListFindSelected = ( list: any, selected: string ) => {

	if( !list )
		return null;

	for( let item of list ){

		if( item.props.value === selected )
			return {
				chain: item.props.chain,
				value: item.props.value,
				token: item.props.token,
				it: 0
			};

		let needle = ListFindSelected( item.props.children, selected );	

		if( needle )
			return needle;

	};

	return null;
};

const ListParser = ( list: any,  level: number, parent: string, parentChain: string[] ) => {

	if( !list )
		return null;

	if( !Array.isArray( list ) && !list.$$typeof )
		return null;

	if( list.$$typeof )
		list = [ list ];	

	let array: any[] = [];

	for( let item of list ){
		const isStatic = item.$$typeof;
		const elem = item;

		if( isStatic )
			item = item.props;

		const token = item.token || Common.sid( 8 );
		const single = typeof item.children == "string" || typeof item.children == "number";

		const props = {
			key: token,
			token: token,
			level: level + 1,
			chain: [ ...parentChain, token ],
			parent: parent,
			value: item.value,
			title: single ? (item.title || item.children) : item.title,
			single: single,
			children: item.children
		};
		
		const children = item.children === undefined ? null : ListParser( item.children, props.level, token, props.chain );

		if( isStatic ){
			array.push( 
				React.cloneElement( elem, props, children ) 
			);
		}else{
			array.push( 
				<ListLeaf { ...props }>{ children }</ListLeaf>
			);
		};

	};
	
	return array;
};

export const List = ( props ) => {
	let { className, children, style, load, data, ...rest } = props;
	let inlineStyle = { ...style };
	let [ state, dispatch ] = useReducer( ListReducer, {
		list: [],
		selection: {
			chain: [],
			value: props.value,
			token: "",
			it: 0
		},
	});

	useEffect(() => {
		dispatch([ "build", { children: children, selected: props.value } ]);
	}, []);

	useEffect(() => {

		if( !state.selection.token || !props.onChange )
			return;

		props.onChange({ selected: state.selection });

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
			value={[ props, [ state, dispatch ], -1 ]}
		>
			{
				<ListLeaf expandable={ false } token={ -1 } chain={[]} level={ -1 } parent={ -1 }>{ state.list }</ListLeaf>
			}
		</ListContext.Provider>
	}</div>, [ state.selection, state.list ]);
};
List.Item = ListLeaf;