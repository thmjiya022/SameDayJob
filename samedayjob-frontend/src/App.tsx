import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      {/* Blue Navigation Bar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="main-content">
        <Home />
      </main>
    </div>
  );
}

export default App;