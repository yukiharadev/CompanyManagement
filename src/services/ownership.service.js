'use strict';

const {shareholder} =  require("../models/shareholder.model")
const {ownership} = require("../models/ownership.model")
const {company} = require("../models/company.model")
const {findOwnershipByFinanceCode, deleteOwnership} = require("../models/repositories/ownership.repo");
const {BadRequestError} = require("../core/error.response");

class OwnershipService{
    static async createOwnership(payload){
        const {ownership_company, ownership_shareholder, ownership_percentage} = payload;
        const foundCompany = await company.findById(ownership_company);
        if(!foundCompany){
            throw new Error("Company not found");
        }
        const foundShareholder = await shareholder.findById(ownership_shareholder);
        if(!foundShareholder){
            throw new Error("Shareholder not found");
        }
        const newOwnership = ownership.create(payload);
        await shareholder.updateOne(
            { _id: ownership_shareholder },
            { $addToSet: { shareholder_ownerships: {
                        company_name: foundCompany.company_name,
                        company_finance_code: foundCompany.company_finance_code,
                        ownership_percentage: ownership_percentage
                    }}}
        );
        return newOwnership

    }
    static async getOwnershipByFinanceCode({companyFinanceCode}){

        return await findOwnershipByFinanceCode({companyFinanceCode});
    }

    static async deleteOwnership(ownershipId){
        return await deleteOwnership(ownershipId);
    }
}

module.exports = OwnershipService;