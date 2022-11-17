import express, { Express, Request, Response } from 'express'; //server manager in js
import dotenv from 'dotenv'; //allows use of enviroment variables in ./.env
import cors from 'cors'; //cross origin resource sharing middleware
import testUserCode from './test-user-code'
// import problemData from './problem-data.json';
import fileUpload from 'express-fileupload';
import database from './database';

const jwt = require("jsonwebtoken");
const morgan = require('morgan');

const UserModel = require('../models/Users');
const ProblemModel = require('../models/Problems.js');
const TestCasesZippedModel = require('../models/Tests.js');

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
 
// TODO: check if user is already in DB, if yes then don't create new user.
// app.post("/getUserID", async (req: Request, res: Response) => { //post requests to eatcode.com/login
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
  const lastPost = await ProblemModel.find().sort({_id: -1}).limit(1);
  res.json({id: lastPost[0].id+1});
})

app.post("/create", async (req: Request, res: Response) => {
  const inputs = req.body;
  const newProblem = new ProblemModel(inputs)
  await newProblem.save();
  res.json(inputs);
})

app.post('/createFiles', async (req: Request, res: Response) => { 
  if (!req.files) {
    console.log("No files");
    res.sendStatus(404);   
  } else {
    let file = req.files.zippedFile as fileUpload.UploadedFile;
    let questionID = req.body.id;
    const zippedFile = {
      testCasesZipped: file.data,
      id: questionID
    };
    const newTestCasesZipped = new TestCasesZippedModel(zippedFile);
    await newTestCasesZipped.save();

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
  const { userCode, userLanguage, questionID }: { userCode: string, userLanguage: string, questionID: number } = req.body; //destructure POST from client
  // const { questionName, tests }: { questionName: string, tests: Array<any> } = problemData.problems[questionID]; //pull question data from json
  try {
    let result = await testUserCode(userLanguage, userCode, questionID); //abstraction to test code against cases
    res.end(result); //send result back to client
  } catch (error) {
    return next(error);
  }
});


app.listen(port, () => { //server listens to requests on port {port}
  console.log(`listening ${port}`);
}); 

database.connect();
database.runCommand( {
  collMod: "zipped_test_cases",
  index: {
     keyPattern: id,     // Reject new duplicate index entries
     unique: true             // Convert an index to a unique index
  }
} )