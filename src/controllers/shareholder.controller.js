'use strict';

const ShareHolderService = require('../services/shareHolder.service');
const { CREATED, SuccessResponse} = require('../core/success.reponse');

class ShareHolderController {
    createShareHolder = async (req, res, next) => {
        new CREATED({
            message: "Successfully created shareholder",
            metadata: await ShareHolderService.createShareHolder(req.body),
        }).send(res);
    };

    getAllShareHolders = async (req, res, next) => {
        new SuccessResponse({
            message: "Successfully retrieved all shareholders",
            metadata: await ShareHolderService.getAllShareHolders(req.query),
        }).send(res);
    };

    getShareHolderById = async (req, res, next) => {
        new SuccessResponse({
            message: "Successfully retrieved shareholder",
            metadata: await ShareHolderService.getShareHolderById(req.params),
        }).send(res);
    };

}

module.exports = new ShareHolderController();