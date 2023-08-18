import React, { forwardRef } from "react";

import { Props } from "../../utility/props";

import "./index.scss"

export const Column = ( props ) => {
	let { className, children, style, flex, stretch, ...rest } = props;

	let inlineStyle = { ...style };

	if( flex )
		inlineStyle[ "flex" ] = Props.parseFlex( flex );

	if( stretch )
		inlineStyle[ "height" ] = "100%";

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
