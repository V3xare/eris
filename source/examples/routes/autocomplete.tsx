import React, { useMemo } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { AutoComplete } from "../../components/AutoComplete";
import { Input } from "../../components/Input";
import { Icons } from "../../components/Icons";
import { Row } from "../../components/Row";
import { Text } from "../../components/Typography";

export const AutoCompleteRoute = ( props ) => {

	return (
		<Card borderless padding={ 0 }>

			<Card>
				<Divider>AutoComplete</Divider>	

				<Row gap={ true }>

					<AutoComplete onChange={( value, callback ) => callback([ 
						{ icon: <Icons.blog/>, value: value + " title1" },
						{ icon: <Icons.image/>, value: value + " title2" },
						{ icon: <Icons.camera/>, value: value + " title3" },
						{ icon: <Icons.dice/>, value: value + " title4" },
						{ icon: <Icons.podcast/>, value: value + " title5" }
					])}>
						<Input>Hello</Input>
					</AutoComplete>

					<AutoComplete onChange={( value, callback ) => callback([ 
						{ icon: <Icons.blog/>, value: value + " title1" },
						{ icon: <Icons.image/>, value: value + " title2" },
						{ icon: <Icons.camera/>, value: value + " title3" },
						{ icon: <Icons.dice/>, value: value + " title4" },
						{ icon: <Icons.podcast/>, value: value + " title5" }
					])}>
						<Input style={{ width: "300px" }}>Hello</Input>
					</AutoComplete>

					<AutoComplete onChange={( value, callback ) => callback([ 
						{ icon: <Icons.blog/>, value: value + " title1" },
						{ icon: <Icons.image/>, value: value + " title2" },
						{ label: (<Text>custom { value } label</Text>), value: " title3" },
						{ icon: <Icons.dice/>, value: value + " title4" },
						{ icon: <Icons.podcast/>, value: value + " title5" }
					])}>
						<Input style={{ width: "300px" }}>Hello</Input>
					</AutoComplete>

				</Row>

			</Card>

		</Card>
	);
};