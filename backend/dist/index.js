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
const jwt = require("jsonwebtoken");
dotenv_1.default.config(); //load .env file
const app = (0, express_1.default)(); //see line 1
// const port = process.env.PORT; //see line 2
const port = 3002;
app.use(express_1.default.json());
app.use((0, cors_1.default)()); //see line 3
app.get('/', (req, res) => {
    res.send('placeholder');
});
app.post('/register', (req, res) => {
    res.send('placeholder');
});
app.post('/login', (req, res) => {
    res.send('placeholder');
});
app.post("/sendUserToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const decoded = jwt.decode(token);
    console.log(decoded);
    res.json(decoded);
}));
app.post('/problems', (req, res) => {
    const { userCode, userLanguage, questionID } = req.body; //destructure POST from client
    const { questionName, tests } = problem_data_json_1.default.problems[questionID]; //pull question data from json
    let result = (0, test_user_code_1.default)(userLanguage, userCode, questionName, tests); //abstraction to test code against cases
    res.end(result); //send result back to client
});
app.listen(port, () => {
    console.log(`listening ${port}`);
});
