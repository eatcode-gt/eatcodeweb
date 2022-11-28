import React from 'react';
import ProfileCard from '../components/user/ProfileCard';
import UserStats from '../components/user/UserStats';
import HeatMap from '../components/user/HeatMap';
import RecentlySolved from '../components/user/RecentlySolved';
import { userContext } from '../userContext';


const User = () => {

  return (
    <userContext.Consumer>
    {({user}) => {
      return (<>
      <ProfileCard user={user} />
      <UserStats user={user} />
      <HeatMap user={user} />
      <RecentlySolved user={user} />
      </>)}}
    </userContext.Consumer>
  );
};
  
export default User;