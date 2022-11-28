import React from 'react';
import { useState, useEffect } from 'react'
import Axios from "axios";
import ByDifficulty from '../components/problems/ByDifficulty';
import BySearch from '../components/problems/BySearch';
import { colors } from '../global/vars';

const Problems = ({user}) => {
  const [listOfProblems, setListOfProblems] = useState([]);
  const [display, setDisplay] = useState(0);
  const [problemsByDiff, setProblemsByDiff] = useState([[], [], [], []]);

  const getUserProgress = (user) => {
    // console.log(user)
    const solved = new Map();
    const solvedCountByDiff = new Array(4).fill(0);;
    for (const property in user.attemptedProblems) {
      solved.set(parseInt(property), user.attemptedProblems[property].solved)
      if (user.attemptedProblems[property].solved) {
        solvedCountByDiff[user.attemptedProblems[property].diff] += 1;
      }
    }
    // console.log(solved, solvedCountByDiff)
    return {solved, solvedCountByDiff}
  }
  const {solved, solvedCountByDiff} = getUserProgress(user);

  useEffect(() => {
    Axios.get("http://localhost:3002/problems").then((response) => {
      const res = response.data.result;
      setListOfProblems(res);

      // console.log(res)
      const difficultyBuckets = [[], [], [], []];
      for (let i = 0; i < res.length; i++) {
        if (solved.has(res[i].questionID)) {
          if (solved.get(res[i].questionID) === true) {
            // solved (cooked)
            res[i].status = 2;
          } else {
            // attempted (cooking)
            res[i].status = 1;
          }
        } else {
          // not attempted (raw)
          res[i].status = 0;
        }
        difficultyBuckets[res[i].diff].push(res[i]);
      }
      setProblemsByDiff(difficultyBuckets);

    });
  }, []);

  const handleClick = (event) => {
    setDisplay(event.target.value);
  };

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
    },
    button: {
      backgroundColor: colors.accent2,
      margin: '0 0 0 1%',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      height: '40px',
      cursor: 'pointer',
      width: '10%',
      borderRadius: '10px',
      boxShadow: '4px 6px',
    }
  }

  return (
    <div>
      <div >
        <button style={styles.button} value={0} onClick={handleClick} >By Difficulty</button>
        <button style={styles.button} value={1} onClick={handleClick} >By Search</button>
      </div>
      <div style={styles.container}>
        {display === 0 ? 
        <ByDifficulty
          bell={problemsByDiff[0]}
          jalepeno={problemsByDiff[1]}
          habenero={problemsByDiff[2]}
          ghost={problemsByDiff[3]}
          solvedCountByDiff={solvedCountByDiff} >
        </ByDifficulty>
        : <BySearch problems={listOfProblems} ></BySearch>
        }
        <div style={styles.pad} />
      </div>
    </div>
  );
};

export default Problems;