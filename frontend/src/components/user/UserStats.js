import React, { useState, useEffect } from 'react';
import { colors } from '../../global/vars';
import Axios from "axios";
import { diffMap } from '../../global/vars';
import DifficultyBar from './DifficultyBar';

export default function ProblemSolvedCard({user}) {
  const userDiffObject = [1, 1, 1, 0]
  const [listOfProblems, setListOfProblems] = useState([]);
  const [maxCompleted, setMaxCompleted] = useState([1,1,1,1])
  const [completed, setCompleted] = useState([0,0,0,0])

  useEffect(() => {
    Axios.post("http://localhost:3002/getProblems", {filter:{}}).then((response) => {
      setListOfProblems(response.data.result);
      // console.log("list:", response.data.result)
      // console.log("number:", getProblemsByDiff(response.data.result, 0))
      // console.log("Attempt:", user.attemptedProblems)
      const [newMaxCompleted, newCompleted] = getProblemsByDiff(response.data.result, user.attemptedProblems)
      // console.log(newMaxCompleted, newCompleted)
      setMaxCompleted(newMaxCompleted)
      setCompleted(newCompleted)
    });
  }, []);
  // THIS WHOLE THING IS CRAP, WILL FIX IF I HAVE TIME
  function getProblemsByDiff(allProblems, attemptedProblems) {
    const difficulties = [0,1,2,3]
    // var allProblems = listOfProblems
    var maxCompleted = [0,0,0,0]
    var completed = [0,0,0,0]
    // console.log("attt:", attemptedProblems)
    difficulties.forEach( difficulty => {
      allProblems.forEach( problem => {
        if (problem.difficulty === difficulty) {
          maxCompleted[difficulty]++;
          if (attemptedProblems[problem.questionID] && attemptedProblems[problem.questionID].solved) {
            completed[difficulty]++;
          }
        }
      })
    })
    // console.log(maxCompleted, completed)
    return [maxCompleted, completed]
    // console.log(maxCompleted, completed)
    // for (const property in attemptedProblems) {
    //   if (attemptedProblems[property].solved)
    //   console.log(property)
    //   console.log(attemptedProblems[property].solved)
    // }
    // return requestedProblems
  }

    const styles = {
      card: {
        flex: 1,
      },
      title: {
          color: colors.accent1,
          marginBottom: '0.25em',
          textAlign: 'center'
      },
      flex: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1em'
      }
    }

    return (
      <div style={styles.card}>
        <h3 style={styles.title}>difficulty completion</h3>            
          <div style={styles.flex}>
            <DifficultyBar diff={"Jalapeño"} completed={completed[0]} maxCompleted={maxCompleted[0]} bgColor={colors.Jalapeño}/>
            <DifficultyBar diff={"Hungarian"} completed={completed[1]} maxCompleted={maxCompleted[1]} bgColor={colors.Hungarian}/>
            <DifficultyBar diff={"Habenero"} completed={completed[2]} maxCompleted={maxCompleted[2]} bgColor={colors.Habenero}/>
            <DifficultyBar diff={"Ghost"} completed={completed[3]} maxCompleted={maxCompleted[3]} bgColor={colors.Ghost}/>
          </div>
      </div>
    )
}