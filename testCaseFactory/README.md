usage:
sh testCaseGenerator.sh inputGenerator ACCode

both of the arguments should be executables

default to use python3, example:
sh testCaseGenerator.sh sampleInputGenerator.py sampleACCode.py

change NUMBER_TESTCASES on first line to use different number of test case

if you want to use c++, please compile it first,
then use
COMMAND = "./"
instead of  
COMMAND="python3 "
on line 14

and use the executable as arguments:
sh testCaseGenerator.sh generator.out ACCcode.out