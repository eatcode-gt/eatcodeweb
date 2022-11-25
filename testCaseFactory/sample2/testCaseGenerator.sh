NUMBER_TESTCASES=40

if [ $# -ne 2 ]
then
    echo "wrong number of arguments: $#, expected 2"
    exit 1
fi

FOLDER_NAME="testCase"

mkdir $FOLDER_NAME
# cd testCase

# COMMAND="python3 " # for python
COMMAND="./" #for c++

# $COMMAND$1

for COUNT in $(seq 0 1 $(($NUMBER_TESTCASES-1)))
do
    mkdir "$FOLDER_NAME/$COUNT"
    $COMMAND$1 > "$FOLDER_NAME/$COUNT/input.txt"
    $COMMAND$2 < "$FOLDER_NAME/$COUNT/input.txt" > "$FOLDER_NAME/$COUNT/output.txt"
done

zip -r $FOLDER_NAME $FOLDER_NAME
rm -r $FOLDER_NAME


# if [ $# == 2 ]
# then
#     python3 $1 > input.txt
#     python3 $2 < input.txt > output.txt
# else
#     if [ "$2" == "c" ]
#     then
#         g++ 
#     else
#         python3 $1 > input.txt
#     fi

#     if [ "$4" == "c" ]
#     then
#         echo fff
#     else
#         python3 $3 < input.txt > output.txt
#     fi
# fi
# python3 sampleInputGenerator.py > input.txt
# python3 sampleACCode.py < input.txt > output.txt
