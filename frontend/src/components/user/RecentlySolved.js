import { Component, useState, useEffect } from 'react';
import Problem from '../problems/Problem';
import { Scrollbars } from 'react-custom-scrollbars';
import Axios from "axios";

export default class RecentlySolved extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attemptedProblems: [],
        }
        // this.attemptedProblems = Array.from(this.props.user.attemptedProblems.values())
        // console.log("kkkk:", Object.getOwnPropertyNames(this.props.user.attemptedProblems))
        const userAttempedProblems = Object.getOwnPropertyNames(this.props.user.attemptedProblems).map(x => parseInt(x))
        // console.log("arr:", userAttempedProblems)
        Axios.post("http://localhost:3002/getProblems", {filter:{
            questionID : { "$in": userAttempedProblems }
          }}).then((response) => {
            this.setState({attemptedProblems: response.data.result}, ()=>{});
        });
    }
    
    render() {
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
            maxHeight: '90em',
            overflowY: "scroll"
        },
        scroll: {
            width: 1170,
            height: 465,
        }
    }

    return (
        <div style={styles.container}>
            <h3>Recently Solved Problems</h3>            
            <div style={styles.grid}>
                <Scrollbars style={styles.scroll}>
                    {this.state.attemptedProblems.map((problem) => {
                        return (
                                <Problem key={problem.id} problem={problem} />
                        );
                    })}
                </Scrollbars>
            </div>
        </div>
    )
    }
}