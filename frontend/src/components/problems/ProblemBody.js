import React from 'react'
import Problem from './Problem'
import Peppers from './Peppers'
import { colors, diffMap } from '../../global/vars'
import diffData from './diffData.json'
import Button from '../common/Button'

const ProblemBody = ({ i, diff, problems, eaten }) => {
  const userDiffObject = [3, 1, 0, 5]

  const styles = {
    container: {
      display: 'flex'
    },
    left: {
      width: 'calc(50vw - 6em)',
      height: '100%',
      padding: '3em',
      display: 'flex'
    },
    grid: {
      width: '50vw',
      display: 'flex',
      gap: '2em',
      padding: '0em 1em',
      flexDirection: 'column',
      maxHeight: '58em',
      overflowX: 'scroll'
    },
    scroll: {
      width: '100vw',
      minHeight: '100vh',
      height: 'auto'
    },
    diffTitle: {
      color: colors[diff],
    },
    companyCont: {
      display: 'flex',
      marginTop: '1em',
      gap: '1em'
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
          <h2 style={styles.diffTitle}>{diff}</h2>
          <p>{diffData[diff].desc}</p>
          <h3>{diff}s eaten: {eaten}</h3>
          <div style={styles.companyCont}>
            {diffData[diff].companies.map((problem) => {
              return (
                <Button key={problem} text={problem} color={colors[diff]} />
              );
            })}
          </div>
        </div>
        <div style={styles.pepperCont}>
          <Peppers diff={diff} />
        </div>
      </div>
      <div style={styles.grid}>
        {problems.map((problem) => {
          return (
            <Problem key={problem.id} problem={problem} />
          );
        })}
      </div>
    </div>
  )
}

export default ProblemBody