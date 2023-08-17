import React, { forwardRef, useState, useEffect, useContext } from "react";
import { Props } from "../../utility/props";
import { AutoCompleteContext } from "../../components/AutoComplete";

import "./index.scss"

export const Input = ( props ) => {
	const { 
		className, children, propValue, style, margin, padding, 
		onChange, onFocus, onBlur, onKeyDown, onKeyUp,
		...rest 
	} = props;
	const [ value, setValue ] = useState( children );
	const autocomplete = useContext( AutoCompleteContext );

	useEffect(() => {
		setValue( propValue !== undefined ? propValue : children );
	}, [ children, propValue ]);

	useEffect(() => {

		if( autocomplete.value === undefined || autocomplete.value === null )
			return;

		setValue( autocomplete.value );

	}, [ autocomplete.value ]);

	return (<input
		className={
			Props.className( "input", className )
		}
		style={ style }
		value={ value }
		onFocus={( e ) => {

			autocomplete.onFocus({ value: e.target.value, event: e });

			if( onFocus )
				onFocus({ value: e.target.value, event: e });

		}}
		onBlur={( e ) => {

			autocomplete.onBlur({ value: e.target.value, event: e });

			if( onBlur )
				onBlur({ value: e.target.value, event: e });

		}}
		onKeyDown={( e ) => {

			autocomplete.onKeyDown({ value: e.target.value, event: e });

			if( onKeyDown )
				onKeyDown({ value: e.target.value, event: e });

		}}			
		onKeyUp={( e ) => {

			autocomplete.onKeyUp({ value: e.target.value, event: e });

			if( onKeyUp )
				onKeyUp({ value: e.target.value, event: e });

		}}	
		onChange={( e ) => {

			setValue( e.target.value );

			autocomplete.onChange({ value: e.target.value, event: e });

			if( onChange )
				onChange({ value: e.target.value, event: e });

		}}
	/>);
};