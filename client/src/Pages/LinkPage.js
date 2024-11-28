import { Link } from "react-router-dom";
import React from "react";
import './Linkpage.css'


const LinkPage = () => {
  return (
    <div className="link-page-container">
      <header className="link-page-header">Links</header>
      <p className="link-page-message">You are logged in</p>
      <div className="link-list">
        <Link to="/se-only" className="link-item">Go to the software engineering page</Link>
        <Link to="/marketers-only" className="link-item">Go to the Marketers page</Link>
        <Link to="/hr-only" className="link-item">Go to the human resource personnel page</Link>
        <Link to="/protected" className="link-item">Go to protected route</Link>
      </div>
    </div>
  );
};

export default LinkPage;
