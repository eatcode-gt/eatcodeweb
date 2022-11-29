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
      overflowWrap: 'break-word',
      overflowY: 'scroll'
    },
    title: {
      marginBottom: '-0.4em'
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
    },
    individualExample: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.7em',
    }
  }

  console.log(problem.e2input)

  return (
    <div style={styles.cont}>
      <h2 style={styles.title}>{problem.title}</h2>
      <h5 style={styles.diff}>Time Limit: {problem.time} sec - Memory Limit: {problem.memory} MB&nbsp;<span style={styles.beef}>| {problem.beef} 🥩</span></h5>
      <Text key={"Description"} text={problem.description} />
      <div style={styles.mathContainer}>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Input<br></br> </span><Text id={1} text={problem.input} /></div>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Output<br></br> </span><Text id={1} text={problem.output} /></div>
      </div>
      <div style={styles.lineBreak} />
      <div style={styles.individualExample}>
        <h5>Example 1</h5>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Input<br></br> </span><Text id={1} text={problem.e1input} /></div>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Output<br></br>  </span><Text id={1} text={problem.e1output} /></div>
        <div style={styles.mathJax}><span style={styles.mathTitle}>Explanation<br></br>  </span><Text id={1} text={problem.e1explanation} /></div>
      </div>
      {problem.e2input != "" && 
        <div style={styles.individualExample}>
          <h5>Example 2</h5>
          <div style={styles.mathJax}><span style={styles.mathTitle}>Input<br></br> </span><Text id={2} text={problem.e2input} /></div>
          <div style={styles.mathJax}><span style={styles.mathTitle}>Output<br></br>  </span><Text id={2} text={problem.e2output} /></div>
          <div style={styles.mathJax}><span style={styles.mathTitle}>Explanation<br></br>  </span><Text id={2} text={problem.e2explanation} /></div>
        </div>
      }
      {problem.e3input != "" && 
        <div style={styles.individualExample}>
          <h5>Example 3</h5>
          <div style={styles.mathJax}><span style={styles.mathTitle}>Input<br></br> </span><Text id={3} text={problem.e3input} /></div>
          <div style={styles.mathJax}><span style={styles.mathTitle}>Output<br></br>  </span><Text id={3} text={problem.e3output} /></div>
          <div style={styles.mathJax}><span style={styles.mathTitle}>Explanation<br></br>  </span><Text id={3} text={problem.e3explanation} /></div>
        </div>
      }
    </div>
  )
}

export default View