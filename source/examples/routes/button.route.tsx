import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Text } from "../../components/Typography";
import { Divider } from "../../components/Divider";
import { Button } from "../../components/Button/button";
import { Space } from "../../components/Space/space";
import { Modal } from "../../components/Modal/modal";

export const ButtonRoute = ( props ) => {

	let [ modalActive, setModalActive ] = useState( true );

	return (
		<Card borderless padding={ 0 }>
			<Divider>Overlay</Divider>		

			<Card>
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

			<Card>

				<Button value={ "Modal" } onClick={( e ) => setModalActive( true ) }/>
				
				<Modal active={ modalActive } onClose={( e ) => setModalActive( false ) }>

					<Card header={ "User removing" } small borderless>
						<Text>Removing of user is permanent, do you wish to remove anyway?</Text>
						<Divider></Divider>
						<Button value={ "Danger" } danger confirm onClick={( e ) => console.log( e ) }/>
						<Space/>
						<Space/>						
						<Button value={ "Close" } onClick={( e ) => setModalActive( false ) }/>
					</Card>

				</Modal>

			</Card>

		</Card>
	);
};