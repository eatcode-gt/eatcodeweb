import {
    BinarySearchTree,
    BinarySearchTreeNode,
  } from '@datastructures-js/binary-search-tree';

  import { Queue } from '@datastructures-js/queue';

const {SubmissionModel, SubmissionSchema} = require('../models/Submissions.js');
const ProblemModel = require('../models/Problems.js');
const UserModel = require('../models/Users');

interface Submission {
    submissionID: number,
    callback: any,
}

interface Worker {
  callback: any, 
}

const notProcessedSubmissions = new BinarySearchTree<Submission>((a, b) => a.submissionID - b.submissionID);
const idleWorkersQueue = new Queue<Worker>();
const processingSubmissions = new Map()

async function createSubmission(requestBody: { code: string; language: string; questionID: number; userID: number; },
                                               res: any): Promise<any> { 
    try {
      const { code, language, questionID, userID }: { code: string, language: string, questionID: number, userID: number, } = requestBody; //destructure POST from client
      const lastSubmission = await SubmissionModel.find().sort({_id: -1}).limit(1);
      const lastSubmissionID = lastSubmission[0].submissionID
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
      
      await newSubmission.save();
      notProcessedSubmissions.insert({
        submissionID: lastSubmissionID + 1,
        callback: res,
      })
      UserModel.findOne({userID}, async (err: any, user: { attemptedProblems: { has: (arg0: string) => any; set: (arg0: string, arg1: { solved: boolean; bestScore: number; diff: any; bestSubmissionID: any; }) => void; get: (arg0: string) => { (): any; new(): any; pastSubmissionIDs: any[]; }; }; save: () => void; }) => {
        if (err) console.error(err);
        const question = await ProblemModel.findOne({questionID});
        const diff = question.diff;
        if (!user.attemptedProblems.has(questionID.toString())) {
            user.attemptedProblems.set(questionID.toString(), {
            solved: false,
            bestScore: 0,
            diff,
            bestSubmissionID: lastSubmissionID + 1,
          })
        } 
        user.attemptedProblems.get(questionID.toString()).pastSubmissionIDs.push(lastSubmissionID + 1);
        user.save()
      })
      console.log("Submission created! ID:[" + (lastSubmissionID + 1) + "]")
      printSubmissionStats()
    } catch (error) {
      console.error(error)
    } 
    scheduleJob() 
}

function scheduleJob() {
  if (notProcessedSubmissions.count() > 0 && !idleWorkersQueue.isEmpty()) {
    const job = notProcessedSubmissions.min()?.getValue();
    notProcessedSubmissions.remove(job!)
    processingSubmissions.set(job!.submissionID, job!);
    setTimeout(async () => {
      const submission = await SubmissionModel.findOne({submissionID:job?.submissionID})
      processingSubmissions.delete(job!.submissionID)
      if (!submission.processed) {
        notProcessedSubmissions.insert(job!)
        console.log("submission:", submission.submissionID, "not finished in time, pushed back into queue")
        printSubmissionStats()
        scheduleJob()
      } else {
        // job?.callback.json(submission.results)
      } 
    }, 8000)
    const worker = idleWorkersQueue.dequeue()
    // console.log(job?.submissionID)

    printSubmissionStats()
    worker.callback.json({submissionID:job?.submissionID})
  }
}

function enqueueWorker(res: any) {
  idleWorkersQueue.enqueue({callback: res});
  printSubmissionStats(); 
  scheduleJob();
}

async function updateUserAttemptedProblem(newScore: any, submissionID: any) {
  const submission = await SubmissionModel.findOne({submissionID});
  const userID = submission.userID;
  const questionID = submission.questionID;
  UserModel.findOne({userID}, (err: any, user: { attemptedProblems: { get: (arg0: any) => any; values: () => Iterable<unknown> | ArrayLike<unknown>; entries: () => any; }; totalScore: unknown; save: () => void; }) => {
    if (err) console.error(err);
    try {
      const problem = user.attemptedProblems.get(questionID.toString())
      if (true || problem.bestScore < newScore) {
        problem.bestScore = newScore;
        problem.bestSubmissionID = submissionID;
        if (newScore == 100) { // To be fixed
          problem.solved = true;
        }
        const totalScore = Array.from(user.attemptedProblems.values()).reduce((a: any,val: any) => a+val.bestScore, 0)
        // console.log(typeof user.attemptedProblems.entries())
        // console.log("totalScore", totalScore)
        // console.log("array:", Array.from(user.attemptedProblems.values()))
        user.totalScore = totalScore;
        user.save()
      }
    } catch (error) {
      console.error(error)
    }
  })
}

async function finishedRunningSubmission(submissionID: number) {
  const submission = await SubmissionModel.findOne({submissionID})
  if (processingSubmissions.size !== 0) {
    const job = processingSubmissions.get(submissionID)
    processingSubmissions.delete(submissionID)
    try{
      console.log("results: ", submission.results)
      const newScore = submission.results.finalResult == 0 ? 100 : 0;
      updateUserAttemptedProblem(newScore, submissionID)
      job.callback.json(submission.results) 
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log("Caught size = 0")
  }
}

function printSubmissionStats() {
  console.log("Current Workers:",idleWorkersQueue.size(),", Submissions:", notProcessedSubmissions.count(),
  ", Processing:", processingSubmissions.size);
}

export {createSubmission, enqueueWorker, finishedRunningSubmission}