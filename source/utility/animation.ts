import React, { useContext, useEffect, useReducer, useState, useRef } from "react";

export namespace useAnimation{
	export const Expand = ( expanded, ref? ) => {

		const elem = ref || useRef( null );

		useEffect(() => {
			elem.current.style.height = "0px";
		}, []);

		const transition = ( e ) => {

			if( !elem.current )
				return;

			if( expanded )
				elem.current.style.height = null;
			else
				elem.current.style.height = "0px";
			elem.current.removeEventListener( "transitionend", transition );
		};

		useEffect(() => {
			elem.current.removeEventListener( "transitionend", transition );

			requestAnimationFrame(function(){
				elem.current.style.height = expanded ? "0px" : elem.current.scrollHeight + "px";

				requestAnimationFrame(function(){
					elem.current.style.height = !expanded ? "0px" : elem.current.scrollHeight + "px";
					elem.current.addEventListener( "transitionend", transition );
				});

			});

			return () => {

				if( !elem.current )
					return;

				elem.current.removeEventListener( "transitionend", transition );
			};
		}, [ expanded ]);

		return elem;
	};
};