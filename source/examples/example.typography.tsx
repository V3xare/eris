import React from "react";
import ReactDOM from "react-dom";
import { Text } from "@components/Typography";
import { Editable } from "@components/Editable";
import { Row } from "@components/Row";
import { Column } from "@components/Column";
import { Divider } from "@components/Divider";
import { Card } from "@components/Card";
import { Tooltip } from "@components/Tooltip";

export const Example = ( props ) => {
	return (<div>

		<Column>

			<Row flex={ "100px" }></Row>

			<Row flex={ 9 }>

				<Column flex={ 1 }>
					<Divider>Tools</Divider>
				</Column>

				<Column flex={ 9 }>

					<Card borderless padding={ 0 }>

						<Tooltip content={ "Hello There!111" }>
							<span><div>111<div>333</div></div></span>
						</Tooltip>

						<Card>
							<Divider>Raw flex style</Divider>
							<Row gap={ 20 }>
								<Tooltip content={ "Hello There!222" }>
									<Column flex={ 1 } style={{ backgroundColor: "blue" }}>1</Column>
								</Tooltip>
								<Column flex={ 9 } style={{ backgroundColor: "red" }}>2</Column>
								<Column flex={ "50%" } style={{ backgroundColor: "red" }}>2</Column>
								<Column flex={ "6 6 auto" } style={{ backgroundColor: "red" }}>2</Column>
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

					</Card>

				</Column>


			</Row>

		</Column>

	</div>);
};