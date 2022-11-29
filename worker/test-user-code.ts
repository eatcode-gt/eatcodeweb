import fetchTestCases from "./fetchTestCase";

const fs = require('fs')
const { exec } = require("child_process");
export default async function testUserCode(userLanguage: string, //see switch statement line 12
                                    userCode: string,
                                    questionID: number): Promise<any> { //contains the parameters and the expected outputs
    // let code: string = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
    let code: string = userCode;
    console.log("language:" + userLanguage);
    let solutionFile = "solFiles/solution.py";
    switch (userLanguage) {
        case "py":
            fs.writeFile('myfirstdocker/solFiles/solution.py', code, 'utf-8', (err: any) => {
                if (err) console.log("Error Loading solution file:", err);
            })
            break;
        case "java":
            const codeLines = code.split("\n");
            console.log(codeLines);
            let className = "Solution";
            for (let i = 0; i < codeLines.length; i++) {
                const line = codeLines[i];
                if (line.startsWith("public class ")) {
                    className = line.split(" ")[2];
                    if (className.endsWith("{")) {
                        className = className.substring(0, className.length - 1);
                    }
                }
            }
            solutionFile = "solFiles/"+className+".java";
            fs.writeFile('myfirstdocker/solFiles/'+className+'.java', code, 'utf-8', (err: any) => {
                if (err) console.log("Error Loading solution file:", err);
            })
            console.log(solutionFile)
            break;
        case "cpp":
            solutionFile = "solFiles/Solution.cpp";
            fs.writeFile('myfirstdocker/solFiles/Solution.cpp', code, 'utf-8', (err: any) => {
                if (err) console.log("Error Loading solution file:", err);
            })
            break;
    }
    try {
        await fetchTestCases(questionID);
    } catch (error) {
        console.error(error);
        // throw error;
    }
    const testFolder = "TestCases/Problem_" + questionID;
    const cmd = "sh myfirstdocker/run_" + userLanguage + ".sh " + solutionFile + " " + testFolder;
    
    console.log("Running problem on server.");
    return new Promise( resolve => {
        exec(cmd, (error: any, stdout: any, stderr: any) => {
            // console.log(stdout);
            if (error) {
                // console.log(`error: ${error.message}`);
                // return;
            }
            if (stderr) {
                // console.log(`stderr: ${stderr}`);
                // return;
            }
            // console.log(`stdout: ${stdout}`);
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