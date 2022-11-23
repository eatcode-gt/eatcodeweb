"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); //allows use of enviroment variables in ./.env
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config(); //load .env file
exports.default = {
    connect: () => {
        mongoose_1.default
            .connect(process.env.MONGO_DB_CONNECT)
            .then((res) => console.log("MongoDB connection created"));
    }
};
