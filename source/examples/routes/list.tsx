import React, { useContext, useEffect, useReducer, useState, useRef , useMemo} from "react";


import { List } from "../../components/List";
import { Icons } from "../../components/Icons";
import { Tooltip } from "../../components/Tooltip";
import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import Common from "../../utility/common";

const DynamicListRoute = ( props ) => {
	
	const [ data, setData ] = useState([
		{ value: "/10", title: "Hello10", children: [
			{ value: "/101", title: "Hello101" },
			{ value: "/102", title: "Hello102" },
			{ value: "/103", title: "Hello103" },
		] },
		{ value: "/20", title: "Hello20", children: [
			{ value: "/201", title: "Hello201" },
			{ value: "/202", title: "Hello202" }
		] }
	]);

	return (
	<List data={ data }></List>
	);
};

export const ListRoute = ( props ) => {

	const [ title, setTitle ] = useState( "Navigation" );

	useEffect(() => {
		
		let timeout = setTimeout(() => {
			setTitle( Common.token() );
		}, 1000 );
		
		return () => {
			clearTimeout( timeout );
		};
	}, [ title ]);

	return (
		<Card borderless padding={ 0 }>

			<Card>

				<Divider>Static List</Divider>

				<List value={ "/7" }>
					<List.Item icon={<Icons.pencil/>} title="Navigation One">
						<List.Item value={ "/1" }>title</List.Item>
					</List.Item>
					<List.Item icon={<Icons.pencil/>} title="Navigation Two">
						<List.Item value="/5">Option 5</List.Item>
						<List.Item value="/6">Option 6</List.Item>
						<List.Item title="Submenu">
							<List.Item value="/7">Option 7</List.Item>
							<List.Item value="/8">Option 8</List.Item>
						</List.Item>
					</List.Item>
					<List.Item icon={<Icons.pencil/>} title="Navigation Three">
						<List.Item value="/9">Option 9</List.Item>
						<List.Item value="/10">Option 10</List.Item>
						<List.Item value="/11">Option 11</List.Item>
						<List.Item value="/12">Option 12</List.Item>
					</List.Item>
				</List>

			</Card>

			<Card>
				<Divider>Dynamic List</Divider>
				<DynamicListRoute/>
			</Card>			



			<Card>

				<Divider>Content List</Divider>

				<List value="table" padding={ 10 }>

					<List.Item icon={<Icons.table/>} tooltip={{ content: "Orange Block", bg: "#f0a21b" }} title="Navigation One">
						<List.Item content value="table">
								<div>{ title }</div>
						</List.Item>
					</List.Item>
					<List.Item icon={<Icons.pencil/>} title="Navigation Two">
						<List.Item content value="pencil">
							<div>hello pencil</div>
						</List.Item>
					</List.Item>
					<List.Item icon={<Icons.scissors/>} title="Navigation Tree">
						<List.Item content value="scissors">
							<div>hello scissors</div>
						</List.Item>
					</List.Item>
					<List.Item icon={<Icons.road/>} title="Navigation One">
						<List.Item content value="road">
							<div>hello road</div>
						</List.Item>
					</List.Item>	

				</List>

			</Card>

		</Card>
	);
};