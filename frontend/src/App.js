import './App.css';
import ProblemBody from './components/ProblemBody';
import { useEffect } from "react";
import Axios from "axios";
import FrontPage from './components/FrontPage';

function App() {
  
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
      console.log(response.data);
    });
  }

  
  // not sure if this(useEffect) is the right way to do it, sometimes the page doesn't load
  useEffect(() => {
    const google = window.google;

    // Initialize google auth using our OAuth 2.0 Client ID
    google.accounts.id.initialize({
      client_id:
        "33451040036-fcevscq8eogthqf0ve60bbdqrs03obpr.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    // Render the button using google's library
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  })

  return (
    <div className="App">
      {/* The Google Login Button */}
      <FrontPage></FrontPage>
    </div>
  );
}

export default App;
