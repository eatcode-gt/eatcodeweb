"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //server manager in js
const dotenv_1 = __importDefault(require("dotenv")); //allows use of enviroment variables in ./.env
const cors_1 = __importDefault(require("cors")); //cross origin resource sharing middleware
dotenv_1.default.config(); //load .env file
const app = (0, express_1.default)();
app.use(cors_1.default);
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('hello');
});
app.listen(port, () => {
    console.log(`listening ${port}`);
});
