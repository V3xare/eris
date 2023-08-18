import React, { forwardRef, useState, useEffect, useContext, useMemo } from "react";
import { Props } from "../../utility/props";
import { AutoCompleteContext } from "../../components/AutoComplete";
import { Text } from "../../components/Typography";

import "./index.scss"

export const Input = ( props ) => {
	let { 
		className, children, propValue, style, margin, padding, 
		placeholder, tools,
		onChange, onFocus, onBlur, onKeyDown, onKeyUp, onClear,
		...rest 
	} = props;
	const [ value, setValue ] = useState( children );
	const [ isFocused, setIsFocused ] = useState( false );
	const autocomplete = useContext( AutoCompleteContext );

	useEffect(() => {
		setValue( propValue !== undefined ? propValue : children );
	}, [ children, propValue ]);

	useEffect(() => {

		if( autocomplete.value === undefined || autocomplete.value === null )
			return;

		setValue( autocomplete.value );

	}, [ autocomplete.value ]);

	const parseTools = ( list, direction ) => {

		let result: any[] = [];

		if( !list || !Array.isArray( list ) )
			return result;

		let index: number = 0;	

		for( const item of list ){

			if( !item || !item.icon )
				continue;

			if( direction == 1 && (item.direction != 1 && item.direction != "right") )	
				continue;

			if( direction == -1 && (item.direction == 1 || item.direction == "right") )	
				continue;

			result.push( 
				<Text 
					key={ index }
					className={ Props.classNameEx( "input", { "tool": true } ) }
					onClick={( event ) => {

						console.log( event, item.onClick  );

						if( !item.onClick )
							return;

						item.onClick({
							autocomplete: autocomplete,
							value: value,
							setValue: ( v ) => {
								setValue( v );
							},
						});

					}}
				>
					{ item.icon }
				</Text>
			);
			index++;

		};

		return result;
	};

	const toolsLeft = useMemo(() => {
		return parseTools( tools, -1 );
	}, [ tools, autocomplete ] );

	const toolsRight = useMemo(() => {
		return parseTools( tools, 1 );
	}, [ tools, autocomplete ] );	

	return (
	<span 
		className={ 
			Props.className( "input", className, { focus: isFocused } ) 
		}
		style={ style }
	>
		<span className={ "input-left" }>{ toolsLeft }</span>
		<input
			placeholder={ placeholder }
			value={ value || "" }
			className={ "typography" }
			onFocus={( e ) => {

				autocomplete.onFocus({ value: e.target.value, event: e });

				if( onFocus )
					onFocus({ value: e.target.value, event: e });

				setIsFocused( true );

			}}
			onBlur={( e ) => {

				autocomplete.onBlur({ value: e.target.value, event: e });

				if( onBlur )
					onBlur({ value: e.target.value, event: e });

					setIsFocused( false );	

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
		/>
		<span className={ "input-right" }>{ toolsRight }</span>
	</span>
	);
};