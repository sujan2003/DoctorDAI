import { useState } from 'react';
import './App.css';
import { ChatWithDocDai } from './components/ChatDocDAI';

function App() {
  return (
    <>
      <div className="Header bg-blue-500">
        <h1 className="font-bold text-2xl">Chat with DocDAI! 👨🏽‍⚕️</h1>
        <h5>Your go-to companion for navigating health information.</h5>
      </div>

      <ChatWithDocDai />
    </>
  )
}

export default App
