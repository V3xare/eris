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
		span,
		inactive,
		alert, notice, conditions, tooltipClassName,
		onChange, onFocus, onBlur, onKeyDown, onKeyUp, onClear, larger,
		...rest 
	} = props;
	const [ value, setValue ] = useState( children );
	const [ isFocused, setIsFocused ] = useState( false );
	const autocomplete = useContext( AutoCompleteContext );
	const elemWrap = useRef( null );
	let visible = 
		((Array.isArray( notice ) && notice.length > 0) || notice === true) 
		|| 
		((Array.isArray( conditions ) && conditions.length > 0));

	useEffect(() => {
		setValue( propValue !== undefined ? propValue : children );
	}, [ children, propValue ]);

	useEffect(() => {

		if( autocomplete.value === undefined || autocomplete.value === null )
			return;

		setValue( autocomplete.value );

	}, [ autocomplete.value ]);

	let noticeList = useMemo(() => {
		
		if( !Array.isArray( notice ) && !Array.isArray( conditions ) )
			return { success: true, list: [] };

		if( conditions ){

			let success = true;
			let list: any[] = [];
			let lineSuccess = false;
			let index = 0;

			for( let item of conditions ){

				index++;
				lineSuccess = (value || "").match( item.condition );

				if( !lineSuccess )
					success = false;

				list.push(
					<div className={ Props.className( "input-condition", { failed: !lineSuccess, success: lineSuccess }) } key={ index }>
						<div className={ "input-condition-verified" }>{ lineSuccess ? <Icons.checkmark/> : <Icons.cancelcircle/> }</div>
						<div className={ "input-condition-desc" }>{ item.desc }</div>
					</div>
				);

			};

			return { 
				success: success, 
				list: <div className={ "input-conditions" }>{ list }</div>
			}	
		}else{
			return { 
				success: true, 
				list: notice.map(( item, index ) => {
					return (
						<div key={ index }>
							{ item }
						</div>
					)
				})
			}	
		};

	}, [ notice, conditions, value ]);

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
						event.autocomplete.clear();
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
	<Tooltip className={ tooltipClassName } content={ noticeList.list } hidden={ !visible || inactive } alert={ alert || !noticeList.success } paddingLess={ Array.isArray( conditions ) }>
	<span 
		className={ 
			Props.className( "input", className, { focus: isFocused, larger: larger, span: span, inactive, alert: (alert || !noticeList.success) } ) 
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

				if( inactive ){
					e.preventDefault();
					return;
				};

				autocomplete.onFocus({ value: e.target.value, event: e });

				if( onFocus )
					onFocus({ value: e.target.value, event: e });

				setIsFocused( true );

			}}
			onBlur={( e ) => {

				if( inactive ){
					e.preventDefault();
					return;
				};

				autocomplete.onBlur({ value: e.target.value, event: e });

				if( onBlur )
					onBlur({ value: e.target.value, event: e });

					setIsFocused( false );	

			}}
			onKeyDown={( e ) => {

				if( inactive ){
					e.preventDefault();
					return;
				};

				autocomplete.onKeyDown({ value: e.target.value, event: e });

				if( onKeyDown )
					onKeyDown({ value: e.target.value, event: e });

			}}			
			onKeyUp={( e ) => {

				if( inactive ){
					e.preventDefault();
					return;
				};

				autocomplete.onKeyUp({ value: e.target.value, event: e });

				if( onKeyUp )
					onKeyUp({ value: e.target.value, event: e });

			}}	
			onChange={( e ) => {

				if( inactive ){
					e.preventDefault();
					return;
				};

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