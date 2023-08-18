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
	let { className, children, onChange, onSelect, margin, padding, label, ...rest } = props;
	const [ expanded, setExpanded ] = useState( false );
	const [ search, setSearch ] = useState( "" );
	const [ list, setList ] = useState([]);
	const [ selected, setSelected ] = useState( 0 );
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

		if( !delayedExpand )
			return;

		setSelected( 0 );
		setExpanded( true );

	}, [ delayedExpand ]);

	let suggestions = useMemo(() => {
		let result: any[] = [];
		let index: number = 0;

		for( const item of list ){

			const s = index;

			result.push(
				<Row className={ 
					Props.classNameEx( "autocomplete", "autocomplete-item", { selected: selected == s }) 
				} key={ item.id || item.value } 
				onMouseOver={() => {
					setSelected( s );
				}}	
				onMouseDown={() => {
					setSelected( s );
					onSelect( item.value, () => {
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
	}, [ list, selected ]);

	return (<div
		className={
			Props.className( "autocomplete", className )
		}
	>
		<AutoCompleteContext.Provider value={{
			value: forcedValue,
			select: () => {
				console.log( 111, list, selected  );
				if( list && list[ selected ] ){
					console.log( 222 );
					const v = list[ selected ].value;
					onSelect( v, () => {
						console.log( 333 );
						setForcedValue( v );
					});
				};				
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

					if( selected < 1 )
						setSelected( suggestions.length - 1 );
					else
						setSelected( selected - 1 );

				}else if( e.event.which == 40 ){

					e.event.preventDefault();

					if( selected >= (suggestions.length - 1) )
						setSelected( 0 );
					else
						setSelected( selected + 1 );

				}else if( e.event.which == 13 ){

					e.event.preventDefault();

					if( list && list[ selected ] ){
						const v = list[ selected ].value;
						onSelect( v, () => {
							setForcedValue( v );
						});
					};
				};

			}			
		}}>
			{ children }
		</AutoCompleteContext.Provider>
		<div className={ 
			Props.className( "autocomplete-suggestions", { expanded: expanded }) 
		}
			style={ props.style }
			ref={ childrenElem }
		>
			{ suggestions }
		</div>
	</div>);
};