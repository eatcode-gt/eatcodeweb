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

const TestCasesModel = mongoose.model("testCases", TestCasesSchema);
module.exports = TestModel;