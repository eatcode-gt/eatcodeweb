import express, { Express, Request, Response } from 'express'; //server manager in js
import dotenv from 'dotenv'; //allows use of enviroment variables in ./.env
import cors from 'cors'; //cross origin resource sharing middleware

dotenv.config(); //load .env file

const app: Express = express();
app.use(cors);
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => { //requests to meatcode.com/
  res.send('hello');
});

app.listen(port, () => { //server listens to requests on port {port}
  console.log(`listening ${port}`);
});