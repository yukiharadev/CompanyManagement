'use strict';

const {shareholder} =  require("../shareholder.model")

const {getSelectData, unGetSelectData} = require("../../utils");
const getAllShareholders = async ({limit,page,select}) => {
    const skip = limit * (page - 1);
    return shareholder.find().skip(skip).limit(limit).select(getSelectData(select)).lean();
}

const getShareholderById = async ({shareholderId}) => {
    return shareholder.findById(shareholderId).select(unGetSelectData(["__v"])).lean();
}

module.exports = {
    getAllShareholders,
    getShareholderById
}