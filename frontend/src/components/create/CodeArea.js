import CodeEditor from '@uiw/react-textarea-code-editor';
import Axios from 'axios'
import Button from '../common/Button'
import { useState } from 'react'
import { colors } from '../../global/vars'
export default function CodeArea() {
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
      <Button onClick={handleSubmit} color={colors.accent1} text={"get cookin"} />
      <Button onClick={handleSubmit} color={colors.hover} text={"stess ball"} />
      <Button onClick={handleSubmit} color={colors.accent2} text={"see solution"} />
    </div>
    <h5>Result: {finalResult}</h5>
    <pre>{result}</pre>
    </>
  );
}