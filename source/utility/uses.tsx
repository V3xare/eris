import React, { forwardRef, useState, useEffect, useContext, useMemo, useRef } from "react";

export const Press = ( props ) => {
	let { delay, onChange, onComplete, onHold, step, ...rest } = props;
	const timeout = useRef( null );
	const interval = useRef( null );

	if( delay !== 0 )
		delay = delay || 500;	
	if( step !== 0 )
		step = step || 12;

	if( !onChange )
		onChange = () => {};	
	if( !onComplete )
		onComplete = () => {};

	return <React.Fragment>{ 
		props.children ?
		(React.cloneElement( typeof props.children == "string" ? (<span>{ props.children }</span>) : props.children, {
			onMouseDown: ( e ) => {

				if( !delay )
					return;

				clearInterval( interval.current );
				interval.current = null;
				clearTimeout( timeout.current );
				timeout.current = null;
				onChange({ value: true });

				timeout.current = setTimeout(() => {
					onChange({ value: false, complete: true });
					onComplete({ value: true });
					timeout.current = null;
					clearInterval( interval.current );
					interval.current = null;
				}, delay );

				if( !onHold || step < 1 )
					return;

				let it = 0;

				interval.current = setInterval(() => {
					it += step;
					onHold({ value: (it / delay) });
				}, step );

			},
			onMouseUp: ( e ) => {

				if( !timeout.current )
					return;

				clearTimeout( timeout.current );
				timeout.current = null;
				clearInterval( interval.current );
				interval.current = null;
				onChange({ value: false });

			},			
		})) : null		 
	}</React.Fragment>
};