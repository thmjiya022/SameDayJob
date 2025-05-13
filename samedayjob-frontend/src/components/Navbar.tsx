import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
}

interface NavbarProps {
    user: User | null;
    onLogout: () => void;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ user, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">SameDayJob</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={onLogout} className="logout-button">
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