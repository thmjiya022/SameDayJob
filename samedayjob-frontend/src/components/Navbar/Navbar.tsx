import { Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}

interface NavbarProps {
    user: User | null;
    onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
            <div className="text-2xl font-semibold text-blue-800 tracking-tight">
                <Link to="/">SameDayJob</Link>
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <Link
                            to="/profile"
                            className="text-gray-700 hover:text-black transition"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={onLogout}
                            className="text-sm bg-gray-100 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
                        >
                            Logout
                        </button>
                    </>
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
