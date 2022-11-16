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
      <TestResultBar number={1} passed={true}/>
      <TestResultBar number={2} passed={true}/>
      <TestResultBar number={3} passed={false}/>
      <TestResultBar number={4} passed={true}/>
      <TestResultBar number={5} passed={true}/>
      <TestResultBar number={6} passed={false}/>
      <TestResultBar number={7} passed={true}/>
      <TestResultBar number={8} passed={false}/>
      <TestResultBar number={9} passed={false}/>
      <TestResultBar number={9} passed={false}/>
    </div>
    </>
  );
}