import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Button } from "../../components/Button/button";
import { Space } from "../../components/Space/space";

export const ButtonRoute = ( props ) => {

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

		</Card>
	);
};