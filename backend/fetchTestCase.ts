const fs = require('fs');
import dotenv from 'dotenv'; //allows use of enviroment variables in ./.env
const mongoose = require('mongoose');

const TestCasesModel = require('../models/Tests.js')


dotenv.config(); //load .env file

mongoose.connect(
    process.env.MONGO_DB_CONNECT
);

TestCasesModel

export default function fetchTestCases(questionID: number): any { 
    TestCasesModel.findOne({questionID:questionID}, async (err: Error, result: typeof TestCasesModel | any[]) => { 
        if (err) {
            throw 'Error';
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
}