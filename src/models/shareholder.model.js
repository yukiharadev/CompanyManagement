const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'ShareHolder';
const COLLECTION_NAME = 'ShareHolders';

const shareHolderSchema = new Schema({
    shareholder_name: { type: String, required: true },
    shareholder_email: { type: String, required: true },
    shareholder_phone: { type: String, required: true },
    shareholder_ownerships: {type:[Object], default: []}
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

shareHolderSchema.index({ shareholder_name: "text", shareholder_email: "text" });

module.exports = {
    shareholder: model(DOCUMENT_NAME, shareHolderSchema),
}