import React from 'react';
import ProfileCard from '../components/user/ProfileCard';
import UserStats from '../components/user/UserStats';
import HeatMap from '../components/user/HeatMap';
import RecentlySolved from '../components/user/RecentlySolved';
import { userContext } from '../userContext';
import PageContainer from '../components/common/PageContainer';

const User = () => {
  const styles = {
    flex: {
      display: 'flex',
      gap: '2em',
      justifyContent: 'space-between'
    }
  }


  return (
    <userContext.Consumer>
    {({user}) => {
      return (<PageContainer children={
      <div style={styles.flex}>
      <ProfileCard user={user} />
      <UserStats user={user} />
      {/* <HeatMap user={user} /> */}
      <RecentlySolved user={user} />
      </div>}/>)}}
    </userContext.Consumer>
  );
};
  
export default User;