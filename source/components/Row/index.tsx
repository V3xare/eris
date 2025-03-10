import React, { forwardRef } from "react";

import { Props } from "../../utility/props";

import "./index.scss"

export const Row = ( props ) => {
	let {
		className,
		children,
		style,
		flex,
		gap,
		stretch,
		reverse,
		...rest
	} = props;

	let inlineStyle = { ...style };

	if( flex )
		inlineStyle[ "flex" ] = Props.parseFlex( flex );

	if( gap )
		inlineStyle[ "gap" ] = Props.parseGap( gap );

	if( stretch )
		inlineStyle[ "width" ] = "100%";

	return (<div
		className={
			Props.className( "row", className, { reverse: true } )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		children
	}</div>);
};
