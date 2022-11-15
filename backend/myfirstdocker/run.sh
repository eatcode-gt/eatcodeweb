docker build -t python-docker --build-arg SOLUTION_FILE=$1 .
docker run --rm --memory="1g" --memory-swap="1g" python-docker