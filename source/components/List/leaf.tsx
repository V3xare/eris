import React, { useContext, useEffect, useReducer, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";
import { useAnimation } from "@utility/animation";

import "./styles/index.scss"
import Common from "@utility/common";
import { Text } from "@components/Typography";
import { Icons } from "@components/Icons";
import { ListContext } from "./index";

const ListLeafReducer = ( state, [ type, params ] ) => {
	return state;
};

export const ListLeaf = ( props ) => {
	let { className, children, style, title, icon, expandable, value, ...rest } = props;
	const [ inherited, [ listState, listDispatch ], parent, level ] = useContext( ListContext );
	const [ state, dispatch ] = useReducer( ListLeafReducer, {
		key: parent === -1 ? 0 : Common.sid( 8 )
	});
	let inlineStyle = { ...style };

	let type = typeof children;
	let single = type == "string" || type == "number";
	expandable = expandable !== false;
	let chain = listState.selection && listState.selection.chain.indexOf( state.key ) > -1;
	let selected = listState.selection != null && listState.selection.key == state.key;

	const [ expanded, setExpanded ] = useState( expandable ? false : true );

	useEffect(() => {
		listDispatch([ "hierarchy", { key: state.key, parent: parent } ]);
	}, []);
	useEffect(() => {

		if( !listState.selectionNeedle || listState.selectionNeedle !== value )
			return;

		const timeout = setTimeout(() => {
			listDispatch([ "select", { key: state.key, value: value } ]);
		});

		return () => {
			clearTimeout( timeout );
		};
	}, [ listState.selectionNeedle ]);
	useEffect(() => {
		setExpanded( expandable ? (chain || false) : true );
	}, [ chain ]);

	const childrenElem = useAnimation.Expand( expanded );

	return (
		<div
			className={
				Props.className( "list-item", className, {
					selected: selected,
					expandable: expandable,
					chain: chain,
					root: parent === 0
				})
			}
			style={ inlineStyle }
		>
			<div className={ "list-item-title" + (!expandable && !(single ? children : title) ? " hidden" : "") }
				style={{ paddingLeft: (level * 20) + "px" }}
				onClick={() => {

					if( single ){
				 		listDispatch([ "select", { key: state.key, value: value } ]);
					}else{
				 		setExpanded( !expanded )
					};

				}}
			>
				{ icon ? React.cloneElement( icon, { transition: true }) : null }
				<Text q transition>{ single ? children : title }</Text>
				{ single ? null : <Icons.expand transition reverse={ !expanded }/> }
			</div>
			<div
				className={ Props.className( "list-item", "list-item-children", { expanded: expanded, reduced: !expanded } ) }
				ref={ childrenElem }
				>
			{
				single ? null : (<ListContext.Provider value={[ props, [ listState, listDispatch ], state.key, level + 1 ]}>{ children }</ListContext.Provider>)
			}</div>
		</div>
	);
};