import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">SameDayJob</Link>
      <nav className="nav">
        <Link to="/find-job" className="nav-button">Find Job</Link>
        <Link to="/create-job" className="nav-button">Create Job</Link>
        <Link to="/login" className="nav-button">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;