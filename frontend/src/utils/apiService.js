import axios from 'axios';

// Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Replace with your API base URL
const API_TOKEN = process.env.REACT_APP_API_TOKEN || 'test-token'; // Replace with a temporary token or keep it blank

// Axios Instance with Interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  },
  timeout: 10000  // 10 seconds timeout
});

// Request Interceptor
apiClient.interceptors.request.use(
  config => {
    // Add any request modifications here
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Global error handling
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Authentication Service
export const authenticateUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data.user;
  } catch (error) {
    throw error.response?.data || new Error('Authentication failed');
  }
};

// Bot Response Service
export const fetchBotResponse = async (message, userId) => {
  try {
    const response = await apiClient.post('/chat', {
      message,
      userId,
      timestamp: new Date().toISOString()
    });

    return response.data?.message || 'No response from bot.';
  } catch (error) {
    console.error('Bot response error:', error);
    throw error;
  }
};

// Message Utility Functions
export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export const groupMessagesByDate = (messages) => {
  const groupedMessages = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return groupedMessages;
};

export default apiClient;