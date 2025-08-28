import React, { useContext, useEffect, useReducer, useState, useRef } from "react";
import Common from "./common";

export namespace useAnimation{
	export const Expand = ( expanded, params?, ref? ) => {

		const elem = ref || useRef( null );
		const animationFrame = useRef( null );
		
		if( !params )
			params = {};

		const transition = ( e ) => {

			if( !elem.current )
				return;

			if( expanded ){
				elem.current.style.height = null;
				elem.current.style.overflowY = null;
			}else{
				elem.current.style.height = params.minHeight !== undefined ? params.minHeight : "0px";
				elem.current.style.overflowY = "hidden";
			};

			elem.current.removeEventListener( "transitionend", transition );
		};

		useEffect(() => {
			transition({});
			return () => {
				if( !elem.current )
					return;
				elem.current.removeEventListener( "transitionend", transition );
			};
		}, []);

		useEffect(() => {

			if( !elem.current )
				return;

			elem.current.removeEventListener( "transitionend", transition );
			let ex = expanded;

			if( animationFrame.current )
				cancelAnimationFrame( animationFrame.current );
			animationFrame.current = requestAnimationFrame(function(){

				if( !elem.current )
					return;
					
				if( ex ){
					elem.current.style.height = params.minHeight !== undefined ? params.minHeight : "0px";
					elem.current.style.overflowY = null;
				}else{
					elem.current.style.height = (elem.current.scrollHeight || 1) + "px";
					elem.current.style.overflowY = "hidden";
				};

				if( animationFrame.current )
					cancelAnimationFrame( animationFrame.current );

				elem.current.addEventListener( "transitionend", transition );

				animationFrame.current = requestAnimationFrame(function(){

					if( !elem.current )
						return;

					elem.current.removeEventListener( "transitionend", transition );

					if( !ex ){
						elem.current.style.height = params.minHeight !== undefined ? params.minHeight : "0px";
						elem.current.style.overflowY = null;
					}else{
						elem.current.style.height = (elem.current.scrollHeight || 1) + "px";
						elem.current.style.overflowY = "hidden";
					};						

					elem.current.addEventListener( "transitionend", transition );
				});

			});

			return () => {

				if( !elem.current )
					return;

				elem.current.removeEventListener( "transitionend", transition );
			};
		}, [ expanded, elem.current ]);

		return elem;
	};
};
