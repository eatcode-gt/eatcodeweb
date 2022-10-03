const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  problemID: {
    type: Number,
    required: true,
  },
  problemName: {
    type: String,
    required: true,
  },
  problemDifficulty: {
    type: String,
    required: true,
  },
  problemStatus: {
    type: String,
    required: true,
    default: "new",
  },
  problemText: {
    type: String,
    required: true,
  },
  numberOfAttemptedUsers: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfSolvedUsers: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ProblemModel = mongoose.model("problems", ProblemSchema);
module.exports = ProblemModel;

// "problemID": 2, 
// "problemName": "McDouble", 
// "problemDifficulty": "med", 
// "problemStatus": "new",
// "problemText": "Such cool text",
// "numberOfAttemptedUsers": 0,
// "numberOfSolvedUsers": 0