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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const jszip = require('jszip');
const path = require('path');
const rimraf = require('rimraf');
const TestCasesModel = require('../models/Tests.js');
function fetchTestCases(questionID) {
    return __awaiter(this, void 0, void 0, function* () {
        const testCaseFound = yield TestCasesModel.findOne({ questionID: questionID });
        if (testCaseFound == null) {
        }
        else {
            const fileContent = testCaseFound.testCasesZipped;
            const jszipInstance = new jszip();
            const result = yield jszipInstance.loadAsync(fileContent);
            const keys = Object.keys(result.files);
            const testCasesFolder = "myfirstdocker/TestCases";
            result.files[keys[0]].name;
            for (let key of keys) {
                const item = result.files[key];
                // console.log(item.name);
                if (item.name.slice(0, 9) == "__MACOSX/") {
                    continue;
                }
                else if (item.dir) {
                    const exists = fs.existsSync(path.join(testCasesFolder, item.name));
                    if (!exists)
                        fs.mkdirSync(path.join(testCasesFolder, item.name));
                }
                else {
                    fs.writeFileSync(path.join(testCasesFolder, item.name), Buffer.from(yield item.async("arraybuffer")));
                }
            }
            // fs.unlinkSync(path.join(testCasesFolder,"Problem_" + questionID));
            rimraf.sync(path.join(testCasesFolder, "Problem_" + questionID));
            fs.renameSync(path.join(testCasesFolder, result.files[keys[0]].name), path.join(testCasesFolder, "Problem_" + questionID));
        }
    });
}
exports.default = fetchTestCases;
// db.zipped_test_cases.deleteMany( { "questionID" : { $gt : 2 }} );
// db.problems.updateMany( { "name": { $ne : "Another Test" } }, { $rename: { "id": "questionID" } } )
// db.problems.find({ "id": { $ne : null } })
// db.problems.updateMany( { "id": { $ne : null } }, { $rename: { "id": "questionID" } } )
// "name": "Another Test"
// db.problems.update(
//     { "name": "Another Test" },
//     {
//       $inc: { "id": 2 }
//     }
//  )
