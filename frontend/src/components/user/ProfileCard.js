import React from 'react';
import { useParams } from 'react-router-dom';
import { colors } from '../../global/vars';
import Button from '../common/Button'

export default function ProfileCard() {

    let { userName } = useParams();

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
            width: "200px",
            marginLeft: "2rem",
            marginTop: "0",
            borderRadius: "6px",
        }
    }

    return (
        <div style={styles.card}>
            <div style={styles.upperContainer}>
                <img style={styles.imageContainer} src="https://steamuserimages-a.akamaihd.net/ugc/786371856221183225/2F04B32CA10AD1ADBC01CE5D4DC6F7AF0E96AE6C/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor" alt="profile" height="100px" width="100px"/>
            </div>
            <div style={styles.lowerContainer}>
                <h4>{userName}</h4>
                <p>Brief Description</p>
                <div style={styles.profileButton}>
                    <Button text={"Edit Profile"} color={colors.accent1} />
                </div>
            </div>
        </div>   
    )
}