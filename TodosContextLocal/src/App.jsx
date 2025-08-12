import { useState,useEffect } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

const [todo, setTodo] = useState(() => {
  const saved = localStorage.getItem("todo");
  return saved ? JSON.parse(saved) : [];
});

const addTodo = (newtodo) => {
  setTodo((prev) => [...prev, { id: Date.now(), ...newtodo }]);
};

const updateTodo = (id, updatedText) => {
  setTodo((prev) =>
    prev.map((prevtodo) =>
      prevtodo.id === id ? { ...prevtodo, todo: updatedText } : prevtodo
    )
  );
};

const deleteTodo = (id) => {
  setTodo((prev) => prev.filter((prevtodo) => prevtodo.id !== id));
};

const toggleitems = (id) => {
  setTodo((prev) =>
    prev.map((prevtodo) =>
      prevtodo.id === id
        ? { ...prevtodo, complete: !prevtodo.complete }
        : prevtodo
    )
  );
};

useEffect(() => {
  localStorage.setItem("todo", JSON.stringify(todo));
}, [todo]);


  


  return (
    <TodoProvider value={{todo,addTodo,updateTodo,deleteTodo,toggleitems}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                      {todo.map((todoo) => (
                        <div key={todoo.id} className='w-full'>
                            <TodoItem todo={todoo} />
                        </div>
                      ))}
                        {/*Loop and Add TodoItem here */}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
