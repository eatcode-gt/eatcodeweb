import React from 'react'
import { colors } from '../global/vars'
import { Link } from 'react-router-dom'

const Error = () => {
  const styles = {
    content: {
      display: 'flex',
      width: '100vw',
      height: '60vh',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '3em',
      backgroundColor: colors.grey
    },
    link: {
      color: colors.accent1,
      fontSize: '3em'
    }
  }

  return (
    <div style={styles.content}>
      <h2>page not found</h2>
      <Link style={styles.link} to="/">return to landing page</Link>
    </div>
  )
}

export default Error