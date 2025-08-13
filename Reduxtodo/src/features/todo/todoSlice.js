import { createSlice , nanoid } from "@reduxjs/toolkit";

export const initialState = { todos : [{
    id : 1 , text : "Hello world!"
}]}

export const todoSlice = createSlice({
    name : "todo",
    initialState,
    reducers : {
        addtodo:(state,actions) => {
            const todo = {
                id : nanoid,
                text : actions.payload
            }
            state.todos.push(todo);
        } ,
        removetodo:(state,actions) => {
           state.todos =  state.todos.filter((currtodo) => (currtodo.id !== actions.payload))
        },
        updatetodo:(state,actions) => {
            state.todos = state.todos.map((currtodo) => currtodo.id === actions.payload.id ? {...currtodo , text : actions.payload.text} : currtodo  )
        }
    }

})

export const {addtodo,removetodo,updatetodo} = todoSlice.actions

export default todoSlice.reducer