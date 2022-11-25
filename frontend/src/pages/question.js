import React from 'react'
import { colors, diffMap } from '../global/vars'
import { useLocation } from 'react-router-dom'
import { useState, createContext  } from 'react'
import CodeArea from '../components/create/CodeArea'
import View from '../components/create/View'

const resultCodeToString = [
                            "Correct",
                            "Wrong Answer",
                            "Time Limit Exceeded",
                            "Memory Limit Exceeded",
                            "Runtime Error",
                            "System Error"
                          ]

const Question = ({user}) => {
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
    }
  }
  const [code, setCode] = useState(`def add(a, b):\n  return a + b;\n`);
  const [result, setResult] = useState("");
  const [finalResult, setFinalResult] = useState("Raw");

  const handleOnChange = (event) => {
    setCode(event.target.value);
  }


  const UserContext = createContext()
  const problem = useLocation().state.problem

  const handleSubmit = () => {
    console.log("Submitted Problem");
    setFinalResult("Pending");
    setResult("");
    Axios.post("http://localhost:3002/problems", {
      code: code, 
      language: "python", 
      questionID: problem.questionID,
      userID: user.userID,
    }).then((response) => {
      const result = response.data.result;
      const finalResult = response.data.finalResult;
      setFinalResult(resultCodeToString[finalResult])
      setResult(result.map((val) => {return resultCodeToString[val]}));
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <UserContext.Provider value={problem}>
          <View context={UserContext} preview={false} diff={problem.diff}></View>
        </UserContext.Provider>
      </div>
      <div style={styles.right}>
        <CodeArea 
          color={colors[diffMap[problem.diff]]}
          style={styles.textarea}
          //moved code={code} setCode={setCode} to CodeArea.js
        />
      </div>
    </div>
  )
}

export default Question