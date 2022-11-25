NUMBER_TESTCASES = 10

if [ $# -ne 2 ] && [ $# -ne 4 ]
then
    echo "wrong number of arguments: $#, expected 2 or 4"
    exit 1
fi

mkdir testCase

COMMAND = "python3 "

$COMMAND$1

if [ $# == 2 ]
then
    python3 $1 > input.txt
    python3 $2 < input.txt > output.txt
else
    if [ "$2" == "c" ]
    then
        g++ 
    else
        python3 $1 > input.txt
    fi

    if [ "$4" == "c" ]
    then
        echo fff
    else
        python3 $3 < input.txt > output.txt
    fi
fi
# python3 sampleInputGenerator.py > input.txt
# python3 sampleACCode.py < input.txt > output.txt
