# Shell Script for producing zipped testCase file

## Usage:

```
sh testCaseGenerator.sh inputGenerator ACCode
```

creates a zip file of (NUMBER_TESTCASES) many testcases<br>
both `inputGenerator` and `ACCode` should be executables<br>
`inputGenerator` generates input, it should be random and produce different inputs every time it's run<br>
`ACCode` should be a correct solution for the problem that outputs the correct answer when given an input<br>
Please look into sampleInputGenerator.py and sampleACCode.py.<br>

## default uses python, the following is an example:<p>

go into sample1 for this example.

```
sh testCaseGenerator.sh sampleInputGenerator.py sampleACCode.py<br>
```

change NUMBER_TESTCASES on the first line of testCaseGenerator.sh to use different number of test case<br>

## using C++ files for inputGenerator and AC Code

go into sample2 for this example.

Please compile the cpp files first, then use `COMMAND = "./"` instead of `COMMAND="python3 "` on line 14 of testCaseGenerator.sh and use the executable as arguments as the following:

```
sh testCaseGenerator.sh generator.out ACCcode.out
```

the example files are created by the following commands:

```
g++ inputGenerator2.cpp -o gen
g++ ACCode2.cpp -o sol
sh testCaseGenerator.sh gen sol
```

ACcodeForWebsite.py is for testing purposes, you can copy and paste this code into LC: 136. Single Number and it should be correct.
