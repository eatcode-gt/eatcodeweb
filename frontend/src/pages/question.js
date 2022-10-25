import React from 'react'
import { colors } from '../global/colors'
import { useLocation } from 'react-router-dom'
import { useState, createContext  } from 'react'
import Axios from 'axios'
import View from '../components/create/View'

const Question = () => {
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
    textarea: {
      height: "10vh",
    }
  }
  const [code, setCode] = useState("");

  const handleOnChange = (event) => {
    setCode(event.target.value);
  }

  const handleSubmit = () => {
    console.log("Submitted Problem");
    Axios.post("http://localhost:3002/problems", {
      userCode: code, 
      userLanguage: "python", 
      questionID: 0
    }).then((response) => {
      console.log(response.data);
    });
  }
  

  const UserContext = createContext()
  const problem = useLocation().state.problem

  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <UserContext.Provider value={problem}>
          <View context={UserContext} preview={false} ></View>
        </UserContext.Provider>
      </div>
      <div style={styles.right}>
        <textarea 
          style={styles.textarea}
          name="input"
          onChange={handleOnChange}
        /> 
        <button onClick={handleSubmit}> Submit </button>
      </div>
    </div>
  )
}

export default Question