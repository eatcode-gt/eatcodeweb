import { Outlet } from 'react-router-dom';
import Header from './Header';

const HeaderSkip = ({user}) => {
  return (
    <>
      <Header user={user}/>
      <Outlet />
    </>
  );
};

export default HeaderSkip;