// const {SubmissionModel, SubmissionSchema} = require('./Submissions');

const mongoose = require('mongoose');

// const SolutionSchema = new mongoose.Schema({
//     problemID: {
//         type: Number,
//         required: true,
//     },
//     solutionCode: {
//         type: String,
//         required: true,
//     },
//     score: {
//         type: Number,
//         required: true,
//     },
// });

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    totalScore: {
        type: Number,
        required: false,
        default: 0,
    },
    attemptedProblems: {
        type: Map,
        of: new mongoose.Schema({
            solved: {
                type: Boolean,
                required: true,
                default: false,
            },
            bestScore: {
                type: Number,
                required: true,
                default: 0,
            },
            bestSubmissionID: Number,
            pastSubmissionIDs: [Number],
        }),
        required: false,
        default: null,
    }
});

const UserModel = mongoose.model("loginUsers", UserSchema);
module.exports = UserModel;