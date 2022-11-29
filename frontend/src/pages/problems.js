import React from 'react';
import { Component } from 'react'
import Axios from "axios";
import ProblemBody from '../components/problems/ProblemBody'
import Select from 'react-select'
import { colors } from '../global/vars';
import { userContext } from '../userContext'

export default class Problem extends Component {
  static contextType = userContext

  constructor(props) {
    super(props)
    this.state = {
      allProbs: [],
      jalaProbs: [],
      hungProbs: [],
      habeProbs: [],
      ghosProbs: [],

      jalaSelected: [],
      hungSelected: [],
      habeSelected: [],
      ghosSelected: [],

      selectedTags: [],
      selectedTitle: "",

      userSolvedCountByDiff: new Array(4).fill(0)
    }

    this.tagOptions = [
      { value: 'Binary Search', label: 'binary search' }, { value: 'Bitmasks', label: 'bitmasks' }, { value: 'Brute Force', label: 'brute force' },
      { value: 'DP', label: 'dp' }, { value: 'Geometry', label: 'geometry' }, { value: 'Graphs', label: 'graphs' }, { value: 'Greedy', label: 'greedy' },
      { value: 'Math', label: 'math' }, { value: 'Number Theory', label: 'number theory' }, { value: 'Prefix-Sum', label: 'prefix-sum' },
      { value: 'Probability', label: 'probability' }, { value: 'Shortest Paths', label: 'shortest paths' }, { value: 'Sorting', label: 'sorting' },
      { value: 'Trees', label: 'trees' }, { value: 'Two Pointers', label: 'two pointers' }
    ]

    this.statusOptions = [
      { value: 0, label: 'raw' }, { value: 1, label: 'cooking' }, { value: 2, label: 'cooked' }
    ]

    this.groupedOptions = [
      { label: 'status', options: this.statusOptions},
      { label: 'problem tags', options: this.tagOptions}
    ]
  }

  getUserProgress = (user) => {
    const solved = new Map();
    const solvedCountByDiff = new Array(4).fill(0);;
    for (const property in user.attemptedProblems) {
      solved.set(parseInt(property), user.attemptedProblems[property].solved)
      if (user.attemptedProblems[property].solved) {
        solvedCountByDiff[user.attemptedProblems[property].difficulty] += 1;
      }
    }
    this.setState({userSolved: {...solved}, userSolvedCountByDiff: [...solvedCountByDiff]}) 
  }

  handleTagsChange(e) {
    this.setState({selectedTags: e}, this.handleFilter)
  }

  handleTitleChange(e) {
    this.setState({selectedTitle: e.target.value}, this.handleFilter)
  }

  handleFilter() {
    this.setState({jalaSelected: this.state.jalaProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
    this.setState({hungSelected: this.state.hungProbs.filter((problem) => {
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
        if (Number.isFinite(this.state.selectedTags[i].value) && problem.status != this.state.selectedTags[i].value) {
          console.log(this.state.selectedTags[i].value)
          return false
        }
        if (!Number.isFinite(this.state.selectedTags[i].value) && !problem.tags.includes(this.state.selectedTags[i].value)) {
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
    let hungTemp = []
    let habeTemp = []
    let ghosTemp = []
    await Axios.post("http://localhost:3002/getProblems",{filter:{}}).then((response) => {
      allTemp = response.data.result
    });
    allTemp.forEach(problem => {
      if (this.context.user.attemptedProblems.hasOwnProperty(problem.questionID)) {
        if (this.context.user.attemptedProblems[problem.questionID].solved === true) {
          problem.status = 2 //cooked
        } else { problem.status = 1 } //cooking
      } else { problem.status = 0 } //raw
      switch (problem.difficulty) {
        case 0:
          jalaTemp.push(problem)
          break
        case 1:
          hungTemp.push(problem)
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
      hungProbs: hungTemp,
      hungSelected: hungTemp,
      habeProbs: habeTemp,
      habeSelected: habeTemp,
      ghosProbs: ghosTemp,
      ghosSelected: ghosTemp
    })

    this.getUserProgress(this.context.user)
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
        option: (styles, state) => {
          console.log(state)
          return {
            ...styles,
            color: state.isFocused ? colors.white : colors.black,
            fontWeight: 'bold',
            fontSize: '2em',
            transition: 'all 0.3s ease'
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
        },
        groupHeading: (styles) => {
          return {
            ...styles,
            textTransform: 'none',
            color: colors.accent1,
            fontWeight: 'bold',
            fontSize: '2em',
            textAlign: 'center'
          }
        }
      }
    }

    return (<div style={styles.container}>
      <div style={styles.bySearchContainer}>
        <input style={styles.textInput} placeholder="no title specified" type="text"  name="title" default="Enter" value={this.state.selectedTitle} onChange={this.handleTitleChange.bind(this)}/>
        <h5 style={styles.constrainText}>&larr; constrain your search &rarr;</h5>
        <Select styles={styles.tagSelect} options={this.groupedOptions} onChange={this.handleTagsChange.bind(this)} isSearchable isMulti closeMenuOnSelect={false} placeholder="no tags selected" noOptionsMessage={() => "tag not found"}
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
        <ProblemBody i={0} diff={"Jalapeño"} problems={this.state.jalaSelected} eaten={this.state.userSolvedCountByDiff[0]}/>
        <ProblemBody i={1} diff={"Hungarian"} problems={this.state.hungSelected} eaten={this.state.userSolvedCountByDiff[1]}/>
        <ProblemBody i={2} diff={"Habenero"} problems={this.state.habeSelected} eaten={this.state.userSolvedCountByDiff[2]}/>
        <ProblemBody i={3} diff={"Ghost"} problems={this.state.ghosSelected} eaten={this.state.userSolvedCountByDiff[3]}/>
      </div>
      </div>);
  }
};