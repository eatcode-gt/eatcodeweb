import React from 'react';
import { colors } from '../../global/vars';
import ProgressBar from 'react-animated-progress-bar';

export default function DifficultyBar(props) {
    const styles = {
        bar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: `0.2em solid ${props.bgColor}`,
            padding: '0em 1em 0em 3em'
        },
        title: {
            color: props.bgColor
        }
    }
    const completed = props.completed;
    const maxCompleted = props.maxCompleted === 0 ? 1 : props.maxCompleted;
    // console.log("Props:", props)
    return (
        <div style={styles.bar}>
            <h4 style={styles.title}>{props.diff}</h4>
            <ProgressBar 
                    percentage={(completed / maxCompleted).toString()}
                    rect
                    trackPathColor={colors.white}
                    width="60%"
                    height="1.4em"
                    rectPadding="0.01px"
                    defColor={{
                        fair: props.bgColor,
                        good: props.bgColor,
                        excellent: props.bgColor,
                        poor: props.bgColor
                    }}        
                    trackBorderColor={colors.black}
            />
        </div>
    )
}