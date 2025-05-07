import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="header">
    <h1 className="logo">SameDayJob</h1>
    <nav className="nav">
      <p className="nav-button">Find Job</p>
      <p className="nav-button">Create Job</p>
      <p className="nav-button">Login</p>
    </nav>
  </header>
  );
};

export default Navbar;