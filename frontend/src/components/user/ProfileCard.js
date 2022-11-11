import React from 'react';
import { useParams } from 'react-router-dom';
import { colors } from '../../global/colors';
import ProgressBar from "@ramonak/react-progress-bar";

export default function ProfileCard() {
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

    let { userName } = useParams();

    const styles = {
        card: {
            display: "inline-box",
            color: "white",
            position: 'absolute',
            marginLeft: "20px",
            width: "300px",
            height: "480px",
            backgroundColor: colors.accent2,
            borderRadius: "10px",
            boxShadow: "0px 1px 10px 1px black"
        },
        upperContainer: {
            height: "100px",
            backgroundColor: colors.accent1,
        },
        lowerContainer: {
            height: "300px",
            background: colors.accent2,
            textAlign: "center",
            marginTop: "60px",
        },
        imageContainer:{
            background: "white",
            alignContent: "center",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            padding: "5px",
            transform: "translate(95px, 45px)",
        },
        profileButton: {
            margin: "1rem",
            marginTop: "0",
            color: colors.assent2,
            font: "bold",
            backgroundColor: colors.assent1,
            border: "2px solid #db747d",
            padding: "0.6rem",
            borderRadius: "6px",
            transitionDuration: "0.5s",
            animation: "ease-in-out",
        }
    }

    return (
        <div style={styles.card}>
            <div style={styles.upperContainer}>
                <img style={styles.imageContainer} src="https://steamuserimages-a.akamaihd.net/ugc/786371856221183225/2F04B32CA10AD1ADBC01CE5D4DC6F7AF0E96AE6C/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor" alt="profile" height="100px" width="100px"/>
            </div>
            <div style={styles.lowerContainer}>
                <h4>{userName}</h4>
                <h5>Beef Points</h5>
                <p>I am going to add a progress bar here for the total number of mild, medium, and hot problems the user has done just like LeetCode does</p>
                <div style={{alignContent: "center"}}>
                    <ProgressBar 
                        completed={listOfProblems.filter((element) => element.diff === 0 && element.status === 2).length.toString()} 
                        maxCompleted={listOfProblems.filter((element) => element.diff === 0).length.toString()}
                        bgColor={colors.mild}
                        baseBgColor={colors.white}
                        width="75%"
                        isLabelVisible={false}
                    />
                    <ProgressBar 
                        completed={listOfProblems.filter((element) => element.diff === 1 && element.status === 2).length.toString()} 
                        maxCompleted={listOfProblems.filter((element) => element.diff === 1).length.toString()}
                        bgColor={colors.med}
                        baseBgColor={colors.white}
                        width="75%"
                        isLabelVisible={false}
                    />
                    <ProgressBar 
                        completed={listOfProblems.filter((element) => element.diff === 1 && element.status === 2).length.toString()} 
                        maxCompleted={listOfProblems.filter((element) => element.diff === 1).length.toString()}
                        bgColor={colors.hot}
                        baseBgColor={colors.white}
                        width="75%"
                        isLabelVisible={false}
                    />
                </div>
                <button style={styles.profileButton}>Edit Profile</button>
            </div>
        </div>   
    )
}