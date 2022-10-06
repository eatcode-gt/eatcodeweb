import React, { useState } from 'react'
import { colors } from '../../global/colors';

const Title = () => {
  const [titleHover, setTitleHover] = useState(false);
  const handleMouseEnter = () => {
    setTitleHover(true);
  }
  const handleMouseLeave = () => {
    setTitleHover(false);
  }

  const styles = {
    title: {
      cursor: 'default',
      color: titleHover ? colors.accent1 : colors.accent2,
      transition: 'all 0.27s ease',
      lineHeight: '1.1em'
    },
    span: {
      color: titleHover ? colors.accent2 : colors.accent1,
      transition: 'all 0.27s ease'
    }
  }

  return (
    <h1 style={styles.title} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><span style={styles.span}>eat</span>code</h1>
  )
}

export default Title