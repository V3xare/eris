import React, { forwardRef } from "react";

import { Props } from "../../utility/props";

import "./styles/index.scss"

export const Flex = ( props, ref ) => {

	const { className, children } = props;

	return (<div
		ref={ ref }
		className={
			Props.className( "flex", className )
		}
	>{
		children
	}</div>);
};
