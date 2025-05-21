import React, { useState, useRef, useEffect, createRef } from "react";

import { Props } from "../../utility/props";

import "./index.scss"
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";
import { Tooltip } from "../../components/Tooltip";

export function Editable( props ){

	let { className, value, onChange, inactive, ...rest } = props;
	const [ height, setHeight ] = useState( 0 );
	const [ focus, setFocus ] = useState( false );

	const [ forcedValue, setForcedValue ] = useState( value );

	useEffect(() => {
		setForcedValue( value );
	}, [ value ]);

	const area = useRef( null );
	const textElem = useRef( null );

	return (
	<div
		className={ Props.className( "typography", className, {
			editable: true,
			inactive: inactive
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
	);
};
