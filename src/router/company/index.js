'use strict';

const express = require('express');
const CompanyController = require('../../controllers/company.controller');
const router = express.Router();
const asyncHandler = require('../../helpers/asyncHandler');

router.post('', asyncHandler(CompanyController.createCompany));
router.get('', asyncHandler(CompanyController.getAllCompany));
router.get('/:companyId', asyncHandler(CompanyController.getCompanyById));
router.get('/trading-platform/:tradingPlatform', asyncHandler(CompanyController.getCompanyByTradingPlatform));

//search
router.get('/search/:keySearch', asyncHandler(CompanyController.searchCompany));

//update
router.patch('/:companyId', asyncHandler(CompanyController.updateCompany));

//delete
router.delete('/:companyId', asyncHandler(CompanyController.deleteCompany));
module.exports = router;