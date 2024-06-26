const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        emailAddress: { type: String, required: true, unique: true },
        password: { type: String },
        // roles disponibles person=particular, business=comercio/organizacion, worker=trabajador
        roles: {
            type: [
                {
                    type: String,
                    required: true,
                    enum: ['person', 'business', 'worker'],
                }
            ],
            default: ['person']
        },
        job: { type: String },
        category: { type: String },
        // category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'categories'
        // },
        description: { type: String },
        avgRating: { type: Number },
        phoneNumber: { type: String },
        address: { type: String },
        avgPayRate: { type: String },   
        location: { type: String},
        photo: { type: String }
    },
    { timestamps: true }
);

const Model = mongoose.model('users', ModelSchema);

module.exports = Model;