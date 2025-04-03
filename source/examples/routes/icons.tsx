import React, { useMemo } from "react";


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
				<Tooltip key={ key } content={ keys[ key ] }>{ values[ key ]({ ...props, size: "200%", padding: 10 })  }</Tooltip>
			);
		};

		return list;
	}, []);

	return (
		<div>

			<Card header={ "Icons" }>

				<Card>
					<Row>{ "Icomoon pack" }</Row>
					<div>
						{ icons }
					</div>									
				</Card>

			</Card>

		</div>
	);
};