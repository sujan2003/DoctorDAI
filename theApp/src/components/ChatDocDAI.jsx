// src/components/ChatWithDocDai.js
import React, { useState, useEffect } from 'react';
import { createThread, postMessage } from '../api/DocDai';

export const ChatWithDocDai = () => {
  const [threadId, setThreadId] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  let userMessage = "";

  useEffect(() => {
    // Function to initialize a new thread
    const initThread = async () => {
      try {
        const response = await createThread();
        setThreadId(response.data.threadId);
      } catch (error) {
        console.error("Failed to start new thread:", error);
      }
    };

    initThread(); // Call the function to start a new thread on component mount
  }, []); // only runs once mount

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

      // Immediately display the user's message by adding it to the chat history
      const userMessage = { text: message, sender: "user" }; 
      setMessages(prevMessages => [...prevMessages, userMessage]);

      // Wait for the API response to include the message in the chat history
      const newMessage = { text: response.data.messages[0][0].text.value, sender: "response" }; 
      setMessages(prevMessages => [...prevMessages, newMessage]);

      setMessage(''); // Reset the input field
    } catch (error) {
      alert('Error: ' + error.message); // Optional: Display an error message
      //console.error("Failed to send message:", error);
    }
  };

  return (
    <>
      <div className="sticky top-0 bg-slate-300">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className='mt-4 mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300 mr-2'
        />
        <button onClick={handleSendMessage} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded'>Send Message</button>
      </div>

      <div className="mt-5">
        <p>{message}</p>
        {messages.map((msg, index) => (
          <p key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow mb-2">
            {msg.text || "No message available."} {/* Access the text property */}
          </p>
        ))}

      </div>


    </>
  );
};
