const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        ratedUserId: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        },
        qualifierUserId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        rate: {type: Number},
    },
    { timestamps: true }
);

const Model = mongoose.model('rating', ModelSchema);

module.exports = Model;