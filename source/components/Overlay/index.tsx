import React, { forwardRef } from "react";
import { Props } from "../../utility/props";
import Common from "../../utility/common";

import "./index.scss"

export const Overlay = ( props ) => {
	let { className, children, style, stretch, direction, margin, ...rest } = props;
	let inlineStyle = { ...style };
	direction = { 
		x: direction ? Common.int( direction[ 0 ] ) : 0, 
		y: direction ? Common.int( -direction[ 1 ] ) : 0
	};		
	let d = { 
		x: (direction.x + 1.0) * 0.5, 
		y: (direction.y + 1.0) * 0.5,
	};	
	margin = {
		x: Array.isArray( margin ) ? margin[ 0 ] : margin,
		y: Array.isArray( margin ) ? margin[ 1 ] : margin,
	};
	margin.x = typeof margin.x == "number" ? (margin.x + "px") : (margin.x ? margin.x : "0px");
	margin.y = typeof margin.y == "number" ? (margin.y + "px") : (margin.y ? margin.y : "0px");

	inlineStyle[ "left" ] = (d.x * 100.0) + "%";
	inlineStyle[ "top" ] = (d.y * 100.0) + "%";

	let translate = {
		x: (d.x * -100.0),
		y: (d.y * -100.0)
	};

	if( direction.x > 0 ){
		translate.x = 0;
		delete inlineStyle[ "left" ];
		inlineStyle[ "right" ] = "0";
	};	
	if( direction.y > 0 ){
		translate.y = 0;
		delete inlineStyle[ "top" ];
		inlineStyle[ "bottom" ] = "0";
	};
	
	inlineStyle[ "transform" ] = "translate( " + (translate.x) + "%, " + (translate.y) + "% )";
	inlineStyle[ "margin" ] = 
		(direction.y < 0 ? margin.y : 0) 
		+ " " + 
		(direction.x > 0 ? margin.x : 0) 
		+ " " + 
		(direction.y > 0 ? margin.y : 0) 
		+ " " + 
		(direction.x < 0 ? margin.x : 0);

	return (<div
		className={
			Props.className( "overlay", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>
		<div className={ Props.className( "overlay-wrap" ) }>
		{
			children
		}
		</div>
	</div>);
};
