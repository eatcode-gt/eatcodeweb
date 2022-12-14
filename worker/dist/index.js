"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const database_1 = __importDefault(require("./database"));
const test_user_code_1 = __importDefault(require("./test-user-code"));
const SubmissionModel = require('../models/Submissions.js');
function retrieveAndCompute() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Waiting for Job...");
        axios_1.default.get("http://localhost:3002/nextJob").then((response) => __awaiter(this, void 0, void 0, function* () {
            const submissionID = response.data.submissionID;
            console.log("Got:", submissionID);
            const submission = yield SubmissionModel.findOne({ submissionID });
            if (!submission.processed) {
                let testResult = yield (0, test_user_code_1.default)(submission.language, submission.code, submission.questionID);
                // console.log(testResult)
                try {
                    const finalWord = testResult.split(" ");
                    const array = finalWord.map((val) => { return parseInt(val); });
                    const result = array.slice(0, -1);
                    const finalResult = array[array.length - 1];
                    console.log("finalResult:", finalResult);
                    yield SubmissionModel.updateOne({ submissionID }, { $set: { processed: true, results: { result, finalResult } } }, { new: true });
                }
                catch (error) {
                    console.log("Error", error);
                }
            }
            axios_1.default.post("http://localhost:3002/finishedJob", {
                submissionID
            }).then(() => {
                retrieveAndCompute();
            }).catch((error) => {
                console.error(error);
                retrieveAndCompute();
            });
        })).catch((error) => {
            console.error(error);
            setTimeout(() => { retrieveAndCompute(); }, 3000);
        });
    });
}
console.log("Worker Running");
database_1.default.connect(retrieveAndCompute);
