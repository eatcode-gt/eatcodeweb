import { Outlet } from 'react-router-dom';
import Header from './Header';

const HeaderSkip = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HeaderSkip;