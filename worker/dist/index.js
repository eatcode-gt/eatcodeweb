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
const SubmissionModel = require('../models/Submissions.js');
function retrieveAndCompute() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Waiting for Job...");
        axios_1.default.get("http://localhost:3002/nextJob").then((response) => __awaiter(this, void 0, void 0, function* () {
            const submissionID = response.data.submissionID;
            console.log("Got:", submissionID);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                const filter = { name: 'Jean-Luc Picard' };
                const update = { age: 59 };
                // const result = [1,2,3,4,5]
                const result = [{ result: "gio" }, { result: "hsu" }];
                const aa = { result: "gio" };
                // `doc` is the document _after_ `update` was applied because of
                // `new: true`
                try {
                    // await SubmissionModel.updateOne({submissionID}, {$push: {result:aa}, $set:{processed:true}}, {new:true});
                    yield SubmissionModel.updateOne({ submissionID }, { $push: { result: aa } }, { new: true });
                    // console.log("doc:", doc)
                }
                catch (error) {
                    console.log("Error", error);
                }
                axios_1.default.post("http://localhost:3002/finishedJob", {
                    submissionID
                }).then(() => {
                    retrieveAndCompute();
                }).catch((error) => {
                    console.error(error);
                    retrieveAndCompute();
                });
            }), 3000);
            // retrieveAndCompute()
        })).catch((error) => {
            console.error(error);
            setTimeout(() => { retrieveAndCompute(); }, 3000);
        });
    });
}
console.log("Worker Running");
database_1.default.connect();
retrieveAndCompute();
