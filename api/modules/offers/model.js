const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
      id: { type: String },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      title: { type: String },
      description: { type: String },
      payRate: { type: String },
    },
    { timestamps: true }
);

const Model = mongoose.model('offers', ModelSchema);

module.exports = Model;