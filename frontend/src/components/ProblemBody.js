import React from 'react'
import { useState, useEffect } from 'react'
import Axios from "axios";
import Problem from './Problem'

const ProblemBody = () => {
  const [listOfProblems, setListOfProblems]  = useState([
    {id: 1, name: "McProblem", difficulty: "mild", problemStatus: "solved"},
    {id: 2, name: "McProblem", difficulty: "med", problemStatus: "opened"},
    {id: 3, name: "McProblem", difficulty: "hot", problemStatus: "new"},
    {id: 4, name: "McProblem", difficulty: "mild", problemStatus: "solved"},
    {id: 5, name: "McProblem", difficulty: "med", problemStatus: "opened"},
    {id: 6, name: "McProblem", difficulty: "hot", problemStatus: "new"},
    {id: 7, name: "McProblem", difficulty: "mild", problemStatus: "solved"},
    {id: 8, name: "McProblem", difficulty: "med", problemStatus: "opened"},
    {id: 9, name: "McProblem", difficulty: "hot", problemStatus: "new"},
    {id: 10, name: "McProblem", difficulty: "mild", problemStatus: "solved"},
    {id: 11, name: "McProblem", difficulty: "med", problemStatus: "opened"},
    
  ]);



  // useEffect(() => {
  //   Axios.get("http://localhost:3002/problems").then((response) => {
  //     setListOfProblems(response.data)
  //   })
  // }, [])

  return (
    <div className='problem-display'>
      {listOfProblems.map((problem) => {
        return (
          <Problem key={problem.id} problemData={problem} />
        );
      })}
    </div>
  )
}

export default ProblemBody