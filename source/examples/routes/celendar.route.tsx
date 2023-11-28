import React, { useMemo } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Calendar } from "../../components/Calendar";

export const CalendarRoute = ( props ) => {

	return (
		<Card borderless padding={ 0 }>
			<Divider>Overlay</Divider>		

			<Card style={{ height: "600px" }}>
				{ 
					<Calendar onChange={( e ) => { console.log( e ); }}/>
				}
			</Card>

		</Card>
	);
};