import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";
import { Text } from "@components/Typography";

import "./styles/index.scss"

export const Divider = ( props ) => {
	const { className, children, style, ...rest } = props;

	return (<div
		className={
			Props.className( "divider", className )
		}
		style={ style }
	>{
		<Text strong>{ children }</Text>
	}</div>);
};
