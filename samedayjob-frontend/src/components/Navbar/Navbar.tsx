import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    avatar?: string;
}

interface NavbarProps {
    user: User | null;
    onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
            <div className="text-2xl font-semibold text-blue-800 tracking-tight">
                <Link to="/">SameDayJob</Link>
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 focus:outline-none"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                {user.avatar || user.name.charAt(0)}
                            </div>
                            <span className="hidden md:inline text-gray-700">{user.name}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>

                                <div className="py-1">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <Link
                                        to="/messages"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Messages
                                    </Link>
                                </div>

                                <div className="py-1 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            onLogout();
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Log Out
                                    </button>
                                </div>

                                <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
                                    <p>SameDayJob Rules: Primary Policy - User Agreement</p>
                                    <p>SameDayJob, Inc. © 2025. All rights reserved.</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-black transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;