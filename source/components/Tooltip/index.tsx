import React, { useRef, useEffect, useState } from "react";
import { createPortal } from 'react-dom';

import { Props } from "../../utility/props";

import "./styles/index.scss"
import Common from "../../utility/common";
import { Text } from "../../components/Typography";

const TooltipCalcPosition = ( event, tooltip, target ) => {

	let e = { x: event.clientX, y: event.clientY };
	let margin = 10;
	let padding = 10;

	let aabb = tooltip.getBoundingClientRect();
	let c = {
		x: tooltip.scrollWidth, y: tooltip.scrollHeight
	};

	//console.log( tooltip, tooltip.innerText, c );

//	if( c.y < 2 ){
//		return { x: 0, y: 0 };
//	};

	let b = target.getBoundingClientRect();
	//e.x = b.left + b.width / 2;
	let p = { x: b.x, y: b.y };
	let m = { x: e.x, y: e.y };
	let s = { x: b.width, y: b.height };

	let position = {
		x: (m.x - c.x * 0.5),
		y: (p.y - c.y) - margin
	};

	let offsetXL = m.x - c.x * 0.5 - padding;
	let offsetXR = m.x + c.x * 0.5 + padding;
	let offsetYT = p.y - c.y - margin - padding;
	let screenWidth = document.documentElement.clientWidth;

	if( offsetXL < 0 )
		position.x -= offsetXL;
	if( offsetXR > screenWidth )
		position.x += screenWidth - offsetXR;
	if( offsetYT < 0 )
		position.y = (p.y + s.y) + margin;

	return { x: position.x + "px", y: position.y + "px" };
};

export const Tooltip = ( props ) => {
	let { className, children, style, content, bg, ...rest } = props;
	const [ target, setTarget ] = useState( null );
	const [ created, setCreated ] = useState( false );
	const element = useRef( null );
	const mouse = useRef({ clientX: 0, clientY: 0 });

	let inlineStyle = { ...style };

	if( bg )
		inlineStyle[ "backgroundColor" ] = bg;

	useEffect(() => {

		if( !target )
			return;

		let interval = setInterval(() => {

			if( !element.current || !target ){
				element.current.classList.remove( "tooltip-active" );
				return;
			};

			element.current.classList.add( "tooltip-active" );
			element.current.classList.remove( "tooltip-hidden" );
			let position = TooltipCalcPosition( mouse.current, element.current, target );
			element.current.style.left = position.x;
			element.current.style.top = position.y;
		}, 8 );

		return () => {
			element.current.classList.remove( "tooltip-active" );
			element.current.classList.add( "tooltip-hidden" );
			clearInterval( interval );
		};
	}, [ target ]);

	return <React.Fragment>
		{
			created ? (createPortal(
				(<div
					className={
						Props.className( "tooltip", className, {
							active: false
						})
					}
					style={ inlineStyle }
					ref={ element }
					{ ...rest }
				>
					<div>
						<div className={ "tooltip-arrow" } style={{ borderTopColor: inlineStyle[ "backgroundColor" ] }}></div>
						<Text>{ content }</Text>
					</div>
				</div>),
				document.body
			)) : null
		}
		{
			React.cloneElement( children, {
				onMouseMove: ( e ) => {
					mouse.current = { clientX: e.clientX, clientY: e.clientY }
				},
				onMouseOver: ( e ) => {
					setCreated( true );
					setTarget( e.currentTarget );
				},
				onMouseOut: ( e ) => {
					setTarget( null );
					if( element.current ){
						element.current.classList.remove( "tooltip-active" );
						element.current.classList.add( "tooltip-hidden" );
					}
				}
			})
		}
	</React.Fragment>
};
