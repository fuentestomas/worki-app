const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        emailAddress: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        // roles disponibles person=particular, business=comercio/empresa, worker=trabajador
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
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories'
        },
        description: { type: String },
        avgRating: { type: Number },
        phoneNumber: { type: String },
        addresses: {
            type: [
                {
                    address: { type: String },
                    lat: { type: Number },
                    lng: { type: Number },
                    city: { type: String },
                }
            ],
        },
        avgPayRate: { type: String }
    },
    { timestamps: true }
);

const User = mongoose.model('users', UserSchema);

module.exports = User;