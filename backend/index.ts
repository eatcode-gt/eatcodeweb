import express, { Express, Request, Response } from 'express'; //server manager in js
import dotenv from 'dotenv'; //allows use of enviroment variables in ./.env
import cors from 'cors'; //cross origin resource sharing middleware
import testUserCode from './test-user-code'
import problemData from './problem-data.json';

dotenv.config(); //load .env file

const app: Express = express(); //see line 1
const port = process.env.PORT; //see line 2
app.use(cors); //see line 3

app.get('/', (req: Request, res: Response) => { //get requests to eatcode.com/
  res.send('placeholder');
});

app.post('/register', (req: Request, res: Response) => { //post requests to eatcode.com/register
  res.send('placeholder');
});

app.post('/login', (req: Request, res: Response) => { //post requests to eatcode.com/login
  res.send('placeholder');
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