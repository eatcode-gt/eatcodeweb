"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //server manager in js
const dotenv_1 = __importDefault(require("dotenv")); //allows use of enviroment variables in ./.env
const cors_1 = __importDefault(require("cors")); //cross origin resource sharing middleware
const test_user_code_1 = __importDefault(require("./test-user-code"));
const problem_data_json_1 = __importDefault(require("./problem-data.json"));
dotenv_1.default.config(); //load .env file
const app = (0, express_1.default)();
app.use(cors_1.default);
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('placeholder');
});
app.post('/register', (req, res) => {
    res.send('placeholder');
});
app.post('/login', (req, res) => {
    res.send('placeholder');
});
app.post('/problems', (req, res) => {
    const { userCode, userLanguage, questionID } = req.body; //destructure POST from client
    const { questionName, amountOfParameters, tests } = problem_data_json_1.default.problems[questionID]; //pull question data from json
    let result = (0, test_user_code_1.default)(userLanguage, questionID, userCode, questionName, amountOfParameters, tests); //abstraction to test code against cases
});
app.listen(port, () => {
    console.log(`listening ${port}`);
});
