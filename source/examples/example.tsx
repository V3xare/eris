import React from "react";
import ReactDOM from "react-dom";

import {
	BrowserRouter,
	Routes,
	Route,
	Link
} from "react-router-dom";

import { Text } from "@components/Typography";
import { Editable } from "@components/Editable";
import { Icons } from "@components/Icons";
import { Row } from "@components/Row";
import { List } from "@components/List";
import { Column } from "@components/Column";
import { Divider } from "@components/Divider";
import { Card } from "@components/Card";
import { Tooltip } from "@components/Tooltip";
import { TypographyRoute } from "./routes/typography";

const Header = Row, Wrap = Row, Footer = Row;
const Body = Column, Content = Column, Side = Column;

export const Example = ( props ) => {
	return (<BrowserRouter>

	<Body>

		<Header flex={ "100px" }></Header>

		<Wrap flex={ 9 }>

			<Side flex={ 1 }>
				<Divider style={{ color: "red" }}>Tools</Divider>




				<List value={ 111 }>
					<List.Item icon={<Icons.pencil/>} title="Navigation One">
						<List.Item title="Item 1">
							<List.Item value="1">Option 1</List.Item>
							<List.Item value="2">Option 2</List.Item>
						</List.Item>
						<List.Item title="Item 2">
							<List.Item value="3">Option 3</List.Item>
							<List.Item value="4">Option 4</List.Item>
						</List.Item>
					</List.Item>
					<List.Item icon={<Icons.pencil/>} title="Navigation Two">
						<List.Item value="5">Option 5</List.Item>
						<List.Item value="6">Option 6</List.Item>
						<List.Item title="Submenu">
							<List.Item value="7">Option 7</List.Item>
							<List.Item value="8">Option 8</List.Item>
						</List.Item>
					</List.Item>
					<List.Item icon={<Icons.pencil/>} title="Navigation Three">
						<List.Item value="9">Option 9</List.Item>
						<List.Item value="10">Option 10</List.Item>
						<List.Item value="11">Option 11</List.Item>
						<List.Item value="12">Option 12</List.Item>
					</List.Item>
				</List>




			</Side>

			<Content flex={ 9 }>

				<Routes>
					<Route path="/" element={ <TypographyRoute/> } />
					<Route path="typography" element={ <TypographyRoute/> } />
				</Routes>

			</Content>

		</Wrap>

	</Body>

	</BrowserRouter>);
};