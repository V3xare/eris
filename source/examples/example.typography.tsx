import React from "react";
import ReactDOM from "react-dom";
import { Text } from "@components/Typography";
import { Editable } from "@components/Editable";

export const Example = ( props ) => {
	return (<div>
		<Editable>Hello World</Editable>
		<Text>Hello World</Text>
	</div>);
};