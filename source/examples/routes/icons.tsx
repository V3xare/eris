import React, { useMemo } from "react";
import ReactDOM from "react-dom";

import { List } from "../../components/List";
import { Icons } from "../../components/Icons";
import { Card } from "../../components/Card";
import { Tooltip } from "../../components/Tooltip";
import { Column } from "../../components/Column";
import { Divider } from "../../components/Divider";
import { Row } from "../../components/Row";

export const IconsRoute = ( props ) => {

	const icons = useMemo(() => {

		const keys = Object.keys( Icons );
		const values = Object.values( Icons );
		const list: any[] = [];

		for( let key in values ){
			list.push(
				<Tooltip key={ key } content={ keys[ key ] }>{ values[ key ]({ ...props, size: "200%", padding: 10, color: "#000" })  }</Tooltip>
			);
		};

		return list;
	}, []);

	return (
		<Card borderless padding={ 0 }>

			<Card>
				<Divider>Icomoon pack</Divider>		
				{ icons }
			</Card>

		</Card>
	);
};