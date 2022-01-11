import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";

import "./styles/index.scss"
import { Text } from "@components/Typography";
import { Icons } from "@components/Icons";

export function Editable( props ){

	let { className, children, ...rest } = props;
	const [ text, setText ] = useState( children || "" );
	const [ height, setHeight ] = useState( 0 );
	const [ focus, setFocus ] = useState( false );

	const area = useRef( null );

	return (
	<div
		className={ Props.className( "typography", className, {
			editable: true
		}) }
	>
		<Text
			className={
				(className || "")
				+ (focus ? "hidden" : "")
			}
			{ ...rest }
		>
			{ text || " " }
		</Text>

		<Icons.pencil hidden={ focus } onClick={() => {
			setFocus( !focus );
			setTimeout(() => {

				if( !area.current )
					return;

				area.current.focus();

			});
		}}/>

		<textarea
			ref={ area }
			className={ Props.className( "typography", className, (!focus ? "hidden" : "") ) }
			onChange={( e ) => {
				e.target.style.height = 0 + "px";
				e.target.scrollTop = 0 + "px";
				setHeight( e.target.scrollHeight );
				e.target.style.height = height + "px";
				setText( e.target.value );
			}}
			onFocus={( e ) => {

				if( props.onFocus )
					props.onFocus( e );

				e.target.style.height = 0 + "px";
				e.target.scrollTop = 0 + "px";
				setHeight( e.target.scrollHeight );
				e.target.style.height = height + "px";
				setText( e.target.value );

			}}
			onBlur={( e ) => {

				if( props.onBlur )
					props.onBlur( e );

				setFocus( false );

			}}
			style={{ height: (height ? (height + "px") : "") }}
			value={ text }
			rows={ 1 }
		/>

	</div>
	);
};
