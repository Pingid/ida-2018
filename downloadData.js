const fs = require('fs');
const path = require('path');
const gsjson = require('google-spreadsheet-to-json');

const spreadsheetID = '1O0w-7e63K_V4ho8jcbL4JlnaFCV_BIBMQWI7XlAC0ck';

gsjson({ spreadsheetId: spreadsheetID })
	.then(data => fs.writeFile('./src/data.json', JSON.stringify(data), (err) =>{
		if (err) return console.log(err);
		return console.log('success');
	}))
