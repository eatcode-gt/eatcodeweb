const fs = require('fs');
import dotenv from 'dotenv'; //allows use of enviroment variables in ./.env
const mongoose = require('mongoose');

const TestCasesModel = require('../models/Tests.js')


dotenv.config(); //load .env file

mongoose.connect(
    process.env.MONGO_DB_CONNECT
);

TestCasesModel

export default function fetchTestCases(problemId: number): any { //contains the parameters and the expected outputs
    // let code: string = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
    
}