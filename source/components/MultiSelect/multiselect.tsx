import React, { forwardRef, useState, useEffect, useContext, useMemo } from "react";
import { Props } from "../../utility/props";
import { Text } from "../../components/Typography";
import { useAnimation } from "../../utility/animation";

import "./multiselect.scss"

export const MultiSelect = ( props ) => {
	let { 
		className, children, propValue, style, margin, padding, 
		title, value,
		disabled,
		placeholder,
		onChange,
		suggestions,
		...rest 
	} = props;

	const [ filter, setFilter ] = useState( "" );
	const [ list, setList ] = useState([]);
	const [ listIndex, setListIndex ] = useState( 0 );
	const [ isActive, setIsActive ] = useState( false );

	if( !suggestions )
		suggestions = [];

	useEffect(() => {
		setList( Array.isArray( value ) ? value : [] );
	}, [ value ]);

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
			selected: list.find(( f ) => f == (item.value || item.title) )
		});
	};

	if( !onChange )
		onChange = () => {};

	const childrenElem = useAnimation.Expand( isActive );

	return (
	<div 
		className={ 
			Props.className( "multiselect", className, { disabled: disabled } ) 
		}
		style={ style }
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
								onChange({ value: result });
							}}
						>x</span>
					</div>
				}) }
			</div>
			<input className={ "multiselect-header-input" } 
				value={ filter }
				placeholder={ placeholder || "" }
				onFocus={() => setIsActive( true ) }
				onBlur={() => setIsActive( false ) }
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
					onChange({ value: result });

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
						onMouseDown={() => { 
							let result = item.selected ? list.filter(( f ) => f != item.value ) : [ ...list, item.value ];
							setList( result );
							onChange({ value: result });
						}}
						><span className={ "multiselect-suggestions-item-checkbox" }></span>{ item.icon }<Text>{ item.title }</Text></div>
				}) }
		</div>		
	</div>
	);
};