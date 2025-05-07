import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="header">
    <h1 className="logo">SameDayJob</h1>
    <nav className="nav">
      <button className="nav-button">Find Job</button>
      <button className="nav-button">Create Job</button>
      <button className="nav-button">Login</button>
    </nav>
  </header>
  );
};

export default Navbar;