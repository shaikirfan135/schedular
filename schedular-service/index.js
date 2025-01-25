const express = require('express');
const cors = require('cors')
const fs = require('fs');

// const conn = require('./utils/mysqlutils');
const schedularFilePath = require('./utils/mappingsparser');
const JobDetails = require('./model/jobdetail');



// const JWT = require('jsonwebtoken');
// const JWT_KEY = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

let jobDetailsObj = [];

const loadFiles = () => {
	console.log('schedularFilePath : ', schedularFilePath)
	// fs.readFile(schedularFilePath, 'utf8',(err, item) => {
	// 	//const jsonData = JSON.parse(item);
	// 	console.log(item);
	// });

	const rawData = fs.readFileSync(schedularFilePath, 'utf8');
	const jobDetailsData = JSON.parse(rawData);

	// Convert each entry into a Person object
	jobDetailsObj = jobDetailsData.map(jobDetails => new JobDetails(jobDetails.tablename, jobDetails.selectcolumns, jobDetails.whereclause, jobDetails.schemaname, jobDetails.orderbycolumn, jobDetails.sortdirection));

	// Log the resulting array of Person objects
	//console.log(jobDetailsObj);

	// You can also call methods on the Person objects
	jobDetailsObj.forEach(jobDetails => jobDetails.greet());

}

app.get('/loadJobDetails', (req, res) => {
	loadFiles();
	res.send(jobDetailsObj);
})

app.listen(5000);
