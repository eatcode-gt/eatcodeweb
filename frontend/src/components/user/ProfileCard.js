import React from 'react';
import { useParams } from 'react-router-dom';
import { colors } from '../../global/colors';

export default function ProfileCard() {
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
                <button style={styles.profileButton}>Edit Profile</button>
            </div>
        </div>   
    )
}