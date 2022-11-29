import React from 'react';
import { colors } from '../../global/vars';
import ProgressBar from 'react-animated-progress-bar';
import Peppers from '../problems/Peppers';

export default function DifficultyBar(props) {
    const styles = {
        barTitle: {
            display: "inline-flex",
            gap: "2em"
        }
    }
    const completed = props.completed;
    const maxCompleted = props.maxCompleted === 0 ? 1 : props.maxCompleted;
    // console.log("Props:", props)
    return (
        <>
            <span style={styles.barTitle}>
                <Peppers diff={props.diff} size={"2rem"}/>
                <h5>{props.diff}</h5>
                <Peppers diff={props.diff} size={"2rem"}/>
            </span>
            <ProgressBar 
                    percentage={(completed / maxCompleted).toString()}
                    rect
                    rectBorderRadius="20px"
                    trackPathColor={colors.white}
                    width="310px"
                    height="10px"
                    rectPadding="0.01px"
                    defColor={{
                        fair: props.bgColor,
                        good: props.bgColor,
                        excellent: props.bgColor,
                        poor: props.bgColor
                    }}        
                    trackBorderColor="grey"
            />
        </>
    )
}