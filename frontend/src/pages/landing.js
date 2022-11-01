import { colors } from '../global/vars';
import Login from '../components/landing/Login'
import Fruit from '../components/landing/Fruit'
import Default from '../components/landing/Default'
import React, { suspense, useState } from 'react'

const Landing = ({user}) => {
  const [isDefault, setIsDefault] = useState(true)
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
        {user.loggedIn ? 
         <PageLink page="logout" utensil="spoon" /> :
         <PageLink page="login" utensil="spoon" />}
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