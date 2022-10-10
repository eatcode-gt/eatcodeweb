import React from 'react'
import { colors } from '../global/colors'
import { useState, createContext  } from 'react'
import Name from '../components/create/Name'
import Preview from '../components/create/Preview'


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
      height: '100%'
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
      height: "25vh",
    }
  }
  
  const UserContext = createContext()
  const [inputs, setInputs] = useState({});
  let submitted = true;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    submitted = true;
  }

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
            <select name="difficulty" value={inputs.difficulty || "1"} onChange={handleChange}>
              <option value="1">Mild</option>
              <option value="2">Med</option>
              <option value="3">Hot</option>
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
          <input type="submit" />
        </form>
      </div>
      <div style={styles.right} className="preview-container">
        <UserContext.Provider value={inputs}>
          <Preview context={UserContext} submitted={submitted} ></Preview>
        </UserContext.Provider>
      </div>
    </div>
  )
}

export default Create