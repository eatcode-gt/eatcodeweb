"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function testUserCode(userLanguage, questionID, userCode, questionName, amountOfParameters, tests) {
    let code = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
    code += codeSuffix(userLanguage, amountOfParameters, questionName, tests);
    return result;
}
exports.default = testUserCode;
function codeSuffix(userLanguage, amountOfParameters, questionName, tests) {
    let functionCallSuffix;
    switch (userLanguage) { //different languages have different 
        case "Python":
    }
}
