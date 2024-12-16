
import React, { useState, useEffect, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import InputArea from './InputArea';
import UserProfile from './UserProfile';
import { fetchBotResponse } from '../utils/apiService';
import { ChatProvider } from '../context/ChatContext';
import '../styles/Chatbot.css';

const Chatbot = ({ initialUser = null }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(initialUser);
  const [isTyping, setIsTyping] = useState(false);

  // Welcome message
  useEffect(() => {
    if (user) {
      const welcomeMessage = {
        id: Date.now(),
        text: `Hello, ${user.name}! How can I help you today?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [user]);

  const sendMessage = useCallback(async (inputText) => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Set typing state
    setIsTyping(true);

    try {
      // Simulate bot response (replace with actual API call)
      const botResponse = await fetchBotResponse(inputText, user?.id);
      
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      // Add bot response
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 2,
        text: 'Oops! Something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [user]);

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <ChatProvider>
      <div className="chatbot-container">
        <ChatHeader user={user} />
        <UserProfile 
          user={user} 
          onUserUpdate={handleUserUpdate} 
        />
        <MessageList 
          messages={messages} 
          isTyping={isTyping} 
        />
        <InputArea 
          onSendMessage={sendMessage} 
          isDisabled={!user}
        />
      </div>
    </ChatProvider>
  );
};

export default Chatbot;