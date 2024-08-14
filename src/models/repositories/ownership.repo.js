'use strict';

const {ownership} = require('../ownership.model');
const {shareholder} = require('../shareholder.model');
const {searchCompany} = require("./company.repo");
const {BadRequestError} = require("../../core/error.response");

const findOwnershipByFinanceCode = async ({ companyFinanceCode }) => {

    const foundCompany = await searchCompany({keySearch:companyFinanceCode});
    if(!foundCompany){
        throw new BadRequestError("Company not found");
    }
    console.log(foundCompany[0]._id);
    const ownerships = await ownership.find({ ownership_company: foundCompany[0]._id }).lean();
    const result = [];

    for (const own of ownerships) {
        const foundShareholder = await shareholder.findById(own.ownership_shareholder).lean();
        if (foundShareholder) {
            result.push({
                _id: own._id,
                company_name: foundCompany[0].company_name,
                company_finance_code: foundCompany[0].company_finance_code,
                shareholder_name: foundShareholder.shareholder_name,
                ownership_percentage: own.ownership_percentage
            });
        }
    }

    return result;
}

const deleteOwnership = async (ownershipId) => {
    const foundOwnership = await ownership.findById(ownershipId);
    if(!foundOwnership) throw new BadRequestError("Ownership not found");
    const foundShareholder = await shareholder.findById(foundOwnership.ownership_shareholder);
    if(foundShareholder){
        await shareholder.updateOne(
            { _id: foundOwnership.ownership_shareholder },
            { $pull: { shareholder_ownerships: { _id: ownershipId } } }
        );
    }
    return await ownership.findByIdAndDelete(ownershipId);
}

module.exports = {
    findOwnershipByFinanceCode,
    deleteOwnership
}