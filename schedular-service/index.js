const express = require('express');
const cors = require('cors')
const fs = require('fs');

const connection = require('./utils/mysqlutils');
const schedularFilePath = require('./utils/mappingsparser');
const JobDetails = require('./model/jobdetail');



// const JWT = require('jsonwebtoken');
// const JWT_KEY = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

let jobDetailsObj = [];

const loadFiles = () => {
	//console.log('schedularFilePath : ', schedularFilePath)
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
	//jobDetailsObj.forEach(jobDetails => jobDetails.greet());

}

app.get('/loadJobDetails', (req, res) => {
	loadFiles();
	res.send(jobDetailsObj);
})

app.get('/loadTableDetails/:key', async (req, res) => {
	loadFiles();
	//console.log('req key : ', req.params.key);
	try {
		const reqParam = req.params.key;
		const selectedTable = jobDetailsObj.find(job => job.tableName === reqParam);
		console.log(`reqParam : ${reqParam} and selectedTable : ${selectedTable}`)
		if (selectedTable !== '' && selectedTable !== undefined) {
			const queryStr = prepareQuery(selectedTable);
			console.log('prepared query : ', queryStr.trim())
			//call the db, list of results will get here
			//set the selectedTable and the above db results in an object
			//selectedTable to show the ui header name 
			//where as results are to display column data
			// const results = await conn.execute(query);

			const [rows, fields] = await connection.promise().query(queryStr);

			console.log('Data : ',rows);
			// console.log('Types of Fields : ' + fields);

			res.send(rows);

		} else {
			res.send(`No matching Table Found ${reqParam}, please contact support!`);
		}
	} catch (err) {
		res.send('Error occured during processing, please contact support! ' + err);
	}

})

const prepareQuery = (obj) => {
	const tableName = obj.schema ? obj.schema + '.' + obj.tableName : obj.tableName;
	const columnOrder = obj.orderbyColumn ? 'order by ' + obj.orderbyColumn + ' ' + obj.sortDirection : '' ;
	return `select ${obj.selectColumns} from ${tableName} ${columnOrder}`;
}

app.listen(5000);
