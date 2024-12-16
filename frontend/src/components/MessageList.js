import React, { useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const TypingIndicator = () => (
  <div className="typing-indicator">
    <div className="typing-dot"></div>
    <div className="typing-dot"></div>
    <div className="typing-dot"></div>
  </div>
);

const MessageList = ({ messages = [], isTyping = false }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // Safeguard against undefined ref
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={message.id || index} // Ensure a fallback key is used
          className={`message ${message.sender}`}
        >
          {message.sender === "bot" && <FaRobot className="message-icon" />}
          {message.text}
        </div>
      ))}

      {isTyping && (
        <div className="message bot">
          <TypingIndicator />
        </div>
      )}

      {/* Ref element */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
