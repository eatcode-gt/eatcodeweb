import React from 'react'
import { useContext } from 'react'
import Text from './Text';
import { colors, diffMap } from '../../global/vars'

const View = ({ context, diff}) => {

  const inputs = useContext(context);
  console.log(inputs)

  const styles = {
    cont: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '2em',
      overflowWrap: 'break-word'
    },
    diff: {
      color: colors[diffMap[diff]]
    },
    lineBreak: {
      height: '0.3em',
      width: '100%',
      backgroundColor: colors[diffMap[diff]]
    },
    smallTitle: {
      fontWeight: 'bold'
    },
    mathContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1em'
    },
    mathTitle: {
      fontWeight: 'bold',
      fontSize: '1.8em'
    }
  }

  return (
    <div style={styles.cont}>
      <h2>{inputs.title}</h2>
      <h5 style={styles.diff}>Time Limit: {inputs.time} sec - Memory Limit: {inputs.memory} MB</h5>
      <Text key={"Description"} text={inputs.description} />
      <div style={styles.mathContainer}>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Input: </span><Text id={1} text={inputs.input} /></div>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Output: </span><Text id={1} text={inputs.output} /></div>
      </div>
      <div style={styles.lineBreak} />
      <div style={styles.individualExample}>
        <h5>Example 1</h5>
        <p><span style={styles.smallTitle}>Inputs(s): </span>{inputs.e1input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{inputs.e1output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{inputs.e1explanation}</p>
      </div>
      <div style={styles.individualExample}>
        <h5>Example 2</h5>
        <p><span style={styles.smallTitle}>Inputs(s): </span>{inputs.e2input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{inputs.e2output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{inputs.e2explanation}</p>
      </div>
      <div style={styles.individualExample}>
        <h5>Example 3</h5>
        <p><span style={styles.smallTitle}>Inputs(s): </span>{inputs.e3input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{inputs.e3output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{inputs.e3explanation}</p>
      </div>
    </div>
  )
}

export default View