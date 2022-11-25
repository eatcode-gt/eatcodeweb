import React from 'react'
import Problem from './Problem'
import { colors, diffMap } from '../../global/vars'
import diffData from './diffData.json'
const ProblemBody = ({ i, props }) => {
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
      color: colors[props.diff],
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
            <h2 style={styles.diffTitle}>{props.diff}</h2>
          </div>
          <p>{diffData[props.diff].desc}</p>
          <h3>{props.diff}s eaten: {userDiffObject[diffMap.indexOf(props.diff)]}</h3>
        </div>
      </div>
      <div style={styles.grid}>
        {props.problems.map((problem, j) => {
          return (
            <Problem key={1000 * i * j} problem={problem} />
          );
        })}
      </div>
    </div>
  )
}

export default ProblemBody