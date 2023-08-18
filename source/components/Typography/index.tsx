import React, { forwardRef } from "react";

import { Props } from "../../utility/props";
import { Link } from "react-router-dom";

import "./index.scss"

export const Text = forwardRef(( props, ref ) => {

	const { className, children, preserveNL, editable, italic, strong, link, q, transition, ...rest } = props;

	return (<div
		className={
			Props.className( "typography", className, {
				editable: editable,
				italic: italic,
				strong: strong,
				link: link,
				q: q,
				transition: transition
			})
		}
		{ ...rest }
		ref={ ref }
	>{
		link !== undefined ? (<Link to={ link }>{ 
			(preserveNL && children.length > 0 && children[ children.length -1 ] == '\n' ? (children + '\n') : children)
		}</Link>) 
		: 
			(preserveNL && children.length > 0 && children[ children.length -1 ] == '\n' ? (children + '\n') : children)
	}</div>);
});
