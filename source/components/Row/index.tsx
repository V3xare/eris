import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";

import "./styles/index.scss"
import Common from "@utility/common";

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

export const Row = ( props ) => {
	let {
		className,
		children,
		style,
		flex,
		gap,
		...rest
	} = props;

	let inlineStyle = { ...style };

	if( flex )
		inlineStyle[ "flex" ] = ParseFlexParam( flex );

	if( gap )
		inlineStyle[ "gap" ] = gap;

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
