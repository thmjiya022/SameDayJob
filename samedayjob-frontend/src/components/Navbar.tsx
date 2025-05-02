import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">SameDayJob</Link>
      <div className="nav-links">
        <Link to="/find-job">Find Job</Link>
        <Link to="/create-job">Create Job</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
