import {
    BinarySearchTree,
    BinarySearchTreeNode,
  } from '@datastructures-js/binary-search-tree';

const SubmissionModel = require('../models/Submissions.js');

interface Submission {
    submissionID: number,
    callback: (source: string, subString: string) => boolean,
}
const notProcessedSubmissions = new BinarySearchTree<Submission>((a, b) => a.submissionID - b.submissionID);
// idleWorkersQueue

export default async function createSubmission(requestBody: { code: string; language: string; questionID: number; userID: number; },
                                               res: any): Promise<any> { 
    
    const { code, language, questionID, userID }: { code: string, language: string, questionID: number, userID: number, } = requestBody; //destructure POST from client
    const lastSubmission = await SubmissionModel.find().sort({_id: -1}).limit(1);
    const lastSubmissionID = lastSubmission[0].submissionID
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
    await newSubmission.save();

    notProcessedSubmissions.insert({
        submissionID: lastSubmissionID + 1,
        callback: res,
    })
}