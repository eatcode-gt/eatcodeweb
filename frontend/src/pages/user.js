import React from 'react';
import ProfileCard from '../components/user/ProfileCard';
import UserStats from '../components/user/UserStats';
import HeatMap from '../components/user/HeatMap';
import RecentlySolved from '../components/user/RecentlySolved';

const User = () => {

  return (
    <div>
      <ProfileCard />
      <UserStats />
      <HeatMap />
      <RecentlySolved />
    </div>
  );
};
  
export default User;