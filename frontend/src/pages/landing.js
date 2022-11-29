import { colors } from '../global/vars';
import Title from '../components/landing/Title'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { userContext } from '../userContext';

const Landing = () => {
  const styles = {
    content: {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0em 12em',
      backgroundColor: colors.grey
    },
    side: {
      margin: 'auto auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1.2em'
    }
  }
  return (
    <div style={styles.content}>
      <div style={styles.side}>
        <Title />
        <h4>A food-themed technical interview training website for software engineers</h4>
      </div>

      <div style={styles.side}>
        <PageLink name="problems" page={"problems"} utensil="fork" />
        <userContext.Consumer>
          {({user, logInUser, logOutUser}) => {
            return (<>
            { user.isAdmin &&
            <PageLink name="create" page="create" utensil="knife"/>}
            { user.userID &&
            <PageLink name="profile" page={`user/${user.userID}`} utensil="knife"/>}
            <LogInButton user={user} logInUser={logInUser} logOutUser={logOutUser}/>
            </>)
          }}
        </userContext.Consumer>
      </div>
    </div>
  );
};
  
export default Landing;

const PageLink = ({name, page, signOut, utensil}) => {
  const [pageLinkHover, setPageLinkHover] = useState(false);
  const handleMouseEnter = () => {
    setPageLinkHover(true);
  }
  const handleMouseLeave = () => {
    setPageLinkHover(false);
  }

  const svgTurnsPink = true;

  const styles = {
    container: {
        display: 'flex',
        gap: '1.8em'
    },
    pageLink: {
      cursor: 'pointer',
      color: pageLinkHover ? colors.accent2 : colors.accent1,
      transition: 'all 0.27s ease'
    },
    span: {
      color: pageLinkHover ? colors.accent1 : colors.accent2,
      transition: 'all 0.27s ease'
    },
    utensil: {
      width: '6em',
      filter: svgTurnsPink ? 'invert(59%) sepia(69%) saturate(456%) hue-rotate(307deg) brightness(87%) contrast(96%)' : 'invert(51%) sepia(43%) saturate(689%) hue-rotate(139deg) brightness(96%) contrast(90%)',
      opacity: pageLinkHover ? 1 : 0,
      transition: 'all 0.27s ease',
    },
    utensilFlip: {
      width: '6em',
      filter: svgTurnsPink ? 'invert(59%) sepia(69%) saturate(456%) hue-rotate(307deg) brightness(87%) contrast(96%)' : 'invert(51%) sepia(43%) saturate(689%) hue-rotate(139deg) brightness(96%) contrast(90%)',
      opacity: pageLinkHover ? 1 : 0,
      transition: 'all 0.27s ease',
      transform: "scale(-1,1)"
    }
  }

  return (
    <div style={styles.container}>
      <img style={styles.utensil} src={require(`../components/common/${utensil}.svg`)} alt="" />
      {name != "sign out"
      ? <Link to={`/${page}`}><h2 style={styles.pageLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{name}</h2></Link>
      : <div onClick={signOut}><h2 style={styles.pageLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{name}</h2></div>
      }
      <img style={styles.utensilFlip} src={require(`../components/common/${utensil}.svg`)} alt="" />
    </div>
  )
}

function LogInButton({user, logInUser, logOutUser}) {
  // sends the token to backend, and retrieve sub(UserID) from backend.
  function handleCredentialResponse(response) {
    Axios.post("http://localhost:3002/login", {
      token: response.credential
    }).then((response) => {
      getUserInfo(response.data.sub); // just for showcasing.
    });
  }

  // Use sub(UserID) to retrieve user info in db.
  function getUserInfo(userID) {
    Axios.post("http://localhost:3002/userInfo", {
      sub: userID
    }).then((response) => {
      logInUser(response.data.result[0]);
    });
  }

  function signOut() {
    window.google.accounts.id.disableAutoSelect();
    logOutUser()
  }
  
  // not sure if this(useEffect) is the right way to do it, sometimes the page doesn't load
  useEffect(() => {
    let google = window.google;
    // Initialize google auth using our OAuth 2.0 Client ID
    google.accounts.id.initialize({
      client_id:
        "33451040036-fcevscq8eogthqf0ve60bbdqrs03obpr.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    // Render the button using google's library
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "dark", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  })

  return (
    <div>
      {user.userID != null
      ? <PageLink signOut={signOut} name="sign out" utensil="spoon"/>
      : <div id="buttonDiv"></div>}
    </div>
  );
}