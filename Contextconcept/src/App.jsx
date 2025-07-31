import React from 'react'
import Login from './Components/Login'
import UserContextProvider from './Context/UserContextProvider'
import Check from './Components/Check'

const App = () => {
  return (
    <UserContextProvider>
      <div  className='bg-gray-900 min-h-screen p-9'>
      <Login />
      <Check />
      </div> 
    </UserContextProvider>
  )
}

export default App
