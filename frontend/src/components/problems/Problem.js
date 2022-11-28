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
      padding: '0em 1em',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '400',
      backgroundColor: barHover ? colors.black : colors[diffMap[problem.difficulty]],
      cursor: 'pointer',
      transition: 'all 0.27s ease',
    },
    name: {
      color: colors.white
    }
  }
  return (
    <Link to={`/problems/${problem.title}}`} state={ {problem} }>
      <div style={styles.bar} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <h5 style={styles.name}>{problem.title}</h5>
      </div>
      <h5 style={styles.status}>{statusMap[problem.status]}</h5>
    </Link>
  )
}

export default Problem