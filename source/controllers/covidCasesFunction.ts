import { v4 as uuid } from 'uuid';
import { NextFunction, Request, Response } from 'express';
import { CovidCaseType } from './covidCaseType';
import { INDICATOR_NAME } from './constants';

const fs = require('fs');

let rawdata = fs.readFileSync('source/data/covid19NZ.json');
let mockCovidCasesData = JSON.parse(rawdata);

let covidCases: CovidCaseType[] = mockCovidCasesData;

export const getCases = (req: Request, res: Response) => {
  console.log(req.query);
  if (req.query.dateFrom && req.query.dateTo) {
    covidCases = covidCases.filter((data) => {
      if (req.query.dateFrom && req.query.dateTo) {
        return data.dateNumber >= req?.query?.dateFrom && data.dateNumber <= req?.query?.dateTo;
      }
    });
  } else {
    covidCases = mockCovidCasesData;
  }
  console.log('CovidCases fetched successful!');
  res.send(covidCases);
};
export const getCasesTestPerDay = (req: Request, res: Response) => {
  const testPerDayData = mockCovidCasesData && mockCovidCasesData.filter((data: CovidCaseType) => data.indicator_name === INDICATOR_NAME.testPerDay);
  console.log('CovidCases testPerDay fetched successful!');
  res.send(testPerDayData);
};
export const getCasesNumberOfCasesData = (req: Request, res: Response) => {
  const numberOfCasesData = mockCovidCasesData && mockCovidCasesData.filter((data: CovidCaseType) => data.indicator_name === INDICATOR_NAME.numberOfCases);
  console.log('CovidCases numberOfCasesData fetched successful!');
  res.send(numberOfCasesData);
};

export const createCase = (req: Request, res: Response) => {
  const covidCase = req.body;
  covidCases.push({ ...covidCase, id: uuid() });
  console.log(`CovidCase [${covidCase.value}] added to the database.`);
};

export const getCaseById = (req: Request, res: Response) => {
  res.send(req.params.id);
};

export const deleteCase = (req: Request, res: Response) => {
  console.log(`CovidCase with id ${req.params.id} has been deleted`);
  covidCases = covidCases.filter((covidCase) => covidCase.id !== req.params.id);
};

export const updateCase = (req: Request, res: Response) => {};
