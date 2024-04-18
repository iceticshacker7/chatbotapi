// frontend/src/components/Chatbot.js

import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Styling file for Chatbot component

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/chat', { message: input });
      setMessages([...messages, { text: input }, { text: response.data }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index} className={index % 2 === 0 ? 'user-msg' : 'bot-msg'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
