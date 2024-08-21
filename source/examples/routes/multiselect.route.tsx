import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { MultiSelect } from "../../components/MultiSelect/multiselect";
import { Icons } from "../../components/Icons";

export const MultiSelectRoute = ( props ) => {

	return (
		<Card borderless padding={ 0 }>
			<Divider>Overlay</Divider>		

			<Card>
				<MultiSelect 
					value={[
						"en", "de"
					]} 				
					suggestions={[
						{ value: "en", title: "English", icon: <Icons.user/> },
						{ value: "ru", title: "Russian", icon: <Icons.user/> },
						{ value: "ch", title: "Chinese" },
						{ value: "de", title: "German" },
					]} 
					onChange={( e ) => console.log( e ) }
				/>
			</Card>

		</Card>
	);
};