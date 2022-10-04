import './App.css';
import { useEffect } from "react";
import Axios from "axios";

function App() {
  //const [user, setUser] = useState(undefined);
  // sends the token to backend, and retrieve sub(UserID) from backend.
  function handleCredentialResponse(response) {
    Axios.post("http://localhost:3002/getUserID", {
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
      console.log(response.data.result[0]);
    });
  }


  const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })
  
  // not sure if this(useEffect) is the right way to do it, sometimes the page doesn't load
  useEffect(() => {
    loadScript("https://accounts.google.com/gsi/client")
      .then(() => {
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
      })//.catch(console.error)
  })

  return (
    <div className="App">
      {/* The Google Login Button */}
      <div id="buttonDiv"></div>
    </div>
  );
}

export default App;
