import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css'


const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h2 className="unauthorized-message">Sorry, you do not have access to this page</h2>
      <Link to="/linkpage" className="unauthorized-link">Go to link pages</Link>
    </div>
  );
}

export default Unauthorized;


