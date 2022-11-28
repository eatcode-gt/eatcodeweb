import { useContext, useEffect, useState } from 'react'
import { colors, diffMap } from '../global/vars'
import { useLocation } from 'react-router-dom'
import CodeArea from '../components/create/CodeArea'
import View from '../components/create/View'
import { userContext } from '../userContext'

const Question = () => {
  const user = useContext(userContext).user
  const problem = useLocation().state.problem

  let userSolvedThis = user.attemptedProblems.hasOwnProperty(problem.questionID) && user.attemptedProblems[problem.questionID].solved

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


  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <View problem={problem}></View>
      </div>
      <div style={styles.right}>
        <CodeArea
          style={styles.textarea}
          color={colors[diffMap[problem.difficulty]]}
          questionID={problem.questionID}
          userSolvedThis={userSolvedThis}
          beef={problem.beef}
        />
      </div>
    </div>
  )
}

export default Question