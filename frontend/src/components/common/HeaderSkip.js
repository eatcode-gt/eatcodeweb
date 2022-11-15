import { Outlet } from 'react-router-dom';
import Header from './Header';

const HeaderSkip = ({user}) => {
  const styles = {
    container: {
      overflowY: 'auto'
    }
  }

  return (
    <div style={styles.container}>
      <Header user={user}/>
      <Outlet />
    </div>
  );
};

export default HeaderSkip;