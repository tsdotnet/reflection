const packageJson = require('./package.json');
const fs = require("fs");

let failed = 0;
for(const key of ['types', 'main', 'module'])
{
	const path = packageJson[key];
	if(!fs.existsSync(path))
	{
		console.log('"types": "' + path + '" not found.');
		failed = 1;
	}
}
process.exit(failed);
