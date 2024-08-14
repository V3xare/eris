import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Toggle } from "../../components/Toggle/toggle";

export const ToggleRoute = ( props ) => {

	let [ active, setActive ] = useState( false );

	return (
		<Card borderless padding={ 0 }>
			<Divider>Overlay</Divider>		

			<Card>
				<Toggle active={ active } onChange={( e ) => setActive( e.value ) }/>
			</Card>

		</Card>
	);
};