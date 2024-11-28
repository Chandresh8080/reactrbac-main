import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome Home, what would you like to do</h1>
      <div className="home-links">
        <Link to='/register' className="home-link">Register</Link><br/>
        <Link to='/signin' className="home-link">Signin</Link><br/>
      </div>
    </div>
  );
}

export default Home;
