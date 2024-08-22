import React, { forwardRef, useState, useEffect, useContext, useMemo, useRef } from "react";
import { Props } from "../../utility/props";
import { Text } from "../../components/Typography";
import { useAnimation } from "../../utility/animation";
import Common from "../../utility/common";
import { Toggle } from "../../components/Toggle/toggle";

import "./multiselect.scss"

export const MultiSelect = ( props ) => {
	let { 
		className, children, propValue, style, margin, padding, 
		title, value,
		disabled,
		placeholder,
		onChange,
		preset,
		suggestions,
		...rest 
	} = props;

	const wrapRef = useRef( null );

	const [ filter, setFilter ] = useState( "" );
	const [ list, setList ] = useState([]);
	const [ presetTable, setPresetTable] = useState({});
	const [ listIndex, setListIndex ] = useState( 0 );
	const [ isActive, setIsActive ] = useState( false );

	if( !suggestions )
		suggestions = [];

	useEffect(() => {
		setList( Array.isArray( value ) ? value : [] );
	}, [ value ]);
	useEffect(() => {
		setPresetTable( preset || {} );
	}, [ preset ]);

	let clickOutside = ( e ) => {

		if( !wrapRef.current )
			return;

		if( Common.inside( e.target, wrapRef.current ) )
			return;

		setIsActive( false );
	};
	
	useEffect(() => {
		window.document.addEventListener( "mousedown", clickOutside );
		return () => {
			window.document.removeEventListener("mousedown", clickOutside );
		}
	}, []);

	let sgList: any[] = [];
	let filterLower = (filter || "").toLowerCase();

	for( const item of suggestions ){

		let title = item.title || item.value || "";
		let titleLower = title.toLowerCase();

		if( filter && (titleLower.indexOf( filterLower ) < 0) )
			continue;

		sgList.push({
			title: item.title || item.value || "",
			value: item.value || item.title || "",
			lower: titleLower,
			icon: item.icon,
			min: item.min,
			max: item.max,
			type: item.type || "text",
			selected: list.find(( f ) => f == (item.value || item.title) )
		});
	};

	if( !onChange )
		onChange = () => {};

	const childrenElem = useAnimation.Expand( isActive );
	const inputRef = useRef( null );

	return (
	<div 
		className={ 
			Props.className( "multiselect", className, { disabled: disabled } ) 
		}
		style={ style }
		ref={ wrapRef }
	>
		<div className={ Props.className( "multiselect-header", { active: isActive } ) }>
			<div className={ "multiselect-header-tags" }>{ 
				list.map(( v ) => {
					const item = suggestions.find(( f ) => f.value == v ) || { title: v, value: v };
					return <div key={ item.value } className={ "multiselect-header-item" }>
						{ item.icon }<Text>{ item.title }</Text>
						<span className={ "multiselect-header-item-remove" } 
							onClick={() => { 
								let result = list.filter(( f ) => f != item.value );
								setList( result );
								onChange({ value: result, preset: { ...presetTable } });
							}}
						>x</span>
					</div>
				}) }
			</div>
			<input className={ "multiselect-header-input" } 
				value={ filter }
				placeholder={ placeholder || "" }
				ref={ inputRef }
				onFocus={() => setIsActive( true ) }
				onChange={( e ) => { setListIndex( 0 ); setFilter( e.target.value || "" ); }} 
				onKeyDown={( e ) => {

					if( e.keyCode == 38 ){

						if( listIndex < 1 )
							return;

						setListIndex( listIndex - 1 );
						return;			
					};
					if( e.keyCode == 40 ){

						if( (listIndex + 1) >= sgList.length )
							return;

						setListIndex( listIndex + 1 );
						return;			
					};
					
					if( e.keyCode != 13 )
						return;

					let item = sgList[ listIndex ];

					if( !item )
						return;
					
					let result = item.selected ? list.filter(( f ) => f != item.value ) : [ ...list, item.value ];
					setList( result );
					onChange({ value: result, preset: { ...presetTable } });

					if( !filter )
						return;

					setFilter( "" );
					setListIndex( 0 );
				}}
			/>
		</div>
		<div className={ Props.className( "multiselect-suggestions", { expanded: isActive } ) } ref={ childrenElem }>{
				sgList.map(( item, index ) => {
					return <div 
						key={ item.value } 
						className={ Props.className( "multiselect-suggestions-item", { selected: item.selected, focused: listIndex == index } ) }
						onMouseUp={( e ) => {
							e.preventDefault();
							e.stopPropagation();				
						}}
						onMouseDown={( e ) => { 
							e.preventDefault();
							e.stopPropagation();
							let result = item.selected ? list.filter(( f ) => f != item.value ) : [ ...list, item.value ];
							setList( result );
							onChange({ value: result, preset: { ...presetTable } });
						}}
						><span className={ "multiselect-suggestions-item-checkbox" }></span>{ item.icon }<Text>{ item.title }</Text>
							{
								preset ? (
									item.type == "checkbox" ? (
										<Toggle 
											onMouseUp={( e ) => {
												e.stopPropagation();				
											}}										
											onMouseDown={( e ) => {
												e.stopPropagation();
											}}			
											onChange={( e ) => { 
												let table = { ...presetTable };
												table[ item.value ] = e.value;
												onChange({ value: [ ...list ], preset: table });
											}} 																		
											value={ (presetTable[ item.value ] === undefined ? item.preset : presetTable[ item.value ]) || "" 
										}/>
									) : (
										<input 
											onMouseUp={( e ) => {
												e.stopPropagation();				
											}}										
											onMouseDown={( e ) => {
												e.stopPropagation();
											}}
											onChange={( e ) => { 
												let table = { ...presetTable };

												if( item.type == "number" ){
													table[ item.value ] = Common.int( e.target.value );											
												}else
													table[ item.value ] = e.target.value;

												onChange({ value: [ ...list ], preset: table });
											}} 
											type={ item.type } 
											min={ item.min }
											max={ item.max }
											value={ (presetTable[ item.value ] === undefined ? item.preset : presetTable[ item.value ]) || "" }
										/>
									)

								) : (null)
							}
						</div>
				}) }
		</div>		
	</div>
	);
};