import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles/index.scss"
import { Props } from "@utility/props";

const Icon = ( props ) => {
	let { className, children, ...rest } = props;

	return <span className={
		Props.className( "icon", className, props.hidden ? "hidden" : "" )
	} { ...props }>{ children }</span>;
};

export namespace Icons{
	export const pencil = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	}
	export const loading = ( props: any ) => {
		return <Icon { ...props }></Icon>;
	}
};