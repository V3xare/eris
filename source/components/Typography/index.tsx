import React, { forwardRef } from "react";

import { Props } from "../../utility/props";
import { Link } from "react-router-dom";

import "./styles/index.scss"

export const Text = forwardRef(( props, ref ) => {

	const { className, children, preserveNL } = props;

	return (<div
		className={
			Props.className( "typography", className, {
				editable: props.editable,
				italic: props.italic,
				strong: props.strong,
				link: props.link,
				q: props.q,
				transition: props.transition
			})
		}
		ref={ ref }
	>{
		props.link !== undefined ? (<Link to={ props.link }>{ 
			(preserveNL && children.length > 0 && children[ children.length -1 ] == '\n' ? (children + '\n') : children)
		}</Link>) 
		: 
			(preserveNL && children.length > 0 && children[ children.length -1 ] == '\n' ? (children + '\n') : children)
	}</div>);
});
