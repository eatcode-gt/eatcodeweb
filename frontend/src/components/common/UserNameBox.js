import React, { useState } from 'react'
import { colors } from '../../global/vars';
import { userContext } from '../../userContext';

const UserNameBox = ({user}) => {
  const styles = {
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.4em',
      paddingRight: '0.2em',
      cursor: 'pointer'
    },
    userName: {
      color: colors.accent1,
      transition: 'all 0.27s ease'
    },
    profilePic: {
      // background: user.profilePicLink,
      background: 'url("https://steamuserimages-a.akamaihd.net/ugc/786371856221183225/2F04B32CA10AD1ADBC01CE5D4DC6F7AF0E96AE6C/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true")',
      backgroundRepeat: 'no-repeat',
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
    <userContext.Consumer>
      {({user}) => {
        if (user.userName == null) {
          user.userName = "Not Logged In"
        }
        return (
          <div style={styles.userInfo}>
            <h4 style={styles.userName}>{user.userName}</h4>
            <div style={styles.profilePic} />
          </div>
        );
      }}
    </userContext.Consumer>
  )
}

export default UserNameBox;