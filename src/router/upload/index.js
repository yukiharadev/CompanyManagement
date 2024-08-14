'use strict';

const express = require('express');
const UploadController = require('../../controllers/upload.controller');
const router = express.Router();

router.post('', UploadController.upload);

module.exports = router;

