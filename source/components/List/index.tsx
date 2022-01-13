import React, { useContext, useEffect, useReducer, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";

import "./styles/index.scss"
import Common from "@utility/common";
import { Text } from "@components/Typography";
import { Icons } from "@components/Icons";

const ListContext = React.createContext({});
//const ListReducer = ( state, [ type, data ] ) => {};

export const List = ( props ) => {
	let { className, children, style, ...rest } = props;
	let inlineStyle = { ...style };
	let selection = useState( null );

	useEffect(() => {
		console.log( selection[ 0 ] );
	}, [ selection[ 0 ] ]);

	return (<div
		className={
			Props.className( "list", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		<ListContext.Provider
			value={[ props, selection ]}
		>
			{ children }
		</ListContext.Provider>
	}</div>);
};

List.Item = ( props ) => {
	let { className, children, style, title, icon, ...rest } = props;
	let inlineStyle = { ...style };
	const [ inherited, [ selection, setSelection ] ] = useContext( ListContext );
	let type = typeof props.children;
	let single = type == "string" || type == "number";

	const [ expanded, setExpanded ] = useState( false );
	const childrenElem = useRef( null );

	useEffect(() => {
		childrenElem.current.style.height = "0px";
	}, []);

	const transition = ( e ) => {

		if( !childrenElem.current )
			return;

		if( expanded )
			childrenElem.current.style.height = null;
		else
			childrenElem.current.style.height = "0px";
		childrenElem.current.removeEventListener( "transitionend", transition );
	};

	useEffect(() => {
		childrenElem.current.removeEventListener( "transitionend", transition );

		requestAnimationFrame(function(){
			childrenElem.current.style.height = expanded ? "0px" : childrenElem.current.scrollHeight + "px";

			requestAnimationFrame(function(){
				childrenElem.current.style.height = !expanded ? "0px" : childrenElem.current.scrollHeight + "px";
			});

		});

		childrenElem.current.addEventListener( "transitionend", transition );

		return () => {

			if( !childrenElem.current )
				return;

			childrenElem.current.removeEventListener( "transitionend", transition );
		};
	}, [ expanded ]);

	return (
		<div
			className={
				Props.className( "list-item", className, { selected: selection != null && selection == props.value } )
			}
			style={ inlineStyle }
		>
			<div className={ "list-item-title" }
				 onClick={() => {

				 	if( single ){
				 		setSelection( props.value );
					}else{
				 		setExpanded( !expanded )
					};

				 }}
			>
				{ icon ? React.cloneElement( icon, { transition: true }) : null }
				<Text q transition>{ single ? props.children : props.title }</Text>
				{ single ? null : <Icons.expand transition reverse={ !expanded }/> }
			</div>
			<div
				className={ Props.className( "list-item", "list-item-children", { expanded: expanded, reduced: !expanded } ) }
				ref={ childrenElem }>
			{
				single ? null : props.children
			}</div>
		</div>
	);
};