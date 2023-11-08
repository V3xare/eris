import React, { useContext, useEffect, useReducer, useState, useRef , useMemo} from "react";

import { Props } from "../../utility/props";

import "./index.scss"
import Common from "../../utility/common";
import { Text } from "../Typography";
import { Icons } from "../Icons";
import { ListLeaf } from "./leaf";

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
	};

	return state;
};

export const List = ( props ) => {
	let { className, children, style, load, data, value, padding, ...rest } = props;
	let inlineStyle = { ...style };
	let [ state, dispatch ] = useReducer( ListReducer, {
		list: [],
		padding: Common.uint( padding ) || 20,
		selection: {
			chain: [],
			value: value 
		},
	});

	return useMemo(() =>
	<div
		className={
			Props.className( "list", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		<ListContext.Provider
			value={{ state: state, dispatch: dispatch, level: 0, parent: 0, chain: [] }}
		>
			{
				<ListLeaf expandable={ false }>{ children }</ListLeaf>
			}
		</ListContext.Provider>
	}</div>, [ state.selection, state.list ]);
};
List.Item = ListLeaf;