import React from "react";
import ReactDOM from "react-dom";

import { List } from "@components/List";
import { Icons } from "@components/Icons";
import { Card } from "@components/Card";

export const ListRoute = ( props ) => {
	return (
		<Card borderless padding={ 0 }>

			<Card>

				<List value={ "/7" } onChange={( event ) => console.log( event ) }>
					<List.Item icon={<Icons.pencil/>} title="Navigation One" expandable={ false }>
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
					<List.Item icon={<Icons.pencil/>} title="Navigation Three">
						<List.Item value="/9">Option 9</List.Item>
						<List.Item value="/10">Option 10</List.Item>
						<List.Item value="/11">Option 11</List.Item>
						<List.Item value="/12">Option 12</List.Item>
					</List.Item>
				</List>

			</Card>

		</Card>
	);
};