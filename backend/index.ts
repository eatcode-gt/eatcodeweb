import express, { Express, Request, Response } from 'express'; //server manager in js
import dotenv from 'dotenv'; //allows use of enviroment variables in ./.env
import cors from 'cors'; //cross origin resource sharing middleware
import testUserCode from './test-user-code'
import problemData from './problem-data.json';
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

dotenv.config(); //load .env file

const app: Express = express(); //see line 1
// const port = process.env.PORT; //see line 2
const port = 3002;

app.use(express.json());
app.use(cors()); //see line 3

mongoose.connect(
  "mongodb+srv://Giovanni1014:ggg123@site.pmp1rxz.mongodb.net/?retryWrites=true&w=majority"
);

app.get('/', (req: Request, res: Response) => { //get requests to eatcode.com/
  res.send('placeholder');
});

app.post('/register', (req: Request, res: Response) => { //post requests to eatcode.com/register
  res.send('placeholder');
});

app.post('/login', (req: Request, res: Response) => { //post requests to eatcode.com/login
  res.send('placeholder');
});

app.post("/sendUserToken", async (req: Request, res: Response) => {
  const token = req.body.token;
  const decoded = jwt.decode(token);
  console.log(decoded);
  
  res.json(decoded);
});


app.post('/problems', (req: Request, res: Response) => { //post requests to eatcode.com/problems
  const { userCode, userLanguage, questionID }: { userCode: string, userLanguage: string, questionID: number } = req.body; //destructure POST from client
  const { questionName, tests }: { questionName: string, tests: Array<any> } = problemData.problems[questionID]; //pull question data from json
  let result = testUserCode(userLanguage, userCode, questionName, tests); //abstraction to test code against cases
  res.end(result); //send result back to client
});

app.listen(port, () => { //server listens to requests on port {port}
  console.log(`listening ${port}`);
}); 