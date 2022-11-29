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
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishedRunningSubmission = exports.enqueueWorker = exports.createSubmission = void 0;
const binary_search_tree_1 = require("@datastructures-js/binary-search-tree");
const queue_1 = require("@datastructures-js/queue");
const { SubmissionModel, SubmissionSchema } = require('../models/Submissions.js');
const ProblemModel = require('../models/Problems.js');
const UserModel = require('../models/Users');
const notProcessedSubmissions = new binary_search_tree_1.BinarySearchTree((a, b) => a.submissionID - b.submissionID);
const idleWorkersQueue = new queue_1.Queue();
const processingSubmissions = new Map();
function createSubmission(requestBody, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code, language, questionID, userID } = requestBody; //destructure POST from client
            const lastSubmission = yield SubmissionModel.find().sort({ _id: -1 }).limit(1);
            const lastSubmissionID = lastSubmission[0].submissionID;
            const submission = {
                submissionID: lastSubmissionID + 1,
                questionID,
                userID,
                code,
                language,
                processed: false,
                // results: [TestCaseResult],
            };
            const newSubmission = new SubmissionModel(submission);
            yield newSubmission.save();
            notProcessedSubmissions.insert({
                submissionID: lastSubmissionID + 1,
                callback: res,
            });
            UserModel.findOne({ userID }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    console.error(err);
                const question = yield ProblemModel.findOne({ questionID });
                const difficulty = question.difficulty;
                if (!user.attemptedProblems.has(questionID.toString())) {
                    user.attemptedProblems.set(questionID.toString(), {
                        solved: false,
                        bestScore: 0,
                        difficulty,
                        bestSubmissionID: lastSubmissionID + 1,
                    });
                }
                user.attemptedProblems.get(questionID.toString()).pastSubmissionIDs.push(lastSubmissionID + 1);
                user.save();
            }));
            console.log("Submission created! ID:[" + (lastSubmissionID + 1) + "]");
            printSubmissionStats();
        }
        catch (error) {
            console.error(error);
        }
        scheduleJob();
    });
}
exports.createSubmission = createSubmission;
function scheduleJob() {
    var _a;
    if (notProcessedSubmissions.count() > 0 && !idleWorkersQueue.isEmpty()) {
        const job = (_a = notProcessedSubmissions.min()) === null || _a === void 0 ? void 0 : _a.getValue();
        notProcessedSubmissions.remove(job);
        processingSubmissions.set(job.submissionID, job);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const submission = yield SubmissionModel.findOne({ submissionID: job === null || job === void 0 ? void 0 : job.submissionID });
            processingSubmissions.delete(job.submissionID);
            if (!submission.processed) {
                notProcessedSubmissions.insert(job);
                console.log("submission:", submission.submissionID, "not finished in time, pushed back into queue");
                printSubmissionStats();
                scheduleJob();
            }
            else {
                // job?.callback.json(submission.results)
            }
        }), 8000);
        const worker = idleWorkersQueue.dequeue();
        // console.log(job?.submissionID)
        printSubmissionStats();
        worker.callback.json({ submissionID: job === null || job === void 0 ? void 0 : job.submissionID });
    }
}
function enqueueWorker(res) {
    idleWorkersQueue.enqueue({ callback: res });
    printSubmissionStats();
    scheduleJob();
}
exports.enqueueWorker = enqueueWorker;
function updateUserAttemptedProblem(newScore, submissionID) {
    return __awaiter(this, void 0, void 0, function* () {
        const submission = yield SubmissionModel.findOne({ submissionID });
        const userID = submission.userID;
        const questionID = submission.questionID;
        UserModel.findOne({ userID }, (err, user) => {
            if (err)
                console.error(err);
            try {
                const problem = user.attemptedProblems.get(questionID.toString());
                if (true || problem.bestScore < newScore) {
                    problem.bestScore = newScore;
                    problem.bestSubmissionID = submissionID;
                    if (newScore == 100) { // To be fixed
                        problem.solved = true;
                    }
                    const totalScore = Array.from(user.attemptedProblems.values()).reduce((a, val) => a + val.bestScore, 0);
                    // console.log(typeof user.attemptedProblems.entries())
                    // console.log("totalScore", totalScore)
                    // console.log("array:", Array.from(user.attemptedProblems.values()))
                    user.totalScore = totalScore;
                    user.save();
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    });
}
function finishedRunningSubmission(submissionID) {
    return __awaiter(this, void 0, void 0, function* () {
        const submission = yield SubmissionModel.findOne({ submissionID });
        if (processingSubmissions.size !== 0) {
            const job = processingSubmissions.get(submissionID);
            processingSubmissions.delete(submissionID);
            try {
                console.log("results: ", submission.results);
                const newScore = submission.results.finalResult == 0 ? 100 : 0;
                updateUserAttemptedProblem(newScore, submissionID);
                job.callback.json(submission.results);
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("Caught size = 0");
        }
    });
}
exports.finishedRunningSubmission = finishedRunningSubmission;
function printSubmissionStats() {
    console.log("Current Workers:", idleWorkersQueue.size(), ", Submissions:", notProcessedSubmissions.count(), ", Processing:", processingSubmissions.size);
}
