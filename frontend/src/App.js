import { colors } from './global/colors'
import './global/fonts.css';

import { useState } from "react";
import { PageTransition } from '@steveeeie/react-page-transition';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeaderSkip from './components/common/HeaderSkip';
import Landing from './pages/landing';
import Problems from './pages/problems';
import Login from './pages/login';
import User from './pages/user';

function App() {
  const [user, setUser] = useState({
    userName: 'Not Logged In',
    profilePicLink: 'url("https://steamuserimages-a.akamaihd.net/ugc/786371856221183225/2F04B32CA10AD1ADBC01CE5D4DC6F7AF0E96AE6C/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true")'
  });

  const updateUser = (newUserName) => {
    let newUser = JSON.parse(JSON.stringify(user));
    newUser.userName = newUserName;
    setUser(newUser);
  }

  const styles = {
    app: {
      fontFamily: 'Inter',
      backgroundColor: colors.grey,
      height: '100vh',
      width: '100vw'
    }
  }

  const location = useLocation();
  return (
    <main style={styles.app}>
      <PageTransition preset="moveToLeftFromRight" transitionKey={location.key}>
        <Routes location={location}>
          <Route exact path='/' element={<Landing />} title="eatcode | home"/>
          <Route element={<HeaderSkip user={user}/>}>
            <Route path='/problems' element={<Problems />}  title="eatcode | problems"/>
            <Route path='/login' element={<Login updateUser={updateUser}/>}  title="eatcode | login"/>
            <Route path='/user/:userName' element={<User />}  title="eatcode | user"/>
          </Route>
        </Routes>
      </PageTransition>
    </main>
  );
}

const Root = () => <Router><App /></Router>;

export default Root;
