const fs = require('fs');
const jszip = require('jszip');
const path = require('path');
const rimraf = require('rimraf');
const TestCasesModel = require('../models/Tests.js')

export default async function fetchTestCases(questionID: number): Promise<any> { 
    const testCaseFound = await TestCasesModel.findOne({questionID:questionID});
    if (testCaseFound == null) {

    } else {
        const fileContent = testCaseFound.testCasesZipped
        const jszipInstance = new jszip();
        const result = await jszipInstance.loadAsync(fileContent);
        const keys = Object.keys(result.files);
        const testCasesFolder = "myfirstdocker/TestCases";
        result.files[keys[0]].name
        for (let key of keys) {
            const item = result.files[key];
            // console.log(item.name);
            if (item.name.slice(0,9) == "__MACOSX/"){
                continue; 
            } else if (item.dir) {
                const exists = fs.existsSync(path.join(testCasesFolder, item.name)); 
                if (!exists) fs.mkdirSync(path.join(testCasesFolder, item.name));
            } else {
                fs.writeFileSync(path.join(testCasesFolder, item.name), Buffer.from(await item.async("arraybuffer")));
            } 
        }
        // fs.unlinkSync(path.join(testCasesFolder,"Problem_" + questionID));
        rimraf.sync(path.join(testCasesFolder,"Problem_" + questionID));
        fs.renameSync(path.join(testCasesFolder,result.files[keys[0]].name), path.join(testCasesFolder,"Problem_" + questionID));
    }

}
// mongosh "mongodb+srv://site.pmp1rxz.mongodb.net/myFirstDatabase" --apiVersion 1 --username Giovanni1014
// db.zipped_test_cases.deleteMany( { "questionID" : { $gt : 2 }} );
// db.zipped_test_cases.deleteMany( { "submissionID" : { $gt : 2 }} );
// db.submissions.deleteMany( { "submissionID" : { $gt : 0 }} );
// db.problems.updateMany( { "name": { $ne : "Another Test" } }, { $rename: { "id": "questionID" } } )
// db.problems.find({ "id": { $ne : null } })
// db.problems.updateMany( { "id": { $ne : null } }, { $rename: { "id": "questionID" } } )
// db.submission.find({"submissionID" : { $gt : 2 }});

// "name": "Another Test"
// db.problems.update(
//     { "name": "Another Test" },
//     {
//       $inc: { "id": 2 }
//     }
//  )