import React from 'react'
import { colors, diffMap } from '../global/vars'
import { useState } from 'react'
import Axios from 'axios'
import View from '../components/create/View'
import Tags from '../components/create/Tags'
import PageContainer from '../components/common/PageContainer'

const defaultInputs = {
  title: "Default Title",
  description: "This is the default problem description. You should probably change this. You should probably change this.You should probably change this.",
  difficulty: 0,
  beef: 0,
  time: 1,
  memory: 256,
  input: "The only line of each test contains two integers $$n$$ and $$\\left ( 0 \\leq k < n < 10^{6} \\right )$$.",
  output: "Output a single integer — the answer modulo $$10^{9} + 7$$.",
  e1input: "param1 = 'd', param2 = [3, 2, 3]",
  e1output: "[0, 1]",
  e1explanation: "This is the explanation on how the inputs yielded the outputs.",
  e2input: "head = [1, 2, 3, 4, 5], n = 2",
  e2output: "[1, 2, 3, 5]",
  e2explanation: "Remove the nth node from the end of the linked list.",
  e3input: "head = [1, 2, 3, 4, 5], n = 2",
  e3output: "[1, 2, 3, 5]",
  e3explanation: "Remove the nth node from the end of the linked list."
}

const Create = () => {
  const fileInput = document.getElementById('fileInput');
  const [inputs, setInputs] = useState({
    title: "Default Title",
    description: "This is the default problem description. You should probably change this. You should probably change this.You should probably change this.",
    difficulty: 0,
    beef: 0,
    time: 1,
    memory: 256,
    input: "The only line of each test contains two integers $$n$$ and $$\\left ( 0 \\leq k < n < 10^{6} \\right )$$.",
    output: "Output a single integer — the answer modulo $$10^{9} + 7$$.",
    e1input: "param1 = 'd', param2 = [3, 2, 3]",
    e1output: "[0, 1]",
    e1explanation: "This is the explanation on how the inputs yielded the outputs.",
    e2input: "head = [1, 2, 3, 4, 5], n = 2",
    e2output: "[1, 2, 3, 5]",
    e2explanation: "Remove the nth node from the end of the linked list.",
    e3input: "head = [1, 2, 3, 4, 5], n = 2",
    e3output: "[1, 2, 3, 5]",
    e3explanation: "Remove the nth node from the end of the linked list.",
    tags: []
  });
  const [checkedTags, setCheckedTags] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.type === "checkbox") {
      if (event.target.checked === true && !checkedTags.includes(event.target.name)) {
        setCheckedTags(values => [...values, event.target.name]);
      } else if (event.target.checked === false) {
        setCheckedTags(checkedTags.filter(tag =>  tag !== event.target.name));
      }
    } else {
      setInputs(values => ({...values, [name]: value}));
    }
  }

  const resetForm = () => {
    setInputs({...defaultInputs});
    fileInput.value = "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log({...inputs, tags: checkedTags})
    // return
    if (fileInput.value === null || fileInput.value === "") {
      alert("Please submit a file");
      return;
    }
    let questionID = -1;
    Axios.get("http://localhost:3002/findLastPost").then((response) => {
      questionID = response.data.questionID;
      Axios.post("http://localhost:3002/create", {
        questionID,
        title: inputs.title,
        description: inputs.description,
        difficulty: inputs.difficulty,
        beef: inputs.beef,
        time: inputs.time,
        memory: inputs.memory,
        status: 0,
        input: inputs.input,
        output: inputs.output,
        e1input: inputs.e1input,
        e1output: inputs.e1output,
        e1explanation: inputs.e1explanation,
        e2input: inputs.e2input,
        e2output: inputs.e2output,
        e2explanation: inputs.e2explanation,
        e3input: inputs.e3input,
        e3output: inputs.e3output,
        e3explanation: inputs.e3explanation,
        numberOfAttemptedUsers: 0,
        numberOfSolvedUsers: 0,
        tags: checkedTags
      }).then((response) => {
        console.log("Created Problem", response);

        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };

        const fileData = new FormData();
        fileData.append("zippedFile", fileInput.files[0]);
        fileData.append("questionID", questionID);


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
      justifyContent: 'space-between',
      backgroundColor: colors.grey
    },
    left: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    },
    right: {
      flex: 1,
      height: '100%',
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
      width: '100%',
      resize: 'vertical'
    },
    dropdownInput: {

    },
    fileInput: {

    },
    individualExample: {
      
    }
  }

  return (
    <PageContainer children={
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
                  <option value={0}>Jalapeño</option>
                  <option value={1}>Hungarian</option>
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
              <label>
              <input 
                style={styles.textInput}
                type="text" 
                name="beef"
                placeholder='amount of beef'
                default="{beef amount}"
                value={inputs.beef}
                onChange={handleChange}
              />
            </label>
          </div>
          <textarea 
              style={styles.textInput}
              name="description"
              value={inputs.description}
              onChange={handleChange}
            />
          <div style={styles.individualExample}>
            <textarea 
              style={styles.textInput}
              name="input"
              value={inputs.input}
              onChange={handleChange}
              />
            <textarea 
              style={styles.textInput}
              name="output"
              value={inputs.output}
              onChange={handleChange}
            />
          </div>
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
          <label  style={styles.label}>Problem Tags</label>
          <Tags handleChange={handleChange}/>
          <div style={styles.fileInput}>
            <p style={styles.smallTitle}>Choose a zip file with all the test cases</p>
            <input id='fileInput' type="file" name='file'/>
            <input type="submit" onSubmit={handleSubmit}/>
          </div>
        </form>
      </div>
      <div style={styles.right} className="preview-container">
          <View problem={inputs}></View>
      </div>
    </div>
  } />)
}

export default Create