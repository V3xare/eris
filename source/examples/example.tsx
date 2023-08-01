import React from "react";


import {
	BrowserRouter,
	Routes,
	Route,
	useNavigate,
	useLocation,
	Link
} from "react-router-dom";

import { Text } from "../components//Typography";
import { Editable } from "../components//Editable";
import { Eris } from "../components//Eris";
import { Icons } from "../components//Icons";
import { Row } from "../components//Row";
import { List } from "../components//List";
import { Column } from "../components//Column";
import { Divider } from "../components//Divider";
import { Card } from "../components//Card";
import { Tooltip } from "../components//Tooltip";
import { TypographyRoute } from "./routes/typography";
import { ListRoute } from "../examples//routes/list";
import { IconsRoute } from "../examples//routes/icons";

const Header = Row, Wrap = Row, Footer = Row;
const Body = Column, Content = Column, Side = Column;

export const Example = ( props ) => {

	const nav = useNavigate();
	const location = useLocation();

	return (
	<Body>

		<Header flex={ "100px" }></Header>

		<Wrap flex={ 9 }>

			<Side flex={ "0 0 256px" }>
				<Divider style={{ color: "red" }}>Tools</Divider>

				<List value={ location.pathname } onChange={( event ) => nav( event.selected.value ) }>
					<List.Item icon={<Icons.pencil/>} title="General" expandable={ false }>
						<List.Item value={ "/typography" }>Typography</List.Item>
						<List.Item value={ "/icons" }>Icons</List.Item>
					</List.Item>
					<List.Item icon={<Icons.tree/>} title="Hierarchy">
						<List.Item value="/list">List</List.Item>
						<List.Item value="/tree">Tree</List.Item>
					</List.Item>
					<List.Item icon={<Icons.calendar/>} title="Navigation Tree">
						<List.Item value="/9">Option 9</List.Item>
						<List.Item value="/10">Option 10</List.Item>
						<List.Item value="/11">Option 11</List.Item>
						<List.Item value="/12">Option 12</List.Item>
					</List.Item>
				</List>

			</Side>

			<Content flex={ 9 }>

				<Routes>
					<Route path="/" element={ <TypographyRoute/> } />
					<Route path="typography" element={ <TypographyRoute/> } />
					<Route path="list" element={ <ListRoute/> } />
					<Route path="icons" element={ <IconsRoute/> } />
				</Routes>

			</Content>

		</Wrap>

	</Body>
	);
};