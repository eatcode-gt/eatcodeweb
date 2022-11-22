import Axios from 'axios'
import database from './database';
import testUserCode from './test-user-code'
const SubmissionModel = require('../models/Submissions.js');

async function retrieveAndCompute() {
  console.log("Waiting for Job...")
  Axios.get("http://localhost:3002/nextJob").then(async (response) => {
    const submissionID = response.data.submissionID;
    console.log("Got:", submissionID);
    
    // const results = [{result:"gio"}, {result:"hsu"}]

    // const results = [{result:100},{result:99}]
    const submission = await SubmissionModel.findOne({submissionID})
    if (!submission.processed) {
      let testResult = await testUserCode(submission.language, submission.code, submission.questionID); //abstraction to test code against cases
      // console.log(result.map((val: string) => {return parseInt(val)}))
      // console.log(typeof result)
      const finalWord = testResult.split(" ");
      // const array = finalWord.map((val: string) => {return {result: parseInt(val)}})
      const array = finalWord.map((val: string) => {return parseInt(val)})
      const result = array.slice(0, -1)
      const finalResult = array[array.length - 1]
      console.log("Hello:", result, finalResult)

      

      // console.log(finalWord.map((val: string) => {return {result: parseInt(val)}})) 
      // res.end(result); //send result back to client 


      try{
        await SubmissionModel.updateOne({submissionID}, {$set:{processed:true, results: {result, finalResult}}}, {new:true});
        // await SubmissionModel.updateOne({submissionID}, {"$push": {results}}, {new:true});
        // console.log("doc:", doc)
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
    // retrieveAndCompute()
  }).catch((error) => {
    console.error(error);
    setTimeout(()=>{retrieveAndCompute()}, 3000)
  })
}

console.log("Worker Running");
database.connect().then(() => {
  retrieveAndCompute();
}); 