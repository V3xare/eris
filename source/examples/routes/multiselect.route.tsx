import React, { useMemo, useState } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { MultiSelect } from "../../components/MultiSelect/multiselect";
import { Icons } from "../../components/Icons";

export const MultiSelectRoute = ( props ) => {

	let [ list, setList ] = useState([ "en", "de" ]);
	let [ list2, setList2 ] = useState([ "value1", "value2", "value3" ]);//useState([ { value: "value1", preset: 5.0 }, { value: "value2", preset: false } ]);
	let [ listPreset2, setListPreset2 ] = useState({ value1: 5, value2: true });
	let [ defaultValue, setDefaultValue ] = useState( "" );

	console.log( list2, listPreset2 );

	return (
		<div>
			
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
							{ value: "value1", title: "Value 1", type: "number", min: 0, max: 10 },
							{ value: "value2", title: "Value 2", type: "checkbox" },
							{ value: "value3", title: "Value 3" },
							{ value: "value4", title: "Value 4", type: "text" },
						]} 
						placeholder={ "Start typying here" }
						onChange={( e ) => { setList2( e.value ); setListPreset2( e.preset ); }}
					/>
				</Card>

				<Card header={ "Default" }>
					<MultiSelect 
						value={ list2 }
						hasDefault
						defaultValue={ defaultValue }
						sortable
						suggestions={[
							{ value: "value1", title: "Value 1" },
							{ value: "value2", title: "Value 2" },
							{ value: "value3", title: "Value 3" },
							{ value: "value4", title: "Value 4" },
						]} 
						placeholder={ "Start typying here" }
						onChange={( e ) => { setList2( e.value ); setListPreset2( e.preset ); setDefaultValue( e.defaultValue ); }}
					/>
				</Card>							
				
				<Card header={ "Default Headerless" }>
					<MultiSelect 
						value={ list2 }
						hasDefault
						defaultValue={ defaultValue }
						sortable
						headerless
						stretch
						suggestions={[
							{ value: "value1", title: "Value 1" },
							{ value: "value2", title: "Value 2" },
							{ value: "value3", title: "Value 3" },
							{ value: "value4", title: "Value 4" },
						]} 
						placeholder={ "Start typying here" }
						onChange={( e ) => { setList2( e.value ); setListPreset2( e.preset ); console.log( e.defaultValue ); setDefaultValue( e.defaultValue ); }}
					/>
				</Card>				

			</Card>

		</div>
	);
};