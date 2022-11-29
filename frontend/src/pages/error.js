import React from 'react'
import { colors } from '../global/vars'
import { Link } from 'react-router-dom'
import PageContainer from '../components/common/PageContainer'

const Error = () => {
  const styles = {
    content: {
      display: 'flex',
      width: '100%',
      height: '60%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '3em',
    },
    link: {
      color: colors.accent1,
      fontSize: '3em'
    }
  }

  return (
    <PageContainer children={
    <div style={styles.content}>
      <h2>page not found</h2>
      <Link style={styles.link} to="/">return to landing page</Link>
    </div>
    } />
  )
}

export default Error