import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-red-500 underline text-center">Hello</h1>
      </div>
    </>
  )
}

export default App
