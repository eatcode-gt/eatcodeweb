# COMMAND="python3 "
# COMMAND="./"

# $COMMAND$1 > input
# NUMBER_TESTCASES=10
# for COUNT in $(seq 0 1 $(($NUMBER_TESTCASES-1)))
# do
#     echo $COUNT
# done
FOLDER_NAME="testCase"
mkdir $FOLDER_NAME

# cd testCase

# COMMAND = "python3 "
# COMMAND = "./"

# $COMMAND$1


NUMBER_TESTCASES=10

for COUNT in $(seq 0 1 $(($NUMBER_TESTCASES-1)))
do
    mkdir "$FOLDER_NAME/$COUNT"
done