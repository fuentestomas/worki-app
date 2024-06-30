const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        chatId: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "chat"
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        message: { type: String },
    },
    { timestamps: true }
);

const Model = mongoose.model('message', ModelSchema);

module.exports = Model;