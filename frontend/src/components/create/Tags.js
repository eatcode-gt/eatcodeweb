import React from 'react'

const Tags = (props) => {

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    checkbox: {
      display: 'flex',
      alignItems: 'center',
    }
  }

  const TagList = [
    "Binary Search", "Bitmasks", "Brute Force", 
    "DP", "Geometry", "Graphs", "Greedy", 
    "Math", "Number Theory", "Prefix-Sum",
    "Probability", "Shortest Paths", "Sorting",
    "Trees", "Two Pointers" 
  ]

  return (
    <div style={styles.container}>
      {TagList.map((tag) => {
        return (
          <div key={tag} className="checkBox" style={styles.checkbox}>
            <input type="checkbox" name={tag} onChange={props.handleChange}/>
            <label>{tag}</label>
          </div>
        )
      })}
    </div>
  )
}

export default Tags
