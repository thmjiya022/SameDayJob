import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { getCurrentUser } from './services/authService';
import './App.css';

const App = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const currentUser = getCurrentUser();
                setUser(currentUser)
            } catch (error) {
                setUser(null)
            }     
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        setUser(null);
    }

    return (
        <Router>

            <div className="App">

                <Navbar user={user} onLogout={handleLogout}/>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard user={user}/>}/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Home />}></Route>
                    </Routes>
                </main>

            </div>

        </Router>
    );
}

export default App;