import { colors } from './global/colors'
import './global/fonts.css';

import { PageTransition } from '@steveeeie/react-page-transition';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeaderSkip from './components/common/HeaderSkip';
import Landing from './pages/landing';
import Problems from './pages/problems';
import Login from './pages/login';
import User from './pages/user';
import Question from './pages/question';
import Create from './pages/create';

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
  console.log(location)
  return (
    <main style={styles.app}>
      <PageTransition preset="moveToLeftFromRight" transitionKey={location.key}>
        <Routes location={location}>
          <Route exact path='/' element={<Landing />} title="eatcode | home"/>
          <Route element={<HeaderSkip />}>
            <Route path='/problems' element={<Problems />}  title="eatcode | problems"/>
            <Route path='/login' element={<Login />}  title="eatcode | login"/>
            <Route path='/user/:userName' element={<User />}  title="eatcode | user"/>
            <Route path='/create' element={<Create />}  title="eatcode | create"/>
            <Route path='/question/:name' element={<Question />} title='eatcode | question' />
          </Route>
        </Routes>
      </PageTransition>
    </main>
  );
}

const Root = () => <Router><App /></Router>;

export default Root;
