import { colors } from './global/colors'
import './global/fonts.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header'
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

  return (
    <main style={styles.app}>
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Landing />} title="eatcode | home"/>
        <Route path='/problems' element={<Problems />}  title="eatcode | problems"/>
        <Route path='/login' element={<Login />}  title="eatcode | login"/>
        <Route path='/user/:userName' element={<User />}  title="eatcode | user"/>
      </Routes>
    </Router>
    </main>
  );
}

export default App;
