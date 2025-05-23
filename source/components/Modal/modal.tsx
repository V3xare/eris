import React, { forwardRef, useState, useEffect, useRef, useContext, useMemo } from "react";
import { createPortal } from 'react-dom';
import { Props } from "../../utility/props";
import { Text } from "../../components/Typography";
import Common from "../../utility/common";

import "./modal.scss"
import { TooltipCalcPosition } from "../../components/Tooltip";

export const ModalContext = React.createContext({});


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
	let { className, children, style, active, onClose, attach, margin, snap, auto, bg, trigger, ...rest } = props;
	const element = useRef( null );
	const triggerRef = useRef( null );
	const triggerAutoRef = useRef({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	let [ triggerActive, setTriggerActive ] = useState( false );

	if( auto === undefined )
		auto = true;

	if( !margin )
		margin = { x: 0, y: 30 };

	margin.x = margin.x === undefined ? 0 : Common.float( margin.x );
	margin.y = margin.y === undefined ? 20 : Common.float( margin.y );	
	
	if( !snap )
		snap = { x: 0.5, y: 0.5 };

	snap.x = snap.x === undefined ? 0.5 : Common.float( snap.x );
	snap.y = snap.y === undefined ? 0.5 : Common.float( snap.y );

	if( !onClose )
		onClose = () => {};

	if( trigger )
		active = triggerActive;

	let clickOutside = ( e ) => {

		if( !element.current )
			return;

		if( Common.inside( e.target, element.current ) )
			return;

		onClose();

		if( trigger )
			setTriggerActive( false );

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

		triggerAutoRef.current = triggerRef.current ? triggerRef.current.getBoundingClientRect() : triggerAutoRef.current;

		let interval = setInterval(() => {

			if( !element.current )
				return;

			if( !active ){
				element.current.classList.remove( "modal-active" );
				return;
			};

			let position;
			
			if( attach && triggerRef.current ){
				let b = auto ? triggerRef.current.getBoundingClientRect() : triggerAutoRef.current;
				let clientX = b.x + b.width * snap.x;
				let clientY = b.y + b.height * snap.y;
				position = TooltipCalcPosition({ clientX: clientX, clientY: clientY }, element.current, triggerRef.current, margin.y, margin.y + 2 );
			}else{
				position = ModalCalcPosition( element.current );;
			};

			element.current.style.left = position.x;
			element.current.style.top = position.y;
			element.current.classList.add( "modal-active" );
		}, 8 );

		return () => {
			clearInterval( interval );
		};
	}, [ active ]);

	return <React.Fragment>
		<ModalContext.Provider value={{ close: () => setTriggerActive( false ) }}>
		{
			active ? (createPortal(
				(
				bg ?
				(<div className={ Props.className( "modal-bg", className ) }>
					<div
						className={ Props.className( "modal", className ) }
						ref={ element }
						{ ...rest }
					>
						<div className={ "modal-content" }>{ props.children }</div>
					</div>
				</div>)
				:
				(<div
					className={ Props.className( "modal", className ) }
					ref={ element }
					{ ...rest }
				>
					<div className={ "modal-content" }>{ props.children }</div>
				</div>)
				),
				document.body
			)) : null
		}
		{
			trigger ?
			(<span ref={ triggerRef }>{
				React.cloneElement( trigger, {
					onClick: ( e ) => {
						setTriggerActive( true );
					},
				})	
			}</span>)		
			: 
			null
		}		
		</ModalContext.Provider>
	</React.Fragment>
};
