import React from 'react'
import Problem from './Problem'
import { colors } from '../../global/vars'
import diffData from './diffData.json'
const ProblemBody = ({ i, diff, problems, eaten }) => {
  const styles = {
    container: {
      display: 'flex',
      width: '100%',
      flexDirection: "column"
    },
    left: {
      display: 'flex'
    },
    topTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2em',
      marginTop: '2em'
    },
    diffTitle: {
      color: colors[diff],
      textAlign: 'center'
    },
    break: {
      height: '0.2em',
      width: '100%',
      backgroundColor: colors.black,
      marginTop: '1.5em'
    },
    noProblems: {
      color:  colors[diff],
      textAlign: 'center'
    }
  }

  return (
    <div key={i} style={styles.container}>
      <div style={styles.left}>
        <div>
          <div style={styles.topTitle}>
            <h2 style={styles.diffTitle}>{diff}</h2>
          </div>
          <p>{diffData[diff].desc}</p>
          <h3>{diff}s eaten: {eaten}</h3>
          <div style={styles.break} />
        </div>
      </div>
      <div style={styles.grid}>
        {
          problems.length == 0
          ? <h4 style={styles.noProblems}>no problems found</h4>
          : problems.map((problem, j) => {
              return (
                <Problem key={1000 * i * j} problem={problem}/>
              );
            })
        }
      </div>
    </div>
  )
}

export default ProblemBody