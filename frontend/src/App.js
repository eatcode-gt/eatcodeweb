import { colors } from './global/vars'
import './global/fonts.css';

import { useState } from "react";
import { PageTransition } from '@steveeeie/react-page-transition';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeaderSkip from './components/common/HeaderSkip';
import Landing from './pages/landing';
import Problems from './pages/problems';
import User from './pages/user';
import Question from './pages/question';
import Create from './pages/create';
import Login from './pages/login'

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    userName: 'Not Logged In',
    profilePicLink: 'url("https://steamuserimages-a.akamaihd.net/ugc/786371856221183225/2F04B32CA10AD1ADBC01CE5D4DC6F7AF0E96AE6C/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true")'
  });

  const updateUser = (newUserName, isLogin) => {
    if (isLogin) {
      let newUser = JSON.parse(JSON.stringify(user));
      newUser.userName = newUserName;
      newUser.loggedIn = true;
      setUser(newUser);
    } else {
      let newUser = JSON.parse(JSON.stringify(user));
      newUser.userName = 'Not Logged In';
      newUser.loggedIn = false;
      setUser(newUser);
    }
  }

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

  const location = useLocation();
  return (
    <main style={styles.app}>
      <PageTransition style={styles.container} preset="moveToTopFromBottom" transitionKey={location.key}>
        <Routes location={location}>
          <Route exact path='/' element={<Landing user={user}/>} title="eatcode | home"/>
          <Route element={<HeaderSkip user={user}/>}>
            <Route path='/problems' element={<Problems />}  title="eatcode | problems"/>
            <Route path='/logout' element={<Login updateUser={updateUser} user={user}/>}  title="eatcode | login"/>
            <Route path='/login' element={<Login updateUser={updateUser} user={user}/>}  title="eatcode | login"/>
            <Route path='/user/:userName' element={<User />}  title="eatcode | user"/>
            <Route path='/create' element={<Create />}  title="eatcode | create"/>
            <Route path='/problems/:name' element={<Question />} title='eatcode | problem' />
          </Route>
        </Routes>
      </PageTransition>
    </main>
  );
}

const Root = () => <Router><App /></Router>;

export default Root;
