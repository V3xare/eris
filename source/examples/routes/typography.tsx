import React from "react";

import { Text } from "../../components/Typography";
import { Editable } from "../../components/Editable";
import { Row } from "../../components/Row";
import { Column } from "../../components/Column";
import { Divider } from "../../components/Divider";
import { Card } from "../../components/Card";
import { Tooltip } from "../../components/Tooltip";

export const TypographyRoute = ( props ) => {
	return (
		<Card borderless padding={ 0 }>
					<Tooltip content={ "Red Block" } bg={ "#f0a21b" }>
						<Column flex={ 9 } style={{ backgroundColor: "#f0a21b" }}>2</Column>
					</Tooltip>

			<Column>
				<Row>Name: <Editable>Alex</Editable></Row>
				<Row>Age: <Editable>18</Editable></Row>
				<Row>Name: <Editable>Alex</Editable></Row>
				<Row>Name: <Editable>Alex</Editable></Row>
			</Column>


			<Card>
				<Divider>Raw flex style</Divider>
				<Row gap={ 20 }>
					<Tooltip content={ "Blue Block" } bg={ "#67d9b4" }>
						<Column flex={ 1 } style={{ backgroundColor: "#67d9b4" }}>1</Column>
					</Tooltip>
					<Tooltip content={ "Red Block" } bg={ "#f0a21b" }>
						<Column flex={ 9 } style={{ backgroundColor: "#f0a21b" }}>2</Column>
					</Tooltip>
					<Column flex={ "50%" } style={{ backgroundColor: "#e64ef0" }}>2</Column>
					<Column flex={ "6 6 auto" } style={{ backgroundColor: "#56b7ff" }}>2</Column>
				</Row>
			</Card>

			<Card>
				<Divider>Raw flex style</Divider>

				<Editable>Hello World</Editable>
				<Text>Hello World</Text>
				<Text strong>Hello World</Text>

				<Divider>Raw flex style</Divider>

				<Text italic>Hello World</Text>
				<Text italic strong>Hello World</Text>
				<Text link={ "/link" } italic>Hello World</Text>
			</Card>

			<Card>

				<Tooltip content={ "Tooltip555" } bg={ "#ec4cff" }>
					<span>54545</span>
				</Tooltip>


				<Divider>Title 1</Divider>
				Hello World
				<Divider>Title 2</Divider>
				OPOPOP
			</Card>

		</Card>
	);
};