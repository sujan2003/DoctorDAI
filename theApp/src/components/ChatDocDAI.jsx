// src/components/ChatWithDocDai.js
import React, { useState, useEffect } from 'react';
import { createThread, postMessage } from '../api/DocDai';

export const ChatWithDocDai = () => {
  const [threadId, setThreadId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleStartThread = async () => {
    const response = await createThread();
    setThreadId(response.data.threadId);
    setMessages([]);
  };
  const handleSendMessage = async () => {
    if (!message.trim()) return;
  
    try {
      const response = await postMessage(threadId, message);
      //console.log(response.data); // To verify the data structure
      
      // Here, you can opt to immediately display the user's message by adding it to the chat history
      const userMessage = { text: message, sender: "user" }; // Example structure, adjust as needed
      setMessages(prevMessages => [...prevMessages, userMessage]);
  
      // Optionally, wait for the API response to include the message in the chat history
      const newMessage = { text: response.data.messages[0][0].text.value, sender: "response" }; // Adjust based on actual data structure
      setMessages(prevMessages => [...prevMessages, newMessage]);
  
      setMessage(''); // Optionally reset the input field here if desired
    } catch (error) {
      alert('Error: ' + error.message); // Optional: Display an error message
      //console.error("Failed to send message:", error);
    }
  };
  
  return (
    <>
      <h1>Chat with a DocDAI Specialist</h1>
      <button onClick={handleStartThread} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Start New Thread</button>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className='mt-4 mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300'
      />
      <button onClick={handleSendMessage} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Send Message</button>
      <div className="mt-5">
        <p>{message}</p>
        {messages.map((msg, index) => (
          <p key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow mb-2">
            { msg.text || "No message available."} {/* Access the text property */}
          </p>
        ))}
        
      </div>

    </>
  );
};
