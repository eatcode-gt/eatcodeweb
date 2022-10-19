import React from 'react';
import { useParams } from 'react-router-dom'

const User = () => {
  let { userName } = useParams();
  
  return (
    <div>
      <h1>{userName}</h1>
    </div>
  );
};
  
export default User;