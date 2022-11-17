"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const dotenv_1 = __importDefault(require("dotenv")); //allows use of enviroment variables in ./.env
const mongoose = require('mongoose');
const TestCasesModel = require('../models/Tests.js');
dotenv_1.default.config(); //load .env file
mongoose.connect(process.env.MONGO_DB_CONNECT);
TestCasesModel;
function fetchTestCases(questionID) {
    TestCasesModel.findOne({ questionID: questionID }, (err, result) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            throw 'Error';
        }
        else if (result.length == 0) {
            const user = {
                userID: decoded.sub,
                name: decoded.name,
                email: decoded.email,
            };
            const newUser = new UserModel(user);
            yield newUser.save();
            res.json({ sub: decoded.sub });
        }
        else {
            res.json({ sub: decoded.sub });
        }
    }));
}
exports.default = fetchTestCases;
