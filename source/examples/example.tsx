import React from "react";
import ReactDOM from "react-dom";

import {
	BrowserRouter,
	Routes,
	Route,
	useNavigate,
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
import { ListRoute } from "@examples/routes/list";

const Header = Row, Wrap = Row, Footer = Row;
const Body = Column, Content = Column, Side = Column;

export const Example = ( props ) => {

	const nav = useNavigate();

	return (
	<Body>

		<Header flex={ "100px" }></Header>

		<Wrap flex={ 9 }>

			<Side flex={ 1 }>
				<Divider style={{ color: "red" }}>Tools</Divider>

				<List value={ 111 } onChange={( event ) => nav( event.selected ) }>
					<List.Item icon={<Icons.pencil/>} title="General">
						<List.Item value={ "/typography" }>Typography</List.Item>
						<List.Item value={ "/icons" }>Icons</List.Item>
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
					<Route path="list" element={ <ListRoute/> } />
				</Routes>

			</Content>

		</Wrap>

	</Body>
	);
};