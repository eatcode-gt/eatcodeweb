import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../global/colors';
import Login from '../components/landing/Login'

const Landing = () => {
  const styles = {
    content: {
      display: 'flex',
      width: '100vw',
      justifyContent: 'space-between'
    },
    left: {
      width: '60%',
      minHeight: '100vh',
      backgroundColor: colors.accent1
    },
    leftContent: {
      padding: '15em'
    },
    right: {
      width: '40%',
      minHeight: '100vh',
      backgroundColor: colors.accent2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      color: colors.white
    }
  }
  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <h1 style={styles.title}>eatcode</h1>
          <Link to="/problems"><h2 style={styles.title}>problems</h2></Link>
          <Link to="/user/racewilliams"><h2 style={styles.title}>user</h2></Link>
          <Link to="/login"><h2 style={styles.title}>login</h2></Link>
          <p style={styles.title}>i know this design is butt but its placeholder for now</p>
        </div>
      </div>
      <div style={styles.right}>
        {/*<Login />*/}
      </div>
    </div>
  );
};
  
export default Landing;