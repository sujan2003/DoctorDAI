// Created by Sujan Niroula

// import { useState } from 'react';
import './App.css';
import { ChatWithDocDai } from './components/ChatDocDAI';
import Header from './components/Header';
// import logo from './assets/logo.webp'

function App() {
  return (
    <> 
      {/* Header component */}
      <Header />
      
      {/* Chatting component */}
      <ChatWithDocDai />
    </>
  )
}

export default App
