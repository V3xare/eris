import React, { useMemo, useState, useEffect } from "react";
import { Props } from "../../utility/props";
import { Input } from "../../components/Input";
import { Row } from "../../components/Row";
import { Text } from "../../components/Typography";

import "./index.scss"
import { useAnimation } from "../../utility/animation";

export const AutoCompleteContext = React.createContext({
	value: null,
	onKeyDown: ( e ) => {},
	onKeyUp: ( e ) => {},
	onChange: ( e ) => {},
	onFocus: ( e ) => {},
	onBlur: ( e ) => {}	
});

export const AutoComplete = ( props ) => {
	let { className, children, onChange, onSelect, margin, padding, label, larger, value, ...rest } = props;
	const [ expanded, setExpanded ] = useState( false );
	const [ search, setSearch ] = useState( "" );
	const [ list, setList ] = useState([]);
	const [ hovered, setHovered ] = useState( 0 );
	const [ forcedValue, setForcedValue ] = useState( null );
	const [ delayedExpand, setDelayedExpand ] = useState( 0 );
	const childrenElem = useAnimation.Expand( expanded );

	if( !onChange )
		onChange = ( value, callback ) => {
			callback([]);
		};
	if( !onSelect )
		onSelect = ( value, callback ) => {
			callback();
		};		

	useEffect(() => {

		if( !value )
			return;

		setList( value );

	}, [ value ]);		

	useEffect(() => {

		if( !delayedExpand )
			return;

		setHovered( 0 );
		setExpanded( true );

	}, [ delayedExpand ]);

	let suggestions = useMemo(() => {
		let result: any[] = [];
		let index: number = 0;

		for( const item of list ){

			const s = index;

			result.push(
				<Row className={ 
					Props.classNameEx( "autocomplete", "autocomplete-item", { hovered: hovered == s }) 
				} key={ item.id || item.value } 
				onMouseOver={() => {
					setHovered( s );
				}}	
				onMouseDown={() => {
					setHovered( s );
					onSelect( item, () => {
						setForcedValue( item.value );
					});
				}}	
				>{

					(item.label ? item.label : (
						<React.Fragment>
							 { item.icon }
							 <div className={ "autocomplete-value" }><Text>{ item.value }</Text></div>
						</React.Fragment>
					))

				}
				</Row>
			);

			index++;

		};

		return result;
	}, [ list, hovered ]);

	return (<div
		className={
			Props.className( "autocomplete", className, { expanded: expanded, larger: larger } )
		}
	>
		<AutoCompleteContext.Provider value={{
			value: forcedValue,
			select: () => {
				if( list && list[ hovered ] ){
					const v = list[ hovered ];
					onSelect( v, () => {
						setForcedValue( v.value );
					});
				};				
			},
			clear: () => {
				onSelect({ value: "" }, () => {
					setForcedValue( "" );
				});				
			},
			onChange: ( e ) => {
				onChange( e.value, ( resultList ) => {
					setSearch( e.value );
					setList( resultList );
				});
			},
			onFocus: ( e ) => {
				onChange( e.value, ( resultList ) => {
					setSearch( e.value );
					setList( resultList );
					setDelayedExpand( delayedExpand + 1 );
				});
			},
			onBlur: ( e ) => {
				setExpanded( false );
			},
			onKeyUp: ( e ) => {},
			onKeyDown: ( e ) => {

				if( !suggestions.length )
					return;

				if( e.event.which == 38 ){

					e.event.preventDefault();

					if( hovered < 1 )
						setHovered( suggestions.length - 1 );
					else
						setHovered( hovered - 1 );

				}else if( e.event.which == 40 ){

					e.event.preventDefault();

					if( hovered >= (suggestions.length - 1) )
						setHovered( 0 );
					else
						setHovered( hovered + 1 );

				}else if( e.event.which == 13 ){

					e.event.preventDefault();

					if( list && list[ hovered ] ){
						const v = list[ hovered ];
						onSelect( v, () => {
							setForcedValue( v.value );
							e.event.target.blur();
						});
					};
				};

			}			
		}}>
			{ children }
		</AutoCompleteContext.Provider>
		<div className={ 
			Props.className( "autocomplete-shadowfix", { hidden: !expanded } ) 
		}></div>		
		<div className={ 
			Props.className( "autocomplete-suggestions" ) 
		}
			style={ props.style }
			ref={ childrenElem }
		>
			{ suggestions }
		</div>
	</div>);
};