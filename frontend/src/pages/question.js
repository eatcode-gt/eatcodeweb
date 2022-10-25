import React from 'react'
import { colors } from '../global/colors'
import { useLocation } from 'react-router-dom'
import { createContext  } from 'react'
import View from '../components/create/View'

const Question = () => {
  const styles = {
    content: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      justifyContent: 'space-between',
      backgroundColor: colors.grey
    },
    left: {
      backgroundColor: colors.accent2,
      width: '50%',
      height: '100%',
    },
    right: {
      backgroundColor: colors.accent1,
      maxWidth: '50%',
      width: '50%',
      height: '100%'
    },

  }

  const UserContext = createContext()
  const problem = useLocation().state.problem

  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <UserContext.Provider value={problem}>
          <View context={UserContext} preview={false} ></View>
        </UserContext.Provider>
      </div>
      <div style={styles.right}></div>
    </div>
  )
}

export default Question