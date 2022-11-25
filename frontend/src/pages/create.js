import React from 'react'
import { colors, diffMap } from '../global/vars'
import { useState, createContext  } from 'react'
import Axios from 'axios'
import View from '../components/create/View'

const Create = () => {  
  const UserContext = createContext()
  const fileInput = document.getElementById('fileInput');
  const [inputs, setInputs] = useState({
    title: "Default Title",
    description: "This is the default problem description. You should probably change this. You should probably change this.You should probably change this.",
    difficulty: 0,
    time: 0.5,
    memory: 256,
    e1input: "param1 = 'd', param2 = [3, 2, 3]",
    e1output: "[0, 1]",
    e1explanation: "This is the explanation on how the inputs yielded the outputs.",
    e2input: "head = [1, 2, 3, 4, 5], n = 2",
    e2output: "[1, 2, 3, 5]",
    e2explanation: "Remove the nth node from the end of the linked list.",
    e3input: "head = [1, 2, 3, 4, 5], n = 2",
    e3output: "[1, 2, 3, 5]",
    e3explanation: "Remove the nth node from the end of the linked list."
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const resetForm = () => {
    setInputs({
      difficulty: 1,
      time: 1,
      memory: 256,
    });
    fileInput.value = "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fileInput.value === null || fileInput.value === "") {
      alert("Please submit a file");
      return;
    }
    let lastPostID = -1;
    Axios.get("http://localhost:3002/findLastPost").then((response) => {
      lastPostID = response.data.id;
      Axios.post("http://localhost:3002/create", {
        questionID: lastPostID,
        name: inputs.name,
        diff: inputs.difficulty,
        time: inputs.time,
        memory: inputs.memory,
        status: 0,
        text: inputs.problemText,
        input: inputs.input,
        output: inputs.output,
        example: {
          exampleInput: inputs.exampleInput,
          exampleOutput: inputs.exampleOutput,
          exampleText: inputs.exampleText,
        },
        numberOfAttemptedUsers: 0,
        numberOfSolvedUsers: 0,
      }).then((response) => {
        console.log("Created Problem", response);

        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };

        const fileData = new FormData();
        fileData.append("zippedFile", fileInput.files[0]);
        fileData.append("id", lastPostID);


        Axios.post("http://localhost:3002/createFiles", fileData, config).then((response) => {
          console.log(response.data);
        }).catch((error) => {
          console.log("Something went wrong with Problem Files");
          console.log(error);
        })

        resetForm();

      }).catch((error) => {
        console.log("Something went wrong with Problem Data");
        console.log(error);
      })
    }).catch((error) => {
      console.log("Something went wrong with retrieving last problem index");
      console.log(error);
    })
  };

  const styles = {
    content: {
      display: 'flex',
      gap: '3em',
      width: '100vw',
      height: '100vh',
      justifyContent: 'space-between',
      backgroundColor: colors.grey
    },
    left: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2em',
      flex: 1,
      maxWidth: '50%'
    },
    right: {
      flex: 1,
      height: '100%',
      maxWidth: '50%'
    },
    top: {
      display: 'flex'
    },
    form: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      margin: "0 1% 0 1%",
      gap: '2em'
    },
    diff: {
      color: colors[diffMap[inputs.difficulty]]
    },
    textInput: {

    },
    dropdownInput: {

    },
    fileInput: {

    }
  }

  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.top}>
            <label>
              <input 
                style={styles.textInput}
                type="text" 
                name="title"
                default="Enter"
                value={inputs.title}
                onChange={handleChange}
              />
            </label>
            <label style={styles.label}>
                <select style={styles.dropdownInput} name="difficulty" value={inputs.difficulty} onChange={handleChange}>
                  <option value={0}>Bell</option>
                  <option value={1}>Jalepeño</option>
                  <option value={2}>Habenero</option>
                  <option value={3}>Ghost</option>
                </select>
              </label>
              <label style={styles.label}>
                <select style={styles.selectInput} name="time" value={inputs.time} onChange={handleChange}>
                  <option value={0.5}>0.5s</option>
                  <option value={1}>1s</option>
                  <option value={2}>2s</option>
                  <option value={3}>3s</option>
                </select>
              </label>
              <label style={styles.label}>
                <select style={styles.selectInput} name="memory" value={inputs.memory} onChange={handleChange}>
                  <option value={256}>256MB</option>
                  <option value={512}>512MB</option>
                </select>
              </label>
              <label style={styles.label}>
                <select style={styles.selectInput} name="numExamples" value={inputs.numExamples} onChange={handleChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={2}>3</option>
                </select>
              </label>
          </div>
          <textarea 
              style={styles.textInput}
              name="description"
              value={inputs.description}
              onChange={handleChange}
            />
          <div style={styles.individualExample}>
            <textarea key={`e1input`}
              style={styles.textInput}
              name={`e1input`}
              value={inputs.e1input}
              onChange={handleChange}
            />
            <textarea key={`e1output`}
              style={styles.textInput}
              name={`e1output`}
              value={inputs.e1output}
              onChange={handleChange}
            />
            <textarea key={`e1explanation`}
              style={styles.textInput}
              name={`e1explanation`}
              value={inputs.e1explanation}
              onChange={handleChange}
            />
          </div>
          <div style={styles.individualExample}>
            <textarea key={`e2input`}
              style={styles.textInput}
              name={`e2input`}
              value={inputs.e2input}
              onChange={handleChange}
            />
            <textarea key={`e2output`}
              style={styles.textInput}
              name={`e2output`}
              value={inputs.e2output}
              onChange={handleChange}
            />
            <textarea key={`e2explanation`}
              style={styles.textInput}
              name={`e2explanation`}
              value={inputs.e2explanation}
              onChange={handleChange}
            />
          </div>
          <div style={styles.individualExample}>
            <textarea key={`e3input`}
              style={styles.textInput}
              name={`e3input`}
              value={inputs.e3input}
              onChange={handleChange}
            />
            <textarea key={`e3output`}
              style={styles.textInput}
              name={`e3output`}
              value={inputs.e3output}
              onChange={handleChange}
            />
            <textarea key={`e3explanation`}
              style={styles.textInput}
              name={`e3explanation`}
              value={inputs.e3explanation}
              onChange={handleChange}
            />
          </div>
          <div style={styles.fileInput}>
            <p style={styles.smallTitle}>Choose a zip file with all the test cases</p>
            <input id='fileInput' type="file" name='file'/>
            <input type="submit" onSubmit={handleSubmit}/>
          </div>
        </form>
      </div>
      <div style={styles.right} className="preview-container">
        <UserContext.Provider value={inputs}>
          <View context={UserContext} preview={true} diff={inputs.difficulty}></View>
        </UserContext.Provider>
      </div>
    </div>
  )
}

export default Create