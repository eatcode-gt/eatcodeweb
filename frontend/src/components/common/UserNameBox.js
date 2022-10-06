import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { colors } from '../../global/colors';

const UserNameBox = () => {
  const user = {
    userName: 'racewilliams',
    profilePicLink: 'url("https://steamuserimages-a.akamaihd.net/ugc/786371856221183225/2F04B32CA10AD1ADBC01CE5D4DC6F7AF0E96AE6C/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true")'
  }

  const [userNameHover, setUserNameHover] = useState(false);
  const handleMouseEnter = () => {
    setUserNameHover(true);
  }
  const handleMouseLeave = () => {
    setUserNameHover(false);
  }

  const styles = {
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.4em',
      paddingRight: '0.2em',
      cursor: 'pointer'
    },
    userName: {
      color: userNameHover ? colors.accent1 : colors.accent2,
      transition: 'all 0.27s ease'
    },
    profilePic: {
      background: user.profilePicLink,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      height: '4em',
      width: '4em',
      border: '0.3em solid',
      transition: 'all 0.27s ease',
      borderColor: userNameHover ? colors.accent2 : colors.accent1,
      borderRadius: '2em'
    }
  }

  return (
    <Link to={`/user/${user.userName}`}><div style={styles.userInfo} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h4 style={styles.userName}>{user.userName}</h4>
      <div style={styles.profilePic} />
    </div></Link>
  )
}

export default UserNameBox;