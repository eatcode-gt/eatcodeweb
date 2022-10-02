import React from 'react'

const Problem = ({ problemData }) => {
  return (
    <div className={`problem-container ${problemData.id % 2 == 0 ? 'problem-even' : 'problem-odd'}`} >
      <div className='problem-id'>{problemData.id}.)</div>
      <div className='problem-name'>{problemData.name}</div>
      <div className='problem-info'>
        <div className={`problem-difficulty ${problemData.difficulty}`}>
          {problemData.difficulty}
        </div>
        <div className={`problem-status ${problemData.problemStatus}`}>
          {problemData.problemStatus}{problemData.problemStatus === "solved" ? "!" : ""}
        </div>
      </div>
    </div>
  )
}

export default Problem