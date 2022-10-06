import { colors } from './global/colors'
import './global/fonts.css';

import { PageTransition } from '@steveeeie/react-page-transition';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeaderSkip from './components/common/HeaderSkip';
import Landing from './pages/landing';
import Problems from './pages/problems';
import Login from './pages/login';
import User from './pages/user';

function App() {
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
          <Route element={<HeaderSkip />}>
            <Route path='/problems' element={<Problems />}  title="eatcode | problems"/>
            <Route path='/login' element={<Login />}  title="eatcode | login"/>
            <Route path='/user/:userName' element={<User />}  title="eatcode | user"/>
          </Route>
        </Routes>
      </PageTransition>
    </main>
  );
}

const Root = () => <Router><App /></Router>;

export default Root;
