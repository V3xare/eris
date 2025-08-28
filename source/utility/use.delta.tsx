import React, { useReducer, useState, useEffect, useMemo, useContext, useRef } from "react";
import Common from "../utility/common";

export function usePrevious( value ){
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};


export function useDelta( fn: Function, changes: any[], value: any ){
	let prev = usePrevious( value );

	useEffect(() => {

		let skip = true;
		let type = Common.type( value );

		if( type == "object" || type == "array" ){

			if( !prev )
				return fn();

			for( let key in value ){

				if( value[ key ] == prev[ key ] )
					continue;

				skip = false;
				break;
			};

		}else if( value !== prev ){
			skip = false;
		};

		if( skip )
			return;		

		return fn();
	}, changes );

};
