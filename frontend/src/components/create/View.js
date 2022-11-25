import React from 'react'
import { useContext } from 'react'
import Text from './Text';
import { colors, diffMap } from '../../global/vars'

const View = ({ context, preview, diff}) => {

  const inputs = useContext(context);

  const styles = {
    cont: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '2em'
    },
    diff: {
      color: colors[diffMap[diff]]
    },
    smallTitle: {
      fontWeight: 'bold'
    }
  }

  return (
    <div style={styles.cont}>
      <h2>{inputs.title}</h2>
      <h5 style={styles.diff}>Time Limit: {inputs.time} sec - Memory Limit: {inputs.memory} MB</h5>
      <Text key={"Description"} text={inputs.description} />
      <div style={styles.individualExample}>
        <h4>Example 1</h4>
        <p><span style={styles.smallTitle}>Inputs(s): </span>{inputs.e1input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{inputs.e1output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{inputs.e1explanation}</p>
      </div>
      <div style={styles.individualExample}>
        <h4>Example 2</h4>
        <p><span style={styles.smallTitle}>Inputs(s): </span>{inputs.e2input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{inputs.e2output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{inputs.e2explanation}</p>
      </div>
      <div style={styles.individualExample}>
        <h4>Example 3</h4>
        <p><span style={styles.smallTitle}>Inputs(s): </span>{inputs.e3input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{inputs.e3output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{inputs.e3explanation}</p>
      </div>
    </div>
  )
}

export default View