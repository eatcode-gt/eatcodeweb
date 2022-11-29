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
            display: "inline-box",
            color: "white",
            position: 'absolute',
            marginTop: "310px",
            marginLeft: "20px",
            width: "300px",
            height: "420px",
            backgroundColor: colors.accent1,
            borderRadius: "10px",
            boxShadow: "0px 1px 10px 1px black"
        },
        upperContainer: {
            height: "75px",
            backgroundColor: colors.accent2,
            textAlign: "center",
        },
        lowerContainer: {
            height: "270px",
            background: colors.accent1,
            textAlign: "center",
            marginTop: "10px"
        },
    }

    return (
        <div style={styles.card}>
            <div style={styles.upperContainer}>
                <br />
                <br /> 
                <h5 styles ={styles.title}>Beef Stats</h5>
            </div>
            <div style={styles.lowerContainer}>
                <DifficultyBar diff={"Bell"} completed={completed[0]} maxCompleted={maxCompleted[0]} bgColor={colors.Bell}/>
                <DifficultyBar diff={"Jalepeño"} completed={completed[1]} maxCompleted={maxCompleted[1]} bgColor={colors.Jalepeño}/>
                <DifficultyBar diff={"Habenero"} completed={completed[2]} maxCompleted={maxCompleted[2]} bgColor={colors.Habenero}/>
                <DifficultyBar diff={"Ghost"} completed={completed[3]} maxCompleted={maxCompleted[3]} bgColor={colors.Ghost}/>
            </div>
        </div>
    )
}