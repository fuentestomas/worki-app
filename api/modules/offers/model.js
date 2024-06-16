const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        image: { type: String }, 
        title: { type: String, required: true },
        description: { type: String, required: true },
        salaryMin: { type: Number, required: true }, 
        salaryMax: { type: Number, required: true }, 
        duration: { type: String },
        dateStart: { type: String },
        dateEnd: { type: String },
        timeStart: { type: String },
        timeEnd: { type: String },
        isFlexible: { type: Boolean },
        location: { type: String, ref: "users"}
    },
    { timestamps: true }
);

const Model = mongoose.model('offers', ModelSchema);

module.exports = Model;
