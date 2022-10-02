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
const express_1 = __importDefault(require("express")); //server manager in js
const dotenv_1 = __importDefault(require("dotenv")); //allows use of enviroment variables in ./.env
const cors_1 = __importDefault(require("cors")); //cross origin resource sharing middleware
const test_user_code_1 = __importDefault(require("./test-user-code"));
const problem_data_json_1 = __importDefault(require("./problem-data.json"));
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const UserModel = require('../models/Users');
const ProblemModel = require('../models/Problems.js');
dotenv_1.default.config(); //load .env file
const app = (0, express_1.default)(); //see line 1
const port = process.env.PORT; //see line 2
app.use(express_1.default.json());
app.use((0, cors_1.default)()); //see line 3 (modified by gio, originally use(cors))
// Connect to mongodb, (you need to set your ip on mongodb site in order to run this successfully)
mongoose.connect(process.env.MONGO_DB_CONNECT);
app.get('/', (req, res) => {
    res.send('placeholder');
});
app.get('/problems', (req, res) => {
    ProblemModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ result: result });
        }
    });
});
app.post('/register', (req, res) => {
    res.send('placeholder');
});
// TODO: check if user is already in DB, if yes then don't create new user.
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const decoded = jwt.decode(token);
    console.log(decoded);
    const user = {
        userID: decoded.sub,
        name: decoded.name,
        email: decoded.email,
    };
    const newUser = new UserModel(user);
    yield newUser.save();
    res.json({ sub: decoded.sub });
}));
app.post('/userInfo', (req, res) => {
    const userSub = req.body.sub;
    console.log(userSub);
    UserModel.find({ userID: userSub }, (err, result) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ result: result });
        }
    });
});
app.post('/problems', (req, res) => {
    const { userCode, userLanguage, questionID } = req.body; //destructure POST from client
    const { questionName, tests } = problem_data_json_1.default.problems[questionID]; //pull question data from json
    let result = (0, test_user_code_1.default)(userLanguage, userCode, questionName, tests); //abstraction to test code against cases
    res.end(result); //send result back to client
});
app.listen(port, () => {
    console.log(`listening ${port}`);
});
