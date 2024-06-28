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
        description: { type: String },
        status: { type: String, default: 'applied', enum: ['applied', 'preselected', 'rejected', 'hired', 'finished'] },
        cv: { type: String },  // New attribute for storing CV file path or URL
        fileName: { type: String }
    },
    { timestamps: true }
);

const Model = mongoose.model('appliers', ModelSchema);

module.exports = Model;
