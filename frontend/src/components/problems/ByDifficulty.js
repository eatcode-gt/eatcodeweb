import React from 'react';
import ProblemBody from './ProblemBody';

const ByDifficulty = (props) => {
  
  return (
    <>
      <ProblemBody i={0} props={{diff: "Bell", problems: props.bell}}/>
      <ProblemBody i={1} props={{diff: "Jalepeño", problems: props.jalepeno}}/>
      <ProblemBody i={2} props={{diff: "Habenero", problems: props.habenero}}/>
      <ProblemBody i={3} props={{diff: "Ghost", problems: props.ghost}}/>
    </>
  )
}

export default ByDifficulty