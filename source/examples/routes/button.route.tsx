import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Button } from "../../components/Button/button";

export const ButtonRoute = ( props ) => {

	return (
		<Card borderless padding={ 0 }>
			<Divider>Overlay</Divider>		

			<Card>
				<Button value={ "Button" } onClick={( e ) => console.log( e ) }/>
				<Button value={ "Disabled" } disabled onClick={( e ) => console.log( e ) }/>
			</Card>

		</Card>
	);
};