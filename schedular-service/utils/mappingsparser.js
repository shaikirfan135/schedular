const fs = require('fs');
const path = require('path');

//get the project directory path
const projectDirectory = path.dirname(require.main.filename);
//add the mappings location to the directory path
const dirPath = path.join(projectDirectory, 'mappings');
const schedularFilePath = `${dirPath}/schedulars.json`;


module.exports=schedularFilePath;