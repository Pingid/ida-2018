const fs = require('fs');
const path = require('path');
const gsjson = require('google-spreadsheet-to-json');

const spreadsheetID = '1O0w-7e63K_V4ho8jcbL4JlnaFCV_BIBMQWI7XlAC0ck';

const xCoord = str => (parseInt(str.match(/(?<=\().*(?=,)/gi)[0]) + 100) / 200;
const yCoord = str => (parseInt(str.match(/(?<=,).*(?=\))/gi)[0]) + 100) / 200;

const sort = projects => projects
	.filter(x => x.projectName && x.mapCoOrdinates) 
  .map(x => Object.assign({}, x, { 
  	slug: x.yourName.replace(/\s|,\s/gi, '-').toLowerCase(),
  	coordinates: {
  		x: xCoord(x.mapCoOrdinates),
			y: yCoord(x.mapCoOrdinates)
  	}
  }));

gsjson({ spreadsheetId: spreadsheetID })
	.then(data => sort(data))
	.then(data => fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) =>{
		if (err) return console.log(err);
		return console.log('success');
	}))
