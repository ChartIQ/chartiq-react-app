import React from "react";
import ReactDom from "react-dom";

import { default as Routes } from "./containers/Router/Router";

const el = document.querySelector("#app");

if (el) {
	ReactDom.render(
		<Routes></Routes>,
		el
	);
}
