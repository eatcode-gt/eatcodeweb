const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
  inputFile: {
    type: Buffer,
    required: true,
  },
  outputFile: {
    type: Buffer,
    required: true,
  },
});

const TestCasesSchema = new mongoose.Schema({
  testCases: [TestCaseSchema],
  id: {
    type: Number,
    required: true,
  },
});

const TestCasesZippedSchema = new mongoose.Schema({
  testCasesZipped: {
    type: Buffer,
    required: true,
  },
  questionID: {
    type: Number,
    required: true,
  },
});

const TestCasesModel = mongoose.model("testCases", TestCasesSchema);
const TestCasesZippedModel = mongoose.model("zipped_test_cases", TestCasesZippedSchema);

module.exports = TestCasesZippedModel;