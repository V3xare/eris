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

			if( !elem.current )
				return;

			elem.current.removeEventListener( "transitionend", transition );

			requestAnimationFrame(function(){

				if( !elem.current )
					return;

				elem.current.style.height = expanded ? "0px" : elem.current.scrollHeight + "px";

				requestAnimationFrame(function(){

					if( !elem.current )
						return;

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