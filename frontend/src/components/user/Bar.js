import React from 'react';
import { colors } from '../../global/vars';
import ProgressBar from "@ramonak/react-progress-bar";
import Peppers from '../problems/Peppers';

export default function Bar(props) {
    const styles = {
        barTitle: {
            display: "inline-flex",
            gap: "1.5em"
        }
    }
    return (
        <>
            <span style={styles.barTitle}>
                <Peppers diff={props.diff} size={"2rem"}/>
                <h5>{props.diff}</h5>
                <Peppers diff={props.diff} size={"2rem"}/>
            </span>
            <ProgressBar 
                completed={props.completed} 
                maxCompleted={props.maxCompleted}
                bgColor={props.bgColor}
                baseBgColor={colors.white}
                width="100%"
                isLabelVisible={false}
            />
        </>
    )
}