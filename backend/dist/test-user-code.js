"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function testUserCode(userLanguage, //see switch statement line 12
userCode, questionName, //is the same name as the function that the user writes the answer in
tests) {
    let code = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
    let result = runTestCases(userLanguage, questionName, tests, code);
    return result;
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
