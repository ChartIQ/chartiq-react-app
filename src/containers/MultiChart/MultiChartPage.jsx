import React from "react";
import MultiChart from "./MultiChart";

export default function () {
	const conf1 = { initialSymbol: "FB" };
	const conf2 = { initialSymbol: "GOOG" };

	return <MultiChart configs={[conf1, conf2]} />;
}
