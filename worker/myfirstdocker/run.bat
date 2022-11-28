docker build -t python-docker --build-arg SOLUTION_FILE=solution_wrong.py .
docker run --rm --memory="1g" --memory-swap="1g" python-docker
PAUSE