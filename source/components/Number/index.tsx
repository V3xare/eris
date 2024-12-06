
import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Input } from "../../components/Input";
import { Props } from "../../utility/props";
import { Icons } from "../../components/Icons";
import Common from "../../utility/common";
import "./index.scss"

export const Number = ( props ) => {
	let { className, value, min, max, step, tools, onChange, ...rest } = props;
	min = Common.int( min ) || 0;
	max = Common.int( max ) || 999999999999;
	step = Common.int( step ) || 1;
	value = Common.int( step ) || 0;

	const sterilize = ( v ) => {
		return v > max ? max : (v < min ? min : v);
	};

	value = Common.string( sterilize( value ) );

	const [ size, setSize ] = useState( value.length );
	const [ forcedValue, setForcedValue ] = useState( value );

	useEffect(() => {
		setForcedValue( value );
	}, [ value ]);

	const minusEq = ( e ) => {
		let v = sterilize( Common.int( e.value ) - step );
		let string = Common.string( v );
		e.setValue( string );
		setSize( string.length );
		setForcedValue( string );

		if( onChange )
			onChange({ ...e, value: v });

	};
	const plusEq = ( e ) => {
		let v = sterilize( Common.int( e.value ) + step );
		let string = Common.string( v );
		e.setValue( string );
		setSize( string.length );
		setForcedValue( string );

		if( onChange )
			onChange({ ...e, value: v });

	};

	return <Input className={ 
		Props.className( "number", className, {} ) 
	} 
	onChange={( e ) => {
		let v = Common.int( e.value );
		let string = Common.string( v );
		e.rewrite( string );
		setSize( string.length );
		setForcedValue( string );

		if( onChange )
			onChange({ ...e, value: v });

	}}
	size={ size > 2 ? (size - 1) : 1 }
	tools={[
		{ direction: 0, icon: <Icons.minus/>, onClick: ( e ) => minusEq( e ) },
		{ direction: 1, icon: <Icons.plus/>, onClick: ( e ) => plusEq( e ) },
	]}
	{ ...rest }
	>{ forcedValue }</Input>
};