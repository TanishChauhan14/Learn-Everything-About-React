import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

// Hooks :- It is used to manage variable update on UI.Hooks are functions that let you use state and other React features without writing a class.

const add  = () => {
  setCount(count + 1)
} 

const dec = () => {
  if(count > 0){
    setCount(count - 1)
  }
}

  return (
    <>
    <div>
    <h1>Count Value : {count}</h1>
    <button onClick={add}>Increase the Value ++</button>
    <br /> <br />
    <button onClick={dec}>Decrease the Value --</button>
   </div>
    </>
  )
}

export default App
