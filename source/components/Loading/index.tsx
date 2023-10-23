import React, { useContext } from "react";
import { Props } from "../../utility/props";
import Common from "../../utility/common";
import { Icons } from "../../components/Icons";
import { Lang, LangContext } from "../../components/Lang";

import "./index.scss"

export const Loading = ( props ) => {
	let { children, icon, tip, title, ...rest } = props;
	const lang = useContext( LangContext );

	return (<div className={ Props.className( "loading" ) }>
		<div className={ Props.className( "loading-overlay" ) }>
			{ icon ? icon : (<Icons.spinner spin size={ 24 }/>) }
			{ (tip || title) ? (tip || title) : (lang.get( "loading" ) || "Loading...") }
		</div>
		{ children }
	</div>);
};