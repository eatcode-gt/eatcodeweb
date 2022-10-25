const { exec } = require("child_process");

const solutionFile = "solution_ac.py";
const cmd = "sh run.sh " + solutionFile;
exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        // return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        // return;
    }
    console.log(`stdout: ${stdout}`);
});

// exec("ls -la", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
