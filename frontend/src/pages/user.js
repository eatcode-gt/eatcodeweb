import React from 'react';
import ProfileCard from '../components/user/ProfileCard';
import ProblemSolvedCard from '../components/user/ProblemSolvedCard';
import HeatMap from '../components/user/HeatMap';
import RecentlySolved from '../components/user/RecentlySolved';

const User = () => {

  return (
    <div>
      <ProfileCard />
      <ProblemSolvedCard />
      <HeatMap />
      <RecentlySolved />
    </div>
  );
};
  
export default User;