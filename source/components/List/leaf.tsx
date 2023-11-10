import React, { useContext, useEffect, useReducer, useState, useRef, useMemo } from "react";

import { Props } from "../../utility/props";
import { useAnimation } from "../../utility/animation";

import "./index.scss"
import Common from "../../utility/common";
import { Text } from "../Typography";
import { Icons } from "../Icons";
import { ListContext } from "./index";

export const ListLeaf = ( props ) => {
	const listContext = useContext( ListContext );
	const parent = listContext.parent;
	const level = listContext.level;

	let { className, children, style, title, icon, expandable, expandedProp, value, content, ...rest } = props;
	let inlineStyle = { ...style };
	let single = typeof children == "string" || typeof children == "number" || !!content || (Array.isArray( children ) && !children.length);
	expandable = expandable !== false && !single;
	
	let [ token, setToken ] = useState( Common.token() );
	let chain = [ ...listContext.chain, token ];
	let selectedChained = listContext.state.selection.chain.indexOf( token ) > -1;
	let selected = value && value === listContext.state.selection.value;

	title = single ? ((content && typeof content !== "boolean" ? content : (title || children))) : title;

	useEffect(() => {
		if( selected )
			listContext.dispatch([ "select", { token: token, value: value, chain: chain } ]);
	}, [ selected ]);

	const [ expanded, setExpanded ] = useState( expandable ? false : true );
	useEffect(() => {
		if( !selectedChained || !expandable )
			return;
		setExpanded( true );
	}, [ selectedChained ]);	
	useEffect(() => {
		if( expandedProp === undefined )
			return;
		setExpanded( !!expandedProp );
	}, [ expandedProp ]);

	const childrenElem = useAnimation.Expand( expanded );

	//console.log( single ? null : (content && typeof content !== "boolean" ? content : children) );

	return (
		<div
			className={
				Props.className( "list-item", className, {
					selected: selected,
					chain: selectedChained,
					content: content,
					expandable: expandable,
					root: parent === 0
				})
			}
			style={ inlineStyle }
		>
			<div className={ "list-item-title" + (!expandable && !(title) ? " hidden" : "") }
				style={{ paddingLeft: (level * listContext.state.padding) + "px" }}
				onClick={() => {

					//if( content )
					//	return;

					if( single ){
						listContext.dispatch([ "select", { token: token, value: value, chain: chain } ]);
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
			<ListContext.Provider
				value={{ ...listContext, ["chain"]: chain, parent: token, level: level + 1 }}
			>
			{
				single ? null : children
			}
			</ListContext.Provider>

			</div>
		</div>
	);
};