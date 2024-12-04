import React, { useMemo, useState, useEffect, useRef } from "react";
import { Props } from "../../utility/props";
import { Input } from "../../components/Input";
import { Row } from "../../components/Row";
import { Text } from "../../components/Typography";
import { Icons } from "../../components/Icons";
import { AutoCompleteContext } from "../../components/AutoComplete";

import "./index.scss"
import { useAnimation } from "../../utility/animation";

export const Select = ( props ) => {
	let { className, children, onChange, onSelect, margin, padding, label, icon, larger, value, list, ...rest } = props;
	const [ expanded, setExpanded ] = useState( false );
	const [ hovered, setHovered ] = useState( 0 );
	let [ forcedValue, setForcedValue ] = useState( value );
	const [ delayedExpand, setDelayedExpand ] = useState( 0 );
	const childrenElem = useAnimation.Expand( expanded );
	const overlayElem = useRef( null );
	const [ width, setWidth ] = useState( 0 );

	if( !onChange )
		onChange = ( value ) => {};
	if( !onSelect )
		onSelect = ( value ) => {};		
	if( !Array.isArray( list ) )
		list = [];

	if( !list.find(( f ) => f.value == forcedValue ) )
		forcedValue = list[ 0 ] ? list[ 0 ].value : "";

	let title = (list.find(( f ) => f.value == forcedValue ) || {}).title || " ";

	useEffect(() => {

		if( !childrenElem.current || !overlayElem.current )
			return;

		let timeout = setTimeout(() => {

			let rect1 = childrenElem.current.getClientRects();
			let rect2 = childrenElem.current.getClientRects();

			if( !rect1[ 0 ] || !rect2[ 0 ] )
				return;

			let w1 = rect1[ 0 ].width;
			let w2 = rect2[ 0 ].width;
			
			if( w1 < width && w2 < width )
				return;

			setWidth( w1 > w2 ? w1 : w2 );

		}, 10 );
		
		return () => {
			clearTimeout( timeout );
		};
	}, [ expanded ]);

	useEffect(() => {

		if( !delayedExpand )
			return;

		let index = list.findIndex(( f ) => f.value == forcedValue );

		setHovered( index > -1 ? index : 0 );
		setExpanded( true );

	}, [ delayedExpand ]);

	let suggestions = useMemo(() => {
		let result: any[] = [];
		let index: number = 0;

		for( const item of list ){

			const s = index;

			result.push(
				<Row className={ 
					Props.classNameEx( "autocomplete", "autocomplete-item", { hovered: hovered == s, selected: item.value == forcedValue }) 
				} key={ item.id || item.value } 
				onMouseOver={() => {
					setHovered( s );
				}}	
				onMouseDown={() => {
					setHovered( s );
					setForcedValue( item.value );
					onSelect( item );
					onChange( item );
				}}	
				>{

					(item.label ? item.label : (
						<React.Fragment>
							 { item.icon }
							 <div className={ "autocomplete-value" }><Text>{ item.title }</Text></div>
						</React.Fragment>
					))

				}
				</Row>
			);

			index++;

		};

		return result;
	}, [ list, hovered, forcedValue ]);

	return (<div
		className={
			Props.className( "autocomplete", (className ? (className + " select") : "select"), { expanded: expanded, larger: larger } )
		}
	>
		<AutoCompleteContext.Provider value={{
			value: forcedValue,
			select: () => {
				if( list && list[ hovered ] ){
					const v = list[ hovered ];
					setForcedValue( v.value );
					onSelect( v );
					onChange( v );
				};				
			},
			onChange: ( e ) => {},
			onFocus: ( e ) => {
				setDelayedExpand( delayedExpand + 1 );
			},
			onBlur: ( e ) => {
				setExpanded( false );
			},
			onKeyUp: ( e ) => {},
			onKeyDown: ( e ) => {

				e.event.preventDefault();

				if( !suggestions.length )
					return;

				if( e.event.which == 38 ){

					if( hovered < 1 )
						setHovered( suggestions.length - 1 );
					else
						setHovered( hovered - 1 );

				}else if( e.event.which == 40 ){

					if( hovered >= (suggestions.length - 1) )
						setHovered( 0 );
					else
						setHovered( hovered + 1 );

				}else if( e.event.which == 13 ){

					if( list && list[ hovered ] ){
						const v = list[ hovered ];
						setForcedValue( v.value );
						e.event.target.blur();
						onSelect( v );
						onChange( v );
					};

				};

			}			
		}}>		
			<Input { ...rest }></Input>
			<div className={ "select-overlay input" } style={{ width: expanded ? (width || "auto") : "auto" }} ref={ overlayElem }>{ icon }{ forcedValue }<Icons.expand transition reverse={ !expanded }/></div>
		</AutoCompleteContext.Provider>
		<div className={ 
			Props.className( "autocomplete-shadowfix", { hidden: !expanded } ) 
		}></div>		
		<div className={ 
			Props.className( "autocomplete-suggestions" ) 
		}
			style={{ width: expanded ? (width || "auto") : "auto" }}
			ref={ childrenElem }
		>
			{ suggestions }
		</div>
	</div>);
};