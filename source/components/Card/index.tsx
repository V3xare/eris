import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";

import "./styles/index.scss"

export const Card = ( props ) => {
	const { className, children, style, margin, padding, ...rest } = props;
	let wrapStyle = style || {};
	let bodyStyle = {};

	if( padding !== undefined )
		bodyStyle[ "padding" ] = padding;
	if( margin !== undefined )
		wrapStyle[ "margin" ] = margin;

	return (<div
		className={
			Props.className( "card", className, {
				borderless: props.borderless
			})
		}
		style={ wrapStyle }
	>
		<div className={ "card-body" } style={ bodyStyle }>{ children }</div>
	</div>);
};
