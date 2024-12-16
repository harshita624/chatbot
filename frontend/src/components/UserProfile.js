import React, { useState, useEffect } from 'react';
import { authenticateUser } from '../utils/apiService';
import * as Avatars from '@dicebear/avataaars'; // Importing the Avatars package
import '../styles/UserProfile.css';

const UserProfile = ({ user, onUserUpdate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(''); // State for the avatar URL

  // Generate the avatar when the user information changes
  useEffect(() => {
    if (user) {
      // Correct way to generate avatar
      const avatar = Avatars.create({
        seed: user.name, // Use user name or other unique field
        // Optional: Add more customization
        style: 'default', // or 'circle'
        backgroundColor: ['blue50', 'blue100'] // Optional background colors
      });
  
      // Convert SVG to a data URL
      const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`;
      setAvatarUrl(dataUrl);
    }
  }, [user]); // Re-run this when the user prop changes

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authenticatedUser = await authenticateUser({ email, password });
      onUserUpdate(authenticatedUser);
      setIsLoginVisible(false); // Hide login form after successful login
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  // Handle logout logic
  const handleLogout = () => {
    onUserUpdate(null);
  };

  if (user) {
    return (
      <div className="user-profile-logged-in">
        <div className="user-info">
          {/* Display generated avatar or fallback to default */}
          <img
            src={avatarUrl || '/default-avatar.png'} // Use generated avatar or default image
            alt="User Avatar"
            className="user-avatar"
          />
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      {!isLoginVisible ? (
        <button
          onClick={() => setIsLoginVisible(true)}
          className="login-toggle-btn"
        >
          Login to Chat
        </button>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-submit-btn">
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLoginVisible(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
