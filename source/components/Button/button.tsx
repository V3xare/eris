import React, { forwardRef, useState, useEffect, useContext, useMemo } from "react";
import { Props } from "../../utility/props";
import { AutoCompleteContext } from "../../components/AutoComplete";
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";

import "./button.scss"

export const Button = ( props ) => {
	let { 
		className, children, propValue, style, margin, padding, 
		title, value,
		disabled,
		onClick,
		...rest 
	} = props;

	return (
	<div 
		className={ 
			Props.className( "button", className, { disabled: disabled } ) 
		}
		style={ style }
		onClick={( e ) => {

			if( onClick && !disabled )
				onClick({ event: e });

		}}
	>{ title || value || "" }</div>
	);
};