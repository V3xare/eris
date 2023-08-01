import React from "react";
import { createRoot } from 'react-dom/client';

//import "./components/";
//export { default as Card } from './components/Card';
//import VMath from "./utility/vmath"
//export { VMath };
//
//import Card from "./components/Card"
//export { Card };
//
//console.log(555);

import {
	BrowserRouter,
} from "react-router-dom";
//
console.log( "eris" );
//
import "../assets/styles/main.scss"
import { Example } from "./examples/example";
//

const root = createRoot( document.getElementById( "main" ) );
root.render( 
	<BrowserRouter>
		<Example/>
	</BrowserRouter>
);
