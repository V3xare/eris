import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";

import "./styles/index.scss"
import Common from "@utility/common";
import { ParseFlexParam } from "@components/Row";

export const Column = ( props ) => {
	let { className, children, style, flex, ...rest } = props;

	let inlineStyle = { ...style };

	if( flex )
		inlineStyle[ "flex" ] = ParseFlexParam( flex );

	return (<div
		className={
			Props.className( "column", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		children
	}</div>);
};
