import React from 'react';
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
      <h1>landing</h1>
      <Link to="/problems"><h2>link to problems</h2></Link>
    </div>
  );
};
  
export default Landing;