const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        offerId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "offers"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        status: {type: String},
    },
    { timestamps: true }
);

const Model = mongoose.model('appliers', ModelSchema);

module.exports = Model;