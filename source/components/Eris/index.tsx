import React, { useContext, useEffect, useReducer, useState, useRef , useMemo} from "react";

import { Props } from "../../utility/props";

export const Eris = ( props ) => {
	let { className, children, style, ...rest } = props;
	let inlineStyle = { ...style };

	return (
	<div
		className={
			Props.className( "eris", className )
		}
		style={ inlineStyle }
		{ ...rest }
	>{

	}</div>
    );
};