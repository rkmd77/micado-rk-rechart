const { v4: uuidv4 } = require('uuid');
const csvToJson = require('csvtojson');
const fs = require('fs');

function convertDateToNumber(date) {
  let updatedDate = date;
  if (date && date.includes('/')) {
    updatedDate = `${date.split('/')?.[1]}/${date.split('/')?.[0]}/${date.split('/')?.[2]}`;
  }
  const DateNumber = new Date(updatedDate).getTime();
  return DateNumber;
}

const csvFilePath = 'source/data/covid_19_new_zealand.csv';

const convertCsv = csvToJson();
convertCsv.fromFile(csvFilePath).then((jsonObj) => {
  if (jsonObj && jsonObj.length > 0) {
    jsonObj.map((covidCase) => {
      covidCase.id = uuidv4();
      covidCase.value = Number(covidCase.value) || 0;
      covidCase.dateNumber = convertDateToNumber(covidCase.parameter)
      return covidCase;
    });
  }
  fs.writeFile('source/data/covid19NZ.json', JSON.stringify(jsonObj, null, 4), (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON array is saved.');
  });
});
