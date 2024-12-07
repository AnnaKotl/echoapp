const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { moments } = require('../helpers');

const serviceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: [String], required: false },
    features: { type: [String], required: true },
    price: { type: String, required: true },
    createdAt: {
        type: String,
        default: () => moments(new Date()),
    },
    updatedAt: {
        type: String,
        default: () => moments(new Date()),
    },
});

serviceSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = moments(new Date());
    }
    next();
});

const Service = model('Service', serviceSchema);

module.exports = Service;

// PRICES