import React, { useState } from 'react'
import { colors, statusMap } from '../../global/vars'
import { Link } from 'react-router-dom'
import { diffMap } from '../../global/vars'

const Problem = ({ problem }) => {
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
      alignItems: 'center',
      justifyContent: 'center',

    },
    default: {
      color: colors.white,
      fontWeight: '400',
      backgroundColor: colors[diffMap[problem.difficulty]],
      opacity: barHover ? 0 : 1,
      padding: '0em 1em 0em 1.3em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.27s ease',
      width: '100%',
      height: '100%',
      zIndex: 2
    },
    hovered: {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      height: '4em',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '400',
    },
    status: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[statusMap[problem.status]],
      height: '100%',
      color: colors.white
    },
    scoville: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[diffMap[problem.difficulty]],
      color: 'white',
      height: '100%'
    }
  }
  return (
    <Link to={`/problems/${problem.title}}`} state={ {problem} }>
      <div style={styles.bar} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div style={styles.default}>
            <h5 style={styles.name}>{problem.title}</h5>
          </div>
          <div style={styles.hovered}>
            <h5 style={styles.status}>{statusMap[problem.status]}</h5>
            <h5 style={styles.scoville}>3742 🔥</h5>
          </div>
      </div>
    </Link>
  )
}

export default Problem