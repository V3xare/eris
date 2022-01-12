import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { Props } from "@utility/props";

import "./styles/index.scss"

export const Text = ( props ) => {

	const { className, children } = props;

	return (<div
		className={
			Props.className( "typography", className, {
				editable: props.editable,
				italic: props.italic,
				strong: props.strong,
				link: props.link
			})
		}
	>{
		props.link !== undefined ? (<a href={ props.link }>{ children }</a>) : children
	}</div>);
};
