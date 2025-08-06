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
		align,
		justify,
		...rest
	} = props;

	let inlineStyle = { ...style };

	if( flex )
		inlineStyle[ "flex" ] = Props.parseFlex( flex );

	if( gap )
		inlineStyle[ "gap" ] = Props.parseGap( gap );

	if( stretch )
		inlineStyle[ "width" ] = "100%";	
	
	if( align )
		inlineStyle[ "alignItems" ] = align;	
	
	if( justify )
		inlineStyle[ "justifyContent" ] = justify;

	return (<div
		className={
			Props.className( "row", className, { reverse: reverse } )
		}
		style={ inlineStyle }
		{ ...rest }
	>{
		children
	}</div>);
};
