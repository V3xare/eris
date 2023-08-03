import React, { useMemo } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Overlay } from "../../components/Overlay";

const OverlayList = [
	[ -1, 1 ],
	[ 0, 1 ],
	[ 1, 1 ],
	[ 1, 0 ],
	[ 1, -1 ],
	[ 0, -1 ],
	[ -1, -1 ],
	[ -1, 0 ],
	[ 0, 0 ]
];

export const OverlayRoute = ( props ) => {


	return (
		<Card borderless padding={ 0 }>
			<Divider>Overlay</Divider>		

			<Card style={{ height: "600px" }}>
				{ 
					OverlayList.map(( item, index ) => (
						<Overlay key={ index } margin={[ 50, 25 ]} direction={ item }><div>d[{ item[ 0 ] }, { item[ 1 ] }]</div></Overlay>
					)) 
				}
			</Card>

		</Card>
	);
};