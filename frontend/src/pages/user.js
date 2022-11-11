import React from 'react';
import ProfileCard from '../components/user/ProfileCard';
import ProblemSolvedCard from '../components/user/ProblemSolvedCard';
import HeatMap from '../components/user/HeatMap';

const User = () => {

  return (
    <div>
      <ProfileCard />
      <ProblemSolvedCard />
      <HeatMap />
    </div>
  );
};
  
export default User;