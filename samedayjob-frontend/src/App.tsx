import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Users from './pages/Users'; // Create this page
import PostJob from './pages/PostJob'; // Create this page

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </>
  );
}

export default App;
