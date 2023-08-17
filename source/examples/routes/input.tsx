import React, { useMemo } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Input } from "../../components/Input";

export const InputRoute = ( props ) => {

	return (
		<Card borderless padding={ 0 }>

			<Card>
				<Divider>Input</Divider>	
				<Input onChange={( e ) => console.log( e.value ) }>{ "Hello World" }</Input>
			</Card>

		</Card>
	);
};