import React from 'react';
import { Component,useState, useEffect } from 'react'
import Axios from "axios";
import { diffMap } from '../global/vars'
import ProblemBody from '../components/problems/ProblemBody'

export default class Problem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bellProbs: [],
      jaleProbs: [],
      habeProbs: [],
      ghosProbs: []
    }
  }

  async componentDidMount() {
    let allProblems;
    let bellTemp = []
    let jaleTemp = []
    let habeTemp = []
    let ghosTemp = []
    await Axios.get("http://localhost:3002/problems").then((response) => {
      allProblems = response.data.result
      console.log(allProblems)
    });
    allProblems.forEach(problem => {
      switch (problem.difficulty) {
        case 0:
          bellTemp.push(problem)
          break
        case 1:
          jaleTemp.push(problem)
          break
        case 2:
          habeTemp.push(problem)
          break
        case 3:
          ghosTemp.push(problem)
          break
      }
    })
    this.setState({
      bellProbs: bellTemp,
      jaleProbs: jaleTemp,
      habeProbs: habeTemp,
      ghosProbs: ghosTemp
    })
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '3em',
        padding: '0em 3em',
        maxHeight: 'calc(100vh - 8em)'
      },
      pad: {
        minHeight: '1em',
        marginTop: '-3em',
        width: '100%'
      }
    }

    return (
      <div style={styles.container}>
        <ProblemBody i={0} diff={"Bell"} problems={this.state.bellProbs}/>
        <ProblemBody i={1} diff={"Jalepeño"} problems={this.state.jaleProbs}/>
        <ProblemBody i={2} diff={"Habenero"} problems={this.state.habeProbs}/>
        <ProblemBody i={3} diff={"Ghost"} problems={this.state.ghosProbs}/>
      </div>
    );
  }
};