import CodeEditor from '@uiw/react-textarea-code-editor';
import Axios from 'axios'
import Button from '../common/Button'
import { useContext, useEffect, useState } from 'react'
import { colors } from '../../global/vars'
import TestResultBar from './TestResultBar'

import { userContext } from '../../userContext';

export default function CodeArea({ color, questionID, userSolvedThis, beef }) {
  const user = useContext(userContext)
  const [getCookingText, setGetCookingText] = useState("get cookin")
  const [code, setCode] = useState(`#receieve test case from standard input\ninput1 = input()\ninput2 = input()\n\n#compute solution\ndef solve(num1, num2):\n  ans = num1 + num2\n  return ans\n  \n#print output\nprint(solve(input1, input2))`);
  const [result, setResult] = useState([]);

  console.log(userSolvedThis)

  const handleSubmit = () => {
    if (user.user.userID == null) {
      alert("You must be signed in to submit a problem.")
    } else {
      console.log("Submitted Problem");
      setGetCookingText("cooking...")
      Axios.post("http://localhost:3002/problems", {
        code: code, 
        language: "python", 
        questionID: questionID,
        userID: user.user.userID
      }).then((response) => {
        let result = response.data.result
        setResult(response.data.result);
        if (!result.includes(0)) {
          setGetCookingText("try again?")
        } else {
          setGetCookingText("success!")
        }
      });
    }
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1em',
      height: '100%'
    },
    alreadySolved: {
      display: userSolvedThis ? 'inline' : 'none',
      backgroundColor: colors.accent1,
      padding: '0.4em',
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0em',
      letterSpacing: '0.5px'
    },
    codeEditor: {
      fontSize: '1.7em',
      backgroundColor: colors.codeBg,
      fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      minHeight: '50%',
      maxHeight: '50%',
      overflowY: 'scroll',
      color: 'white'
    },
    buttonDiv: {
      display: "flex",
      width: '100%',
      gap: '2em',
      justifyContent: 'space-between'
    },
    testGrid: {
      display: 'grid',
      gridTemplateColumns: result.length == 0 ? '1fr' : '1fr 1fr',
      gap: '1.5em'
    },
    noSubmission: {
      backgroundColor: "#333333",
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5em 0em',
      color: colors.white

    }
  }

  return (
  <div style={styles.container}>
    <p style={styles.alreadySolved}>You have already solved this problem and gained {beef} 🥩.</p>
    <CodeEditor
      value={code}
      language="py"
      placeholder="Please enter Python code."
      onChange={(evn) => setCode(evn.target.value)}
      style={styles.codeEditor}
    />
    <div style={styles.buttonDiv}>
      <Button onClick={handleSubmit} color={color} text={getCookingText}/>
    </div>
    <div style={styles.testGrid}>

      {result.length == 0
      ? <div style={styles.noSubmission}><h4>submit to see results</h4></div>
      : result.map((test, i) => {
          return (
            <TestResultBar key={i} number={i+1} code={test} />
          )
          })
      }

    </div>
    </div>
  );
}