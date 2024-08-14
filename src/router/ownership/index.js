'use strict';

const express = require('express');
const router = express.Router();
const ownershipController = require("../../controllers/ownership.controller");
const asyncHandler = require("../../helpers/asyncHandler");

router.post('', asyncHandler(ownershipController.createOwnership));

router.get('/:companyFinanceCode', asyncHandler(ownershipController.findOwnershipByFinanceCode));

router.delete('/:ownershipId', asyncHandler(ownershipController.deleteOwnership));

module.exports = router;
