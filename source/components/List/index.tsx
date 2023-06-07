import React, { useContext, useEffect, useReducer, useState, useRef , useMemo} from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";

import "./styles/index.scss"
import Common from "@utility/common";
import { Text } from "@components/Typography";
import { Icons } from "@components/Icons";
import { ListLeaf } from "@components/List/leaf";

export const ListContext = React.createContext({});

const MakeChain = ( key: string, pairs: any[], chain: any[] ) => {

	let parent = pairs[ key ];

	if( !parent )
		return chain;

	chain.push( parent );

	return MakeChain( parent, pairs, chain );
};

const ListReducer = ( state, [ type, params ] ) => {

	if( type == "select" ){
		return {
			...state,
			selection: {
				...params,
				chain: MakeChain( params.key, state.hierarchy.pairs, [] )
			}
		};
	}else if( type == "hierarchy" ){
		return {
			...state,
			hierarchy: {
				...state.hierarchy,
				pairs: { ...state.hierarchy.pairs, [params.key]: params.parent }
			}
		};
	};

	return state;
};

const ListParser = ( list: any ) => {

	if( !list || !Array.isArray( list ) )
		return null;

	let array: any[] = [];

	for( let item of list ){
		const children = item.children === undefined ? item.title : ListParser( item.children );
		const props = {
			value: item.value,
			title: item.title,
		};
		array.push( 
			<List.Item key={ item.value } { ...props }>{ children }</List.Item> 
		);
	};
	
	return array;
};

export const List = ( props ) => {
	let { className, children, style, load, data, ...rest } = props;
	let inlineStyle = { ...style };
	let [ state, dispatch ] = useReducer( ListReducer, {
		selection: null,
		selectionNeedle: props.value,
		hierarchy: {
			pairs: {}
		}
	});

	if( data ){
		children = ListParser( data );
	};
	console.log( state.hierarchy );

	useEffect(() => {

		if( state.selection === null || !props.onChange )
			return;

		props.onChange({ selected: state.selection });

	}, [ state.selection ]);

	return useMemo(() =>
	<div
		className={
			Props.className( "list", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		<ListContext.Provider
			value={[ props, [ state, dispatch ], -1, -1 ]}
		>
			<ListLeaf expandable={ false }>{ children }</ListLeaf>
		</ListContext.Provider>
	}</div>, [ state.selection, state.selectionNeedle ]);
};
List.Item = ListLeaf;