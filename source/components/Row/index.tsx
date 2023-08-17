import React, { forwardRef } from "react";

import { Props } from "../../utility/props";

import "./index.scss"
import Common from "../../utility/common";

export const ParseFlexParam = ( value ) => {

	if( Common.int( value ) == value || typeof value == "number" )
		value = value + " " + value +  " auto";
	else{
		value = (value || "").trim();

		if( !value.match( / /g ) ){
			value = "0 0 " + value;
		};

	};

	return value;
};
export const ParseGapParam = ( value ) => {

	if( Common.int( value ) == value || typeof value == "number" )
		value = value + "px " + value + "px";
	else if( Array.isArray( value ) ){
		value = ""
			+ (Common.int( value[ 0 ] ) == value[ 0 ] || typeof value[ 0 ] == "number" ? (value[ 0 ] + "px") : value[ 0 ]) 
			+ " " 
			+ (Common.int( value[ 1 ] ) == value[ 1 ] || typeof value[ 1 ] == "number" ? (value[ 1 ] + "px") : value[ 1 ]);
	}else if( typeof value == "string" ){
		value = (value || "").trim();

		if( !value.match( / /g ) ){
			value = "0 0 " + value;
		};

	}else if( value === true ){
		value = "8px";
	};

	return value;
};

export const Row = ( props ) => {
	let {
		className,
		children,
		style,
		flex,
		gap,
		stretch,
		...rest
	} = props;

	let inlineStyle = { ...style };

	if( flex )
		inlineStyle[ "flex" ] = ParseFlexParam( flex );

	if( gap )
		inlineStyle[ "gap" ] = ParseGapParam( gap );

	if( stretch )
		inlineStyle[ "width" ] = "100%";

	return (<div
		className={
			Props.className( "row", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		children
	}</div>);
};
