'use strict';

// shareholder_name: { type: String, required: true },
// shareholder_email: { type: String, required: true },
// shareholder_phone: { type: String, required: true },

const { shareholder } = require('../models/shareholder.model');
const {getAllShareholders, getShareholderById} = require("../models/repositories/shareholder.repo");

class ShareHolderService{
    static async createShareHolder(payload){
         const{ shareholder_name, shareholder_email, shareholder_phone } = payload;
         return shareholder.create({ shareholder_name, shareholder_email, shareholder_phone });
    }
    static async getAllShareHolders({limit = 30, page = 1, select= ['shareholder_name', 'shareholder_email']}){
        return getAllShareholders({limit, page, select});
    }
    static async getShareHolderById({shareholderId}){
        return getShareholderById({shareholderId});
    }



}

module.exports = ShareHolderService;