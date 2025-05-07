import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService';
import './Navbar.css';

interface NavbarProps {
    user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const handleLogout = () => {
        logout();
        window.location.href = '/login'; // Force refresh to update state
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">SameDayJob</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;