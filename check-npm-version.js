const { exec } = require('child_process')

new Promise((resolve, reject) => {
	exec("npm -v", (err, stdout, stderr)=> {
		if (err) throw new Error("Error checking npm version! Process could not be spawned.")
		resolve(stdout.trim())
		reject(stderr.trim())
	})
}).then((version) => {
	console.log(version)
	const major = version[0];
	console.log(`running npm ${major}`)
	if (major >= 7) return;
	console.log("manually linking to @chartiq/chartiq-react-components")
	exec("npm link src/chartiq-react-components", (err, stdout, stderr) => {
		if(err) throw new Error("Could not run npm link")
		else console.log(stdout.trim());
	})
})