import React, { useMemo, useReducer, useContext, useEffect, useState } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Loading } from "../../components/Loading";
import { Input } from "../../components/Input";
import { Column } from "../../components/Column";
import { Editable } from "../../components/Editable";
import { Text } from "../../components/Typography";

export const LoadingRoute = ( props ) => {

	const [ loading, setLoading ] = useState( true );
	
	return (
		<Card borderless padding={ 0 }>

			<Card>
				<Divider>Lang</Divider>	
				<div onClick={() => setLoading( !loading ) }>{ loading ? "loading" : "not loading" }</div>
				<Loading status={ loading }>
					<Card>
						<Column>
							<Input onChange={( e ) => console.log( e.value ) }>{ "Hello World" }</Input>
							<Divider>Raw flex style</Divider>

							<Editable>Hello World</Editable>
							<Text>Hello World</Text>
							<Text strong>Hello World</Text>

							<Divider>Raw flex style</Divider>

							<Text italic>Hello World</Text>
							<Text italic strong>Hello World</Text>
							<Text link={ "/link" } italic>Hello World</Text>
						</Column>
					</Card>
				</Loading>
			</Card>

		</Card>
	);
};