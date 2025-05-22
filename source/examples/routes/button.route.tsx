import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Text } from "../../components/Typography";
import { Divider } from "../../components/Divider";
import { Button } from "../../components/Button/button";
import { Space } from "../../components/Space/space";
import { Modal } from "../../components/Modal/modal";
import { Column } from "../../components/Column";
import { Row } from "../../components/Row";

export const ButtonRoute = ( props ) => {

	let [ modalActive, setModalActive ] = useState( false );

	return (
		<Card header={ "Buttons" }>

			<Card header={ "Static" }>
				<Button value={ "Button" } onClick={( e ) => console.log( e ) }/>
				<Space/>
				<Space/>
				<Button value={ "Disabled" } disabled onClick={( e ) => console.log( e ) }/>
				<Space/>
				<Space/>
				<Button value={ "Confirm" } confirm onClick={( e ) => console.log( e ) }/>
				<Space/>
				<Space/>
				<Button value={ "Warning" } warning confirm onClick={( e ) => console.log( e ) }/>
				<Space/>
				<Space/>
				<Button value={ "Danger" } danger confirm onClick={( e ) => console.log( e ) }/>
			</Card>

			<Card header={ "Dynamic" }>

				<Button value={ "Modal" } bg onClick={( e ) => setModalActive( true ) }/>
				
				<Modal active={ modalActive } bg onClose={( e ) => setModalActive( false ) }>

					<Column>
						<Row>
							<Text>Removing of user is permanent, do you wish to remove anyway?</Text>
						</Row>
						<br/>
						<Row>
							<Button value={ "Danger" } danger confirm onClick={( e ) => console.log( e ) }/>
							<Space/>
							<Space/>						
							<Button value={ "Close" } onClick={( e ) => e.modal.close() }/>
						</Row>
					</Column>

				</Modal>

				<Space/>
				<Space/>
				
				<Modal trigger={ <Button value={ "Trigger" }/> } attach>

					<Column>
						<Row>
							<Text>Removing of user is permanent, do you wish to remove anyway?</Text>
						</Row>
						<br/>
						<Row>
							<Button value={ "Danger" } danger confirm onClick={( e ) => console.log( e ) }/>
							<Space/>
							<Space/>						
							<Button value={ "Close" } onClick={( e ) => e.modal.close() }/>
						</Row>
					</Column>

				</Modal>				

			</Card>

		</Card>
	);
};