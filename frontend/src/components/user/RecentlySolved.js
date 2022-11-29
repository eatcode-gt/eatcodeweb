import { Component, useState, useEffect } from 'react';
import Problem from '../problems/Problem';
import Axios from "axios";
import { colors } from '../../global/vars';

export default class RecentlySolved extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attemptedProblems: [],
        }
    }
    
    componentDidMount() {
        // this.attemptedProblems = Array.from(this.props.user.attemptedProblems.values())
        // console.log("kkkk:", Object.getOwnPropertyNames(this.props.user.attemptedProblems))
        // console.log("state:", this.props.user.attemptedProblems)
        const userAttempedProblems = Object.getOwnPropertyNames(this.props.user.attemptedProblems).map(x => parseInt(x))
        // console.log("arr:", userAttempedProblems)
        Axios.post("http://localhost:3002/getProblems", {filter:{
            questionID : { "$in": userAttempedProblems }
          }}).then((response) => {
            // console.log("resp:", response)
            this.setState({attemptedProblems: response.data.result}, ()=>{});
        });
    }

    render() {
    const styles = {
        container: {
            flex: 1
        },
        title: {
            color: colors.accent1,
            marginBottom: '0.25em',
            textAlign: 'center'
        },
        flex: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1em'
        }
    }

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>recent problems</h3>            
            <div style={styles.flex}>
                {this.state.attemptedProblems.map((problem, i) => {
                    return (
                        <Problem key={i} problem={problem} />
                    );
                })}
            </div>
        </div>
    )
    }
}