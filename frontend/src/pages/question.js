import { useContext, useEffect, useState } from 'react'
import { colors, diffMap } from '../global/vars'
import { useLocation } from 'react-router-dom'
import CodeArea from '../components/create/CodeArea'
import View from '../components/create/View'
import { userContext } from '../userContext'
import PageContainer from '../components/common/PageContainer'

const Question = () => {
  const user = useContext(userContext).user
  const problem = useLocation().state.problem

  let userSolvedThis = user.attemptedProblems.hasOwnProperty(problem.questionID) && user.attemptedProblems[problem.questionID].solved

  const styles = {
    content: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    left: {
      width: 'calc(50% - 2em)'
    },
    right: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2em',
      width: 'calc(50% - 2em)'
    }
  }


  return (
    <PageContainer children={
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
    }/>)
}

export default Question