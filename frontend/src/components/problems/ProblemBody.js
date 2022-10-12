import React from 'react'
import { useState, useEffect } from 'react'
import Axios from "axios";
import Problem from './Problem'
import { Scrollbars } from 'react-custom-scrollbars';


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
    {id: 10, name: "Longest Valid Sandwich", diff: 2, status: 2},
    {id: 11, name: "Delete Topping in Linked Burger", diff: 0, status: 1},
    {id: 12, name: "Trapping Maple Syrup", diff: 0, status: 2},
    {id: 13, name: "Gray Apple", diff: 1, status: 2},
    {id: 14, name: "X Salad Intervals", diff: 1, status: 0},
    {id: 15, name: "Merge Favorite Foods", diff: 1, status: 1},
    {id: 16, name: "Linked Pizzа", diff: 2, status: 0},
    {id: 17, name: "Reverse Binary Burger", diff: 0, status: 1},
    {id: 18, name: "Sus", diff: 1, status: 2},
    {id: 19, name: "Burger", diff: 2, status: 2},
    {id: 20, name: "Two Burger", diff: 1, status: 2},
    {id: 21, name: "Mongo Burger", diff: 2, status: 0},
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
      flexDirection: 'column',
    },
    scroll: {
      width: 1700,
      height: 700,
      color: "red",
    }
  }

  return (
    <Scrollbars style={styles.scroll}>
      <div style={styles.grid}>
        {listOfProblems.map((problem) => {
          return (
            <Problem key={problem.id} problem={problem} />
          );
        })}
      </div>
    </Scrollbars>
  )
}

export default ProblemBody