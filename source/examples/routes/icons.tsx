import React, { useMemo } from "react";
import ReactDOM from "react-dom";

import { List } from "@components/List";
import { Icons } from "@components/Icons";
import { Card } from "@components/Card";
import { Tooltip } from "@components/Tooltip";

export const IconsRoute = ( props ) => {

	console.log( Icons );

	const icons = useMemo(() => {

		const keys = Object.keys( Icons );
		const values = Object.values( Icons );
		const list: any[] = [];

		for( let key in values ){
			list.push(
				<Tooltip key={ key } content={ keys[ key ] }>{ values[ key ]({ ...props, size: "200%", padding: 10 })  }</Tooltip>
			);
		};

		return list;
	}, []);

	return (
		<Card borderless padding={ 0 }>

			<Card>{ icons }</Card>

		</Card>
	);
};