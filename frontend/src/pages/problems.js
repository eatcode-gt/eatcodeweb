import React from 'react';
import { useState, useEffect } from 'react'
import Axios from "axios";
import { diffMap } from '../global/vars'
import ProblemBody from '../components/problems/ProblemBody'

const Problems = () => {
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
      if (allProblems[i].diff == diffMap.indexOf(diff))
      requestedProblems.push(allProblems[i])
    }
    return requestedProblems
  }

  const styles = {
    container: {
      display: 'flex',
      gap: '6em',
      maxHeight: 'calc(100vh - 8em)',
      flexDirection: 'column'
    },
    pad: {
      minHeight: '1em',
      marginTop: '-3em',
      width: '100%'
    }
  }

  return (
    <div style={styles.container}>
      <ProblemBody i={0} props={{diff: "Bell", problems: getProblemsByDiff("Bell")}}/>
      <ProblemBody i={1} props={{diff: "Jalepeño", problems: getProblemsByDiff("Jalepeño")}}/>
      <ProblemBody i={2} props={{diff: "Habenero", problems: getProblemsByDiff("Habenero")}}/>
      <ProblemBody i={3} props={{diff: "Ghost", problems: getProblemsByDiff("Ghost")}}/>
      <div style={styles.pad}/>
    </div>
  );
};
  
export default Problems;