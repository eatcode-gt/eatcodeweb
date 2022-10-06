import React from 'react'

const FrontPage = () => {
  return (
    <div className='grid-container'>
      <div className='left-side'>
        <div className='front-title'>eat</div>
        <div className='signed-in-text'>signed in as</div>
        <div className='circle-container'>
          <div className='circle'></div>
        </div>
      </div>
      <div className='right-side'>
        <div className='front-title'>code</div>
        <div className='signed-in-text'>user_namedd</div>
        <div className='menu-container'>
          <div className='problem-option'>problems</div>
          <div className='signout-option'>sign out</div>
          <div className='leaderboard-option'>leaderboard</div>
        </div>
      </div>
    </div>
  )
}

export default FrontPage