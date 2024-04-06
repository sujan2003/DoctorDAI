import { useState } from 'react';
import './App.css';
import { ChatWithDocDai } from './components/ChatDocDAI';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatWithDocDai />
    </>
  )
}

export default App
