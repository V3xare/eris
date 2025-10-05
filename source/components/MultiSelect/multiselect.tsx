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
		sort,
		suggestions,
		...rest 
	} = props;

	const wrapRef = useRef( null );
	const mouseDownRef = useRef( null );

	const [ drag, setDrag ] = useState( null );
	const [ defaultValueForced, setDefaultValueForced ] = useState( null );
	const [ filter, setFilter ] = useState( "" );
	const [ list, setList ] = useState([]);
	const [ sortList, setSortList ] = useState([]);
	const [ listIndex, setListIndex ] = useState( 0 );
	const [ expanded, setExpanded ] = useState( headerless ? true : false );

	if( !suggestions )
		suggestions = [];

	useEffect(() => {
		setList( Array.isArray( value ) ? value : [] );
	}, [ value ]);	

	useEffect(() => {

		let sortedTable = {};
		let s: any[] = [];

		if( !Array.isArray( sort ) )
			sort = [ ...sortList ];

		for( let v of sort ){
			s.push( v );
			sortedTable[ v ] = true;
		};

		for( let item of suggestions ){

			if( sortedTable[ item.value ] )
				continue;

			s.push( item.value );
		};

		setSortList( s );
	}, [ sort, suggestions ]);		

	useEffect(() => {

		if( !hasDefault )
			return;

		let index = list.indexOf( defaultValue );

		if( index < 0 )
			defaultValue = list[ 0 ] || "";

		let needle = suggestions.find(( f ) => f.value == defaultValue );

		if( needle && needle.defaultIgnored || !needle ){

			defaultValue = "";

			for( let item of suggestions ){

				if( item.defaultIgnored || list.indexOf( item.value ) < 0 )
					continue;

				defaultValue = item.value;
				break;
			};

		};

		if( defaultValue == defaultValueForced )
			return;

		setDefaultValueForced( defaultValue );
	}, [ defaultValue, value, list ]);

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
			defaultIgnored: item.defaultIgnored,
			selected: list.find(( f ) => f == (item.value || item.title) )
		}
	};
	let sgList: any[] = useMemo(() => {

		let array: any[] = [];
		let filterLower = (filter || "").toLowerCase();

		if( sortable ){

			for( const key of sortList ){

				let item = suggestions.find(( f ) => f.value == key );

				if( !item )
					continue;

				let title = item.title || item.value || "";
				let titleLower = title.toLowerCase();

				if( filter && (titleLower.indexOf( filterLower ) < 0) )
					continue;

				array.push(itemToObject( titleLower, item ));
			};		

		}else{

			for( const item of suggestions ){

				let title = item.title || item.value || "";
				let titleLower = title.toLowerCase();

				if( filter && (titleLower.indexOf( filterLower ) < 0) )
					continue;

				array.push(itemToObject( titleLower, item ));
			};		

		};

		return array;
	}, [ suggestions, filter, list, sortList ]);

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

								let sList = Common.dragElement( e, drag, item, sortList, "multiselect-header-tags", { x: true } );

								if( sList )
									setSortList( sList );

								let vList = Common.dragElement( e, drag, item, list, "multiselect-header-tags", { x: true } );

								if( vList )
									setList( vList );

								if( !sList && !vList )
									return;

								onChange({ value: vList ? vList : list, defaultValue: defaultValueForced, sort: sList ? sList : sortList });

							}}							
						>
							{ item.icon }<Text>{ item.title }</Text>
						</span>
						<span className={ "multiselect-header-item-remove" } 
							onClick={() => { 
								let result = list.filter(( f ) => f != item.value );
								setList( result );
								onChange({ value: result, defaultValue: defaultValueForced, sort: sortList });
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
					onChange({ value: result, defaultValue: defaultValueForced, sort: sortList });

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
							if( !sortable )
								return;
							setDrag( item );
						}}
						onMouseMove={( e ) => {

							if( !sortable || !drag )
								return;

							mouseDownRef.current = true;

							let sList = Common.dragElement( e, drag, item, sortList, "multiselect-suggestions", { y: true } );

							if( sList )
								setSortList( sList );

							let vList = Common.dragElement( e, drag, item, list, "multiselect-suggestions", { y: true } );

							if( vList && drag.selected )
								setList( vList );

							if( !sList && !vList )
								return;

							onChange({ value: vList && drag.selected ? vList : list, defaultValue: defaultValueForced, sort: sList ? sList : sortList });
						}}										
						>
							<div 
								className={ "multiselect-suggestions-item-checkbox" }
							>
								<div 
									className={ "multiselect-suggestions-item-checkbox-push" }
									onMouseDown={( e ) => { 
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={( e ) => { 
										e.preventDefault();
										e.stopPropagation();

										let result: any[] = [ ...list ];
										
										if( item.selected )
											result = result.filter(( f ) => f != item.value );
										else{
											let index = sortList.findIndex(( f ) => f == item.value );

											if( index < 0 )
												result = [ ...list, item.value ];
											else{

												let key = "";

												for( ; index < sortList.length; index++ ){

													if( list.findIndex(( f ) => f == sortList[ index ] ) < 0 )
														continue;

													key = sortList[ index ];
													break;
												};

												index = list.findIndex(( f ) => f == key );

												if( index > -1 )
													result.splice( index, 0, item.value );
												else
													result.push( item.value );

											};

										};

										setList( result );
										onChange({ value: result, defaultValue: defaultValueForced, sort: sortList });
									}}									
								>
								</div>
							</div>
							{ item.icon }
							<Text>{ item.title }</Text>
							<div 
								className={ Props.className( "multiselect-suggestions-item-default", { 
									hidden: !hasDefault || !item.selected || item.defaultIgnored, 
								})}								
							>
								<div 
									className={ "multiselect-suggestions-item-default-push" }
									onMouseDown={( e ) => { 
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={( e ) => { 
										e.preventDefault();
										e.stopPropagation();

										if( !hasDefault || (item.value == defaultValueForced) )
											return;

										setDefaultValueForced( item.value );
										onChange({ value: list, defaultValue: item.value, sort: sortList });
									}}									
								></div>
							</div>							
						</div>
				}) }
		</div>		
	</div>
	);
};