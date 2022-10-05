import React from 'react'
import { useState, useEffect } from 'react'
import Axios from "axios";
import Problem from './Problem'

const ProblemBody = () => {
  const [listOfProblems, setListOfProblems] = useState([
    {id: 1, name: "McProblem", diff: 0, status: 2},
    {id: 2, name: "Reverse Order List", diff: 1, status: 1},
    {id: 3, name: "Reverse Burger", diff: 2, status: 0},
    {id: 4, name: "Taste(x, n)", diff: 0, status: 0},
    {id: 5, name: "Roman Cafe", diff: 1, status: 2},
    {id: 6, name: "Longest Common Topping", diff: 2, status: 0},
    {id: 7, name: "Cup With Most Smoothie", diff: 2, status: 1},
    {id: 8, name: "Valid Sandwich", diff: 1, status: 2},
    {id: 9, name: "Remove Topping", diff: 2, status: 0},
    {id: 10, name: "Longest Valid Sandwich", diff: 0, status: 2},
    {id: 11, name: "Delete Topping in Linked Burger", diff: 1, status: 0},
  ]);

  useEffect(() => {
    Axios.get("http://localhost:3002/problems").then((response) => {
      setListOfProblems(response.data.result);
    });
  }, []);

  const styles = {
    grid: {
      display: 'flex',
      gap: '1em',
      padding: '0em 1em',
      flexDirection: 'column'
    }
  }

  return (
    <div style={styles.grid}>
      {listOfProblems.map((problem) => {
        return (
          <Problem key={problem.id} problem={problem} />
        );
      })}
    </div>
  )
}

export default ProblemBody