import { useState } from 'react'
import './App.css'

function App() {

  const [colour,setColour] = useState("olive")

  let color = (dets) => {

    let c = dets.target.innerText.toLowerCase();
    setColour(c)
    console.log(colour);
    
  }

  return (
    <div className=" h-screen" style={{backgroundColor: colour}} >
     <button onClick={color}>red</button>
     <button onClick={color}>Green</button>
     <button onClick={color}>Blue</button>
     <button onClick={color}>Olive</button>
     <button onClick={color}>Gray</button>
     <button onClick={color}>Yellow</button>
     <button onClick={color}>Pink</button>
     <button onClick={color}>Purple</button>
     <button onClick={color}>White</button>
     <button onClick={color}>Black</button>
    </div>
  )
}

export default App
