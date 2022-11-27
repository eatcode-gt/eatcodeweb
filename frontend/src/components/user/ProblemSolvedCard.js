import React from 'react';
import { colors } from '../../global/vars';
import { useState, useEffect } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import Peppers from '../problems/Peppers';import Axios from "axios";
import { diffMap } from '../../global/vars';

export default function ProblemSolvedCard() {
  const userDiffObject = [3, 1, 0, 5]
  const [listOfProblems, setListOfProblems] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/problems").then((response) => {
      setListOfProblems(response.data.result);
    });
  }, []);

  function getProblemsByDiff(diff) {
    var allProblems = listOfProblems
    var requestedProblems = []
    for (var i = 0; i < allProblems.length; i++) {
      if (allProblems[i].diff === diffMap.indexOf(diff))
      requestedProblems.push(allProblems[i])
    }
    return requestedProblems
  }

    const styles = {
        card: {
            display: "inline-box",
            color: "white",
            position: 'absolute',
            marginTop: "310px",
            marginLeft: "20px",
            width: "300px",
            height: "400px",
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
            marginTop: "30px",
        }
    }

    return (
        <div style={styles.card}>
            <div style={styles.upperContainer}>
                <br/>
                <br/>
                <h5>Your Beef Stats</h5>
            </div>
            <div style={styles.lowerContainer}>
                <ProgressBar 
                    completed={userDiffObject[diffMap.indexOf("Bell")]} 
                    maxCompleted={getProblemsByDiff("Bell").length}
                    bgColor={colors.Bell}
                    baseBgColor={colors.white}
                    width="75%"
                    isLabelVisible={false}
                />
                <Peppers diff={'Bell'} size={"2rem"}/>
                <ProgressBar 
                    completed={userDiffObject[diffMap.indexOf("Jalepeño")]} 
                    maxCompleted={getProblemsByDiff("Jalepeño").length}
                    bgColor={colors.Jalepeño}
                    baseBgColor={colors.white}
                    width="75%"
                    isLabelVisible={false}
                />
                <Peppers diff={'Jalepeño'} size={"2rem"}/>
                <ProgressBar 
                    completed={userDiffObject[diffMap.indexOf("Habenero")]} 
                    maxCompleted={getProblemsByDiff("Habenero").length}
                    bgColor={colors.Habenero}
                    baseBgColor={colors.white}
                    width="75%"
                    isLabelVisible={false}
                />
                <Peppers diff={'Habenero'} size={"2rem"}/>
                <ProgressBar 
                    completed={userDiffObject[diffMap.indexOf("Ghost")]} 
                    maxCompleted={getProblemsByDiff("Ghost").length}
                    bgColor={colors.Ghost}
                    baseBgColor={colors.white}
                    width="75%"
                    isLabelVisible={false}
                />
                <Peppers diff={'Ghost'} size={"2rem"}/>
            </div>
        </div>
    )
}