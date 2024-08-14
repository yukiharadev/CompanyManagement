'use strict';

const CompanyService = require('../services/company.service');
const { CREATED, SuccessResponse, OK} = require('../core/success.reponse');

class CompanyController {
    createCompany = async (req, res, next) => {
        new CREATED({
            message: "Successfully created product",
            metadata: await CompanyService.createCompany(req.body),
        }).send(res);
    };

    getCompanyByTradingPlatform = async(req,res,next) => {
        new OK({
            message: "Get company by trading platform success!",
            metadata: await CompanyService.findCompanyByTradingPlatform({tradingPlatform: req.params.tradingPlatform})
        }).send(res);
    }

    getAllCompany = async(req,res,next) => {
        new OK({
            message: "Get list company success!",
            metadata: await CompanyService.getAllCompany(req.query)
        }).send(res);
    }

    getCompanyById = async(req,res,next) => {
        new SuccessResponse({
            message: "Get company success!",
            metadata: await CompanyService.getCompanyById({companyId: req.params.companyId})
        }).send(res);
    }

    searchCompany = async(req,res,next) => {
        new SuccessResponse({
            message: "Search company success!",
            metadata: await CompanyService.searchCompany({keySearch: req.params.keySearch})
        }).send(res);
    }

    updateCompany = async(req,res,next) => {
        new SuccessResponse({
            message: "Update company success!",
            metadata: await CompanyService.updateCompany({
                companyId: req.params
                    .companyId, payload: req.body
            })
        }).send(res);
    }

    deleteCompany = async(req,res,next) => {
        new SuccessResponse({
            message: "Delete company success!",
            metadata: await CompanyService.deleteCompany(req.params.companyId)
        }).send(res);
    }

}


module.exports = new CompanyController();