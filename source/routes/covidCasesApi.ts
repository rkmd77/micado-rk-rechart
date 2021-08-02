import express from 'express';
import { RECHART_TYPE } from '../controllers/constants';

import { getCases, getCasesTestPerDay, getCasesNumberOfCasesData, createCase, getCaseById, deleteCase, updateCase } from '../controllers/covidCasesFunction';

const router = express.Router();

router.get('/', getCases);
router.get(`/${RECHART_TYPE.testPerDay}`, getCasesTestPerDay);
router.get(`/${RECHART_TYPE.numberOfCases}`, getCasesNumberOfCasesData);

router.post('/', createCase);

router.get('/:id', getCaseById);

router.delete('/:id', deleteCase);

router.patch('/:id', updateCase);

export default router;
