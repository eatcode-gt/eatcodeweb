import React from 'react';
import { colors } from '../../global/vars';
import Title from './Title'
import PageLink from './PageLink';

const Default = ({user}) => {
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
      alignItems: 'center',
      gap: '1.2em',
      marginTop: '20vh',
      zIndex: 2
    }
  }
  return (
    <div style={styles.content}>
      <div style={styles.left}>
        <Title />
        <PageLink page="problems" utensil="fork" />
        {user.loggedIn
        ? <PageLink page="logout" utensil="spoon" />
        : <PageLink page="login" utensil="spoon" />}
        <PageLink page="user" utensil="knife" />
        <PageLink page="create" utensil="knife"/>
      </div>
    </div>
  );
};
  
export default Default;