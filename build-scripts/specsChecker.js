const shell = require("shelljs");
const { wdioConfigReact } = require('../wdio.conf.js')

module.exports.specsChecker = function () {
	let specsExclude = wdioConfigReact.exclude;
	specsExclude.forEach(function (part, index) {
		this[index] = this[index].replace("/stx/tests/e2e-v2/specs/sample-template-advanced", "");
	}, specsExclude);
	let forgottenSpecs = [];
	let specsInFolder = shell
		.exec(`cd ./stx/tests/e2e-v2/specs/sample-template-advanced && find . -name "*.spec.js"`, {
			silent: true
		})
		.stdout.trim();
	specsInFolder = specsInFolder.split("\n");
	for (let i = 0; i < specsExclude.length; i++) {
		let index = specsInFolder.indexOf(specsExclude[i]);
		if (index !== -1) {
			specsInFolder.splice(index, 1);
		}
	}
	for (let i = 0; i < specsInFolder.length; i++) {
		specsInFolder[i] = specsInFolder[i].slice(1);
		let numberOfGroups = parseInt(Object.keys(wdioConfigReact.specs).length);
		for (let g = 0; g < numberOfGroups; g++) {
			let numberOfSpecs = parseInt(Object.keys(wdioConfigReact.specs[g]).length);
			for (let s = 0; s < numberOfSpecs; s++) {
				if (wdioConfigReact.specs[g][s].includes(specsInFolder[i])) {
					specsInFolder[i] = specsInFolder[i] + " is OK";
				}
			}
		}
		if (!specsInFolder[i].includes("is OK")) {
			forgottenSpecs.push(specsInFolder[i] + "\n");
		}
	}
	if (forgottenSpecs.length !== 0) {
		throw new Error(
			"Looks like you forget to add specs into tests group: \n" + forgottenSpecs
		);
	}
};
