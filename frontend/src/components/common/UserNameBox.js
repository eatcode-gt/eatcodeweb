import { useContext } from 'react'
import { colors } from '../../global/vars';
import { userContext } from '../../userContext';

const UserNameBox = () => {
  const user = useContext(userContext).user

  const styles = {
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.4em',
      paddingRight: '0.2em'
    },
    userName: {
      color: colors.accent1,
      transition: 'all 0.27s ease'
    },
    profilePic: {
      backgroundImage: `url("${user.userProfilePictureUrl}")`,
      backgroundRepat: 'no-repeat',
      backgroundSize: 'contain',
      height: '4em',
      width: '4em',
      border: '0.3em solid',
      transition: 'all 0.27s ease',
      borderColor: colors.accent2,
      borderRadius: '2em'
    }
  }

  return (
    <div style={styles.userInfo}>
      <h4 style={styles.userName}>{user.userName}</h4>
      <div style={styles.profilePic} />
    </div>
  )
}

export default UserNameBox;