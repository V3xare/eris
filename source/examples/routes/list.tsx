import React, { useContext, useEffect, useReducer, useState, useRef , useMemo} from "react";
import ReactDOM from "react-dom";

import { List } from "@components/List";
import { Icons } from "@components/Icons";
import { Card } from "@components/Card";
import { Divider } from "@components/Divider";

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
	const dataLoader = () => {

	};

	return (
	<List load={ dataLoader } data={ data }></List>
	);
};

export const ListRoute = ( props ) => {
	return (
		<Card borderless padding={ 0 }>

			<Card>

				<Divider>Static List</Divider>

				<List value={ "/7" }>
					<List.Item icon={<Icons.pencil/>} title="Navigation One">
						<List.Item value={ "/1" }>Option 1</List.Item>
						<List.Item value={ "/2" }>Option 2</List.Item>
					</List.Item>
					<List.Item icon={<Icons.pencil/>} title="Navigation Two">
						<List.Item value="/5">Option 5</List.Item>
						<List.Item value="/6">Option 6</List.Item>
						<List.Item title="Submenu">
							<List.Item value="/7">Option 7</List.Item>
							<List.Item value="/8">Option 8</List.Item>
						</List.Item>
					</List.Item>
					<List.Item icon={<Icons.pencil/>} title="Navigation Tree">
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

		</Card>
	);
};