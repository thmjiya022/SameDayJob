import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/users" style={{ marginRight: '1rem' }}>Users</Link>
      <Link to="/post-job">Post Job</Link>
    </nav>
  );
};

export default Navbar;
