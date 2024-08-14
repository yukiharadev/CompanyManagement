'use strict';

const express = require('express');

const router = express.Router();


router.use("/v1/api/company", require('./company'));
router.use("/v1/api/shareholder", require('./shareholder'));
router.use("/v1/api/ownership", require('./ownership'));
router.use("/v1/api/upload", require('./upload'));

module.exports = router;