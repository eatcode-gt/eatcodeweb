"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const dotenv_1 = __importDefault(require("dotenv")); //allows use of enviroment variables in ./.env
const mongoose = require('mongoose');
const TestCasesModel = require('../models/Tests.js');
dotenv_1.default.config(); //load .env file
mongoose.connect(process.env.MONGO_DB_CONNECT);
TestCasesModel;
function fetchTestCases(problemId) {
    // let code: string = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
}
exports.default = fetchTestCases;
