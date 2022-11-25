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
const createSubmission_1 = require("./createSubmission");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const database_1 = __importDefault(require("./database"));
const jwt = require("jsonwebtoken");
const morgan = require('morgan');
const UserModel = require('../models/Users');
const ProblemModel = require('../models/Problems.js');
const TestCasesZippedModel = require('../models/Tests.js');
const SubmissionModel = require('../models/Submissions.js');
dotenv_1.default.config(); //load .env file
const app = (0, express_1.default)(); //see line 1 
const port = process.env.PORT || 3002; //see line 2
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)()); //see line 3 (modified by gio, originally use(cors))
app.use(morgan('dev'));
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
app.post("/login", (req, res) => {
    const token = req.body.token;
    const decoded = jwt.decode(token);
    console.log(decoded);
    UserModel.find({ userID: decoded.sub }, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.json(err);
        }
        else if (result.length == 0) {
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
            yield newUser.save();
            res.json({ sub: decoded.sub });
        }
        else {
            res.json({ sub: decoded.sub });
        }
    }));
});
app.get("/findLastPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lastPost = yield ProblemModel.find().sort({ _id: -1 }).limit(1);
    res.json({ questionID: lastPost[0].questionID + 1 });
}));
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = req.body;
    const newProblem = new ProblemModel(inputs);
    yield newProblem.save();
    res.json(inputs);
}));
app.post('/createFiles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        console.log("No files");
        res.sendStatus(404);
    }
    else {
        let file = req.files.zippedFile;
        let questionID = req.body.questionID;
        const zippedFile = {
            testCasesZipped: file.data,
            questionID: questionID,
        };
        const newTestCasesZipped = new TestCasesZippedModel(zippedFile);
        try {
            yield newTestCasesZipped.save();
        }
        catch (error) {
            console.error(error);
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
app.post('/problems', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, language, questionID, userID } = req.body; //destructure POST from client
    // console.log("Submission created!"
    try {
        (0, createSubmission_1.createSubmission)(req.body, res);
    }
    catch (error) {
        res.json(error);
    }
}));
app.get("/nextJob", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, createSubmission_1.enqueueWorker)(res);
}));
app.post("/finishedJob", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, createSubmission_1.finishedRunningSubmission)(req.body.submissionID);
    }
    catch (error) {
        console.error(error);
    }
    res.sendStatus(200);
}));
app.listen(port, () => {
    console.log(`listening ${port}`);
});
database_1.default.connect();
