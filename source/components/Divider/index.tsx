import React, { forwardRef } from "react";

import { Props } from "../../utility/props";
import { Text } from "../../components/Typography";

import "./index.scss"

export const Divider = ( props ) => {
	const { className, children, style, ...rest } = props;

	return (<div
		className={
			Props.className( "divider", className )
		}
		style={ style }
	>{
		children ? (<Text strong>{ children }</Text>) : (null)
	}</div>);
};
