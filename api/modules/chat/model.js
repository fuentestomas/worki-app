const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        applierId: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        employerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
    },
    { timestamps: true }
);

const Model = mongoose.model('chat', ModelSchema);

module.exports = Model;