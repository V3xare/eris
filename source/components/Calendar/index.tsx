import React, { useReducer, useEffect, useMemo, useContext } from "react";

import { Props } from "../../utility/props";
import { Time } from "../../utility/time";
import { Loading } from "../../components/Loading";
import { Text } from "../../components/Typography";
import { Lang, LangContext } from "../../components/Lang";
import Common from "../../utility/common";

import "./index.scss"


export interface CalendarMonth{
	value: string,
	month: string,
	key: string
};

export const EnumMonthState: CalendarMonth[] = [
	{ value: "0", month: "January", key: "January" },
	{ value: "1", month: "February", key: "February" },
	{ value: "2", month: "March", key: "March" },
	{ value: "3", month: "April", key: "April" },
	{ value: "4", month: "May", key: "May" },
	{ value: "5", month: "June", key: "June" },
	{ value: "6", month: "July", key: "July" },
	{ value: "7", month: "August", key: "August" },
	{ value: "8", month: "September", key: "September" },
	{ value: "9", month: "October", key: "October" },
	{ value: "10", month: "November", key: "November" },
	{ value: "11", month: "December", key: "December" },
];

export interface CalendarWeek{
	value: string,
	day: string,
	short: string,
	key: string
};

export const CalendarWeekState: CalendarWeek[] = [
	{ value: "0", short: "Mo", day: "Monday", key: "Monday" },
	{ value: "1", short: "Tu", day: "Tuesday", key: "Tuesday" },
	{ value: "2", short: "We", day: "Wednesday", key: "Wednesday" },
	{ value: "3", short: "Th", day: "Thursday", key: "Thursday" },
	{ value: "4", short: "Fr", day: "Friday", key: "Friday" },
	{ value: "5", short: "Sa", day: "Saturday", key: "Saturday" },
	{ value: "6", short: "Su", day: "Sunday", key: "Sunday" },
];

abstract class CalendarModule{

	public static key( year: string | number, month: string | number, day: string | number ) : string{
		return year + ":" + month + ":" + day;
	};
	public static type( token: string, typesTable: any ) : any{
		return typesTable[ token ] || typesTable[ "normal" ] || {};
	};
	public static generate( year: number, month: number ){

		if( month > 11 ){
			year++;
			month = 0;
		};

		let days: any[] = [];
		const daysInMonth: number = Time.daysInMonth( year, month );
		const daysInLastMonth: number = Time.daysInMonth( year, month - 1 );
		let weekDayStart: number = new Date( year, month, 1 ).getDay() - 1;

		let normal: string[] = [];
		let weekend: string[] = [];

		if( weekDayStart < 0 )
			weekDayStart = 6;

		let weekDayEnd = new Date( year, month, daysInMonth - 1 ).getDay() - 1;

		weekDayEnd = 5 - weekDayEnd;

		let n = 0;

		for( n = daysInLastMonth - weekDayStart; n < daysInLastMonth; n++ ){
			days.push({ key: CalendarModule.key( year, month - 1, n + 1 ), month: (month - 1), value: (n + 1), hidden: true, type: "" });
		};

		const paddingLeft: number = days.length - 1;

		for( n = 0; n < daysInMonth; n++ ){

			const day = new Date( year, month, n + 1 ).getDay();
			const type = day == 0 || day == 6 ?
				"weekend"
				:
				"normal";

			const key: string = CalendarModule.key( year, month, n + 1 );
			days.push({ key: key, value: (n + 1), month: (month), day: day, type: type });

			if( type == "weekend" ){
				weekend.push( key );
			}else if( type == "normal" ){
				normal.push( key );
			};

		};

		for( n = 0; n < weekDayEnd; n++ ){
			days.push({ key: CalendarModule.key( year, month + 1, n + 1 ), month: (month + 1), value: (n + 1), hidden: true, type: "" });
		};

		if( days.length < 42 ){

			let v: number = days[ days.length - 1 ].value + 1;

			if( v > 14 )
				v = 1;

			for( n = 0; days.length < 42; n++ ){
				days.push({ key: CalendarModule.key( year, month + 1, n + v ), month: (month + 1), value: (n + v), hidden: true, type: "" });
			};

		};

		let years: number[] = [];

		for( let start = year - 6, end = year + 6; start < end; start++ ){
			years.push( start );
		};		

		let months: any[] = [];

		for( const item of EnumMonthState ){
			months.push( item );
		};		
		
		let weeks: any[] = [];

		for( const item of CalendarWeekState ){
			weeks.push( item );
		};			

		return {
			year: year,
			month: month,
			paddingLeft: paddingLeft,
			years: years,
			months: months,
			weeks: weeks,
			days: days,
			normal: normal,
			weekend: weekend
		};
	};
};

