# A dockerfile must always start by importing the base image.
# We use the keyword 'FROM' to do that.
# In our example, we want import the python image.
# So we write 'python' for the image name and 'latest' for the version.
FROM python:latest
RUN apt-get -y update && apt-get install -y
RUN apt-get -y install clang

ARG SOLUTION_FILE=solution.cpp TEST_FOLDER=tests/

WORKDIR /project

# In order to launch our python code, we must import it into our image.
# We use the keyword 'COPY' to do that.
# The first parameter 'main.py' is the name of the file on the host.
# The second parameter '/' is the path where to put the file on the image.
# Here we put the file at the image root folder.
COPY main.py requirements.txt ./
COPY $SOLUTION_FILE ./solution.cpp
COPY $TEST_FOLDER tests/

RUN pip3 install -r requirements.txt

# We need to define the command to launch when we are going to run the image.
# We use the keyword 'CMD' to do that.
# The following command will execute "python main.py".
CMD [ "python", "main.py", "cpp" ]
# CMD ["echo", "8"]
# CMD ["echo", "8"]
# CMD [ "ls"]
# CMD ["echo", "8"]