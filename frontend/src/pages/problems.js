import React from 'react';
import { Component,useState, useEffect } from 'react'
import Axios from "axios";
import ProblemBody from '../components/problems/ProblemBody'
import Select from 'react-select'

export default class Problem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allProbs: [],
      bellProbs: [],
      jaleProbs: [],
      habeProbs: [],
      ghosProbs: [],

      selectedTags: [],
      selectedTitle: ""
    }

    this.options = [
      { value: 'Binary Search', label: 'Binary Search' }, { value: 'Bitmasks', label: 'Bitmasks' }, { value: 'Brute Force', label: 'Brute Force' },
      { value: 'DP', label: 'DP' }, { value: 'Geomertry', label: 'Geomertry' }, { value: 'Graphs', label: 'Graphs' }, { value: 'Greedy', label: 'Greedy' },
      { value: 'Math', label: 'Math' }, { value: 'Number Theory', label: 'Number Theory' }, { value: 'Prefix-Sum', label: 'Prefix-Sum' },
      { value: 'Probability', label: 'Probability' }, { value: 'Shortest Paths', label: 'Shortest Paths' }, { value: 'Sorting', label: 'Sorting' },
      { value: 'Trees', label: 'Trees' }, { value: 'Two Pointers', label: 'Two Pointers' }
    ]
  }

  handleTagsChange(e) {
    this.setState({selectedTags: e})
    console.log(this.state.selectedTags)
  }

  handleTitleChange(e) {
    this.setState({selectedTitle: e.target.value})
    console.log(this.state.selectedTitle)
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
      },
      bySearchContainer: {

      },
      tagSelect: {
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: 'none !important',
          outline: 'none !important',
          backgroundColor: 'transparent'
        }),
      }
    }

    return (<>
      <div style={styles.bySearchContainer}>
        <input style={styles.textInput} type="text"  name="title" default="Enter" value={this.state.selectedTitle} onChange={this.handleTitleChange.bind(this)}/>
        <Select styles={styles.tagSelect} options={this.options} onChange={this.handleTagsChange.bind(this)} isSearchable isMulti closeMenuOnSelect={false}/>
      </div>
      <div style={styles.container}>
        <ProblemBody i={0} diff={"Bell"} problems={this.state.bellProbs}/>
        <ProblemBody i={1} diff={"Jalepeño"} problems={this.state.jaleProbs}/>
        <ProblemBody i={2} diff={"Habenero"} problems={this.state.habeProbs}/>
        <ProblemBody i={3} diff={"Ghost"} problems={this.state.ghosProbs}/>
      </div>
      </>);
  }
};