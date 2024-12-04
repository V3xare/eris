import React, { useMemo } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { AutoComplete } from "../../components/AutoComplete";
import { Input } from "../../components/Input";
import { Icons } from "../../components/Icons";
import { Row } from "../../components/Row";
import { Text } from "../../components/Typography";
import { Select } from "../../components/Select";

export const AutoCompleteRoute = ( props ) => {

	return (
		<Card borderless padding={ 0 }>

			<Card>
				<Divider>AutoComplete</Divider>	

				<Row gap={ true }>

					<Select value={ "title277" } onSelect={( v ) => console.log( v ) } list={[
						{ icon: <Icons.blog/>, value: "title1", title: "title 1" },
						{ icon: <Icons.image/>, value: "title2", title: "title 27777777777" },
						{ icon: <Icons.camera/>, value: "title3", title: "title 3" },
						{ icon: <Icons.dice/>, value: "title4", title: "title 4" },
						{ icon: <Icons.podcast/>, value: "title5", title: "title 5" }						
					]}/>


					<AutoComplete onChange={( value, callback ) => callback([ 
						{ icon: <Icons.blog/>, value: value + " title1" },
						{ icon: <Icons.image/>, value: value + " title2" },
						{ icon: <Icons.camera/>, value: value + " title3" },
						{ icon: <Icons.dice/>, value: value + " title4" },
						{ icon: <Icons.podcast/>, value: value + " title5" }
					])}
						onSelect={( value, callback ) => {
							console.log( value );
							callback();
						}}
					>
						<Input>Hello</Input>
					</AutoComplete>

					<AutoComplete larger onChange={( value, callback ) => callback([ 
						{ icon: <Icons.blog/>, value: value + " title1" },
						{ icon: <Icons.image/>, value: value + " title2" },
						{ icon: <Icons.camera/>, value: value + " title3" },
						{ icon: <Icons.dice/>, value: value + " title4" },
						{ icon: <Icons.podcast/>, value: value + " title5" }
					])}>
						<Input 
							style={{ width: "300px" }} 
							larger
							tools={[
								{ icon: <Icons.search/>, direction: 0 },
							]}
							placeholder={ "What would you like to find?" }
						></Input>
					</AutoComplete>

					<AutoComplete larger onChange={( value, callback ) => callback([ 
						{ icon: <Icons.blog/>, value: value + " title1" },
						{ icon: <Icons.image/>, value: value + " title2" },
						{ label: (<Text>custom { value } label</Text>), value: " title3" },
						{ icon: <Icons.dice/>, value: value + " title4" },
						{ icon: <Icons.podcast/>, value: value + " title5" }
					])}>
						<Input 
							style={{ width: "300px" }} 
							larger
							tools={[
								{ icon: <Icons.search active/>, direction: 0, onClick: ( event ) => {
									event.autocomplete.select();
								}},
								"clear",
							]}
							placeholder={ "What would you like to find?" }
						></Input>
					</AutoComplete>

				</Row>

			</Card>

		</Card>
	);
};