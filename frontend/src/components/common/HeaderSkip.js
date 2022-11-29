import { Outlet } from 'react-router-dom';
import Header from './Header';

const HeaderSkip = () => {
  const styles = {
    container: {
      overflowY: 'auto'
    }
  }

  return (
    <div style={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
};

export default HeaderSkip;