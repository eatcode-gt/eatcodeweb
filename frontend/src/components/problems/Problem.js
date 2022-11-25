import React, { useState } from 'react'
import { colors } from '../../global/vars'
import { Link } from 'react-router-dom'
import { diffMap, statusMap } from '../../global/vars'

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
      backgroundColor: barHover ? colors.black : colors[diffMap[problem.diff]],
      cursor: 'pointer',
      transition: 'all 0.27s ease',
    },
    name: {
      color: colors.white
    }
  }
  return (
    <Link to={`/problems/${problem.name}}`} state={ {problem} }>
      <div style={styles.bar} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <h5 style={styles.name}>{problem.name}</h5>
      </div>
    </Link>
  )
}

export default Problem