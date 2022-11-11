import React from 'react';
import { colors } from '../../global/vars';
import ProgressBar from "@ramonak/react-progress-bar";
import Peppers from '../problems/Peppers';

export default function ProblemSolvedCard() {
    const listOfProblems =[
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
    ];

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
            marginTop: "50px",
        },
    }

    return (
        <div style={styles.card}>
            <div style={styles.upperContainer}>
                <br/>
                <br/>
                <h5>Solved Problems</h5>
            </div>
            <div style={styles.lowerContainer}>
            <div style={{alignContent: "center"}}>
                    <ProgressBar 
                        completed={listOfProblems.filter((element) => element.diff === 0 && element.status === 2).length.toString()} 
                        maxCompleted={listOfProblems.filter((element) => element.diff === 0).length.toString()}
                        bgColor={colors.Bell}
                        baseBgColor={colors.white}
                        width="75%"
                        isLabelVisible={false}
                    />
                    <Peppers diff={'Bell'} size={"3rem"}/>
                    <ProgressBar 
                        completed={listOfProblems.filter((element) => element.diff === 1 && element.status === 2).length.toString()} 
                        maxCompleted={listOfProblems.filter((element) => element.diff === 1).length.toString()}
                        bgColor={colors.Jalepeño}
                        baseBgColor={colors.white}
                        width="75%"
                        isLabelVisible={false}
                    />
                    <ProgressBar 
                        completed={listOfProblems.filter((element) => element.diff === 1 && element.status === 2).length.toString()} 
                        maxCompleted={listOfProblems.filter((element) => element.diff === 1).length.toString()}
                        bgColor={colors.Habenero}
                        baseBgColor={colors.white}
                        width="75%"
                        isLabelVisible={false}
                    />
                    <ProgressBar 
                        completed={listOfProblems.filter((element) => element.diff === 1 && element.status === 2).length.toString()} 
                        maxCompleted={listOfProblems.filter((element) => element.diff === 1).length.toString()}
                        bgColor={colors.Ghost}
                        baseBgColor={colors.white}
                        width="75%"
                        isLabelVisible={false}
                    />
                </div>
            </div>
        </div>
    )
}