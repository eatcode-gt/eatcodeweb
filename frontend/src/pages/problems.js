import React from 'react';
import { useState, useEffect } from 'react'
import Axios from "axios";
import { diffMap } from '../global/vars'
import ProblemBody from '../components/problems/ProblemBody'

const Problems = () => {
  const [listOfProblems, setListOfProblems] = useState([
    {id: 1, name: "McProblem", diff: 0, status: 2},
    {id: 2, name: "Reverse Order List", diff: 3, status: 1},
    {id: 3, name: "Reverse Burger", diff: 2, status: 0},
    {id: 4, name: "Taste(x, n)", diff: 0, status: 0},
    {id: 5, name: "Roman Cafe", diff: 1, status: 2},
    {id: 6, name: "Longest Common Topping", diff: 2, status: 0},
    {id: 7, name: "Cup With Most Smoothie", diff: 2, status: 1},
    {id: 8, name: "Valid Sandwich", diff: 1, status: 2},
    {id: 9, name: "Remove Topping", diff: 0, status: 0},
    {id: 10, name: "Longest Valid Sandwich", diff: 2, status: 2},
    {id: 11, name: "Delete Topping in Linked Burger", diff: 0, status: 1},
    {id: 12, name: "Trapping Maple Syrup", diff: 3, status: 2},
    {id: 13, name: "Gray Apple", diff: 1, status: 2},
    {id: 14, name: "X Salad Intervals", diff: 1, status: 0},
    {id: 15, name: "Merge Favorite Foods", diff: 1, status: 1},
    {id: 16, name: "Linked Pizzа", diff: 0, status: 0},
    {id: 17, name: "Reverse Binary Burger", diff: 0, status: 1},
    {id: 18, name: "Sus", diff: 3, status: 2},
    {id: 19, name: "Burger", diff: 2, status: 2},
    {id: 20, name: "Two Burger", diff: 1, status: 2},
    {id: 21, name: "Mongo Burger", diff: 2, status: 0},
    {id: 22, name: "Burger", diff: 3, status: 2},
    {id: 23, name: "Two Burger", diff: 3, status: 2},
    {id: 24, name: "Mongo Burger", diff: 3, status: 0},
  ]);

  // useEffect(() => {
  //   Axios.get("http://localhost:3002/problems").then((response) => {
  //     setListOfProblems(response.data.result);
  //   });
  // }, []);

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
      <ProblemBody props={{diff: "Bell", problems: getProblemsByDiff("Bell")}}/>
      <ProblemBody props={{diff: "Jalepeño", problems: getProblemsByDiff("Jalepeño")}}/>
      <ProblemBody props={{diff: "Habenero", problems: getProblemsByDiff("Habenero")}}/>
      <ProblemBody props={{diff: "Ghost", problems: getProblemsByDiff("Ghost")}}/>
      <div style={styles.pad}/>
    </div>
  );
};
  
export default Problems;