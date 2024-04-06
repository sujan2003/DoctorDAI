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
      console.log(response.data); // To verify the data structure
      // Adjusting to match expected data structure for rendering
      const newMessage = { text: response.data.messages[0][0].text.value };
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, { text: response.data.messages[0][0].text.value }];
        console.log(updatedMessages); // Check the updated state value
        return updatedMessages;
      });
      setMessage('');
    } catch (error) {
      console.error("Failed to send message:", error);
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
