import React, { forwardRef, useState, useEffect, useContext, useMemo, useRef } from "react";
import { Props } from "../../utility/props";
import VMath from "../../utility/vmath";
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
		inactive,
		headerless,
		stretch,
		hasDefault,
		defaultValue,
		sortable,
		suggestions,
		...rest 
	} = props;

	const wrapRef = useRef( null );
	const mouseDownRef = useRef( null );

	const [ drag, setDrag ] = useState( null );
	const [ defaultValueForced, setDefaultValueForced ] = useState( null );
	const [ filter, setFilter ] = useState( "" );
	const [ list, setList ] = useState([]);
	const [ listIndex, setListIndex ] = useState( 0 );
	const [ expanded, setExpanded ] = useState( headerless ? true : false );

	if( !suggestions )
		suggestions = [];

	useEffect(() => {
		setList( Array.isArray( value ) ? value : [] );
	}, [ value ]);	
	useEffect(() => {
		setDefaultValueForced( defaultValue );
	}, [ defaultValue ]);

	useEffect(() => {

		if( inactive )
			return;

		if( headerless && !expanded )
			setExpanded( true );
		else if( !headerless && expanded )
			setExpanded( false );

	}, [ headerless ]);

	let clickOutside = ( e ) => {

		if( !wrapRef.current )
			return;

		if( Common.inside( e.target, wrapRef.current ) )
			return;

		setExpanded( false );
	};
	let mouseupOutside = ( e ) => {

		if( !drag )
			return;

		setDrag( null );
	};
	
	useEffect(() => {
		window.document.addEventListener( "mousedown", clickOutside );
		return () => {
			window.document.removeEventListener("mousedown", clickOutside );
		}
	}, []);
	useEffect(() => {
		window.document.addEventListener( "mouseup", mouseupOutside );
		return () => {
			window.document.removeEventListener("mouseup", mouseupOutside );
		}
	}, [ drag ]);

	const itemToObject = ( title, item ) => {
		return {
			title: item.title || item.value || "",
			value: item.value || item.title || "",
			lower: title,
			icon: item.icon,
			min: item.min,
			max: item.max,
			type: item.type,
			selected: list.find(( f ) => f == (item.value || item.title) )
		}
	};
	let sgList: any[] = useMemo(() => {

		let array: any[] = [];
		let filterLower = (filter || "").toLowerCase();

		if( sortable ){

			for( const key of list ){

				let item = suggestions.find(( f ) => f.value == key );

				if( !item )
					continue;

				let title = item.title || item.value || "";
				let titleLower = title.toLowerCase();

				if( filter && (titleLower.indexOf( filterLower ) < 0) )
					continue;

				array.push(itemToObject( titleLower, item ));
			};

		};

		for( const item of suggestions ){

			if( sortable && list.findIndex(( f )  => f == item.value ) > -1 )
				continue;

			let title = item.title || item.value || "";
			let titleLower = title.toLowerCase();

			if( filter && (titleLower.indexOf( filterLower ) < 0) )
				continue;

			array.push(itemToObject( titleLower, item ));
		};

		return array;
	}, [ suggestions, filter, list ]);

	if( !onChange )
		onChange = () => {};

	const childrenElem = useAnimation.Expand( expanded );
	const inputRef = useRef( null );

	return (
	<div 
		className={ 
			Props.className( "multiselect", className, { disabled: disabled, headerless: headerless, stretch: stretch } ) 
		}
		style={ style }
		ref={ wrapRef }
	>
		<div className={ Props.className( "multiselect-header", { active: expanded } ) }>
			<div className={ "multiselect-header-tags" }>{ 
				list.map(( v ) => {
					const item = suggestions.find(( f ) => f.value == v ) || { title: v, value: v };
					return <div key={ item.value } className={ Props.className( "multiselect-header-item", { 
							dragged: drag && drag.value == item.value,
							default: defaultValueForced == item.value,
							sortable: sortable
						}) 
					}>
						<span 
							className={ "multiselect-header-item-title" } 
							onMouseDown={( e ) => {
								if( !sortable )
									return;
								setDrag( item );
							}}
							onMouseMove={( e ) => {
								let result = Common.dragElement( e, drag, item, list, "multiselect-header-tags", { x: true } );

								if( !result )
									return;

								setList( result );
								onChange({ value: result, defaultValue: defaultValueForced });
							}}							
						>
							{ item.icon }<Text>{ item.title }</Text>
						</span>
						<span className={ "multiselect-header-item-remove" } 
							onClick={() => { 
								let result = list.filter(( f ) => f != item.value );
								setList( result );
								onChange({ value: result, defaultValue: defaultValueForced });
							}}
						>x</span>
					</div>
				}) }
			</div>
			<input className={ "multiselect-header-input" } 
				value={ filter }
				placeholder={ placeholder || "" }
				ref={ inputRef }
				onFocus={() => setExpanded( true ) }
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
					onChange({ value: result, defaultValue: defaultValueForced });

					if( !filter )
						return;

					setFilter( "" );
					setListIndex( 0 );
				}}
			/>
		</div>
		<div className={ Props.className( "multiselect-suggestions", { expanded: expanded } ) } ref={ childrenElem }>{
				sgList.map(( item, index ) => {
					return <div 
						key={ item.value } 
						className={ Props.className( "multiselect-suggestions-item", { 
							selected: item.selected, 
							isDefault: defaultValueForced == item.value, 
							focused: listIndex == index,
							dragged: drag && drag.value == item.value,
							sortable: sortable
						})}
						onMouseUp={( e ) => {
							e.preventDefault();
							e.stopPropagation();
							
							if( drag )
								setDrag( null );

						}}
						onMouseDown={( e ) => {
							mouseDownRef.current = false;
							if( !sortable || !item.selected )
								return;
							setDrag( item );
						}}
						onMouseMove={( e ) => {
							let result = Common.dragElement( e, drag, item, list, "multiselect-suggestions", { y: true } );
							mouseDownRef.current = true;

							if( !result )
								return;

							setList( result );
							onChange({ value: result, defaultValue: defaultValueForced });
						}}										
						>
							<span 
								className={ "multiselect-suggestions-item-checkbox" }
								onMouseDown={( e ) => { 
									e.preventDefault();
									e.stopPropagation();
								}}
								onClick={( e ) => { 
									e.preventDefault();
									e.stopPropagation();

									let result = item.selected ? list.filter(( f ) => f != item.value ) : [ ...list, item.value ];
									setList( result );
									onChange({ value: result, defaultValue: defaultValueForced });
								}}
							></span>
							{ item.icon }
							<Text>{ item.title }</Text>
							<span 
								className={ Props.className( "multiselect-suggestions-item-default", { 
									hidden: !hasDefault || !item.selected, 
								})}								
								onMouseDown={( e ) => { 
									e.preventDefault();
									e.stopPropagation();
								}}
								onClick={( e ) => { 
									e.preventDefault();
									e.stopPropagation();

									if( !hasDefault )
										return;

									setDefaultValueForced( item.value );
									onChange({ value: list, defaultValue: defaultValueForced == item.value ? null : item.value });
								}}
							></span>							
						</div>
				}) }
		</div>		
	</div>
	);
};