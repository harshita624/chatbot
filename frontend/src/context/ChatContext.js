import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme', theme === 'light');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <ChatContext.Provider value={{
      theme,
      language,
      toggleTheme,
      changeLanguage
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);

// Usage in App.js
export const App = () => {
  const { theme, toggleTheme } = useChatContext();

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
};
