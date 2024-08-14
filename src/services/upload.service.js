'use strict';

const upLoadDisk = require('../configs/multer.config');

const uploadFile = (req, res) => {
    return new Promise((resolve, reject) => {
        upLoadDisk(req, res, (err) => {
            if (err) {
                return reject(err);
            }
            const filePath = `/uploads/${req.file.filename}`;
            resolve(filePath);
        });
    });
}

module.exports = {
    uploadFile
}