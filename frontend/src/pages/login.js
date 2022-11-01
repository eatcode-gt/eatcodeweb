import { useEffect } from "react";
import Axios from "axios";

function Login({updateUser}) {
  // sends the token to backend, and retrieve sub(UserID) from backend.
  function handleCredentialResponse(response) {
    Axios.post("http://localhost:3002/login", {
      token: response.credential
    }).then((response) => {
      console.log(response.data);
      getUserInfo(response.data.sub); // just for showcasing.
    });
  }

  // Use sub(UserID) to retrieve user info in db.
  function getUserInfo(userID) {
    Axios.post("http://localhost:3002/userInfo", {
      sub: userID
    }).then((response) => {
      updateUser(response.data.result[0].name);
    });
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
      { theme: "outline", size: "small" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  })

  return (
    <div>
      {/* The Google Login Button */}
      <div id="buttonDiv"></div>
      {console.log("render")}
      {/* <h1 id="nameBanner">Name: {userName}</h1>
      <button onClick={onSignout}> Sign Out </button> */}
      {/* To see the problems -> <ProblemBody></ProblemBody> */}
      {/* <ProblemBody></ProblemBody> */}
    </div>
  );
}

export default Login;