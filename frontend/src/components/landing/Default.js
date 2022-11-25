import React from 'react';
import { colors } from '../../global/vars';
import PageLink from './PageLink';

const Default = ({user, setIsDefault}) => {

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
        <PageLink page="/problems" name="problems" utensil="fork" />
        {user.loggedIn
        ? <>
          <PageLink page="/logout" name="logout" utensil="spoon" />
          <PageLink page={`/user/${user.userName}`} name="profile" utensil="knife" />
          </>
        : <PageLink page="/login" name="login" utensil="spoon" />}
          <PageLink page="/create" name="create" utensil="knife"/>
      </div>
    </div>
  );
};
  
export default Default;