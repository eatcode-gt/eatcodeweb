import React from 'react';
import { useState, useEffect } from 'react'
import Axios from "axios";
import ByDifficulty from '../components/problems/ByDifficulty';
import Button from '../components/common/Button';
import BySearch from '../components/problems/BySearch';
import { colors } from '../global/vars';

const Problems = () => {
  const [listOfProblems, setListOfProblems] = useState([]);
  const [display, setDisplay] = useState(0);
  const [problemsByDiff, setProblemsByDiff] = useState([[], [], [], []]);

  useEffect(() => {
    Axios.get("http://localhost:3002/problems").then((response) => {
      const res = response.data.result;
      setListOfProblems(res);

      console.log(res)
      const difficultyBuckets = [[], [], [], []];
      for (let i = 0; i < res.length; i++) {
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
        {display == 0 ? 
        <ByDifficulty
          bell={problemsByDiff[0]}
          jalepeno={problemsByDiff[1]}
          habenero={problemsByDiff[2]}
          ghost={problemsByDiff[3]} >
        </ByDifficulty>
        : <BySearch problems={listOfProblems} ></BySearch>
        }
        <div style={styles.pad} />
      </div>
    </div>
  );
};

export default Problems;