const CalendarReducer = ( state, [ type, data, data2 ] ) => {

	if( type == "set" ){
		let selected = {
			year: Common.uint( data.year ),
			month: Common.uint( data.month ),
			day: Common.uint( data.day ),
			value: ""
		};
		selected.value = selected.year + ":" + selected.month +  ":" + selected.day;
		let gen = CalendarModule.generate( selected.year, selected.month );
		return {
			...state,
			list: {
				years: gen.years,
				months: gen.months,
				weeks: gen.weeks,
				days: gen.days
			},
			it: data2 ? state.it : (state.it + 1),
			selected: selected
		};
	}else if( type == "select" ){
		let selected = {
			year: Common.uint( data.year ),
			month: Common.uint( data.month ),
			day: state.selected.day,
			value: state.selected.value
		};
		let gen = CalendarModule.generate( selected.year, selected.month );
		return {
			...state,
			list: {
				years: gen.years,
				months: gen.months,
				weeks: gen.weeks,
				days: gen.days
			},			
			selected: selected
		};		
	};

	return state;
};

export const Calendar = ( props ) => {
	const { className, year, month, day, style, onChange, ...rest } = props;
	const lang = useContext( LangContext );
	let [ state, dispatch ] = useReducer( CalendarReducer, {
		it: 0,
		selected: {
			year: 0,
			month: 0,
			day: 0,
			value: ""
		},
		list: {
			years: [],
			months: [],
			weeks: [],
			days: []
		}
	});
	useEffect(() => {
		dispatch([ "set", { year: year || Time.year, month: month || Time.month, day: day === undefined ? Time.day : day }, true ]);
	}, [ year, month, day ]);
	useEffect(() => {

		if( !onChange || state.it == 0 )
			return;

		onChange({ value: state.selected });	
	
}, [ state.it ]);	

	return (<div
		className={
			Props.className( "calendar", className, {
				borderless: props.borderless
			})
		}
		style={ style }
	>
		<Loading status={ !state.list.days.length }>
			<select value={ state.selected.month } className={ "calendar-month" } onChange={( e ) => {
				dispatch([ "select", {
					year: state.selected.year,
					month: e.target.value,
					day: state.selected.day
				}]);
			}}>
				{ state.list.months.map(( item: any ) => {
					return <option value={ item.value } className={ "calendar-month-value" } key={ item.key }>{ (lang.get( "Month::" + item.month ) || item.month) }</option>;
				}) }
			</select>
			<select value={ state.selected.year } className={ "calendar-year" } onChange={( e ) => {
				dispatch([ "select", {
					year: e.target.value,
					month: state.selected.month,
					day: state.selected.day
				}]);				
			}}>
				{ (state.list.years).map(( year: number ) => {
					return <option value={ year } className={ "calendar-year-value" } key={ year }>{ year }</option>;
				}) }
			</select>
			<div className={ "calendar-week" }>
				{ (state.list.weeks).map(( item: any ) => {
					return <Text className={ "calendar-week-value" } key={ item.key }>{ (lang.get( "Week::" + item.short ) || item.short) }</Text>;
				}) }
			</div>
			<div className={ "calendar-days" }>
				{ state.list.days.map(( item: any ) => {
					return <Text key={ item.key } className={ Props.className( "calendar-days", { 
						value: true, 
						hidden: item.hidden, 
						selected: !item.hidden && item.key == state.selected.value  
					} ) } onClick={() => { 

						if( item.hidden )
							return;

						dispatch([ "set", {
							year: state.selected.year,
							month: state.selected.month,
							day: item.value
						}]);
					}}>{ item.value }</Text>;
				}) }
			</div>
		</Loading>
	</div>);
};