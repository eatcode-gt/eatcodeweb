import React from 'react'
import Text from './Text';
import { colors, diffMap } from '../../global/vars'

const View = ({ problem }) => {

  const styles = {
    cont: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '2em',
      overflowWrap: 'break-word'
    },
    diff: {
      color: colors[diffMap[problem.difficulty]]
    },
    beef: {
      color: colors.black
    },
    lineBreak: {
      height: '0.3em',
      width: '100%',
      backgroundColor: colors[diffMap[problem.difficulty]]
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
      <h2>{problem.title}</h2>
      <h5 style={styles.diff}>Time Limit: {problem.time} sec - Memory Limit: {problem.memory} MB&nbsp;<span style={styles.beef}>| {problem.beef} 🥩</span></h5>
      <Text key={"Description"} text={problem.description} />
      <div style={styles.mathContainer}>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Input: </span><Text id={1} text={problem.input} /></div>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Output: </span><Text id={1} text={problem.output} /></div>
      </div>
      <div style={styles.lineBreak} />
      <div style={styles.individualExample}>
        <h5>Example 1</h5>
        <p><span style={styles.smallTitle}>Inputs(s): </span>{problem.e1input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{problem.e1output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{problem.e1explanation}</p>
      </div>
      <div style={styles.individualExample}>
        <h5>Example 2</h5>
        <p><span style={styles.smallTitle}>Inputs(s): </span>{problem.e2input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{problem.e2output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{problem.e2explanation}</p>
      </div>
      <div style={styles.individualExample}>
        <h5>Example 3</h5>
        <p><span style={styles.smallTitle}>Input(s): </span>{problem.e3input}</p>
        <p><span style={styles.smallTitle}>Output(s): </span>{problem.e3output}</p>
        <p><span style={styles.smallTitle}>Explanation: </span>{problem.e3explanation}</p>
      </div>
    </div>
  )
}

export default View