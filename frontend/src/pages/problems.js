import React from 'react';
import { Component,useState, useEffect } from 'react'
import Axios from "axios";
import ProblemBody from '../components/problems/ProblemBody'
import BySearch from '../components/problems/BySearch';

export default class Problem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allProbs: [],
      bellProbs: [],
      jaleProbs: [],
      habeProbs: [],
      ghosProbs: []
    }
  }

  async componentDidMount() {
    let allTemp = []
    let bellTemp = []
    let jaleTemp = []
    let habeTemp = []
    let ghosTemp = []
    await Axios.get("http://localhost:3002/problems").then((response) => {
      allTemp = response.data.result
    });
    allTemp.forEach(problem => {
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
      allProbs: allTemp,
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

    return (<>
      <BySearch problems={this.state.allProbs} />
      <div style={styles.container}>
        <ProblemBody i={0} diff={"Bell"} problems={this.state.bellProbs}/>
        <ProblemBody i={1} diff={"Jalepeño"} problems={this.state.jaleProbs}/>
        <ProblemBody i={2} diff={"Habenero"} problems={this.state.habeProbs}/>
        <ProblemBody i={3} diff={"Ghost"} problems={this.state.ghosProbs}/>
      </div>
      </>);
  }
};