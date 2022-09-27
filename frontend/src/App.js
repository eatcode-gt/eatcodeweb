import './App.css';
import { useEffect } from "react";
import Axios from "axios";

function App() {

  function handleCredentialResponse(response) {
    Axios.post("http://localhost:3002/login", {
      token: response.credential
    }).then((response) => {
      console.log(response.data);
    });
  }

  // not sure if this(useEffect) is the right way to do it, it doesn't work if we manually refresh it
  useEffect(() => {
    // Imports google's library (can't import the usual way cuz we're using React)
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);
    const google = window.google;

    // Initialize google auth using our OAuth 2.0 Client ID
    google.accounts.id.initialize({
      client_id:
        "1047038680761-n6ccantuq37vsp6a4f1jk580suh2ej5n.apps.googleusercontent.com",
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
      <div id="buttonDiv"></div>
    </div>
  );
}

export default App;
