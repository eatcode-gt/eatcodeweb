import { colors } from './global/vars'
import './global/fonts.css';
import { userContext } from './userContext';

import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderSkip from './components/common/HeaderSkip';
import Landing from './pages/landing';
import Problems from './pages/problems';
import Question from './pages/question';
import Create from './pages/create';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        userName: null,
        userID: null
      }
    }

    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.setState({user: {
        userName: foundUser.name,
        userID: foundUser.userID
      }})
      console.log(foundUser, this.state.user)
    } else {
      this.setState({ user: {
        userName: "Not Logged In",
        userID: null
      }})
    }
  }

  logOut() {
    this.setState({user: {}})
    localStorage.clear()
  }

  logIn(newUserData) {
    console.log(newUserData)
    this.setState({user: {
      userName: newUserData.name,
      userID: newUserData.userID
    }})
    localStorage.setItem("user", JSON.stringify(newUserData))
  }

  render() {
    const styles = {
      app: {
        fontFamily: 'Inter',
        backgroundColor: colors.grey,
        height: '100vh',
        width: '100vw',
      },
      container: {
        overflowY: 'auto !important'
      }
    }
  
    const value = {
      user: this.state.user,
      logOutUser: this.logOut,
      logInUser: this.logIn
    }

    return (
      <userContext.Provider value={value}>
      <main style={styles.app}>
        <Routes>
          <Route exact path='/' element={<Landing />} title="eatcode | home"/>
          <Route element={<HeaderSkip />}>
            <Route path='/problems' element={<Problems />}  title="eatcode | problems"/>
            <Route path='/create' element={<Create />}  title="eatcode | create"/>
            <Route path='/problems/:name' element={<Question />} title='eatcode | problem' />
          </Route>
        </Routes>
      </main>
      </userContext.Provider>
    );
    }
}

const Root = () => <Router><App /></Router>;

export default Root;
