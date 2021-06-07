module.exports = {
	presets: [
		[
			'@babel/env',
			{
				targets: {
					node: 'current',
				},
			},
			"@babel/react"
		],
	],
	plugins: ["@babel/plugin-syntax-dynamic-import"],
};
