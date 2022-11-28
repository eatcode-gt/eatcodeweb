import React from 'react';
import { Component,useState, useEffect } from 'react'
import Axios from "axios";
import ProblemBody from '../components/problems/ProblemBody'
import Select from 'react-select'
import { colors } from '../global/vars';

export default class Problem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allProbs: [],
      datilProbs: [],
      jalaProbs: [],
      habeProbs: [],
      ghosProbs: [],

      datilSelected: [],
      jalaSelected: [],
      habeSelected: [],
      ghosSelected: [],

      selectedTags: [],
      selectedTitle: ""
    }

    this.options = [
      { value: 'Binary Search', label: 'binary search' }, { value: 'Bitmasks', label: 'bitmasks' }, { value: 'Brute Force', label: 'brute force' },
      { value: 'DP', label: 'dp' }, { value: 'Geometry', label: 'geometry' }, { value: 'Graphs', label: 'graphs' }, { value: 'Greedy', label: 'greedy' },
      { value: 'Math', label: 'math' }, { value: 'Number Theory', label: 'number theory' }, { value: 'Prefix-Sum', label: 'prefix-sum' },
      { value: 'Probability', label: 'probability' }, { value: 'Shortest Paths', label: 'shortest paths' }, { value: 'Sorting', label: 'sorting' },
      { value: 'Trees', label: 'trees' }, { value: 'Two Pointers', label: 'two pointers' }
    ]
  }


  handleTagsChange(e) {
    this.setState({selectedTags: e}, this.handleFilter)
  }

  handleTitleChange(e) {
    this.setState({selectedTitle: e.target.value}, this.handleFilter)
  }

  handleFilter() {
    this.setState({datilSelected: this.state.datilProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
    this.setState({jalaSelected: this.state.jalaProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
    this.setState({habeSelected: this.state.habeProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
    this.setState({ghosSelected: this.state.ghosProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
  }

  problemIsSelected(problem) {
    if (this.state.selectedTags.length !== 0) { //remove from screen if there are tags selected and none of them are a tag of the problem
      for (let i = 0; i < this.state.selectedTags.length; i++) {
        if (!problem.tags.includes(this.state.selectedTags[i])) {
          return false
        }
      }
    }
    if (this.state.selectedTitle !== "" && !problem.title.toLowerCase().includes(this.state.selectedTitle) && !problem.questionID.toString().includes(this.state.selectedTitle)) { //remove from screen if 
      return false
    }
    return true
  }

  async componentDidMount() {
    let allTemp = []
    let jalaTemp = []
    let datilTemp = []
    let habeTemp = []
    let ghosTemp = []
    await Axios.get("http://localhost:3002/problems").then((response) => {
      allTemp = response.data.result
    });
    allTemp.forEach(problem => {
      switch (problem.difficulty) {
        case 0:
          jalaTemp.push(problem)
          break
        case 1:
          datilTemp.push(problem)
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
      jalaProbs: jalaTemp,
      jalaSelected: jalaTemp,
      datilProbs: datilTemp,
      datilSelected: datilTemp,
      habeProbs: habeTemp,
      habeSelected: habeTemp,
      ghosProbs: ghosTemp,
      ghosSelected: ghosTemp
    })
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3em',
        padding: '0em 3em',
        maxHeight: 'calc(100vh - 8em)',
        zIndex: 1
      },
      problemBodyContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '3em',
      },
      pad: {
        minHeight: '1em',
        marginTop: '-3em',
        width: '100%'
      },
      bySearchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1em',
        position: 'absolute',
        top: '2em'
      },
      constrainText: {
        color: colors.accent1,
        fontSize: '2.7em'
      },
      textInput: {
        backgroundColor: colors.grey,
        fontSize: '2em',
        border: 'none',
        outline: 'none',
        width: '12em',
        fontWeight: 'bold',
        color: colors.accent2,
        textAlign: 'right',
        paddingRight: '0.6em'
      },
      tagSelect: {
        control: (baseStyles) => ({
          ...baseStyles,
          maxWidth: '35vw',
          minWidth: '12em',
          width: '12em',
          maxHeight: '1em',
          fontSize: '2em',
          fontWeight: 'bold',
          border: 'none',
          outline: 'none',
        }),
        option: (styles) => {
          return {
            ...styles,
            color: colors.black,
            fontWeight: 'bold',
            fontSize: '2em'
          }
        },
        placeholder: (styles) => {
          return {
            ...styles,
            color: "#555555"
          }
        },
        input: (styles) => {
          return {
            ...styles,
            color: colors.accent2,
          }
        },
        noOptionsMessage: (styles) => {
          return { 
            ...styles,
            color: colors.black,
            fontWeight: 'bold',
            fontSize: '2em',
            noOptionsText: "tag not found"
          }
        }
      }
    }

    return (<div style={styles.container}>
      <div style={styles.bySearchContainer}>
        <input style={styles.textInput} placeholder="no title specified" type="text"  name="title" default="Enter" value={this.state.selectedTitle} onChange={this.handleTitleChange.bind(this)}/>
        <h5 style={styles.constrainText}>&larr; constrain your search &rarr;</h5>
        <Select styles={styles.tagSelect} options={this.options} onChange={this.handleTagsChange.bind(this)} isSearchable isMulti closeMenuOnSelect={false} placeholder="no tags selected" noOptionsMessage={() => "tag not found"}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: colors.accent2,
              primary: colors.grey,
              neutral0: colors.grey,
              neutral20: colors.grey
            },
        })}/>
      </div>
      <div style={styles.problemBodyContainer}>
        <ProblemBody i={0} diff={"Jalapeño"} problems={this.state.jalaSelected}/>
        <ProblemBody i={1} diff={"Datil"} problems={this.state.datilSelected}/>
        <ProblemBody i={2} diff={"Habenero"} problems={this.state.habeSelected}/>
        <ProblemBody i={3} diff={"Ghost"} problems={this.state.ghosSelected}/>
      </div>
      </div>);
  }
};