cd myfirstdocker
docker build -t python-java-docker -f dockerfiles/java/Dockerfile --build-arg SOLUTION_FILE=$1 --build-arg TEST_FOLDER=$2 .
docker run --rm --memory="1g" --memory-swap="1g" python-java-docker