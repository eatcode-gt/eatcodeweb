const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  questionID: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
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
  e1input: {
    type: String,
    required: true,
  },
  e1output: {
    type: String,
    required: true,
  },
  e1explanation: {
    type: String,
    required: true,
  },
  e2input: {
    type: String,
    required: true,
  },
  e2output: {
    type: String,
    required: true,
  },
  e2explanation: {
    type: String,
    required: true,
  },
  e3input: {
    type: String,
    required: true,
  },
  e3output: {
    type: String,
    required: true,
  },
  e3explanation: {
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