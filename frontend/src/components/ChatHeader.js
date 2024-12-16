import React from 'react';
import { FaRobot, FaCog, FaPalette, FaLanguage } from 'react-icons/fa';
import { useChatContext } from '../context/ChatContext';

const ChatHeader = ({ user }) => {
  const { theme, toggleTheme, language, changeLanguage } = useChatContext();

  return (
    <div className="chat-header">
      <div className="header-left">
        <FaRobot size={24} />
        <span className="bot-name">AI Assistant</span>
      </div>
      <div className="header-right">
        {user && (
          <div className="user-info">
            {user.name || 'Guest User'}
          </div>
        )}
        <div className="header-actions">
          <button 
            className="header-action-btn" 
            onClick={toggleTheme} 
            title="Toggle Theme"
          >
            <FaPalette />
          </button>
          <button 
            className="header-action-btn" 
            onClick={() => changeLanguage(language === 'en' ? 'es' : 'en')} 
            title="Change Language"
          >
            <FaLanguage />
          </button>
          <button 
            className="header-action-btn" 
            title="Settings"
          >
            <FaCog />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;