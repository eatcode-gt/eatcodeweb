const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema({
  exampleInput: {
    type: String,
    required: true,
  },
  exampleOutput: {
    type: String,
    required: true,
  },
  exampleText: {
    type: String,
    required: true,
  }
});

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  diff: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "new",
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
  examples: {
    type: [ExampleSchema],
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