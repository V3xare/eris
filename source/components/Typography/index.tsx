import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";

import "./styles/index.scss"

export const Text = forwardRef(( props, ref ) => {

	const { className, children } = props;

	return (<div
		ref={ ref }
		className={ Props.className( "typography", className, {
			editable: props.editable
		}) }
	>{
		children
	}</div>);
});
