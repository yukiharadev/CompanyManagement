'use strict';

const { uploadFile } = require("../services/upload.service");
const { SuccessResponse } = require("../core/success.reponse");

class UploadController {
    upload = async (req, res, next) => {
        try {
            const filePath = await uploadFile(req, res);
            new SuccessResponse({
                message: "Successfully uploaded file",
                metadata: filePath,
            }).send(res);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UploadController();
