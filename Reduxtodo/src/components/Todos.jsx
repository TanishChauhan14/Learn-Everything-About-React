import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removetodo, updatetodo } from "../features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const [isTodoEditable, setIsTodoEditable] = useState(null); // ✅ ID store karenge

  const dispatch = useDispatch();

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <input
              type="text"
              className="text-white"
              value={todo.text}
              disabled={isTodoEditable !== todo.id} // ✅ sirf current edit ID ka input enabled
              onChange={(e) =>
                dispatch(updatetodo({ id: todo.id, text: e.target.value }))
              }
            />
            <button
              onClick={() => dispatch(removetodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              🗑
            </button>
            <button
              onClick={() =>
                setIsTodoEditable((prev) =>
                  prev === todo.id ? null : todo.id // ✅ Toggle edit mode per todo
                )
              }
              className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none cursor hover:bg-green-600 rounded text-md"
            >
              ✏
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
