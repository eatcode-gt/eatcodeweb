import React from 'react'
import { useState, useEffect } from 'react'


const Create = () => {

  const styles = {
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
  
  const [name, setName] = useState("")
  const [text, setText] = useState("")

  return (
    <form style={styles.form}>
      <label style={styles.label}>
        Problem Name:
        <input 
          style={styles.input}
          type="text" 
          onChange={(e) => {
            setName(e.target.value);
        }} 
        />
      </label>
      <label style={styles.label}>
        Problem Text:
      </label>
      <textarea 
          style={styles.textarea}
          onChange={(e) => {
            setText(e.target.value);
        }} 
        /> 
    </form>
  )
}

export default Create