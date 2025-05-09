import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService';
import './Navbar.css';

interface User {
    id: string;
    name: string;
    email: string
    phoneNumber: string
}

interface NavbarProps {
    user: User | null;
}
  
const Navbar: React.FunctionComponent<NavbarProps> = ({ user }) => {

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
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