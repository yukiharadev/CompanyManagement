'use strict';

const OwnershipService = require('../services/ownership.service');
const { CREATED, SuccessResponse, OK} = require('../core/success.reponse');

class OwnershipController {
    createOwnership = async (req, res, next) => {
        new CREATED({
            message: "Successfully created product",
            metadata: await OwnershipService.createOwnership(req.body),
        }).send(res);
    };

    findOwnershipByFinanceCode = async(req,res,next) => {
        new SuccessResponse({
            message: "Get ownership by finance code success!",
            metadata: await OwnershipService.getOwnershipByFinanceCode({companyFinanceCode: req.params.companyFinanceCode})
        }).send(res);
    }

    deleteOwnership = async(req,res,next) => {
        new SuccessResponse({
            message: "Delete ownership success!",
            metadata: await OwnershipService.deleteOwnership(req.params.ownershipId)
        }).send(res);
    }
}


module.exports = new OwnershipController();