import React, { useReducer } from 'react';
import { colors } from '../../global/vars';
import Button from '../common/Button'

export default function ProfileCard({user}) {
    const styles = {
        card: {
            display: "inline-box",
            color: "white",
            position: 'absolute',
            marginLeft: "20px",
            width: "300px",
            height: "300px",
            backgroundColor: colors.accent2,
            borderRadius: "10px",
            boxShadow: "0px 1px 10px 1px black"
        },
        upperContainer: {
            height: "75px",
            backgroundColor: colors.accent1,
        },
        lowerContainer: {
            height: "160px",
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
            transform: "translate(95px, 20px)",
        },
        profileButton: {
            width: "220px",
            marginLeft: "2rem",
            marginTop: "0",
            borderRadius: "6px",
        }
    }

    return (
        <div style={styles.card}>
            <div style={styles.upperContainer}>
                <img style={styles.imageContainer} src={user.userProfilePictureUrl} alt="profile" height="100px" width="100px"/>
            </div>
            <div style={styles.lowerContainer}>
                <h4>{user.userName}</h4>
                <p>Beef: {user.totalScore}</p>
                <div style={styles.profileButton}>
                    <Button text={"Edit Profile"} color={colors.accent1} />
                </div>
            </div>
        </div>   
    )
}