import React, { useState } from 'react'
import { colors } from '../../global/colors'

const Problem = ({ problem }) => {
  const diffMap = ['mild', 'med', 'hot']
  const statusMap = ['new', 'opened', 'solved']

  const [barHover, setBarHover] = useState(false);
  const handleMouseEnter = () => {
    setBarHover(true);
  }
  const handleMouseLeave = () => {
    setBarHover(false);
  }

  const styles = {
    bar: {
      position: 'relative',
      display: 'flex',
      height: '4em',
      padding: '0em 1em',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: '400',
      backgroundColor: barHover ? colors.hover : problem.id % 2 === 0 ? colors.accent1: colors.accent2,
      cursor: 'pointer',
      transition: 'all 0.27s ease',
    },
    id: {
      color: colors.white
    },
    name: {
      position: 'absolute',
      width: '100%',
      textAlign: 'center',
      color: colors.white
    },
    info: {
      display: 'flex',
      alignItems: 'center',
      gap: '3.5em',
      marginRight: '2em',
      height: '4em',
      color: colors.white,
    },
    diff: {
      width: '4.5em',
      height: '100%',
      lineHeight: '1.7em',
      textAlign: 'center',
      backgroundColor: colors[diffMap[problem.diff]],
      color: colors.white,
    },
    status: {
      width: '6em',
      height: '100%',
      lineHeight: '1.7em',
      textAlign: 'center',
      backgroundColor: colors[statusMap[problem.status]],
      color: colors.white
    }
  }
  return (
    <div style={styles.bar} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h4 style={styles.id}>{problem.id}.&#41;</h4>
        <h4 style={styles.name}>{problem.name}</h4>
        <div style={styles.info}>
          <h4 style={styles.diff}>{diffMap[problem.diff]}</h4>
          <h4 style={styles.status}>{statusMap[problem.status]}</h4>
        </div>
    </div>
  )
}

export default Problem