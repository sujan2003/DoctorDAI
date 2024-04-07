// Created by Sujan Niroula

import React, { useState, useEffect } from 'react';
import { createThread, postMessage } from '../api/DocDai';

export const ChatWithDocDai = () => {
  const [threadId, setThreadId] = useState(null); //creating  a state variable to store the thread id
  const [isInitializingThread, setIsInitializingThread] = useState(true); //to prevent sending message before creating a thread
  const [message, setMessage] = useState(''); //creating a state variable to store the message that user types in the text area
  const [messages, setMessages] = useState([]); //creating a state variable to store the messages
  const [isFetchingMessage, setIsFetchingMessage] = useState(false); // a boolean value used for checking if we are fetching

  useEffect(() => {
    // Function to initialize a new thread
    const initThread = async () => {
      try {
        const response = await createThread();
        setThreadId(response.data.threadId);
      } catch (error) {
        console.error("Failed to start new thread:", error);
      }
      setIsInitializingThread(false);
    };

    initThread(); // Call the function to start a new thread on component mount
  }, []); // only runs once mount

  const handleSendMessage = async () => {
    if (isInitializingThread || !message.trim()) return;

    setIsFetchingMessage(true);
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

      setIsFetchingMessage(false);
    } catch (error) {
      alert('Error: ' + error.message); // Optional: Display an error message
      //console.error("Failed to send message:", error);
    }
  };

  //Submits on enter key press instead of clicking send button
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  //clears the chat
  const handleClearChatHistory = () => {
    setMessages([]);
  };

  return (
    <>
      <div className="sticky top-0 bg-slate-300">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className='mt-4 mb-4 px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300 mr-2'
          disabled={isInitializingThread}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSendMessage} className='bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mr-2'>Submit</button>
        <button onClick={handleClearChatHistory} className='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-2 rounded'>Clear Chat</button>
      </div>

      {isInitializingThread && <div>Reload to create a new thread</div>}
      {isFetchingMessage && <div>Getting a response...😉</div>}
      <div className="mt-5">
        {messages.map((msg, index) => (
          <p key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow mb-2">
            {msg.text || "No message available."} {/* Access the text property */} 
          </p>
        ))}
      </div>
    </>
  );
};
