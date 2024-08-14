'use strict';

const { company,leader,financeReport} = require("../company.model")
const {getSelectData, unGetSelectData} = require("../../utils");


const findAllCompany = async ({limit, page, select})=>{
    const skip = limit * (page - 1);
    return await company.find().skip(skip).limit(limit).select(getSelectData(select)).lean();
}

const findCompanyById = async ({companyId, unSelect})=>{
    return await company.findById(companyId).select(unGetSelectData(unSelect)).lean();
}

const searchCompany = async ({keySearch})=>{
    const regexSearch = new RegExp(keySearch);
    return await company.find({
        $text: {$search: regexSearch}
    },{score:{$meta: "textScore"}}).sort({score: {$meta: "textScore"}}).select(unGetSelectData(["__v"])).lean();
}

const findAndDeleteCompany = async ({companyId})=>{
    const foundCompany = await company.findOne({_id: companyId});
    if(!foundCompany) throw new Error("Company not found");
    console.log(foundCompany)
    const companyFinanceCode = foundCompany.company_finance_code;
    const foundLeader = await leader.findOne({leader_company: { $in: [companyFinanceCode] } });
    if(foundLeader){
        await leader.updateOne(
            {leader_company: { $in: [companyFinanceCode] }},
            { $pull: { leader_company: companyFinanceCode } }
        )
    }
    return await company.findByIdAndDelete(companyId);
}

const findCompanyByTradingPlatform = async ({ tradingPlatform }) => {
    return await company.find({
        $text: { $search: tradingPlatform }
    }, {
        score: { $meta: "textScore" }
    }).sort({
        score: { $meta: "textScore" }
    }).select(unGetSelectData(["__v"])).lean();
};


module.exports = {
    findAllCompany,
    findCompanyById,
    searchCompany,
    findAndDeleteCompany,
    findCompanyByTradingPlatform
}