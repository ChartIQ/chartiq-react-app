require("@babel/register")({
	configFile: "./build-scripts/babel-test.config.js",
	ignore: [/node_modules/]
});
