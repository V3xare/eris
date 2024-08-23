import React, { forwardRef, useState, useEffect, useRef, useContext, useMemo } from "react";
import { createPortal } from 'react-dom';
import { Props } from "../../utility/props";
import { Text } from "../../components/Typography";
import Common from "../../utility/common";

import "./modal.scss"

export const ModalContext = React.createContext({
	get: ( arg1: string, arg2?: string ) => { 
		return ""; 
	}, 
});


const ModalCalcPosition = ( target ) => {

	let position = {
		x: 0,
		y: 0
	};
	let screenWidth = document.documentElement.clientWidth;
	let screenHeight = document.documentElement.clientHeight;
	let b = target.getBoundingClientRect();
	position.x = (screenWidth * 0.5) - (b.width * 0.5);
	position.y = (screenHeight * 0.5) - (b.height * 0.5);
	
	return { x: position.x + "px", y: position.y + "px" };
};

export const Modal = ( props ) => {
	let { className, children, style, active, onClose, ...rest } = props;
	const element = useRef( null );

	if( !onClose )
		onClose = () => {};

	let clickOutside = ( e ) => {

		if( !element.current )
			return;

		if( Common.inside( e.target, element.current ) )
			return;

		onClose();
	};
	
	useEffect(() => {
		window.document.addEventListener( "mousedown", clickOutside );
		return () => {
			window.document.removeEventListener("mousedown", clickOutside );
		}
	}, []);


	useEffect(() => {

		if( !active )
			return;

		let interval = setInterval(() => {

			if( !element.current )
				return;

			if( !active ){
				element.current.classList.remove( "modal-active" );
				return;
			};

			let position = ModalCalcPosition( element.current );

			element.current.style.left = position.x;
			element.current.style.top = position.y;
			element.current.classList.add( "modal-active" );
		}, 8 );

		return () => {
			clearInterval( interval );
		};
	}, [ active ]);

	return <React.Fragment>
		{
			active ? (createPortal(
				(<div
					className={ "modal" }
					ref={ element }
					{ ...rest }
				>
					{ props.children }
				</div>),
				document.body
			)) : null
		}
	</React.Fragment>
};
