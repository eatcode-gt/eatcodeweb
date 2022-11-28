import React from 'react'
import { colors } from '../../global/vars';

const Title = () => {
  const styles = {
    title: {
      cursor: 'default',
      color: colors.accent1,
      transition: 'all 0.27s ease',
      lineHeight: '1.1em'
    },
    span: {
      color: colors.accent2,
      transition: 'all 0.27s ease'
    }
  }

  return (
    <h1 style={styles.title}><span style={styles.span}>eat</span>code</h1>
  )
}

export default Title