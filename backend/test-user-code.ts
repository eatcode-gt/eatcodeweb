export default function testUserCode(userLanguage: string,
                                    questionID: number,
                                    userCode: string,
                                    questionName: string,
                                    amountOfParameters: number,
                                    tests: Array<any>): string {
    let code: string = userCode + "/n/n"; //'code' will be the user's submitted McProblem() function + function calls that check if the user's functions provides expected outputs when given arguments defined in problem-data.json
    code += codeSuffix(userLanguage, amountOfParameters, questionName, tests);
    return result;
}

function codeSuffix(userLanguage: string, amountOfParameters: number, questionName: string, tests: Array<any>): void {
    let functionCallSuffix: string;
    switch(userLanguage) { //different languages have different formats for calling function
        case "Python":
            
    }

}