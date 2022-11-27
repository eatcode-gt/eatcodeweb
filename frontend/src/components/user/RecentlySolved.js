import React, { useState, useEffect } from 'react';
import Axios from "axios";
import Problem from '../problems/Problem';

export default function RecentlySolved() {
    const [listOfProblems, setListOfProblems] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/problems").then((response) => {
            setListOfProblems(response.data.result);
        });
        console.log(listOfProblems)
    }, []);

    const styles = {
        container: {
            display: "inline-box",
            position: "absolute",
            marginTop: "220px",
            marginLeft: "340px",
        },
        grid: {
            width: '80vw',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100em',
        }
    }

    return (
        <div style={styles.container}>
            <h3>Recently Solved Problems</h3>            
            <div style={styles.grid}>
                {listOfProblems.map((problem) => {
                    return (<>
                        <Problem key={problem.id} problem={problem} />
                        <Problem key={problem.id} problem={problem} />
                        <Problem key={problem.id} problem={problem} /></>
                    );
                })}
            </div>
        </div>
    )
}