import React, { useState } from 'react'
import { colors } from '../../global/colors'
import { Link } from 'react-router-dom'

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
    <Link to={`/question/${problem.name}`} state={ {problem} }>
      <div style={styles.bar} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <h5 style={styles.id}>{problem.id}.&#41;</h5>
          <h5 style={styles.name}>{problem.name}</h5>
          <div style={styles.info}>
            <h5 style={styles.diff}>{diffMap[problem.diff]}</h5>
            <h5 style={styles.status}>{statusMap[problem.status]}</h5>
          </div>
      </div>
    </Link>
  )
}

export default Problem