import { colors } from '../global/vars';
import Login from '../components/landing/Login'
import Fruit from '../components/landing/Fruit'
import Default from '../components/landing/Default'
import { useState } from 'react'

const Landing = () => {
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
      {isDefault
      ? <Default />
      : <Login />
      }
      <div style={styles.right}>
        <Fruit />
      </div>
    </div>
  );
};
  
export default Landing;