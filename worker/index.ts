import Axios from 'axios'
import database from './database';
import testUserCode from './test-user-code'
const SubmissionModel = require('../models/Submissions.js');

async function retrieveAndCompute() {
  console.log("Waiting for Job...")
  Axios.get("http://localhost:3002/nextJob").then(async (response) => {
    const submissionID = response.data.submissionID;
    console.log("Got:", submissionID);
    const submission = await SubmissionModel.findOne({submissionID})
    if (!submission.processed) {
      // let testResult = await testUserCode(submission.language, submission.code, submission.questionID);
      let testResult = await testUserCode("cpp", submission.code, submission.questionID);

      const finalWord = testResult.split(" ");
      const array = finalWord.map((val: string) => {return parseInt(val)})
      const result = array.slice(0, -1)
      const finalResult = array[array.length - 1]

      console.log("finalResult:", finalResult)

      try{
        await SubmissionModel.updateOne({submissionID}, {$set:{processed:true, results: {result, finalResult}}}, {new:true});
      } catch (error) {
        console.log("Error", error)
      } 
    } 

    Axios.post("http://localhost:3002/finishedJob", {
      submissionID
    }).then(() => {
      retrieveAndCompute()
    }).catch((error) => {
      console.error(error);
      retrieveAndCompute()
    })
  }).catch((error) => {
    console.error(error);
    setTimeout(()=>{retrieveAndCompute()}, 3000)
  })
}

console.log("Worker Running");
database.connect(retrieveAndCompute)