import React, { useMemo, useReducer, useContext, useEffect } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Loading } from "../../components/Loading";

export const LoadingRoute = ( props ) => {
	
	return (
		<Card borderless padding={ 0 }>

			<Card>
				<Divider>Lang</Divider>	
				<Loading>
					<Card></Card>
				</Loading>
			</Card>

		</Card>
	);
};