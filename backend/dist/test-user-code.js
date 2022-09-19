"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const tmp_1 = __importDefault(require("tmp"));
const problem_data_json_1 = __importDefault(require("./problem-data.json"));
function testUserCode(userLanguage, questionID, userCode, questionName, amountOfParameters, tests) {
    let code = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
    let result = runTestCases(userLanguage, questionName, tests, code);
    return result;
}
exports.default = testUserCode;
function runTestCases(userLanguage, questionName, tests, code) {
    switch (userLanguage) { //different languages have different formats for calling function
        case "Python":
            for (let i = 0; i < tests.length; i++) {
                code += `print(${questionName}(${tests[i].parameters}))`;
            }
            let pyPath = "";
            tmp_1.default.file({ postfix: '.py' }, function _tempFileCreated(err, path, fd) {
                if (err)
                    throw err;
                pyPath = path;
            });
            const python = (0, child_process_1.spawn)('python3', [pyPath]);
            let output;
            python.stdout.on('data', function (data) {
                output = data.toString();
            });
            python.stderr.on('data', data => {
                console.error(`stderr: ${data}`);
            });
            python.on('exit', (code) => {
                return `exited ${code} and ${output}`;
            });
            break;
        case "Java":
            for (let i = 0; i < tests.length; i++) {
                code += `System.out.println(${questionName}(${tests[i].parameters}));`;
            }
            break;
        case "JavaScript":
            for (let i = 0; i < tests.length; i++) {
                code += `console.log(${questionName}(${tests[i].parameters}))`;
            }
            break;
        default:
            console.log("programm");
    }
}
let test2 = testUserCode("Python", 0, `"print("Mc" + suffix.lower().replace(" ", ""))`, "McProblem", 1, problem_data_json_1.default.problems[0].tests);
console.log(2 + test2);
