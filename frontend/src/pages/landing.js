import React from 'react';
import { colors } from '../global/vars';
import Title from '../components/landing/Title'
import PageLink from '../components/landing/PageLink';
import Fruit from '../components/landing/Fruit'

const Landing = () => {
  const styles = {
    content: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      justifyContent: 'space-between',
      backgroundColor: colors.grey
    },
    left: {
      margin: 'auto auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '1.2em',
      marginTop: '20vh',
      zIndex: 2
    },
    right: {
      backgroundColor: colors.grey,
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <Title />
        <PageLink page="problems" utensil="fork" />
        <PageLink page="login" utensil="spoon" />
        <PageLink page="user" utensil="knife" />
        <PageLink page="create" utensil="knife"/>
      </div>
      <div style={styles.right}>
        <Fruit />
      </div>
    </div>
  );
};
  
export default Landing;