import React, { forwardRef, useState, useEffect, useContext, useMemo } from "react";
import { Props } from "../../utility/props";
import { AutoCompleteContext } from "../../components/AutoComplete";
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";

import "./toggle.scss"

export const Toggle = ( props ) => {
	let { 
		className, children, propValue, style, margin, padding, 
		value,
		active,
		onChange,
		...rest 
	} = props;

	active = active === undefined ? (value === undefined ? (!!children) : (!!value)) : (!!active);

	return (
	<div 
		className={ 
			Props.className( "toggle", className, { active: active } ) 
		}
		style={ style }
		onClick={( e ) => {

			if( onChange )
				onChange({ value: !active, event: e });

		}}
		{ ...rest }
	>
		<div></div>
	</div>
	);
};