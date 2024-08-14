'use strict';

const multer = require('multer');
const { join } = require("node:path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = join(__dirname, '../../public/uploads/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true); // Allow all file types
}

const uploadDisk = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50 // Adjust the file size limit if needed
    },
    fileFilter: fileFilter
}).single('file');

module.exports = uploadDisk;