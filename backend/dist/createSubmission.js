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
exports.enqueueWorker = exports.createSubmission = void 0;
const binary_search_tree_1 = require("@datastructures-js/binary-search-tree");
const queue_1 = require("@datastructures-js/queue");
const SubmissionModel = require('../models/Submissions.js');
const notProcessedSubmissions = new binary_search_tree_1.BinarySearchTree((a, b) => a.submissionID - b.submissionID);
const idleWorkersQueue = new queue_1.Queue();
const processingSubmissions = new Set();
function createSubmission(requestBody, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code, language, questionID, userID } = requestBody; //destructure POST from client
        const lastSubmission = yield SubmissionModel.find().sort({ _id: -1 }).limit(1);
        const lastSubmissionID = lastSubmission[0].submissionID;
        // console.log("Submission #",lastSubmissionID)  
        // res.json({questionID: lastPost[0].questionID+1});
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
        printt();
        scheduleJob();
    });
}
exports.createSubmission = createSubmission;
function scheduleJob() {
    var _a;
    if (notProcessedSubmissions.count() > 0 && !idleWorkersQueue.isEmpty()) {
        const job = (_a = notProcessedSubmissions.min()) === null || _a === void 0 ? void 0 : _a.getValue();
        notProcessedSubmissions.remove(job);
        processingSubmissions.add(job);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const submission = yield SubmissionModel.findOne({ submissionID: job === null || job === void 0 ? void 0 : job.submissionID });
            processingSubmissions.delete(job);
            if (!submission.processed) {
                notProcessedSubmissions.insert(job);
                console.log("submission:", submission.submissionID, "not finished in time, pushed back into queue");
            }
            else {
                job === null || job === void 0 ? void 0 : job.callback.json(submission.results);
            }
        }), 30000);
        const worker = idleWorkersQueue.dequeue();
        console.log(job === null || job === void 0 ? void 0 : job.submissionID);
        // worker.callback.send("gggg")
        worker.callback.json(job === null || job === void 0 ? void 0 : job.submissionID);
        // console.log(job,worker)
    }
}
function enqueueWorker(res) {
    idleWorkersQueue.enqueue({ callback: res });
    printt();
    scheduleJob();
}
exports.enqueueWorker = enqueueWorker;
function printt() {
    console.log("Current: ", idleWorkersQueue.size(), notProcessedSubmissions.count());
}
