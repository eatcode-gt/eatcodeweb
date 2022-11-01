import React from 'react';
import { colors } from '../global/colors';
import Title from '../components/landing/Title'
import PageLink from '../components/landing/PageLink';
import Robot from '../components/landing/Robot'

const Landing = ({user}) => {
  const styles = {
    content: {
      display: 'flex',
      width: '100vw',
      justifyContent: 'space-between',
      backgroundColor: colors.grey
    },
    left: {
      margin: 'auto auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '1.2em',
      marginTop: '20vh'
    },
    right: {
      backgroundColor: colors.accent2,
      maxWidth: '50%',
      width: '50%',
      height: '100%'
    },
    robot: {
      position: 'absolute',
      width: '40px !important',
      right: '-43%'
    }
  }
  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <Title />
        <PageLink page="problems" utensil="fork" />
        {user.loggedIn ? 
         <PageLink page="logout" utensil="spoon" /> :
         <PageLink page="login" utensil="spoon" />}
        {/* <PageLink page="login" utensil="spoon" /> */}
        <PageLink page="user" utensil="knife" />
        <PageLink page="create" utensil="knife"/>
      </div>
      <div style={styles.right}>
        <Robot style={styles.robot} />
      </div>
    </div>
  );
};
  
export default Landing;