import { useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { store } from './app/Store'
import Addtodo from './components/Addtodo'
import Todos from './components/Todos'

function App() {

  return (
    <Provider store={store}>
      <Addtodo />
      <Todos />
    </Provider>
  )
}

export default App
