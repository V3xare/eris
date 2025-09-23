import React, { useState, useRef, useEffect, createRef, useMemo } from "react";

import { Props } from "../../utility/props";

import "./index.scss"
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";
import { Tooltip } from "../../components/Tooltip";

export function Editable( props ){

	let { 
		className, value, onChange, inactive, stretch, button, 
		alert, notice, conditions, tooltipClassName,
		...rest 
	} = props;
	const [ height, setHeight ] = useState( 0 );
	const [ focus, setFocus ] = useState( false );

	const [ forcedValue, setForcedValue ] = useState( value );

	useEffect(() => {
		setForcedValue( value );
	}, [ value ]);

	const area = useRef( null );
	const textElem = useRef( null );

	let visible = 
		((Array.isArray( notice ) && notice.length > 0) || notice === true) 
		|| 
		((Array.isArray( conditions ) && conditions.length > 0));

	let noticeList = useMemo(() => {
		
		if( !Array.isArray( notice ) && !Array.isArray( conditions ) )
			return { success: true, list: [] };

		if( conditions ){

			let success = true;
			let list: any[] = [];
			let lineSuccess = false;
			let index = 0;
			let error: any = null;

			for( let item of conditions ){

				index++;
				error = null;

				if( item.condition == "json" ){
					try{
						JSON.parse( value || "" );
						lineSuccess = true;
					}catch( e: any ){ 

						if( e && e.message )
							error = JSON.stringify( e.message, null, 3 );

						lineSuccess = false;
					};
				}else{
					lineSuccess = (value || "").match( item.condition );
				};

				if( !lineSuccess )
					success = false;

				list.push(
					<div className={ Props.className( "input-condition", { failed: !lineSuccess, success: lineSuccess }) } key={ index }>
						<div className={ "input-condition-verified" }>{ lineSuccess ? <Icons.checkmark/> : <Icons.cancelcircle/> }</div>
						<div className={ "input-condition-desc" }>{ error ? error : item.desc }</div>
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

	return (
	<Tooltip className={ tooltipClassName } content={ noticeList.list } hidden={ !visible || inactive } alert={ alert || !noticeList.success } paddingLess={ Array.isArray( conditions ) }>
	<div
		className={ Props.className( "typography", className, {
			editable: true,
			inactive: inactive, 
			stretch: stretch,
			alert: (alert || !noticeList.success)
		}) }
	>
		<Text
			{ ...rest }
			preserveNL={ true }
			ref={ textElem }
			onMouseDown={() => {

				if( inactive )
					return;

				setFocus( true );
				setTimeout(() => {

					if( !area.current )
						return;

					area.current.focus();
					area.current.setSelectionRange(
						area.current.value.length,
						area.current.value.length
					);

				});				
			}}
		>
			{ forcedValue || " " }
		</Text>

		{
			button ? (
			<Tooltip content={ "Edit" }>
				<Icons.pencil
					active
					transparent={ focus }
					onClick={() => {

						if( inactive )
							return;

						setFocus( !focus );
						setTimeout(() => {

							if( !area.current )
								return;

							area.current.focus();
							area.current.setSelectionRange(
								area.current.value.length,
								area.current.value.length
							);

						});
					}}
				/>
			</Tooltip>
			) : (null)
		}

		<textarea
			ref={ area }
			className={ Props.className( "typography", "", (!focus ? "hidden" : "") ) }
			onChange={( e ) => {

				if( inactive )
					return;

				textElem.current.innerHTML = e.target.value;

				area.current.style.height = 0 + "px";
				area.current.scrollTop = 0 + "px";
				setHeight( area.current.scrollHeight );
				area.current.style.height = height + "px";
				setForcedValue( e.target.value );

				if( onChange )
					onChange({ ...e, value: e.target.value });

			}}
			onFocus={( e ) => {

				if( inactive )
					return;

				if( props.onFocus )
					props.onFocus( e );

				e.target.style.height = 0 + "px";
				e.target.scrollTop = 0 + "px";
				setHeight( e.target.scrollHeight );
				e.target.style.height = height + "px";
				setForcedValue( e.target.value );

			}}
			onBlur={( e ) => {

				if( inactive )
					return;

				if( props.onBlur )
					props.onBlur( e );

				setFocus( false );

			}}
			onKeyDown={( e ) => {

				if( inactive )
					return;

				if( e.keyCode == 13 && !e.shiftKey ){
					e.target.blur();
				};

			}}
			style={{ height: (height ? (height + "px") : "") }}
			value={ forcedValue }
			rows={ 1 }
		/>

	</div>
	</Tooltip>
	);
};
