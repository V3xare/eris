import React, { forwardRef, useState, useEffect, useContext, useMemo, useRef } from "react";
import { Props } from "../../utility/props";
import { AutoCompleteContext } from "../../components/AutoComplete";
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";

import "./index.scss"
import { Tooltip } from "../../components/Tooltip";

export const Input = ( props ) => {
	let { 
		className, children, propValue, style, margin, padding, 
		placeholder, tools, injection,
		size,
		alert, notice,
		onChange, onFocus, onBlur, onKeyDown, onKeyUp, onClear, larger,
		...rest 
	} = props;
	const [ value, setValue ] = useState( children );
	const [ isFocused, setIsFocused ] = useState( false );
	const autocomplete = useContext( AutoCompleteContext );
	const elemWrap = useRef( null );

	useEffect(() => {
		setValue( propValue !== undefined ? propValue : children );
	}, [ children, propValue ]);

	let noticeList = useMemo(() => {
		
		if( !Array.isArray( notice ) )
			return [];

		return notice.map(( item, index ) => {
			return (
				<div key={ index }>
					{ item }
				</div>
			)
		})
	}, [ notice ]);

	let visible = ((Array.isArray( notice ) && notice.length > 0) || notice === true);

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

		for( let item of list ){

			if( typeof item == "string" ){

				if( item == "search" ){
					item = { icon: <Icons.search active/>, direction: 0, onClick: ( event ) => {
						event.autocomplete.select();
					}};
				}else if( item == "clear" ){
					item = { icon: <Icons.cross active style={{ fontSize: "70%" }}/>, direction: 1, onClick: ( event ) => {
						event.setValue( "" );
					}};
				}else 
					continue;

			};			

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
	}, [ tools, autocomplete, value ] );

	const toolsRight = useMemo(() => {
		return parseTools( tools, 1 );
	}, [ tools, autocomplete, value ] );	

	return (
	<Tooltip content={ noticeList } hidden={ !visible } alert={ alert }>
	<span 
		className={ 
			Props.className( "input", className, { focus: isFocused, larger: larger, alert: alert } ) 
		}
		style={ style }
	>
		<span className={ "input-left" }>{ toolsLeft }</span>
		{ injection ? injection : null }
		<input
			{ ...rest }
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

				let v = e.target.value;

				autocomplete.onChange({ value: e.target.value, event: e, ref: elemWrap.current, rewrite: ( newV ) => v = newV });

				if( onChange )
					onChange({ value: e.target.value, event: e, ref: elemWrap.current, rewrite: ( newV ) => v = newV });

				setValue( v );

			}}
			size={ size }
			ref={ elemWrap }
		/>
		<span className={ "input-right" }>{ toolsRight }</span>
	</span>
	</Tooltip>
	);
};