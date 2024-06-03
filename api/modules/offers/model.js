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
      duration: { type: String },
      dateStart: { type: String },
      dateEnd: { type: String },
      timeStart: { type: String },
      timeEnd: { type: String },
      isFlexible: { type: Boolean }
    },
    { timestamps: true }
);

const Model = mongoose.model('offers', ModelSchema);

module.exports = Model;