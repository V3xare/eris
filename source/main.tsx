import React from "react";
import ReactDOM from "react-dom";

import {
	BrowserRouter,
} from "react-router-dom";


import "../assets/styles/main.scss"
import { Example } from "@examples/example";

ReactDOM.render(
<BrowserRouter>
	<Example/>
</BrowserRouter>, document.getElementById( "main" ) );