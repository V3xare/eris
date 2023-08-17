import React, { useContext, useEffect, useReducer, useState, useRef } from "react";

import { Props } from "../../utility/props";
import { useAnimation } from "../../utility/animation";

import "./index.scss"
import Common from "../../utility/common";
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";
import { ListContext } from "./index";

export const ListLeaf = ( props ) => {
	let { className, children, style, title, icon, expandable, value, token, level, single, parent, chain, ...rest } = props;
	//console.log( 111, token, level, parent, chain );
	const [ inherited, [ listState, listDispatch ] ] = useContext( ListContext );
	let inlineStyle = { ...style };
	expandable = expandable !== false;
	let selectedChained = token != 0 && listState.selection.chain.indexOf( token ) > -1;
	let selected = value && value === listState.selection.value;

	const [ expanded, setExpanded ] = useState( expandable ? false : true );

	useEffect(() => {

		if( !selectedChained )
			return;

		setExpanded( true );

	}, [ selectedChained ]);

	const childrenElem = useAnimation.Expand( expanded );

	return (
		<div
			className={
				Props.className( "list-item", className, {
					selected: selected,
					chain: selectedChained,
					expandable: expandable,
					root: parent === 0
				})
			}
			style={ inlineStyle }
		>
			<div className={ "list-item-title" + (!expandable && !(title) ? " hidden" : "") }
				style={{ paddingLeft: (level * 20) + "px" }}
				onClick={() => {

					if( single ){
				 		listDispatch([ "select", { token: token, value: value, chain: chain } ]);
					}else{
				 		setExpanded( !expanded )
					};

				}}
			>
				{ icon ? React.cloneElement( icon, { transition: true }) : null }
				<Text q transition>{ title }</Text>
				{ single ? null : <Icons.expand transition reverse={ !expanded }/> }
			</div>
			<div
				className={ Props.classNameEx( "list-item", "list-item-children", { expanded: expanded, reduced: !expanded } ) }
				ref={ childrenElem }
			>
			{
				single ? null : (<ListContext.Provider value={[ props, [ listState, listDispatch ] ]}>{ children }</ListContext.Provider>)
			}
			</div>
		</div>
	);
};