import CodeEditor from '@uiw/react-textarea-code-editor';
import Axios from 'axios'
import Button from '../common/Button'
import { useState } from 'react'
import { colors } from '../../global/vars'
import TestResultBar from './TestResultBar'

export default function CodeArea({color}) {
  const [code, setCode] = useState(`def add(a, b):\n  return a + b;\n`);
  const [result, setResult] = useState("");
  const [finalResult, setFinalResult] = useState("Raw");




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

  const styles = {
    codeEditor: {
      fontSize: '1.7em',
      backgroundColor: colors.codeBg,
      fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      minHeight: '50%'
    },
    buttonDiv: {
      display: "flex",
      width: '100%',
      gap: '2em',
      justifyContent: 'space-between'
    },
    testGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      gap: '1.5em'
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
      <Button onClick={handleSubmit} color={color} text={"get cookin"} />
      <Button onClick={handleSubmit} color={colors.cooked} text={"see solution"} />
    </div>
    <h5>Result: {finalResult}</h5>
    <div style={styles.testGrid}>
      <TestResultBar number={1} code={result[0]}/>
      <TestResultBar number={2} code={result[1]}/>
      <TestResultBar number={3} code={result[2]}/>
      <TestResultBar number={4} code={result[3]}/>
      <TestResultBar number={5} code={result[4]}/>
      <TestResultBar number={6} code={result[5]}/>
      <TestResultBar number={7} code={result[6]}/>
      <TestResultBar number={8} code={result[7]}/>
      <TestResultBar number={9} code={result[8]}/>
      <TestResultBar number={9} code={result[9]}/>
    </div>
    </>
  );
}