import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ethers } from 'ethers'
import Ethwallets from './components/Ethwallets'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>ETH WEB WALLET</h1>
      <Ethwallets/>
        
    </>
  )
}

export default App
