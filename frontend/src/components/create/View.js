import React from 'react'
import { useContext } from 'react'
import Text from './Text';
import { colors, diffMap } from '../../global/vars'

const View = ({ context, preview, diff}) => {

  const inputs = useContext(context);

  const styles = {
    cont: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1em'
    },
    diff: {
      color: colors[diffMap[diff]]
    }
  }

  return (
    <div style={styles.cont}>
      <h2>{inputs.name}</h2>
      <h5 style={styles.diff}>Time Limit: {inputs.time} second - Memory Limit: {inputs.memory} MB</h5>
      <Text key={"Input"} text={inputs.problemText} />
      <h3>Input</h3>
      <Text key={"Output"} text={inputs.input} />
      <h3>Output</h3>
      <Text key={"Example"} text={inputs.output} />
      <h3>Example</h3>
      <p key={"Input Title"}>Input:</p>
      <Text key={"Example Input"} text={
        preview ? inputs.exampleInput : inputs.example.exampleInput
      } />
      <p key={"Output Title"}>Output:</p>
      <Text key={"Example Output"} text={
        preview ? inputs.exampleOutput : inputs.example.exampleOutput
      } />
      <p key={"Explanation Title"}>Explanation:</p>
      <Text key={"Explanation"} text={
        preview ? inputs.exampleText : inputs.example.exampleText
      } />
    </div>
  )
}

export default View