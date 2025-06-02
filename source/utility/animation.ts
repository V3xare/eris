import React, { useContext, useEffect, useReducer, useState, useRef } from "react";

export namespace useAnimation{
	export const Expand = ( expanded, params?, ref? ) => {

		const elem = ref || useRef( null );
		
		if( !params )
			params = {};

		//const computed = getComputedStyle( elem.current );		
		//console.log( computed.overflowY );	

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
		}, []);

		useEffect(() => {

			if( !elem.current )
				return;

			elem.current.removeEventListener( "transitionend", transition );

			//requestAnimationFrame(function(){

				if( !elem.current )
					return;
					
				if( expanded ){
					elem.current.style.height = params.minHeight !== undefined ? params.minHeight : "0px";
					elem.current.style.overflowY = null;
				}else{
					elem.current.style.height = (elem.current.scrollHeight || 1) + "px";
					elem.current.style.overflowY = "hidden";
				};

				requestAnimationFrame(function(){

					if( !elem.current )
						return;

					if( !expanded ){
						elem.current.style.height = params.minHeight !== undefined ? params.minHeight : "0px";
						elem.current.style.overflowY = null;
					}else{
						elem.current.style.height = (elem.current.scrollHeight || 1) + "px";
						elem.current.style.overflowY = "hidden";
					};						

					elem.current.addEventListener( "transitionend", transition );
				});

			//});

			return () => {

				if( !elem.current )
					return;

				elem.current.removeEventListener( "transitionend", transition );
			};
		}, [ expanded ]);

		return elem;
	};
};


/*
(() => {
	let list = document.getElementsByClassName( "glyph" );
	let text = "";

	for( const item of list ){
		const name = item.getElementsByClassName( "glyphName" )[ 0 ].innerText.replace( /[-]/g, "" );
		const value = item.getElementsByClassName( "talign-right" )[ 0 ].firstChild.value;
		text +=
"	export const " + name + " = ( props: any ) => {\n" +
"		return <Icon { ...props }>" + value + "</Icon>;\n" +
"	};\n";
	};

	return text;
})();
 */