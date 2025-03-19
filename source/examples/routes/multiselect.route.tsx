import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { MultiSelect } from "../../components/MultiSelect/multiselect";
import { Icons } from "../../components/Icons";

export const MultiSelectRoute = ( props ) => {

	let [ list, setList ] = useState([ "en", "de" ]);
	let [ list2, setList2 ] = useState([ "numberV", "checkboxV" ]);//useState([ { value: "numberV", preset: 5.0 }, { value: "checkboxV", preset: false } ]);
	let [ listPreset2, setListPreset2 ] = useState({ numberV: 5, checkboxV: true });

	return (
		<Card header={ "MultiSelect" }>

			<Card header={ "Simple" }>
				<MultiSelect 
					value={ list } 				
					suggestions={[
						{ value: "en", title: "English", icon: <Icons.user/> },
						{ value: "ru", title: "Russian", icon: <Icons.user/> },
						{ value: "ch", title: "Chinese" },
						{ value: "de", title: "German" },
					]} 
					onChange={( e ) => setList( e.value ) }
				/>
			</Card>

			<Card header={ "Preset" }>
				<MultiSelect 
					value={ list2 } 
					preset={ listPreset2 }
					suggestions={[
						{ value: "stringV", title: "Value 1", type: "text" },
						{ value: "numberV", title: "Value 2", type: "number", min: 0, max: 10 },
						{ value: "checkboxV", title: "Value 3", type: "checkbox" },
						{ value: "stringV2", title: "Value 4" },
					]} 
					placeholder={ "Start typying here" }
					onChange={( e ) => { setList2( e.value ); setListPreset2( e.preset ); }}
				/>
			</Card>

		</Card>
	);
};