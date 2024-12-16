import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Chatbot from './components/Chatbot';

const App = () => {
  const [user, setUser] = useState(null); // Stores the user information
  const [page, setPage] = useState('login'); // Controls which page is displayed ('login', 'signup', or 'chatbot')

  // Handle signup and set user and page to chatbot
  const handleSignup = (newUser) => {
    setUser(newUser);
    setPage('chatbot');
  };

  // Handle login and set user and page to chatbot
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage('chatbot');
  };

  return (
    <div className="app">
      {/* Render Signup, Login, or Chatbot depending on the current page */}
      {page === 'signup' && <Signup onSignup={handleSignup} />}
      {page === 'login' && <Login onLogin={handleLogin} />}
      {page === 'chatbot' && user && <Chatbot initialUser={user} />}

      {/* Display navigation buttons if not on the chatbot page */}
      {page !== 'chatbot' && (
        <div className="auth-navigation">
          <button onClick={() => setPage('login')}>Login</button>
          <button onClick={() => setPage('signup')}>Signup</button>
        </div>
      )}
    </div>
  );
};

export default App;
