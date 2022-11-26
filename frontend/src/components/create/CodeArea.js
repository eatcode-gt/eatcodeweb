import CodeEditor from '@uiw/react-textarea-code-editor';
import Axios from 'axios'
import Button from '../common/Button'
import { useContext, useEffect, useState } from 'react'
import { colors } from '../../global/vars'
import TestResultBar from './TestResultBar'

import { userContext } from '../../userContext';

export default function CodeArea({color, questionID}) {
  const user = useContext(userContext)
  const [getCookingText, setGetCookingText] = useState("get cookin")
  const [code, setCode] = useState(`def add(a, b):\n  return a + b;\n`);
  const [result, setResult] = useState(
    // [0, 1, 2, 3, 4, 5]
    []
    );

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
        setGetCookingText("cooked")
        setResult(response.data.result);
        console.log(result)
      });
    }
  }

  const styles = {
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

  return (<>
    <CodeEditor
      value={code}
      language="py"
      placeholder="Please enter Python code."
      onChange={(evn) => setCode(evn.target.value)}
      style={styles.codeEditor}
    />
    <div style={styles.buttonDiv}>
      <Button onClick={handleSubmit} color={color} text={getCookingText} />
      <Button onClick={handleSubmit} color={colors.cooked} text={"see solution"} />
    </div>
    <div style={styles.testGrid}>

      {result.length == 0
      ? <div style={styles.noSubmission}><h4>submit to see results</h4></div>
      : result.map((test, i) => {
          return (
            <TestResultBar number={i+1} code={test} />
          )
          })
      }

    </div>
    </>
  );
}