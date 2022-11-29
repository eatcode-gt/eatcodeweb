const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  questionID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true, 
  },
  beef: {
    type: Number,
    required: true,
    default: 0
  },
  time: {
    type: Number,
    required: true,
  },
  memory: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  e1input: {
    type: String,
    required: true,
  },
  e1output: {
    type: String,
    required: true
  },
  e1explanation: {
    type: String,
    required: true
  },
  e2input: {
    type: String,
    required: false,
  },
  e2output: {
    type: String,
    required: false
  },
  e2explanation: {
    type: String,
    required: false
  },
  e3input: {
    type: String,
    required: false,
  },
  e3output: {
    type: String,
    required: false
  },
  e3explanation: {
    type: String,
    required: false
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
  tags: {
    type: [String],
    required: false,
  }
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