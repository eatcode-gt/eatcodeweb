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
    required: false,
  }
});

const ProblemSchema = new mongoose.Schema({
  questionID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  diff: {
    type: Number,
    required: true, 
  },
  time: {
    type: Number,
    required: true,
  },
  memory: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
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
  example: {
    type: ExampleSchema,
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