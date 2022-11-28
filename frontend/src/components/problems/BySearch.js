// import React from 'react';
// import { useState } from 'react';
// import Tags from '../create/Tags';
// import Problem from './Problem';
// import { colors } from '../../global/vars';

// const BySearch = ({bellProbs, jaleProbs, habeProbs, ghosProbs}) => {

//   const styles = {
//     container: {
//       display: 'flex',
//       width: '100%',
//     },
//     form: {
//       height: '100%',
//       width: '20%',
//       backgroundColor: colors.accent2,
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '5px',
//       margin: '2%',
//       fontSize: '0.8rem',
//       borderRadius: '20px',
//       boxShadow: '5px 8px',
//     },
//     formElement: {
//       margin: '5%',
//       height: '100%',
//       width: 'auto',
//     },
//     searchBar: {
//       marginTop: '4%',
//       width: '85%',
//     },
//     problems: {
//       width: '75%',
//     },
//     buttonContainer: {
//       display: 'flex',
//       gap: '10px',
//     },
//     button: {
//       backgroundColor: colors.accent1,
//       color: colors.white,
//       border: 'none',
//       height: '25px',
//       width: '40%',
//       cursor: 'pointer',
//     },
//   }


//   const handleFilter = (event) => {
//     event.preventDefault();
//     const searchKey = event.target.search.value.toLowerCase();
//     const elements = document.getElementById("searchForm").elements;
//     const checkedElements = [];
//     const difficulties = [];
//     for(let i = 0, element; element = elements[i++];) {
//       if(element.type === 'checkbox' && element.checked) {
//         if(element.name == 0 || element.name == 1 || element.name == 2 || element.name == 3) {
//           difficulties.push(element.name);
//         } else {
//           checkedElements.push(element.name);
//         }
//       }
//     }
//     let filteredData = problems.filter((problem) => {
//       return (problem.name.toLowerCase().includes(searchKey) || problem.questionID.toString().includes(searchKey));
//     });
//     filteredData = filteredData.filter((problem) => {
//       if (difficulties.length === 0) {
//         return true;
//       }
//       for(let i = 0; i < difficulties.length; i++) {
//         if(problem.diff == difficulties[i]) {
//           return true;
//         }
//       }
//       return false;
//     })
//     filteredData = filteredData.filter((problem) => {
//       if (checkedElements.length === 0) {
//         return true;
//       }
//       for(let i = 0; i < checkedElements.length; i++) {
//         if(problem.tags.includes(checkedElements[i])) {
//           return true;
//         }
//       }
//       return false;
//     })
//     setFilteredProblems(filteredData);
//   }

//   const clearFilter = () => {
//     setFilteredProblems(props.problems);
//   }

//   return (
//     <div style={styles.container} >
//       <form id='searchForm' onSubmit={handleFilter}  style={styles.form}>
//         <div style={styles.formElement} >
//           <h5>Problem Search</h5>
//           <input style={styles.searchBar} type="text" placeholder='Search...' name='search' />
//         </div>
//         <div style={styles.formElement} >
//           <h5>Tags</h5>
//           <Tags />
//         </div>
//         <div style={{...styles.formElement, ...styles.buttonContainer}} >
//           <button style={styles.button} type='submit'>Submit</button>
//           <button style={styles.button} type='reset' onClick={clearFilter} >Clear</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default BySearch