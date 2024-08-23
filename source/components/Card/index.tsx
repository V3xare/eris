import React, { forwardRef } from "react";

import { Props } from "../../utility/props";

import "./index.scss"

export const Card = ( props ) => {
	const { className, children, style, margin, padding, header, borderless, small, ...rest } = props;
	let wrapStyle = style || {};
	let bodyStyle = {};

	if( padding !== undefined )
		bodyStyle[ "padding" ] = padding;
	if( margin !== undefined )
		wrapStyle[ "margin" ] = margin;

	return (<div
		className={
			Props.className( "card", className, {
				small: small,
				borderless: borderless
			})
		}
		style={ wrapStyle }
	>
		{
			header ? (
				<div className={ "card-header" }>{ header }</div>
			)
			:
			(
				<div></div>
			)
		}
		<div className={ "card-body" } style={ bodyStyle }>{ children }</div>
	</div>);
};