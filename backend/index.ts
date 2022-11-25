import express, { Express, Request, Response } from 'express'; //server manager in js
import dotenv from 'dotenv'; //allows use of enviroment variables in ./.env
import cors from 'cors'; //cross origin resource sharing middleware
import {createSubmission, enqueueWorker, finishedRunningSubmission} from './createSubmission'
import fileUpload from 'express-fileupload';
import database from './database';

const jwt = require("jsonwebtoken");
const morgan = require('morgan');
 
const UserModel = require('../models/Users');
const ProblemModel = require('../models/Problems.js');
const TestCasesZippedModel = require('../models/Tests.js');
const SubmissionModel = require('../models/Submissions.js');

dotenv.config(); //load .env file
 
const app: Express = express(); //see line 1 

const port = process.env.PORT || 3002; //see line 2

app.use(fileUpload({
  createParentPath: true 
}));

app.use(express.json());
app.use(cors()); //see line 3 (modified by gio, originally use(cors))
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => { //get requests to eatcode.com/
  res.send('placeholder'); 
});

app.get('/problems', (req: Request, res: Response) => { //gets requests to eatcode.com/problems
  ProblemModel.find({}, (err: Error, result: Response) => {
    if(err) {
      res.json(err);
    } else {
      res.json({result:result});
    }
  })
})

app.post('/register', (req: Request, res: Response) => { //post requests to eatcode.com/register
  res.send('placeholder');
}); 

app.post("/login", (req: Request, res: Response) => {
  const token = req.body.token;
  const decoded = jwt.decode(token);
  console.log(decoded);

  UserModel.find({userID:decoded.sub}, async (err: Error, result: Array<typeof UserModel>) => { 
    if (err) {
      res.json(err);
    } else if (result.length == 0){
      const user = {
        userID: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        totalScore: 0,
        attemptedProblems: null,
        isAdmin: false,
        profilePictureUrl: decoded.picture
      };
      const newUser = new UserModel(user);
      await newUser.save();
      res.json({sub:decoded.sub});
    } else {
      res.json({sub:decoded.sub});
    }
  });
});

app.get("/findLastPost", async (req: Request, res: Response) => {
  const lastPost = await ProblemModel.find().sort({questionID: -1}).limit(1);
  //console.log("QuestionID: ", lastPost[0].questionID+1);
  res.json({questionID: lastPost[0].questionID+1}); 
})

app.post("/create", async (req: Request, res: Response) => {
  const inputs = req.body;
  const newProblem = new ProblemModel(inputs)
  //console.log(inputs);
  try {
    await newProblem.save();
  } catch (error) {
    console.error(error)
  }
  res.json(inputs); 
})

app.post('/createFiles', async (req: Request, res: Response) => { 
  if (!req.files) {
    console.log("No files");
    res.sendStatus(404);   
  } else {
    let file = req.files.zippedFile as fileUpload.UploadedFile;
    let questionID = req.body.questionID;

    const zippedFile = {
      testCasesZipped: file.data,
      questionID: questionID,
    };

    const newTestCasesZipped = new TestCasesZippedModel(zippedFile);
    try { 
      await newTestCasesZipped.save();
    } catch (error) {
      console.error(error)
    }

    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size
      }
    });
  }
})


app.post('/userInfo', (req: Request, res: Response) => {
  const userSub = req.body.sub;
  console.log(userSub);
  UserModel.find({userID:userSub}, (err: Error, result: Array<typeof UserModel>) => { 
    if (err) {
      res.json(err);
    } else {
      res.json({result:result});
    }
  });
});


app.post('/problems', async (req: Request, res: Response, next) => { //post requests to eatcode.com/problems
  const { code, language, questionID, userID }: { code: string, language: string, questionID: number, userID: number, } = req.body; //destructure POST from client
  // console.log("Submission created!"
  try {
    createSubmission(req.body, res)
  } catch (error) {
    res.json(error);
  }
});

app.get("/nextJob", async (req: Request, res: Response) => {
  enqueueWorker(res);
})

app.post("/finishedJob", async (req: Request, res: Response) => {
  try {
    await finishedRunningSubmission(req.body.submissionID)
  } catch (error) {
    console.error(error)
  }
  
  res.sendStatus(200);
}) 
 
app.listen(port, () => { //server listens to requests on port {port} 
  console.log(`listening ${port}`);
});

database.connect();