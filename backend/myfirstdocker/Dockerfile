FROM python:latest

# grab JDK
ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:11 $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

ARG SOLUTION_FILE=solution.py

WORKDIR /project

COPY main.py requirements.txt ./
COPY $SOLUTION_FILE solution/
COPY tests/ tests/

RUN pip3 install -r requirements.txt

CMD [ "python", "main.py" ]