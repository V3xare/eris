import React, { useContext, useEffect, useReducer, useState, useRef, useMemo } from "react";

import { Props } from "../../utility/props";
import { useAnimation } from "../../utility/animation";

import "./index.scss"
import Common from "../../utility/common";
import { Text } from "../Typography";
import { Icons } from "../Icons";
import { ListContext } from "./index";
import { Tooltip } from "../Tooltip";

export const ListLeaf = ( props ) => {
	const listContext = useContext( ListContext );
	const parent = listContext.parent;
	const level = listContext.level;

	let { className, children, style, title, icon, expandable, expanded, tooltip, value, content, ...rest } = props;
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
			listContext.dispatch([ "select", { token: token, value: value, chain: chain, preventEvent: true } ]);
	}, [ selected ]);

	const [ expandedValue, setExpanded ] = useState( expandable ? false : true );
	
	useEffect(() => {
		if( !selectedChained || !expandable )
			return;
		setExpanded( true );
	}, [ selectedChained ]);	
	useEffect(() => {
		if( expanded === undefined )
			return;
		setExpanded( !!expanded );
	}, [ expanded ]);

	const childrenElem = useAnimation.Expand( expandedValue );

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
				style={{ 
					paddingTop: listContext.state.padding[ 0 ], 
					paddingRight: listContext.state.padding[ 1 ],
					paddingBottom: listContext.state.padding[ 2 ] ,
					paddingLeft: (level * listContext.state.padding[ 3 ])
				}}
				onClick={() => {

					if( single ){
						listContext.dispatch([ "select", { token: token, value: value, chain: chain } ]);
					}else if( expandable ){
				 		setExpanded( !expandedValue )
					};

				}}
			>
				{ icon ? React.cloneElement( icon, { transition: true }) : null }
				{
					tooltip ? 
					(<Tooltip content={ tooltip.content ? tooltip.content : tooltip } bg={ tooltip.bg ? tooltip.bg : undefined }><Text q transition>{ title }</Text></Tooltip>) 
					: 
					(<Text q transition>{ title }</Text>)			
				}
				{ single ? null : <Icons.expand transition reverse={ !expandedValue }/> }
			</div>
			<div
				className={ Props.classNameEx( "list-item", "list-item-children", { expanded: expandedValue, reduced: !expandedValue } ) }
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