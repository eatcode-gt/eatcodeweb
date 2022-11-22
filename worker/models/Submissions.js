const mongoose = require('mongoose');

// const Results = {
//   Waiting: 'Waiting',
//   AC: 'AC',
//   WA: 'WA',
//   RE: 'RE',
//   MLE: 'MLE',
//   TLE: 'TLE',
// };

const TestCaseResult = new mongoose.Schema({
  result: {
    type: String,
    required: true,
  },
});


const SubmissionSchema = new mongoose.Schema({
  submissionID: {
    type: Number,
    required: true,
    unique: true,
  },
  questionID: {
    type: Number,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  processed: {
    type: Boolean,
    required: true,
  },
  results: [TestCaseResult],
});

const SubmissionModel = mongoose.model("submissions", SubmissionSchema);
module.exports = SubmissionModel;