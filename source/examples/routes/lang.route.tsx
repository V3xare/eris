import React, { useMemo, useReducer, useContext, useEffect } from "react";

import { Card } from "../../components/Card";
import { Divider } from "../../components/Divider";
import { Column } from "../../components/Column";
import { Input } from "../../components/Input";
import { Text } from "../../components/Typography";
import { LangContext, Lang } from "../../components/Lang";

const LangApp = ( props ) => {
	const lang = useContext( LangContext );

	useEffect(() => {

		lang.dispatch([ "add", "en", {
			"hello": "hello",
			"bye": "bye"
		}]);		
		lang.dispatch([ "add", "ru", {
			"hello": "привет",
			"bye": "пока"
		}]);

	}, []);

	return (<Column>
		<Text>{ lang.get( "hello" ) }</Text>
		<Text>{ lang.get( "hello", [], { locale: "ru" }) }</Text>
		<Text>{ lang.get( "bye" ) }</Text>
		<Text>{ lang.get( "bye", [], { locale: "ru" }) }</Text>
	</Column>);
};

export const LangRoute = ( props ) => {
	
	return (
		<Card borderless padding={ 0 }>

			<Card>
				<Divider>Lang</Divider>	
				<Lang>
					<LangApp/>
				</Lang>
			</Card>

		</Card>
	);
};