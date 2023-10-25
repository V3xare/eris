import React, { useContext } from "react";
import { Props } from "../../utility/props";
import Common from "../../utility/common";
import { Icons } from "../../components/Icons";
import { Text } from "../../components/Typography";
import { Lang, LangContext } from "../../components/Lang";

import "./index.scss"

export const Loading = ( props ) => {
	let { children, icon, tip, title, status, ...rest } = props;
	const lang = useContext( LangContext );

	return (<div className={ Props.className( "loading" ) }>
		<Text className={ Props.className( "loading-overlay", { hidden: status !== true } ) }>
			{ icon ? icon : (<Icons.spinner spin size={ 24 }/>) }
			{ (tip || title) ? (tip || title) : (lang.get( "loading" ) || "Loading...") }
		</Text>
		<div className={ Props.className( "loading-container", { active: status === true } ) }>
			{ children }
		</div>
	</div>);
};