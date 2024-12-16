import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const InputArea = ({ onSendMessage = () => {}, isDisabled = false }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() && !isDisabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isDisabled) {
      handleSendMessage();
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        className="chat-input"
        placeholder={isDisabled ? "Please log in to chat" : "Type a message..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={isDisabled}
      />
      <button
        className="send-button"
        onClick={handleSendMessage}
        disabled={isDisabled || !input.trim()}
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default InputArea;
