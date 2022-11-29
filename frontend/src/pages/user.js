import React from 'react';
import ProfileCard from '../components/user/ProfileCard';
import UserStats from '../components/user/UserStats';
import HeatMap from '../components/user/HeatMap';
import RecentlySolved from '../components/user/RecentlySolved';
import { userContext } from '../userContext';
import PageContainer from '../components/common/PageContainer';

const User = () => {

  return (
    <userContext.Consumer>
    {({user}) => {
      return (<PageContainer children={<>
      <ProfileCard user={user} />
      <UserStats user={user} />
      <HeatMap user={user} />
      <RecentlySolved user={user} />
      </>}/>)}}
    </userContext.Consumer>
  );
};
  
export default User;