import React from 'react'
import { colors } from '../global/colors'
import { useState, createContext  } from 'react'
import Axios from 'axios'
import View from '../components/create/View'


const Create = () => {

  const styles = {
    content: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      justifyContent: 'space-between',
      backgroundColor: colors.grey
    },
    left: {
      backgroundColor: colors.accent2,
      width: '50%',
      height: '100%',
    },
    right: {
      backgroundColor: colors.accent1,
      maxWidth: '50%',
      width: '50%',
      height: '100%',
    },
    form: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      margin: "0 1% 0 1%",
    },
    label: {
      fontSize: "2rem",
    },
    input: {
      width: "50%",
      padding: "8px",
      // margin: "8px 0",
      boxSizing: "border-box",
    },
    textarea: {
      height: "5vh",
    }
  }
  
  const UserContext = createContext()
  const [inputs, setInputs] = useState({
    difficulty: 1,
    time: 1,
    memory: 256,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3002/create", {
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
      console.log("Created Problem");
      setInputs({
        difficulty: 1,
        time: 1,
        memory: 256,
      });
    });
  };

  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>
            Problem Name:
            <input 
              style={styles.input}
              type="text" 
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
            />
          </label>
          <label style={styles.label}>
            Difficulty:
            <select name="difficulty" value={inputs.difficulty || 1} onChange={handleChange}>
              <option value={0}>Mild</option>
              <option value={1}>Med</option>
              <option value={2}>Hot</option>
            </select>
          </label>
          <label style={styles.label}>
            Time Limit:
            <select name="time" value={inputs.time || 1} onChange={handleChange}>
              <option value={0.5}>0.5s</option>
              <option value={1}>1s</option>
              <option value={2}>2s</option>
              <option value={3}>3s</option>
            </select>
          </label>
          <label style={styles.label}>
            Memory Limit:
            <select name="memory" value={inputs.memory || 256} onChange={handleChange}>
              <option value={256}>256MB</option>
              <option value={512}>512MB</option>
            </select>
          </label>
          <label style={styles.label}>
            Problem Text:
          </label>
          <textarea 
              style={styles.textarea}
              name="problemText"
              value={inputs.problemText || ""}
              onChange={handleChange}
            /> 
          <label style={styles.label}>
            Input Description:
          </label>
          <textarea 
              style={styles.textarea}
              name="input"
              value={inputs.input || ""}
              onChange={handleChange}
            /> 
          <label style={styles.label}>
            Output Description:
          </label>
          <textarea 
              style={styles.textarea}
              name="output"
              value={inputs.output || ""}
              onChange={handleChange}
            />
          <label style={styles.label}>
            Example Input:
          </label>
          <textarea 
              style={styles.textarea}
              name="exampleInput"
              value={inputs.exampleInput || ""}
              onChange={handleChange}
            /> 
          <label style={styles.label}>
            Example Output:
          </label>
          <textarea 
              style={styles.textarea}
              name="exampleOutput"
              value={inputs.exampleOutput || ""}
              onChange={handleChange}
            /> 
          <label style={styles.label}>
            Example Text:
          </label>
          <textarea 
              style={styles.textarea}
              name="exampleText"
              value={inputs.exampleText || ""}
              onChange={handleChange}
            /> 
          <input type="submit" onSubmit={handleSubmit}/>
        </form>
      </div>
      <div style={styles.right} className="preview-container">
        <UserContext.Provider value={inputs}>
          <View context={UserContext} preview={true}></View>
        </UserContext.Provider>
      </div>
    </div>
  )
}

export default Create