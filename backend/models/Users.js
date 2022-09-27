const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model("loginUsers", UserSchema);
module.exports = UserModel;