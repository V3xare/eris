import React, { forwardRef, useState, useEffect, useContext, useMemo, useRef } from "react";
import { Props } from "../../utility/props";
import { AutoCompleteContext } from "../../components/AutoComplete";
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";
import Common from "../../utility/common";
import { Press } from "../../utility/uses";

import "./button.scss"

export const Button = ( props ) => {
	let { 
		className, children, propValue, style, margin, padding, 
		title, value,
		disabled,
		onClick,
		animation,
		confirm,
		warning,
		danger,
		...rest 
	} = props;

	if( animation !== 0 )
		animation = animation || 500;
	if( confirm !== undefined )
		confirm = confirm === true ? 1000 : confirm;
	else
		confirm = 0;

	const [ iteration, setIteration ] = useState( "" );
	const [ pressed, setPressed ] = useState( false );
	const list = useRef([]);
	const confirmElem = useRef( null );
	const backgroundColor = useRef( "" );

	useEffect(() => {

		if( !confirmElem.current )
			return;

	}, [ pressed ]);

	const getStyle = ( element ) => {

		if( !element )
			return;

		let value = window.getComputedStyle( element ).getPropertyValue( "background-color" );
		return value;
	};

	const click = ( e ) => {

		if( animation !== 0 && !disabled ){
			let token = Common.sid( 8 );

			let timeout = setTimeout(() => {
				list.current = list.current.filter(( f ) => f.token != token );
				setIteration( Common.sid( 8 ) );
			}, animation );

			list.current = [ ...list.current, { timeout: timeout, token: token } ];
			setIteration( token );
		};

		if( onClick && !disabled )
			onClick({ event: e });
	};

	return (
	<div 
		className={ 
			Props.className( "button", className, { disabled: disabled, danger: danger, warning: warning } ) 
		}
		style={ style }
		onClick={( e ) => {

			if( confirm )
				return;

			click( e );

		}}
	>
		<Press 
			delay={ confirm } 
			onHold={( e ) => { 
				if( !confirmElem.current )
					return;
				confirmElem.current.style.opacity = 0.5;
				confirmElem.current.style.background = "conic-gradient( " 
					+ (backgroundColor.current || "transparent") + " " + (e.value * 100) + "%, "
					+ "transparent " + (e.value * 110) + "%)";
			}} 
			onComplete={( e ) => {
				click( e );
			}}
			onChange={( e ) => { 
				setPressed( e.value );
				if( !confirmElem.current )
					return;	
				confirmElem.current.style.background = null;		
				backgroundColor.current = getStyle( confirmElem.current );	
				confirmElem.current.style.opacity = 0.0;
			 }}
		>	
			<div className={ "button-wrap" }>
				<span className={ "button-title" }>{ title || props.children || value || "" }</span>
				{ list.current.map(( item ) => {
					return (<span key={ item.token } className={ "button-animation" } style={{ animationDuration: animation + "ms" }}></span>)
				}) }
				{
					confirm ? 
					(<span 
						className={ Props.className( "button-confirm", { pressed: pressed }) } 
						ref={ confirmElem }>
					</span>)
					:
					null
				}				
			</div>
		</Press>
	</div>
	);
};