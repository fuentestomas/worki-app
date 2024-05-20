const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String },
    },
    { timestamps: true }
);

const Model = mongoose.model('categories', ModelSchema);

module.exports = Model;