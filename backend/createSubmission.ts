import {
    BinarySearchTree,
    BinarySearchTreeNode,
  } from '@datastructures-js/binary-search-tree';

  import { Queue } from '@datastructures-js/queue';

const SubmissionModel = require('../models/Submissions.js');

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
    console.log(job?.submissionID)

    printSubmissionStats()
    worker.callback.json({submissionID:job?.submissionID})
  }
}

function enqueueWorker(res: any) {
  idleWorkersQueue.enqueue({callback: res});
  printSubmissionStats(); 
  scheduleJob();
}

async function finishedRunningSubmission(submissionID: number) {
  const submission = await SubmissionModel.findOne({submissionID})
  if (processingSubmissions.size !== 0) {
    const job = processingSubmissions.get(submissionID)
    processingSubmissions.delete(submissionID)
    try{
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