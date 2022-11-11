import React from 'react'
import { colors } from '../global/vars'
import { useLocation } from 'react-router-dom'
import { useState, createContext  } from 'react'
import Axios from 'axios'
import CodeArea from '../components/create/CodeArea'
import View from '../components/create/View'
import Button from '../components/common/Button'

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
      padding: '0em 2em',
      width: 'calc(50% - 4em)',
      height: '100%',
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2em',
      padding: '0em 2em',
      maxWidth: 'calc(50% - 4em)',
      width: '50%',
      height: '100%'
    },
    buttonDiv: {
      display: "flex",
      width: '100%',
      gap: '2em',
      justifyContent: 'space-between'
    }
  }
  const [code, setCode] = useState(`def add(a, b):\n  return a + b;\n`);
  const [result, setResult] = useState("");
  const [finalResult, setFinalResult] = useState("Raw");

  const handleOnChange = (event) => {
    setCode(event.target.value);
  }

  const handleSubmit = () => {
    console.log("Submitted Problem");
    setFinalResult("Pending");
    Axios.post("http://localhost:3002/problems", {
      userCode: code, 
      userLanguage: "python", 
      questionID: 0
    }).then((response) => {
      console.log(response.data);
      const finalWord = response.data.split("\n");
      setFinalResult(finalWord[finalWord.length - 1])
      setResult(response.data);
    });
  }
  

  const UserContext = createContext()
  const problem = useLocation().state.problem

  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <UserContext.Provider value={problem}>
          <View context={UserContext} preview={false} diff={problem.diff}></View>
        </UserContext.Provider>
      </div>
      <div style={styles.right}>
        <CodeArea 
          style={styles.textarea}
          onChange={handleOnChange}
          code={code} setCode={setCode}
        />
        <div style={styles.buttonDiv}>
          <Button onClick={handleSubmit} color={colors.accent1} text={"get cookin"} />
          <Button onClick={handleSubmit} color={colors.hover} text={"stess ball"} />
          <Button onClick={handleSubmit} color={colors.accent2} text={"see solution"} />
        </div>
        <h5>Result: {finalResult}</h5>
        <pre>{result}</pre>
      </div>
    </div>
  )
}

export default Question