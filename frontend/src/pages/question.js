import React from 'react'
import { colors, diffMap } from '../global/vars'
import { useLocation } from 'react-router-dom'
import { useState, createContext  } from 'react'
import CodeArea from '../components/create/CodeArea'
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
      padding: '0em 2em',
      width: 'calc(50% - 4em)',
      height: '100%',
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2em',
      padding: '0em 2em',
      maxWidth: 'calc(50% - 4em)',
      width: '50%',
      height: '100%'
    }
  }

  const UserContext = createContext()
  const problem = useLocation().state.problem

  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <UserContext.Provider value={problem}>
          <View context={UserContext} preview={false} diff={problem.diff}></View>
        </UserContext.Provider>
      </div>
      <div style={styles.right}>
        <CodeArea 
          color={colors[diffMap[problem.diff]]}
          style={styles.textarea}
          //moved code={code} setCode={setCode} to CodeArea.js
        />
      </div>
    </div>
  )
}

export default Question