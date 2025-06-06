import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import PostJobPage from './pages/PostJob/PostJobPage';
import { getCurrentUser, logout as performLogout } from './services/authService';

const App = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(()=> {
        setUser(getCurrentUser());
    }, []);

    const handleLogin = () => {
        setUser(getCurrentUser());
    };

    const handleLogout = () => {
        performLogout();
        setUser(null);
    };

    return (
        <Router>
            <div className="">
                <Navbar user={user} onLogout={handleLogout} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
                        <Route path="/post-job" element={user ? <PostJobPage user={user} /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
