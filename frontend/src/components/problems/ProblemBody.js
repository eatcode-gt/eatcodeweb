import React from 'react'
import Problem from './Problem'
import { colors, diffMap } from '../../global/vars'
import diffData from './diffData.json'
const ProblemBody = ({ i, diff, problems }) => {
  const userDiffObject = [3, 1, 0, 5]

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
    scroll: {
      minHeight: '100vh',
      height: 'auto'
    },
    diffTitle: {
      color: colors[diff],
    },
    pepperCont: {
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center'
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
          <h3>{diff}s eaten: {userDiffObject[diffMap.indexOf(diff)]}</h3>
        </div>
      </div>
      <div style={styles.grid}>
        {problems.map((problem, j) => {
          return (
            <Problem key={1000 * i * j} problem={problem} />
          );
        })}
      </div>
    </div>
  )
}

export default ProblemBody