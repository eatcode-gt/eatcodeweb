import React from 'react'
import { useState, useEffect } from 'react'
import Axios from "axios";
import Problem from './Problem'

const ProblemBody = () => {
  const [listOfProblems, setListOfProblems]  = useState([
    // {problemID: 1, problemName: "McProblem", problemDifficulty: "mild", problemStatus: "solved"},
    // {problemID: 2, problemName: "McProblem", problemDifficulty: "med", problemStatus: "opened"},
    // {problemID: 3, problemName: "McProblem", problemDifficulty: "hot", problemStatus: "new"},
    // {problemID: 4, problemName: "McProblem", problemDifficulty: "mild", problemStatus: "solved"},
    // {problemID: 5, problemName: "McProblem", problemDifficulty: "med", problemStatus: "opened"},
    // {problemID: 6, problemName: "McProblem", problemDifficulty: "hot", problemStatus: "new"},
    // {problemID: 7, problemName: "McProblem", problemDifficulty: "mild", problemStatus: "solved"},
    // {problemID: 8, problemName: "McProblem", problemDifficulty: "med", problemStatus: "opened"},
    // {problemID: 9, problemName: "McProblem", problemDifficulty: "hot", problemStatus: "new"},
    // {problemID: 10, problemName: "McProblem", problemDifficulty: "mild", problemStatus: "solved"},
    // {problemID: 11, problemName: "McProblem", problemDifficulty: "med", problemStatus: "opened"},
    //mainly used for testing
  ]);

  useEffect(() => {
    Axios.get("http://localhost:3002/problems").then((response) => {
      setListOfProblems(response.data.result);
    });
  }, []);

  return (
    <div className='problem-display'>
      {listOfProblems.map((problem) => {
        return (
          <Problem key={problem.problemID} problemData={problem} />
        );
      })}
    </div>
  )
}

export default ProblemBody