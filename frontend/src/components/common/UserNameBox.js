import { useContext, useState } from 'react'
import { colors } from '../../global/vars';
import { userContext } from '../../userContext';
import { Link } from 'react-router-dom'

const UserNameBox = () => {
  const user = useContext(userContext).user

  const [btnHover, setBtnHover] = useState(false);
  const handleMouseEnter = () => {
    setBtnHover(true);
  }
  const handleMouseLeave = () => {
    setBtnHover(false);
  }

  const styles = {
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.4em',
      paddingRight: '0.2em',
      cursor: 'pointer'
    },
    text: {
      color: btnHover ? colors.accent1 : colors.accent2,
      transition: 'all 0.27s ease',
      textAlign: 'right',
      transform: 'translateY(0.2em)',
      fontSize: '2em'
    },
    profilePic: {
      backgroundImage: `url("${user.userProfilePictureUrl}")`,
      backgroundRepat: 'no-repeat',
      backgroundSize: 'contain',
      height: '4em',
      width: '4em',
      border: '0.3em solid',
      transition: 'all 0.27s ease',
      borderColor: btnHover ? colors.accent1 : colors.accent2,
      borderRadius: '2em'
    }
  }

  return (
    <Link to={`/user/${user.userID}`} style={styles.userInfo} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>
        <h5 style={styles.text}>{user.userName}</h5>
        <h5 style={styles.text}>{user.totalScore} 🥩</h5>
      </div>
      <div style={styles.profilePic} />
    </Link>
  )
}

export default UserNameBox;