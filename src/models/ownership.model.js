const { Schema, model } = require('mongoose');

const ownershipSchema = new Schema({
    ownership_company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    ownership_shareholder: { type: Schema.Types.ObjectId, ref: 'ShareHolders', required: true },
    ownership_percentage: { type: Number, required: true },
}, {
    timestamps: true,
    collection: 'Ownerships'
});

module.exports = {
    ownership: model('Ownerships', ownershipSchema),
}