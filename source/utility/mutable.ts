import React, { useEffect, useState, useReducer, useRef, useMemo, useCallback, useContext, FunctionComponent } from "react";
import { Request, RequestInit } from "@utility/requests";

export const CreateMutable: FunctionComponent<{}> = ( reducer, init ) :  { state, set, get, dispatch, update, reducer } => {

	let state = init;
	let listeners = new Set<Function>();
	let asyncUpdate: any = null;
	let actions: any[] = [];

	for( let key in state ){

		if( typeof state[ key ] == "function" )
			state[ key ] = state[ key ]( state );

	};

	const get = () => {};
	const set = ( action ) => {

		let changed = reducer( state, action );
		let changedKeys: string[] = [];

		for( let key in changed ){

			if( state[ key ] !== changed[ key ] ){
				changedKeys.push( key );
				break;
			};

		};

		if( !changedKeys.length ){
			//console.log( "same object" );
			return [];
		};

		const props = Object.getOwnPropertyNames( state );

		for( let n = 0; n < props.length; n++ ){
			delete state[ props[ n ] ];
		};
		Object.assign( state, changed );

		//console.log( "mutable", state );
		return changedKeys;
	};
	const dispatch = ( action ) => {

		actions.push( action );

		if( asyncUpdate )
			return;

		asyncUpdate = setTimeout(() => {

			clearTimeout( asyncUpdate );
			asyncUpdate = null;
			let list = [ ...actions ];
			actions.length = 0;

			for( let action of list ){

				let changed: string[] = set( action );

				if( !changed.length )
					continue;

				listeners.forEach(( s: Function ) => {

					let needle: boolean = false;

					for( let key in (<any>s).keys ){

						if( changed.indexOf( (<any>s).keys[ key ] ) > -1 ){
							needle = true;
							break;
						};

					};

					if( !needle && (<any>s).keys.length > 0 )
						return;

					setTimeout(() => {
						s();
					});

				});

			};

		});

	};
	const update = ( keys: string[] ) => {

		//console.log( "update" );
		const [ index, setIndex ] = useState( 0 );

		useEffect(() => {

			const subscription = () => {
				//console.log( "s", index );
				setIndex( index + 1 );
			};
			subscription.keys = Array.isArray( keys ) ? [ ...keys ] : [];
			listeners.add( subscription );

			return () => {
				listeners.delete( subscription );
			};
		}, [ index ]);

		return ( action ) => {
			dispatch( action );
		};
	};

	return { state, set, get, dispatch, update, reducer };
};

export const useMutable = ( mutable: typeof CreateMutable ) => {
	//console.log( "useMutable" );
	return { state: mutable.state, dispatch: mutable.dispatch };
};
export const useSubscription = ( mutable: typeof CreateMutable, keys?: string[] ) => {
	//console.log( "useSubscription" );
	return { state: mutable.state, dispatch: mutable.update( keys ) };
};

function useAsyncReducer( state, [ type, append, data ] ){

	if( type == "load" || type == "fetch" ){
		return {
			...state,
			["index"] : (state.index + 1),
			["waitList"]: [ ...state.waitList, {
				["append"] : append && typeof append == "object" ? append : {},
				["success"]: (data && typeof data.success == "function" ? data.success : (() => {})),
				["failure"]: (data && typeof data.failure == "function" ? data.failure : (() => {})),
				["data"]: (data || {})
			}]
		};
	};

	return state;
};

export const useAsync = ( config: RequestInit, params: any, keys?: any[] ) => {
	//console.log( "useAsync" );
	const [ state, dispatch ] = useReducer( useAsyncReducer, {
		index: 0,
		waitList: []
		//success: () => {},
		//failure: () => {},
		//append: {}
	});
	const [ completeList, setCompleteList ] = useState([]);
	const [ data, setData ] = useState({});
	const [ error, setError ] = useState();
	const [ loading, setLoading ] = useState( false );
	let isMounted: any = useRef( true );
	let fetchTimeout: any = useRef( null );

	const fetch = ( fn: Function ) => {

		clearTimeout( fetchTimeout.current );
		fetchTimeout.current = setTimeout(() => {

			if( !completeList.length )
				return;

			for( let item of completeList ){
				fn( item.data, item.error );
				if( item.error )
					item.failure();
				else
					item.success();
			};
			setCompleteList([]);

		}, 1 );

	};
	const flush = () => {

		if( !completeList.length )
			return;

		setData({});
		setCompleteList([]);
	};

	useEffect(() => {

		isMounted.current = true;

		if( !state.index ){

			if( config.auto )
				dispatch([ "fetch" ]);

			return;
		};

		if( loading )
			return;

		let requestParams: any = state.waitList.shift();//Mutation test

		if( !requestParams )
			return;

		setLoading( true );

		let source = Request.cancel();

		let paramsParsed = { ...params };

		for( let key in paramsParsed ){

			if( typeof paramsParsed[ key ] != "function" )
				continue;

			paramsParsed[ key ] = params[ key ]( paramsParsed, requestParams );
		};

		/*
		for( let key in requestParams.append ){

			if( !paramsParsed[ key ] )
				continue;

			if(
				Array.isArray( requestParams.append[ key ] )
				&& Array.isArray( paramsParsed[ key ] )
			){
				paramsParsed[ key ] = [ ...paramsParsed[ key ], ...requestParams.append[ key ] ];
			}else if(
				requestParams.append[ key ] && typeof requestParams.append[ key ] == "object"
				&&
				paramsParsed[ key ] && typeof paramsParsed[ key ] == "object"
			){
				paramsParsed[ key ] = { ...paramsParsed[ key ], ...requestParams.append[ key ] };
			}else if( Array.isArray( paramsParsed[ key ] ) ){
				paramsParsed[ key ] = [ ...paramsParsed[ key ], requestParams.append[ key ] ];
			}else if( paramsParsed[ key ] && typeof paramsParsed[ key ] == "object" ){
				paramsParsed[ key ] = { ...paramsParsed[ key ], [key]: requestParams.append[ key ] };
			};

		};
		 */
		for( let key in requestParams.append ){
			paramsParsed[ key ] = requestParams.append[ key ];
		};

		let cfg: RequestInit = { ...config, [ "cancelTokenSource" ]: source, [ "data" ]: paramsParsed };
		delete cfg.auto;

		Request.fetch( cfg )
		.then( response => {
			return response.data;
		}).then(( response ) => {

			if( !isMounted.current )
				return;

			let data = {};

			try{
				data = JSON.parse( response );
			}catch( e ){
				data = response;
			};

			setError( undefined );
			setData( data );
			setCompleteList([
				...completeList,
				{
					data: { ...data },
					error: false,
					success: requestParams.success,
					failure: requestParams.failure
				}
			]);
		}).catch(( e ) => {

			if( !isMounted.current )
				return;

			if( !Request.isCancel( e ) ){
				setError( e );
				setCompleteList([
					...completeList,
					{
						data: {},
						error: e,
						success: requestParams.success,
						failure: requestParams.failure
					}
				]);
			};

		}).finally(() => {

			if( !isMounted.current )
				return;

			setLoading( false );
		});

		return () => {
			isMounted.current = false;
			//source.cancel();
			//setData({});
			//setLoading( false );
			//setError( null );
		};
	}, Array.isArray( keys ) ? [ state.index, ...keys ] : [ state.index ] );

	return { data, error, loading, state, dispatch, flush, fetch, ["params"]: params };
};