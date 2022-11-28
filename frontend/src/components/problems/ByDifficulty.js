import React from 'react';
import ProblemBody from './ProblemBody';

const ByDifficulty = ({bell, jalepeno, habenero, ghost, solvedCountByDiff}) => {
  
  return (
    <>
      <ProblemBody i={0} diff={"Bell"} problems={bell} eaten={solvedCountByDiff[0]}/>
      <ProblemBody i={1} diff={"Jalepeño"} problems={jalepeno} eaten={solvedCountByDiff[1]}/>
      <ProblemBody i={2} diff={"Habenero"} problems={habenero} eaten={solvedCountByDiff[2]}/>
      <ProblemBody i={3} diff={"Ghost"} problems={ghost} eaten={solvedCountByDiff[3]}/>
    </>
  )
}

export default ByDifficulty