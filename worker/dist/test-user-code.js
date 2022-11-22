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
const fetchTestCase_1 = __importDefault(require("./fetchTestCase"));
const fs = require('fs');
const { exec } = require("child_process");
function testUserCode(userLanguage, //see switch statement line 12
userCode, questionID) {
    return __awaiter(this, void 0, void 0, function* () {
        // let code: string = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
        let code = userCode;
        fs.writeFile('myfirstdocker/solFiles/solution.py', code, 'utf-8', (err) => {
            if (err)
                console.log("Error Loading solution file:", err);
        });
        const solutionFile = "solFiles/solution.py";
        try {
            yield (0, fetchTestCase_1.default)(questionID);
        }
        catch (error) {
            console.error(error);
            // throw error;
        }
        const testFolder = "TestCases/Problem_" + questionID;
        const cmd = "sh myfirstdocker/run.sh " + solutionFile + " " + testFolder;
        console.log("Running problem on server.");
        return new Promise(resolve => {
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    // return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    // return;
                }
                // console.log(`stdout: ${stdout}`);
                resolve(stdout);
            });
        });
        // let result: string = runTestCases(userLanguage, questionName, tests, code);
        // let result: string = "hi";
        // return result;
    });
}
exports.default = testUserCode;
function runTestCases(userLanguage, questionName, tests, code) {
    switch (userLanguage) { //different languages have different formats for calling function
        case "Python":
            for (let i = 0; i < tests.length; i++) {
                code += `print(${questionName}(${tests[i].parameters}))`; //print(McProblem("string"))
            }
            //run code somehow
            break;
        case "Java":
            for (let i = 0; i < tests.length; i++) {
                code += `System.out.println(${questionName}(${tests[i].parameters}));`; //System.out.println(McProblem("string"));
            }
            //run code somehow
            break;
        case "JavaScript":
            for (let i = 0; i < tests.length; i++) {
                code += `console.log(${questionName}(${tests[i].parameters}))`; //Console.log(McProblem("string"))
            }
            //run code somehow
            break;
    }
}
