import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { MultiSelect } from "../../components/MultiSelect/multiselect";
import { Icons } from "../../components/Icons";

export const MultiSelectRoute = ( props ) => {

	let [ list, setList ] = useState([ "en", "de" ]);

	return (
		<Card borderless padding={ 0 }>
			<Divider>Overlay</Divider>		

			<Card>
				<MultiSelect 
					value={ list } 				
					suggestions={[
						{ value: "en", title: "English", icon: <Icons.user/> },
						{ value: "ru", title: "Russian", icon: <Icons.user/> },
						{ value: "ch", title: "Chinese" },
						{ value: "de", title: "German" },
					]} 
					placeholder={ "Start typying here" }
					onChange={( e ) => setList( e.value ) }
				/>
			</Card>

		</Card>
	);
};