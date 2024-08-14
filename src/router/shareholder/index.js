'use strict';

const express = require('express');
const ShareHolderController = require('../../controllers/shareholder.controller');
const router = express.Router();
const asyncHandler = require('../../helpers/asyncHandler');

router.post('', asyncHandler(ShareHolderController.createShareHolder));
router.get('', asyncHandler(ShareHolderController.getAllShareHolders));
router.get('/:shareholderId', asyncHandler(ShareHolderController.getShareHolderById));


module.exports = router;