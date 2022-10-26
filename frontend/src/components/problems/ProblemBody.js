import React from 'react'
import Problem from './Problem'
import Peppers from './Peppers'
import { colors, diffMap } from '../../global/vars'
import diffData from './diffData.json'
import CompanyButton from './CompanyButton'

const ProblemBody = ({ props }) => {
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
      justifyContent: 'space-between',
      padding: '0em 1em',
      flexDirection: 'column',
    },
    scroll: {
      width: '100vw',
      minHeight: '100vh',
      height: 'auto'
    },
    diffTitle: {
      color: colors[props.diff],
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
    <div style={styles.container}>
      <div style={styles.left}>
        <div>
          <h2 style={styles.diffTitle}>{props.diff}</h2>
          <p>{diffData[props.diff].desc}</p>
          <h3>Total {props.diff} problems solved: {userDiffObject[diffMap.indexOf(props.diff)]}</h3>
          <div style={styles.companyCont}>
            {diffData[props.diff].companies.map((problem) => {
              return (
                <CompanyButton key={problem} company={problem} color={colors[props.diff]} />
              );
            })}
          </div>
        </div>
        <div style={styles.pepperCont}>
          <Peppers diff={props.diff} />
        </div>
      </div>
      <div style={styles.grid}>
        {props.problems.map((problem) => {
          return (
            <Problem key={problem.id} problem={problem} />
          );
        })}
      </div>
    </div>
  )
}

export default ProblemBody