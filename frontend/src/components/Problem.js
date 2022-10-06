import React from 'react'

const Problem = ({ problemData }) => {
  return (
    <div className={`problem-container ${problemData.problemID % 2 == 0 ? 'problem-even' : 'problem-odd'}`} >
      <div className='problem-id'>{`${problemData.problemID}.)`}</div>
      <div className='problem-name'>{problemData.problemName}</div>
      <div className='problem-info'>
        <div className={`problem-difficulty ${problemData.problemDifficulty}`}>
          {problemData.problemDifficulty}
        </div>
        <div className={`problem-status ${problemData.problemStatus}`}>
          {problemData.problemStatus}{problemData.problemStatus === "solved" ? "!" : ""}
        </div>
      </div>
    </div>
  )
}

export default Problem