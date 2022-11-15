import fetchTestCases from "./fetchTestCase";

const fs = require('fs')
const { exec } = require("child_process");
export default function testUserCode(userLanguage: string, //see switch statement line 12
                                    userCode: string,
                                    questionName: string, //is the same name as the function that the user writes the answer in
                                    tests: Array<any>): any { //contains the parameters and the expected outputs
    // let code: string = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
    let code: string = userCode;
    fs.writeFile('myfirstdocker/solFiles/solution.py', code, 'utf-8', (err: any) => {
        if (err) console.log("Error Loading solution file:", err);
    })
    const solutionFile = "solFiles/solution.py";
    // fetchTestCases()
    const testFolder = "tests/"
    const cmd = "sh myfirstdocker/run.sh " + solutionFile + " " + testFolder;
    
    console.log("Running problem on server.");
    return new Promise( resolve => {
        exec(cmd, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.log(`error: ${error.message}`);
                // return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                // return;
            }
            console.log(`stdout: ${stdout}`);
            resolve(stdout);
        });
    });
    // let result: string = runTestCases(userLanguage, questionName, tests, code);
    // let result: string = "hi";
    // return result;
}

function runTestCases(userLanguage: string, questionName: string, tests: Array<any>, code: string): any {
    switch(userLanguage) { //different languages have different formats for calling function
        case "Python":
            for (let i: number = 0; i < tests.length; i++) {
                code += `print(${questionName}(${tests[i].parameters}))`; //print(McProblem("string"))
            }
            //run code somehow
            break;
        case "Java":
            for (let i: number = 0; i < tests.length; i++) {
                code += `System.out.println(${questionName}(${tests[i].parameters}));`; //System.out.println(McProblem("string"));
            }
            //run code somehow
            break;
        case "JavaScript":
            for (let i: number = 0; i < tests.length; i++) {
                code += `console.log(${questionName}(${tests[i].parameters}))`; //Console.log(McProblem("string"))
            }
            //run code somehow
            break;
    }
}