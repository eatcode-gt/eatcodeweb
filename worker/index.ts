import Axios from 'axios'
import database from './database';
const SubmissionModel = require('../models/Submissions.js');

async function retrieveAndCompute() {
  console.log("Waiting for Job...")
  Axios.get("http://localhost:3002/nextJob").then(async (response) => {
    const submissionID = response.data.submissionID;
    console.log("Got:", submissionID);
    setTimeout(async ()=>{
      const filter = { name: 'Jean-Luc Picard' };
      const update = { age: 59 };
      // const result = [1,2,3,4,5]
      const result = [{result:"gio"}, {result:"hsu"}]
      const aa = {result:"gio"}

      // `doc` is the document _after_ `update` was applied because of
      // `new: true`
      try{
        // await SubmissionModel.updateOne({submissionID}, {$push: {result:aa}, $set:{processed:true}}, {new:true});
        await SubmissionModel.updateOne({submissionID}, {$push: {result:aa}}, {new:true});
        // console.log("doc:", doc)
      } catch (error) {
        console.log("Error", error)
      }

      Axios.post("http://localhost:3002/finishedJob", {
        submissionID
      }).then(() => {
        retrieveAndCompute()
      }).catch((error) => {
        console.error(error);
        retrieveAndCompute()
      })
    }, 3000)
    // retrieveAndCompute()
  }).catch((error) => {
    console.error(error);
    setTimeout(()=>{retrieveAndCompute()}, 3000)
  })
}

console.log("Worker Running");
database.connect();

retrieveAndCompute();