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
import { OverlayRoute } from "../examples//routes/overlay";
import { InputRoute } from "../examples//routes/input";
import { LangRoute } from "../examples//routes/lang.route";
import { LoadingRoute } from "../examples//routes/loading.route";
import { AutoCompleteRoute } from "../examples//routes/autocomplete";
import { CalendarRoute } from "../examples//routes/celendar.route";

const Header = Row, Wrap = Row, Footer = Row;
const Body = Column, Content = Column, Side = Column;

export const Example = ( props ) => {

	const nav = useNavigate();
	const location = useLocation();

	return (
	<Body>

		<Header flex={ "0px" }></Header>

		<Wrap flex={ 9 }>

			<Side flex={ "0 0 256px" }>
				<Divider style={{ color: "red" }}>Tools</Divider>

				<List value={ location.pathname } onChange={( event ) => nav( event.value ) }>
					<List.Item icon={<Icons.pencil/>} title="General" expandable={ false }>
						<List.Item value={ "/typography" }>Typography</List.Item>
						<List.Item value={ "/icons" }>Icons</List.Item>
						<List.Item value={ "/lang" }>Lang</List.Item>
						<List.Item value={ "/loading" }>Loading</List.Item>
					</List.Item>
					<List.Item icon={<Icons.stack/>} title="Layout">
						<List.Item value={ "/overlay" }>Overlay</List.Item>
					</List.Item>					
					<List.Item icon={<Icons.tree/>} title="Hierarchy">
						<List.Item value="/list">List</List.Item>
						<List.Item value="/tree">Tree</List.Item>
					</List.Item>
					<List.Item icon={<Icons.quill/>} title="Inputs">
						<List.Item value="/autocomplete">AutoComplete</List.Item>
						<List.Item value="/input">Input</List.Item>
						<List.Item value="/calendar">Calendar</List.Item>
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
					<Route path="lang" element={ <LangRoute/> } />
					<Route path="loading" element={ <LoadingRoute/> } />
					<Route path="calendar" element={ <CalendarRoute/> } />
					<Route path="overlay" element={ <OverlayRoute/> } />
					<Route path="input" element={ <InputRoute/> } />
					<Route path="autocomplete" element={ <AutoCompleteRoute/> } />
				</Routes>

			</Content>

		</Wrap>

	</Body>
	);
};